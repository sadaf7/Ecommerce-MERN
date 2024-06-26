import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../Layout/MetaData'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SideBar from './SideBar'
import { clearErrors, orderDetails, updateOrder } from '../../actions/orderAction'
import { useAlert } from 'react-alert'
import Loader from '../Layout/Loader/Loader'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant'

const UpdateOrder = () => {

    const {order,error,loading} = useSelector(state => state.orderDetails)
    const {isUpdated, error: updateError} = useSelector(state => state.order)

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()

    const [status,setStatus] = useState('')

    const address = `${order?.shippingInfo?.address},${order?.shippingInfo?.city},${order?.shippingInfo?.state},${order?.shippingInfo?.pincode},${order?.shippingInfo?.country}`

    useEffect(()=>{

      if(error){
          alert.error(error)
          dispatch(clearErrors())
      }
      if(updateError){
          alert.error(updateError)
          dispatch(clearErrors())
      }
      if(isUpdated){
          alert.success("Order Updated Successfully")
          dispatch({type: UPDATE_ORDER_RESET})
      }

      dispatch(orderDetails(params.id))

  },[alert,error,dispatch,params.id,updateError,isUpdated])

    const handleSubmit=(e)=>{
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("status", status);

      dispatch(updateOrder(params.id,myForm))
    }

  return (
    <>
      <MetaData title={'Process Order'}/>
      <div className='dashboard'>
        <SideBar/>
        <div className='new_product_container'>
        {loading ? (<Loader/>):(
          <div className='confirm_order_page'>
          <div>
              <div className='confirm_shipping_area'>
                  <h2 className='info_h2'>Shipping Info</h2>
                  <div className='confirm_shipping_area'>
                     <div>
                      <b>Name: </b>
                      <span>{order?.user?.name}</span>
                     </div>
                     <div>
                      <b>Phone: </b>
                      <span>{order?.shippingInfo?.phoneNo}</span>
                     </div>
                     <div>
                      <b>Address: </b>
                      <span>{address}</span>
                     </div>
                  </div>
  
                  <div>
              <div className=''>
              <div className=''>
                <h2>Order Summary</h2>
                <div>
                  <b>Amount: </b>
                  <span>${order?.totalPrice && order?.totalPrice}</span>
                </div>  
                <div>
                  <b>Payment Info: </b>
                  <span className={order?.paymentInfo && order?.paymentInfo.status==='succeeded'?'greenColor':'redColor'}>{order?.paymentInfo && order?.paymentInfo.status==='succeeded'?'PAID':'NOT PAID'}</span>
                </div>  
                <div>
                  <h3>Order Status</h3>  
                  <b>Status: </b>
                  <span className={order && order?.orderStatus==='Delivered'?'greenColor':'redColor'}>{order?.orderStatus}</span>
                </div>    
      
              </div>
          
              </div>
          </div>
  
                  <div className='cart_items'>
                      <h2>Your Cart Items: </h2>
                      <div className='cart_box'>
                          {order?.orderItems && order?.orderItems?.map((item)=>{
                              return(
                                  <div className='cart_list' key={item.product}>
                                      <div className='cart_img'>
                                          <img src={item.image} alt={item.name} />
                                      </div>
                                      
                                          
                                      <Link to={`/product/${item.product}`}>
                                          {item.name}
                                      </Link>
                                          
                                      <div>
                                      <span>
                                          {item.quantity} x ${item.price} = ${item.price * item.quantity}
                                      </span>
                                      </div>
                                      
          
                                  </div>
                              )
                          })}
                      </div>
                  </div>
              </div>
          </div>
          <div>
          <div className='order_summary_container'>
              
          <form onSubmit={handleSubmit} className="mx-1 mx-md-4" encType='multipart/form-data'>
          <h1 className='new_product_heading'>Process Order</h1>
        <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
          <div>
            <select value={status} onChange={(e)=>setStatus(e.target.value)} >
              <option value={''}>Choose Category</option>
              {order?.orderStatus==='Processing' && (
                <option value={'Shipped'}>Shipped</option>
              )}
              {order?.orderStatus==='Shipped' && (
                <option value={'Delivered'}>Delivered</option>
              )}
            </select>
          </div>
          </div>
          
          <div className=" mx-4 mb-3 mb-lg-4">
          <button disabled={loading ? true : false || status===''?true:false}  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Update</button>
          </div>
        </form>

              </div>
          </div>
        </div>
        )}
        </div>
      </div>
      
    </>
  )
}

export default UpdateOrder
