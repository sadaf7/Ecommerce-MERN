import React from 'react'
import './OrderSuccess.css'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className='order_success'>
      <h2>Your Order Has Beem Placed</h2>
      <Link to={'/order/me'} className='btn'>View Order</Link>
    </div>
  )
}

export default OrderSuccess
