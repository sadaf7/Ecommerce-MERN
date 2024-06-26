import React, { useEffect, useRef } from 'react'
import './Payment.css'
import {CardCvcElement,CardNumberElement,CardExpiryElement,useElements,useStripe} from '@stripe/react-stripe-js'
import MetaData from '../Layout/MetaData'
import CheckoutStep from './CheckoutStep'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { clearErrors, createOrder } from '../../actions/orderAction'

const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const payBtn = useRef(null)
    const dispatch = useDispatch();
    const alert = useAlert();
    const elements = useElements()
    const stripe = useStripe();
    const navigate = useNavigate()

    const {shippingInfo,cartItems} = useSelector(state=>state.cart)
    const {user} = useSelector(state=>state.user)
    const {error} = useSelector(state=>state.newOrder)

    const paymentData={
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const order={
        shippingInfo,
        orderItems:cartItems,
        itemsPrice:orderInfo.subtotal,
        taxPrice:orderInfo.tax,
        shippingPrice: orderInfo.shippingCharge,
        totalPrice: orderInfo.totalPrice,
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        payBtn.current.disabled=true;
        
        try {
            const config={
                headers: {
                    'Content-Type': 'application/json'
                    
                },
            }
            let {data} = await axios.post('http://localhost:5000/api/v1/payment/process',paymentData,config)
            const client_secret = data.client_secret;

            if(!elements || !stripe) return

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pincode,
                            country : shippingInfo.country
                        }
                    },
                }
            })
            if(result.error){
                payBtn.current.disabled=false;
                alert.error(result.error.message)

            } else if(result.paymentIntent.status==='succeeded'){
                navigate('/success')

                order.paymentInfo = {
                    id: result.paymentIntent.id,
                    status: result.paymentIntent.status
                }
                dispatch(createOrder(order))
                localStorage.removeItem('cartItems')
                alert.success('Payment Successful')
            } else{
                // payBtn.current.disabled=false;
                alert.error(result.error)
            }
            
        } catch (error) {
            payBtn.current.disabled=false;
            alert.error(error.message)
        }
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

    },[error,alert,dispatch])

  return (
    <>
    <MetaData title={'Payment Process'}/>
    <CheckoutStep activeStep={2}/>
    <div className="paymentContainer">
        <form className='payment_form' onSubmit={(e)=>handleSubmit(e)}>
            <h4>Card Info</h4>
            <div className='payment_form_box'>
                <div className='payment_input_div'>
                    <CardNumberElement className='payment_input' />
                </div>
                <div className='payment_input_div'>
                    <CardCvcElement className='payment_input' />
                </div>
                <div className='payment_input_div'>
                    <CardExpiryElement className='payment_input' />
                </div>
            </div>

            <button ref={payBtn} value={`Pay $${orderInfo&&orderInfo.totalPrice}`} type='submit' className='btn'> {`Pay $${orderInfo&&orderInfo.totalPrice}`}  </button>
        </form>
    </div>
      
    </>
  )
}

export default Payment
