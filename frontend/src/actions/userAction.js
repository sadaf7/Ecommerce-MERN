import axios from 'axios'
import { ALL_USER_FAIL, ALL_USER_REQ, ALL_USER_SUCCESS, CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQ, DELETE_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQ, LOAD_USER_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQ, UPDATE_PASSWORD_SUCCESS, UPDATE_USER_ADMIN_FAIL, UPDATE_USER_ADMIN_REQ, UPDATE_USER_ADMIN_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQ, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQ, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQ, USER_LOGIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQ, USER_SIGNUP_SUCCESS } from '../constants/userConstant'


// Set withCredentials to true for all requests
axios.defaults.withCredentials = true;

export const login=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type: USER_LOGIN_REQ})
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.post('http://localhost:5000/api/v1/user/login',{email,password},config)

        dispatch({type: USER_LOGIN_SUCCESS,payload: data.user})



    } catch (error) {
        dispatch({type: USER_LOGIN_FAIL, payload: error.message})
    }
}

export const register=(userData)=>async(dispatch)=>{
    try {
        dispatch({type: USER_SIGNUP_REQ})
        const config={
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        const {data}=await axios.post('http://localhost:5000/api/v1/user/register',userData,config)

        dispatch({type: USER_SIGNUP_SUCCESS,payload: data.user})



    } catch (error) {
        dispatch({type: USER_SIGNUP_FAIL, payload: error.message})
    }
}

export const updateProfile=(userData)=>async(dispatch)=>{
    try {
        dispatch({type: UPDATE_USER_REQ})
        const config={
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        const {data}=await axios.put('http://localhost:5000/api/v1/user/me/update',userData,config)

        dispatch({type: UPDATE_USER_SUCCESS,payload: data.success})



    } catch (error) {
        dispatch({type: UPDATE_USER_FAIL, payload: error.message})
    }
}

export const updatePassword=(passwords)=>async(dispatch)=>{
    try {
        dispatch({type: UPDATE_PASSWORD_REQ})
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.put('http://localhost:5000/api/v1/user/password/update',passwords,config)

        dispatch({type: UPDATE_PASSWORD_SUCCESS,payload: data.success})



    } catch (error) {
        dispatch({type: UPDATE_PASSWORD_FAIL, payload: error.message})
    }
}

export const loadUser=()=>async(dispatch)=>{
    try {
        dispatch({type: LOAD_USER_REQ})
        
        const {data}=await axios.get('http://localhost:5000/api/v1/user/me')

        dispatch({type: LOAD_USER_SUCCESS,payload: data.user})



    } catch (error) {
        dispatch({type: LOAD_USER_FAIL, payload: error.message})
    }
}

export const logout=()=>async(dispatch)=>{
    try {
        
        
        await axios.get('http://localhost:5000/api/v1/user/logout')

        dispatch({type: LOGOUT_SUCCESS})



    } catch (error) {
        dispatch({type: LOGOUT_FAIL, payload: error.message})
    }
}

// all users -- admin
export const getAllUsers=()=>async(dispatch)=>{
    try {
        dispatch({type: ALL_USER_REQ})
        
        const {data}=await axios.get('http://localhost:5000/api/v1/user/alluser')

        dispatch({type: ALL_USER_SUCCESS,payload: data.users})



    } catch (error) {
        dispatch({type: ALL_USER_FAIL, payload: error.message})
    }
}

// get users details -- admin
export const getUserDetails=(id)=>async(dispatch)=>{
    try {
        dispatch({type: USER_DETAILS_REQ})
        
        const {data}=await axios.get(`http://localhost:5000/api/v1/user/user/${id}`)

        dispatch({type: USER_DETAILS_SUCCESS,payload: data.user})

    } catch (error) {
        dispatch({type: USER_DETAILS_FAIL, payload: error.message})
    }
}

// delete user -- admin
export const deleteUser=(id)=>async(dispatch)=>{
    try {
        dispatch({type: DELETE_USER_REQ})
        
        const {data}=await axios.delete(`http://localhost:5000/api/v1/user/user/${id}`)

        dispatch({type: DELETE_USER_SUCCESS,payload: data})

    } catch (error) {
        dispatch({type: DELETE_USER_FAIL, payload: error.message})
    }
}

// update user -- admin
export const updateUser=(id,userData)=>async(dispatch)=>{
    try {
        dispatch({type: UPDATE_USER_ADMIN_REQ})
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.put(`http://localhost:5000/api/v1/user/user/${id}`,userData,config)

        dispatch({type: UPDATE_USER_ADMIN_SUCCESS,payload: data.success})



    } catch (error) {
        dispatch({type: UPDATE_USER_ADMIN_FAIL, payload: error.message})
    }
}


// clearing errors
export const clearErrors = () => async(dispatch)=>{
    dispatch({type: CLEAR_ERRORS})
}