import React from 'react'
import { useSelector } from 'react-redux'
import MetaData from '../Layout/MetaData'
import CheckoutStep from './CheckoutStep'
import { Link, useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {

    const {shippingInfo,cartItems} = useSelector(state=>state.cart)
    const {user} = useSelector(state=>state.user)

    const navigate = useNavigate()

    const subtotal = cartItems.reduce((acc,item)=>
        acc + item.price * item.quantity,0
    )
    const shippingCharge = subtotal > 1000 ? 0 : 100
    const tax = subtotal * 0.18
    const totalPrice = Number(subtotal + shippingCharge + tax);
    const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pincode},${shippingInfo.country}`

    const handleProceed=()=>{
        const data={
            subtotal,
            shippingCharge,
            tax,
            totalPrice
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(data))

        navigate('/payment')
    }

  return (
    <>
      <MetaData title={'Confirm Order'}/>
      <CheckoutStep activeStep={1}/>
      <div className='confirm_order_page'>
        <div>
            <div className='confirm_shipping_area'>
                <h2 className='info_h2'>Shipping Info</h2>
                <div className='confirm_shipping_area'>
                   <div>
                    <b>Name: </b>
                    <span>{user.name}</span>
                   </div>
                   <div>
                    <b>Phone: </b>
                    <span>{shippingInfo.phoneNo}</span>
                   </div>
                   <div>
                    <b>Address: </b>
                    <span>{address}</span>
                   </div>
                </div>
                <div className='cart_items'>
                    <h2>Your Cart Items: </h2>
                    <div className='cart_box'>
                        {cartItems && cartItems.map((item)=>{
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
                <b>Subtotal: </b>
                <span>${subtotal}</span>
              </div>  
              <div>
                <b>Shipping Charges: </b>
                <span>{shippingCharge}</span>
              </div>      
              <div>
                <b>Tax: </b>
                <span>${tax}</span>
              </div>      
            </div>
            <div className='order_summary_box_2'>
                 <b>Total: </b>  
                 <span>${totalPrice}</span>     
            </div>
            <button onClick={handleProceed} className='btn order_summary_btn'>Proceed to Payment</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmOrder
