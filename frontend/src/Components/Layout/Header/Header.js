import React, { useState } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';


const Header = () => {

    const {isAuthenticated,user} = useSelector(state=>state.user)
    const {cartItems} = useSelector(state => state.cart)

    const [keyWord,setKeyWord] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        if(keyWord){
            navigate(`/ducts/${keyWord}`)
        }
         else{
            navigate(`/products`)
        }
    }
    // const searchSubmitHandler=(e)=>{
    //     e.preventDefault();
    //     if(keyWord.trim()){
    //         navigate(`/product/${keyWord}`)
    //     } else{
    //         navigate(`/products`)
    //     }
    // }

    function logoutUser(){
        dispatch(logout())
        alert.success('Logged Out Successfully')
    }

  return (
    <div>
      <div className="main-navbar shadow-sm sticky-top">
        <div className="top-navbar">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
                        <h5 className="brand-name">Ecom</h5>
                    </div>

                    <div className="col-md-5 my-auto">
                        <form role="search" onSubmit={searchSubmitHandler}>
                            <div className="input-group">
                                <input type="search" onChange={(e)=>setKeyWord(e.target.value)} placeholder="Search your product" className="form-control" />
                                <button className="btn bg-dark" type="submit">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-5 my-auto">
                        <ul className="nav justify-content-end">
                            
                            <li className="nav-item">
                                <Link className="nav-link" to={"/cart"}>
                                    <i className="fa fa-shopping-cart"></i> Cart ({cartItems.length})
                                </Link>
                            </li>
                            
                            
                            {isAuthenticated?(
                                <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-user"></i> {user.name} 
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to={"/account"}><i className="fa fa-user"></i> Profile</Link></li>

                                <li><Link className="dropdown-item" to={"/order/me"}><i className="fa fa-list"></i> My Orders</Link></li>
                                
                                <li><Link className="dropdown-item" to={'/cart'}><i className="fa fa-shopping-cart"></i> My Cart</Link></li>
                                <li><Link onClick={logoutUser} className="dropdown-item"><i className="fa fa-sign-out"></i> Logout</Link></li>

                                {user.role==='admin' && <li><Link className="dropdown-item" to={"/admin/dashboard"}><i className="fa fa-sign-out"></i> Dashboard</Link></li>}

                                </ul>
                            </li>
                            ):(
                            <li className="nav-item">
                                <Link className="nav-link" to={'/login'}>
                                    <i className="fa fa-heart"></i> Login
                                </Link>
                            </li>
                            )}
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand d-block d-sm-block d-md-none d-lg-none" to={"/"}>
                  Ecom
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"/products"}>All Categories</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>

    </div>
  )
}

export default Header
