import React, { Fragment } from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard'
import {useDispatch, useSelector} from 'react-redux'
import { addItemToCart, removeCartItem } from '../../actions/cartAction'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {cartItems} = useSelector(state => state.cart)

    const increaseQty=(id,quantity,stock)=>{
        const newQty = quantity+1;
        if(stock<=quantity){
            return
        }
        dispatch(addItemToCart(id,newQty))
    }
    const decreaseQty=(id,quantity)=>{
        const newQty = quantity-1;
        if(1>=quantity){
            return
        }
        dispatch(addItemToCart(id,newQty))
    }

    const deleteCartItem=(id)=>{
    dispatch(removeCartItem(id))
    }

    const checkoutHandler=()=>{
        navigate('/login?redirect=shipping')
    }

  return (
    <Fragment>
        {cartItems.length===0 ? <div className='no_items'><h1>No Items Added to Cart</h1></div>: 
        <>
        <div className='cart_page'>
          <div className='cart_header'>
              <p>Product</p>
              <p>Quantity</p>
              <p>SubTotal</p>
          </div>
          {
              cartItems && cartItems?.map((item)=>{
                  return(
                  <div className='cart_container' key={item.product}>
                      <CartItemCard item={item} deleteCartItem={deleteCartItem}/>
                      <div className='cart_input'>
                          <button onClick={()=>decreaseQty(item.product,item.quantity)}>-</button>
                          <input type="number" readOnly value={item.quantity} />
                          <button onClick={()=>increaseQty(item.product,item.quantity,item.stock)}>+</button>
                      </div>
                      <p className='cart_subtotal'>${item.price*item.quantity}</p>
                  </div>
                  )
              })
          }
          <div className='cart_gross_total'>
              <div>
  
              </div>
              <div className='cart_gross_box'>
                  <p className='cart_gross_p'>Gross Total</p>
                  <p>${cartItems.reduce(
                    (acc,item)=>acc+item.price*item.quantity,0
                  )}</p>
              </div>
              <div>
  
              </div>
              <div className='checkout_btn_div'>
                  <button onClick={checkoutHandler} className='btn checkout_btn'>Check Out</button>
              </div>
          </div>
        </div>
      </>}
    </Fragment>
  )
}

export default Cart
