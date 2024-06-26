import React, { useEffect } from 'react'
import './Profile.css'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../Layout/Loader/Loader'
import MetaData from '../../Layout/MetaData'

const Profile = () => {

    const {isAuthenticated,user,loading} = useSelector((state)=>state.user);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/login')
        }
    },[isAuthenticated,navigate])

  return (
    <>
        {loading?(<Loader/>):(
     <>
        <MetaData title={`${user.name}'s Profile`}/>
        <div className='profile_container'>
            <div className='myProfile'>
                <h1>My Profile</h1>
                <div className='profile_img_div'>
                    <img src={user?.avatar?.url} alt={user.name}/>
                </div>
                <Link className='profile_btn' to={'/me/update'}>Edit Profile</Link>
            </div>
            <div className='profile_info'>
                <div>
                    <h4>Full Name</h4>
                    <p>{user?.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user?.email}</p>
                </div>
                <div>
                    <h4>Joined On</h4>
                    <p>{String(user?.createdAt).substr(0,10)}</p>
                </div>
                <div className='extra_btn_div'>
                    <Link to={'/orders'}>My Orders</Link>
                    <Link to={'/password/update'}>Change Password</Link>
                </div>

            </div>
        </div>
     </>
        )}
    </>
  )
}

export default Profile
