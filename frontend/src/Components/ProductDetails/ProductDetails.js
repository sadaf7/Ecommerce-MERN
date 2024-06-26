import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import {useDispatch,useSelector} from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import { useParams } from "react-router-dom";
import ReviewCard from '../ReviewCard/ReviewCard'
import Loader from '../Layout/Loader/Loader'
import {useAlert} from 'react-alert'
import MetaData from '../Layout/MetaData'
import { addItemToCart } from '../../actions/cartAction'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material'

const ProductDetails = () => {

    const dispatch = useDispatch()
    const {loading,error,product} = useSelector(state=>state.productDetails)

    const {error: reviewError,success} = useSelector(state=>state.newReview)

    const params = useParams();
    const alert = useAlert();

    const [quantity,setQuantity] = useState(1);
    const [open,setOpen] = useState(false);
    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState('');


    const increaseQuantity=()=>{
      if(product?.stock<=quantity) return;
      const qty = quantity+1
      setQuantity(qty) 
    }
    const decreaseQuantity=()=>{
      if(1>=quantity) return
      const qty = quantity-1
      setQuantity(qty) 
    }
    const addToCartHandler = () => {
      dispatch(addItemToCart(params.id,quantity))
      alert.success('Item Added To Cart')
    }

    useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      if(reviewError){
        alert.error(reviewError)
        dispatch(clearErrors())
      }
      if(success){
        alert.success('Review Submitted')
      }
        dispatch(getProductDetails(params.id))
    },[dispatch,params.id,error,alert,reviewError,success])

    const options = {
      value: product?.ratings,
      size: 'large',
      readOnly: true,
      precision: 0.5
  }

  const submitReviewToggle = ()=>{
    open ? setOpen(false) : setOpen(true)
  }

  const reviewSubmitHandler = ()=>{
    
    let myForm = new FormData()
    myForm.set('rating',rating)
    myForm.set('comment',comment)
    myForm.set('productId',params.id)
    
    dispatch(newReview(myForm))

    setOpen(false) 
  }

  return (
    <Fragment>
      <MetaData title={`${product?.name} -- ECOMMERCE`}/>
      {loading ? (<Loader/>) : (
        <Fragment>
        <div className='productDetails'>
          <div className='carousel'>
              <Carousel sx={{width: '100%'}}>
                  {
                      product?.images && product?.images?.map((item,i)=>{
                          return(
                              <div key={item.url} className='carouselDiv'>
                                <img className='carouselImg' src={item.url} alt={`${i} Slide`}/>
                              </div>
                          )
                      })
                  }
              </Carousel>
          </div>
  
          <div className='details'>
            <div className='detailsBlock_1'>
                <h4>{product?.name}</h4>
                <p>Product #{product?._id}</p>
            </div>
  
            <div className='detailsBlock_2'>
              <Rating {...options}/> <span className='detailsBlock_2_span'>({product?.numOfReviews} reviews)</span>
            </div>
  
            <div className='detailsBlock_3'>
              <h3>${product?.price}</h3>
              <div className='detailsBlock_3_1'>
                  <div className='detailsBlock_3_1_1'>
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type='number'/>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button disabled={product?.stock<1?true:false} onClick={addToCartHandler} className='btn cartBtn'>Add To Cart</button>
              </div>x
              <p className='status'>
                Status:
                <b className={product?.stock < 1 ? 'redColor' : 'greenColor'}>
                  {product?.stock < 1 ? 'Out of Stock' : 'InStock'}
                </b>
              </p>
            </div>
  
            <div className='detailsBlock_4'>
                <span>Description:</span> <p>{product?.description}</p>
            </div>
  
            <button onClick={submitReviewToggle} className='submitReview btn'>Submit Review</button>
          </div>
        </div>
  
        <h3 className='header_review'>REVIEWS</h3>

        <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitReviewDialog'>
                <Rating onChange={(e)=>setRating(e.target.value)} value={rating} size='large'/>

                <textarea className='submitDialogTxtArea' value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
              <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
            </DialogActions>
        </Dialog>
  
        {product?.reviews && product?.reviews[0] ? (
          <div className='reviews'>
            {product.reviews && product?.reviews?.map((review)=>{
              return(
                <ReviewCard key={review._id} review={review}/>
              )
            })}
          </div>
        ):(
          <p className='no_reviews'>No Reviews Yet</p>
        )}
      </Fragment>
      )}
    </Fragment>
  )
}

export default ProductDetails
