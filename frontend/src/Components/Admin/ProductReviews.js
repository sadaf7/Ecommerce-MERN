import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import { clearErrors, deleteReview, getReviews } from '../../actions/productAction';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import SideBar from './SideBar';
import {useAlert} from 'react-alert'
import { DELETE_REVIEW_RESET } from '../../constants/productConstant';
import './ProductReview.css'

const ProductReviews = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const [productId,setProductId] = useState('')
  
  const {reviews,error,loading} = useSelector((state) => state.allReviews)
  const {error: deleteReviewError, isDeleted,} = useSelector((state) => state.deleteReviews)

  useEffect(()=>{

    if(productId.length===24){
        dispatch(getReviews(productId))
    }

    if(error){
    alert.error(error)
      clearErrors()
    }
    if(deleteReviewError){
    alert.error(deleteReviewError)
      clearErrors()
    }
    if(isDeleted){
      alert.success('Review Deleted Successfully')
      navigate('/admin/reviews')
      dispatch({type: DELETE_REVIEW_RESET})
    }
  },[error,productId,alert,dispatch,deleteReviewError,isDeleted,navigate])

   const handleDelete =(reviewId)=>{
    dispatch(deleteReview(reviewId,productId))
    
   }
   const handleSubmit =(e)=>{
    e.preventDefault()
    dispatch(getReviews(productId))
    
   }

   const columns = [
    { field: 'id', headerName: 'Review ID',flex: 0.5,minWith: 200},
    { field: 'name', headerName: 'Name',flex: 1,minWith: 350},
    {field: 'comment', headerName: 'Comment',flex: 0.3,minWith: 150},
    {field: 'rating', headerName: 'Rating',flex: 0.5,minWith: 270},
    {field: 'action', headerName: 'Actions',type: 'number',flex: 0.3,minWith: 150,sortable:false,
        renderCell: (params)=>{
            return(
              <>
                <Button onClick={()=>handleDelete(params.id)}><DeleteIcon/></Button>
              </>
            )
        }
    },
]
const rows = []

reviews && reviews?.forEach((item,index)=>{
    rows.push({
        comment: item.comment,
        id: item._id,
        rating: item.rating,
        name: item.name

    })
})

  return (
    <>
      <MetaData title={'All Reviews-Admin'}/>
      <div className='dashboard'>
        <SideBar/>

        <div className='product_list_container'>

        <form onSubmit={handleSubmit} className="mx-1 mx-md-4" encType='multipart/form-data'>
          <h1 className='new_product_heading'>All Reviews</h1>

          <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <div data-mdb-input-init className="form-outline flex-fill mb-0">
              <label className="form-label" for="form3Example1c">Product Name</label>
              <input required name='name' type="text" value={productId} onChange={(e)=>setProductId(e.target.value)} id="form3Example1c" className="form-control" />
            </div>
          </div>
            
          <div className=" mx-4 mb-3 mb-lg-4">
          <button disabled={loading?true:false || productId===''?true:false}  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Search</button>
          </div>
        </form>

        {reviews&&reviews?.length>0?(
            <>
                <DataGrid rows={rows} scrollable columns={columns} pageSize={10} className='product_list_table' disableSelectionOnClick/>
            </>
        ):(
            <h1 className='no_review'>NO REVIEWS FOUND</h1>
        )}

        </div>
      </div>
    </>
  )
}

export default ProductReviews
