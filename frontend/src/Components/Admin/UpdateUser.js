import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../Layout/MetaData';
import SideBar from './SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_ADMIN_RESET } from '../../constants/userConstant';
import { clearErrors, getUserDetails, updateUser } from '../../actions/userAction';
import Loader from '../Layout/Loader/Loader';

const UpdateUser = () => {

  const dispatch = useDispatch();
  const alert = useAlert()
  const navigate = useNavigate()

  const params = useParams()

  const {error:updateError,loading: updateLoading,isUpdated} = useSelector(state=>state.profile)

  const {error,user,loading} = useSelector(state=>state.userDetails)

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [role,setRole]=useState('')

  useEffect(()=>{

    if(user && user?._id !== params.id){
      dispatch(getUserDetails(params.id))
    } else{
      setName(user?.name)
      setEmail(user?.email)
      setRole(user?.role)
    }

    if(error){
    alert.error(error)
      clearErrors()
    }
    if(updateError){
    alert.error(updateError)
      clearErrors()
    }
    if(isUpdated){
      alert.success('User Updated Successfully')
      navigate('/admin/users')
      dispatch({type: UPDATE_USER_ADMIN_RESET})
    }
  },[error,alert,dispatch,isUpdated,navigate,params.id,updateError,user])

  const handleSubmit = (e)=>{
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(params.id,myForm))
  }

  return (
    <>
      <MetaData title={'Create Product'}/>
      <div className='dashboard'>
        <SideBar/>

      <div className='new_product_container'>
        {loading?(<Loader/>):(
          <>
            <form onSubmit={handleSubmit} className="mx-1 mx-md-4" encType='multipart/form-data'>
          <h1 className='new_product_heading'>Update User</h1>

          <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <div data-mdb-input-init className="form-outline flex-fill mb-0">
              <label className="form-label" for="form3Example1c">Name</label>
              <input required name='name' type="text" value={name} onChange={(e)=>setName(e.target.value)} id="form3Example1c" className="form-control" />
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <div data-mdb-input-init className="form-outline flex-fill mb-0">
              <label className="form-label" for="form3Example1c">Email</label>
              <input required name='email' type="text" value={email} onChange={(e)=>setEmail(e.target.value)} id="form3Example1c" className="form-control" />
            </div>
          </div>
          
          
        <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
          <div>
            <select value={role} onChange={(e)=>setRole(e.target.value)} >
              <option value={''}>Choose Roles</option>
              <option value={'admin'}>Admin</option>
              <option value={'user'}>User</option>
            </select>
          </div>
          </div>
           
          <div className=" mx-4 mb-3 mb-lg-4">
          <button disabled={updateLoading?true:false || role===''?true:false}  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Update</button>
          </div>
        </form>
          </>
        )}
      </div>
      </div>
    </>
  )
}

export default UpdateUser
