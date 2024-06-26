import axios from 'axios'
import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_REVIEW_FAIL, ALL_REVIEW_REQ, ALL_REVIEW_SUCCESS, CLEAR_ERRORS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQ, DELETE_REVIEW_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQ, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQ, NEW_REVIEW_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from '../constants/productConstant'


export const getProducts = (keyWord='',currentPage=1,price=[0,25000000],category,rating=0) => async(dispatch)=>{
    try {
        dispatch({type: ALL_PRODUCT_REQUEST})

        let link = `http://localhost:5000/api/v1/products?keyword=${keyWord}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`

        if(category){
            link = `http://localhost:5000/api/v1/products?keyword=${keyWord}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
        }

        const {data} = await axios.get(link);
        console.log(data)

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.message
        })
    }
}

export const getAdminProducts=()=>async(dispatch)=>{
    try {
        dispatch({type: ADMIN_PRODUCT_REQUEST})

        const {data} = await axios.get(`http://localhost:5000/api/v1/adminproducts`)

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.message
        })
    }
}
export const getProductDetails=(id)=>async(dispatch)=>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`http://localhost:5000/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message
        })
    }
}

export const getReviews=(id)=>async(dispatch)=>{
    try {
        dispatch({type: ALL_REVIEW_REQ})

        const {data} = await axios.get(`http://localhost:5000/api/v1/getReviews?id=${id}`)

        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews
        })
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.message
        })
    }
}

export const deleteReview=(reviewId,productId)=>async(dispatch)=>{
    try {
        dispatch({type: DELETE_REVIEW_REQ})

        const {data} = await axios.delete(`http://localhost:5000/api/v1/deleteReview?id=${reviewId}&productId=${productId}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.message
        })
    }
}

export const deleteProduct=(id)=>async(dispatch)=>{
    try {
        dispatch({type: PRODUCT_DELETE_REQUEST})

        const {data} = await axios.delete(`http://localhost:5000/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.message
        })
    }
}

export const createProduct=(productData)=>async(dispatch)=>{
    try {
        dispatch({type: NEW_PRODUCT_REQ})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const {data} = await axios.post(`http://localhost:5000/api/v1/product/new`,productData,config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.message
        })
    }
}
export const updateProductAction=(id,productData)=>async(dispatch)=>{
    try {
        dispatch({type: PRODUCT_UPDATE_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const {data} = await axios.put(`http://localhost:5000/api/v1/product/${id}`,productData,config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.message
        })
    }
}

export const newReview=(reviewData)=>async(dispatch)=>{
    try {
        dispatch({type: NEW_REVIEW_REQ})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const {data} = await axios.put(`http://localhost:5000/api/v1/review`,reviewData,config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.message
        })
    }
}

// clearing errors
export const clearErrors = () => async(dispatch)=>{
    dispatch({type: CLEAR_ERRORS})
}