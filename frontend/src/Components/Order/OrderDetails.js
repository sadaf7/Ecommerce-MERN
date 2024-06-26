import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { clearErrors, orderDetails } from '../../actions/orderAction';
import { useAlert } from 'react-alert';
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const params = useParams()
    const alert = useAlert()

    const {order,error,loading} = useSelector(state => state.orderDetails)

    const address = `${order?.shippingInfo?.address},${order?.shippingInfo?.city},${order?.shippingInfo?.state},${order?.shippingInfo?.pincode},${order?.shippingInfo?.country}`

    useEffect(()=>{

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(orderDetails(params.id))

    },[alert,error,dispatch,params.id])

  return (
    <>
    <MetaData title='Order Details'/>
    {loading?(<Loader/>):(
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
                <div className='cart_items'>
                    <h2>Your Order Items: </h2>
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
            <div className='order_summary_box_1'>
              <h2>Order Summary</h2>
              <div>
                <b>Amount: </b>
                <span>${order?.totalPrice && order?.totalPrice}</span>
              </div>  
              <div>
                <b>Payment Info: </b>
                <span className={order?.paymentInfo && order?.paymentInfo.status==='succeeded'?'greenColor':'redColor'}>{order?.paymentInfo && order?.paymentInfo.status==='succeeded'?'PAID':'NOT PAID'}</span>
              </div>      
    
            </div>
        
            </div>
        </div>
      </div>
    )}
      
    </>
  )
}

export default OrderDetails
