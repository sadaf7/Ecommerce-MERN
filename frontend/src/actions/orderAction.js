import axios from "axios"
import { ALL_ORDER_FAIL, ALL_ORDER_REQ, ALL_ORDER_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQ, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQ, DELETE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQ, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQ, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQ, UPDATE_ORDER_SUCCESS } from "../constants/orderConstant"


export const createOrder=(order)=>async(dispatch)=>{
    try {
        dispatch({type: CREATE_ORDER_REQ})

        const config={
            headers:{
                "Content-Type":"Application/json"
            }
        }

        const {data} = await axios.post(`http://localhost:5000/api/v1/order/new`,order,config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.message
        })
    }
}

export const myOrders=()=>async(dispatch)=>{
    try {
        dispatch({type: MY_ORDER_REQ})

        const {data} = await axios.get(`http://localhost:5000/api/v1/order/myOrder`)

        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.message
        })
    }
}

export const orderDetails=(id)=>async(dispatch)=>{
    try {
        dispatch({type: ORDER_DETAILS_REQ})

        const {data} = await axios.get(`http://localhost:5000/api/v1/order/singleOrder/${id}`)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.message
        })
    }
}

export const updateOrder=(id,order)=>async(dispatch)=>{
    try {

        const config={
            headers:{
                "Content-Type":"Application/json"
            }
        }

        dispatch({type: UPDATE_ORDER_REQ})

        const {data} = await axios.put(`http://localhost:5000/api/v1/order/updateStatus/${id}`,order,config)

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.message
        })
    }
}
export const deleteOrder=(id)=>async(dispatch)=>{
    try {

        dispatch({type: DELETE_ORDER_REQ})

        const {data} = await axios.delete(`http://localhost:5000/api/v1/order/deleteorder/${id}`)

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.message
        })
    }
}

export const getAllOrders=()=>async(dispatch)=>{
    try {
        dispatch({type: ALL_ORDER_REQ})

        const {data} = await axios.get(`http://localhost:5000/api/v1/order/allorders`)

        dispatch({
            type: ALL_ORDER_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: error.message
        })
    }
}


// clearing errors
export const clearErrors = () => async(dispatch)=>{
    dispatch({type: CLEAR_ERRORS})
}