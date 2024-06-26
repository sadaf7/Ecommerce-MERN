import React, { Fragment, useEffect, useState } from 'react'
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../../Layout/Loader/Loader'
import { clearErrors, login } from '../../../actions/userAction'

const Login = () => {

    const [loginEmail,setLoginEmail]=useState('')
    const [loginPassword,setLoginPassword]=useState('')

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const location = useLocation()

    const {loading,error,isAuthenticated} = useSelector(state=>state.user)

    const handleLogin = (e)=>{
      e.preventDefault();
      dispatch(login(loginEmail,loginPassword))
      alert.success('Login Successful')
    }

    const redirection = location.search ? location.search.split('=')[1] : '/'


    useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      if(isAuthenticated){
        navigate(redirection)
      }
    },[error,dispatch,isAuthenticated,alert,navigate,redirection])

  return (
    <Fragment>
      {loading?(<Loader/>):(
        <div className='container'>
        <form onSubmit={handleLogin}>
    
      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" for="form2Example1">Email address</label>
        <input type="email" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} id="form2Example1" className="form-control" />
      </div>
    
      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label " for="form2Example2">Password</label>
        <input value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} type="password" id="form2Example2" className="form-control" />
      </div>
    
      <div className="row mb-4">
    
        <div className="col">
          <a href="#!">Forgot password?</a>
        </div>
      </div>
    
      <button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign in</button>
    
      <div className="text-center">
        <p>Not a member? <Link to={"/signup"}>Register</Link></p>
    
      </div>
    </form>    
        </div>
      )}
    </Fragment>
  )
}

export default Login
