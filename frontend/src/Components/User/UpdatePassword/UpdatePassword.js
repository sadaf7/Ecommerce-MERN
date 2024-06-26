import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, updatePassword } from '../../../actions/userAction'
import { UPDATE_PASSWORD_RESET } from '../../../constants/userConstant'
import MetaData from '../../Layout/MetaData'
import Loader from '../../Layout/Loader/Loader'

const UpdatePassword = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const {loading,isUpdated,error} = useSelector(state=>state.profile)

    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm))
    }

    useEffect(()=>{

      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      if(isUpdated){
        navigate('/account')
        alert.success('Password Updated Successfully')
        dispatch({type: UPDATE_PASSWORD_RESET})
      }
    },[error,dispatch,isUpdated,alert,navigate])

  return (
    <Fragment>
      <MetaData title={'Change Password'}/>
      {loading?(<Loader/>):(
        <div className='container'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
    
      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" for="form2Example1">Old Password</label>
        <input type="password" value={oldPassword} name='oldPassword' onChange={((e)=>setOldPassword(e.target.value))} id="form2Example1" className="form-control" />
      </div>
      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" for="form2Example1">New Password</label>
        <input type="password" value={newPassword} name='newPassword' onChange={((e)=>setNewPassword(e.target.value))} id="form2Example1" className="form-control" />
      </div>
      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" for="form2Example1">Confirm New Password</label>
        <input type="password" name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} id="fileInput" className="form-control" />
      </div>
    
    
      <button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Update</button>
    </form>    
        </div>
      )}
    </Fragment>
  )
}

export default UpdatePassword
