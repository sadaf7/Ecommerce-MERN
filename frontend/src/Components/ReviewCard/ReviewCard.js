import React from 'react'
import profilePng from '../../images/dp.jpeg'
import './ReviewCard.css'
import { Rating } from '@mui/material';

const ReviewCard = ({review}) => {

    const options = {
      value: review.rating,
      size: 'large',
      readOnly: true,
      precision: 0.5
  }

  return (
    <div className='review_card'>
       <div className='img_div'>
        <img src={profilePng} alt="User" />
       </div> 
        <p>{review.name}</p>
        <Rating {...options} />
        <span className='review_comment'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
