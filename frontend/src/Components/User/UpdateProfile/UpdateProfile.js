import React, { Fragment, useEffect, useState } from 'react'
import './UpdateProfile.css'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import dp from '../../../images/dpss.png'
import Loader from '../../Layout/Loader/Loader'
import { clearErrors, loadUser, updateProfile } from '../../../actions/userAction'
import { UPDATE_USER_RESET } from '../../../constants/userConstant'
import MetaData from '../../Layout/MetaData'

const UpdateProfile = () => {

  const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const {user} = useSelector(state=>state.user)
    const {loading,isUpdated,error} = useSelector(state=>state.profile)

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [avatar,setAvatar] = useState('')
    const [avatarPreview,setAvatarPreview] = useState(dp)

    const updateUserDataChange = (e)=>{

        const reader = new FileReader()

        reader.onload=()=>{
          if(reader.readyState===2){
            setAvatarPreview(reader.result)
            setAvatar(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
      
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);

        dispatch(updateProfile(myForm))
    }

    useEffect(()=>{

      if(user){
        setName(user.name)
        setEmail(user.email)
        setAvatar(user.avatar.url)
      }

      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      if(isUpdated){
        navigate('/account')
        dispatch(loadUser())
        alert.success('Profile Updated Successfully')
        dispatch({type: UPDATE_USER_RESET})
      }
    },[error,dispatch,isUpdated,alert,navigate,user])

  return (
    <Fragment>
      <MetaData title={'Update Profile'}/>
      {loading?(<Loader/>):(
        <div className='container'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
    
      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" for="form2Example1">Email address</label>
        <input type="name" value={name} onChange={((e)=>setName(e.target.value))} id="form2Example1" className="form-control" />
      </div>
      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" for="form2Example1">Email address</label>
        <input type="email" value={email} onChange={((e)=>setEmail(e.target.value))} id="form2Example1" className="form-control" />
      </div>
      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" for="form2Example1">Upload Picture</label>
        <img className='avatarPreview' src={avatarPreview} alt='avatar'/>
        <input type="file" name='avatar' accept='image/*' onChange={updateUserDataChange} id="fileInput" className="form-control" />
      </div>
    
    
      <button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Update</button>
    </form>    
        </div>
      )}
    </Fragment>
  )
}

export default UpdateProfile
