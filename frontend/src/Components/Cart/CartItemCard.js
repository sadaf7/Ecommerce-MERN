import React from 'react'
import './CartItemCard.css'
import { Link } from 'react-router-dom'

const CartItemCard = ({ item,deleteCartItem }) => {
  return (
    <div className='cart_item_card'>
      <div className='cart_item_card_img_div'>
        <img src={item.image} alt='sdasdas'/>
      </div>
      <div className='cart_item_card_info_div'>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>Price: {item.price}</span>
        <p onClick={()=>deleteCartItem(item.product)}>Remove</p>
      </div>
    </div>
  )
}

export default CartItemCard
