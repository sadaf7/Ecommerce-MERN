import React, { Fragment, useEffect, useState } from 'react'
import './ProductPage.css'
import Loader from '../Layout/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProducts } from '../../actions/productAction'
import Product from '../Product/Product'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { Slider,Typography } from '@mui/material';
import {useAlert} from 'react-alert'
import MetaData from '../Layout/MetaData'




const ProductPage = () => {

    const [currentPage,setCurrentPage] = useState(1);
    const [price,setPrice] = useState([0,25000000]);
    const [category,setCategory] = useState('');
    const [rating,setRating] = useState(0);

    const dispatch = useDispatch();
    const params = useParams();
    const alert = useAlert();

    const categories = [
        'Machine',
        'car',
        'Jeans',
        'Sweater'
    ]


    const {loading,error,products,productCount,resultPerPage,filteredProductsCount} = useSelector((state)=>state.products)

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors)
        }
        dispatch(getProducts(params.keyWord,currentPage,price,category,rating))
    },[dispatch,params,currentPage,price,category,rating,error,alert])

    const setCurrentPageNo=(e)=>{

        setCurrentPage(e)
        
    }

    const priceHandler = (event,newPrice) =>{
        setPrice(newPrice)
    }

    let count = filteredProductsCount;

  return (
    <>
     {loading ? (<Loader/>):(
        <Fragment>
            <MetaData title='ECOMMERCE-PRODUCTS'/>
            <h2 className='product_header'>All Products</h2>

            <div className='product_container'>

            <div className='filter_box'>
                <Typography className='typography'>Price</Typography>
                <Slider 
                  value={price}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  onChange={priceHandler}
                  min={0}
                  max={25000000}
                  size='small'
                />  
                <hr></hr>

                <Typography className='typography'>Categories</Typography> 
                <ul className='categories_box'>
                    {categories?.map((categories)=>{
                        return(
                            <li className='category_link' key={categories} onClick={()=>setCategory(categories)}>
                                {categories}
                            </li>
                        )
                    })}
                </ul>
                <hr></hr>
                <fieldset className='legend'>
                    <Typography className='typography'>Rating Above</Typography>
                    <Slider 
                      value={rating}
                      min={0}
                      max={5}
                      aria-labelledby='continuous-slider'
                      onChange={(e,newRating)=>setRating(newRating)}
                      valueLabelDisplay='auto'
                    />
                </fieldset>
            </div>

                <div className='product_box'>
                {products && products.map((product)=>{
                    return(
                        <Product key={product._id} product={product}/>
                    )
                })}
                </div>

            </div>

            {resultPerPage<count && 
            <div className='pagination_box'>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={(e)=>setCurrentPageNo(e)}
                nextPageText='Next'
                prevPageText='Prev'
                firstPageText='1st'
                lastPageText='Last'
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
                pageRangeDisplayed={5}
            />
        </div>}
        </Fragment>
     )} 
    </>
  )
}

export default ProductPage
