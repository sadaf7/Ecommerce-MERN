import React from 'react'
import './Product.css'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';


const Product = ({product}) => {

  const options = {
    edit: false,
    color: 'gray',
    activeColor: 'tomato',
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
}
// src={product.images[0].url}

  return (
    <Link className='product_card' to={`/product/${product._id}`}> 
      <div className='img_div'>
        <img src={product?.images[0]?.url} alt={product?.name}/>
      </div>
      <p>{product?.name}</p>
      <div className='rating'>
        <ReactStars {...options}/> <span>({product?.numOfReviews} reviews)</span>
      </div>
      <span className='price'>{`$${product?.price}`}</span>
    </Link>
  )
}

export default Product
