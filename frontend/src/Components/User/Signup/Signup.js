import React, { useEffect, useState } from 'react'
import './Signup.css'
import {useDispatch, useSelector} from 'react-redux'
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { clearErrors, register } from '../../../actions/userAction';
import dp from '../../../images/dpss.png'

const Signup = () => {

    const [user,setUser] = useState({
        name:"",
        email:"",
        password:""
    })
    const [avatar,setAvatar] = useState('')
    const [avatarPreview,setAvatarPreview] = useState(dp)
    

    const dispatch = useDispatch();
    const alert = useAlert()
    const navigate = useNavigate()

    const {error,isAuthenticated} = useSelector(state=>state.user)

    const {name,email,password} = user;

    const registerDataChange = (e)=>{

      if(e.target.name === 'avatar'){
        const reader = new FileReader()

        reader.onload=()=>{
          if(reader.readyState===2){
            setAvatarPreview(reader.result)
            setAvatar(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
      } else{
        setUser({...user,[e.target.name]:e.target.value})
      }
    }

    const handleRegister = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        dispatch(register(myForm))

        navigate('/')
        alert.success('Login Successful')
    }

    useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
    },[error,dispatch,isAuthenticated,alert,navigate])

  return (
    <div>
      <section className="vh-80" >
  <div className="container h-80">
    <div className="row d-flex justify-content-center align-items-center h-80">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black">
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form onSubmit={handleRegister} className="mx-1 mx-md-4" encType='multipart/form-data'>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <label className="form-label" for="form3Example1c">Your Name</label>
                      <input name='name' value={name} onChange={registerDataChange} type="text" id="form3Example1c" className="form-control" />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <label className="form-label" for="form3Example3c">Your Email</label>
                      <input value={email} name='email' onChange={registerDataChange} type="email" id="form3Example3c" className="form-control" />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <label className="form-label" for="form3Example4c">Password</label>
                      <input type="password" name='password' value={password} onChange={registerDataChange} id="form3Example4c" className="form-control" />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <label className="form-label" for="form3Example4c">Upload Picture</label>
                      <img className='avatarPreview' src={avatarPreview} alt='avatar'/>
                      <input type="file" name='avatar' accept='image/*' onChange={registerDataChange} id="fileInput" className="form-control" />
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Signup
