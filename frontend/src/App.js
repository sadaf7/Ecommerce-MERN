
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Layout/Header/Header';
import Home from './Components/Home/Home';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import ProductPage from './Components/ProductPage/ProductPage';
import Search from './Components/Search/Search';
import { useEffect, useState } from 'react';
import Login from './Components/User/Login/Login';
import Signup from './Components/User/Signup/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';
import Profile from './Components/User/Profile/Profile';
import UpdateProfile from './Components/User/UpdateProfile/UpdateProfile';
import UpdatePassword from './Components/User/UpdatePassword/UpdatePassword';
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Shipping/Shipping';
import ConfirmOrder from './Components/Shipping/ConfirmOrder';
import axios from 'axios';
import Payment from './Components/Shipping/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import OrderSuccess from './Components/Shipping/OrderSuccess/OrderSuccess';
import MyOrder from './Components/Order/MyOrder';
import OrderDetails from './Components/Order/OrderDetails';
import Dashboard from './Components/Admin/Dashboard';
import ProductList from './Components/Admin/ProductList';
import NewProduct from './Components/Admin/NewProduct';
import UpdateProduct from './Components/Admin/UpdateProduct';
import OrderList from './Components/Admin/OrderList';
import UpdateOrder from './Components/Admin/UpdateOrder';
import Users from './Components/Admin/Users';
import UpdateUser from './Components/Admin/UpdateUser';
import ProductReviews from './Components/Admin/ProductReviews';

function App() {

  const dispatch = useDispatch();
  const [stripeApiKey,setStripeApiKey] = useState()
  

  const {isAuthenticated,user} = useSelector((state)=>state.user);

  async function getStripeApiKey(){
    const {data} = await axios.get('http://localhost:5000/api/v1/stripeApi');
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    dispatch(loadUser())
      getStripeApiKey() 
    
  },[dispatch])

  const Protected=({children,isAdmin=false,auth=false})=>{

    if(isAuthenticated===false && auth){
      return <Navigate to={'/login'}/>
    }
    if(isAdmin===true && user?.role !== 'admin'){
      return <Navigate to={'/login'}/>
    }
    else if(isAuthenticated && ['/login'].includes(window.location.pathname)){
      return <Navigate to={'/account'}/>
    }
    return children
  }

  return (
    <div>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/product/:id' element={<ProductDetails/>}/>
        <Route exact path='/products' element={<ProductPage/>}/>
        <Route path='/ducts/:keyWord' element={<ProductPage/>}/>
        <Route exact path='/search' element={<Search/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        
        {/* <Route exact path='/order/me' element={<MyOrder/>}/> */}

        <Route exact path='/account' element={
          <Protected auth={true}>
            <Profile />
          </Protected>
        }/>
      
         <Route exact path='/payment' element={
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Payment/>
          </Elements>
         }/>

        <Route exact path='/success' element={
          <Protected >
            <OrderSuccess />
          </Protected>
        }/>

        <Route exact path='/me/update' element={
          <Protected >
            <UpdateProfile />
          </Protected>
        }/>

        <Route exact path='/password/update' element={
          <Protected >
            <UpdatePassword />
          </Protected>
        }/>

        <Route exact path='/login/shipping' element={
          <Protected >
            <Shipping />
          </Protected>
        }/>

        <Route exact path='/order/me' element={
          <Protected >
            <MyOrder />
          </Protected>
        }/>

        <Route exact path='/order/:id' element={
          <Protected >
            <OrderDetails />
          </Protected>
        }/>

      <Route exact path='/order/confirm' element={<ConfirmOrder/>}/>
      
        <Route exact path='/admin/dashboard' element={
          <Protected isAdmin={true}>
            <Dashboard />
          </Protected>
        }/>

        <Route exact path='/admin/products' element={
          <Protected isAdmin={true}>
            <ProductList />
          </Protected>
        }/>

        <Route exact path='/admin/product' element={
          <Protected isAdmin={true}>
            <NewProduct />
          </Protected>
        }/>
        <Route exact path='/admin/product/:id' element={
          <Protected isAdmin={true}>
            <UpdateProduct />
          </Protected>
        }/>
        <Route exact path='/admin/orders' element={
          <Protected isAdmin={true}>
            <OrderList />
          </Protected>
        }/>
        <Route exact path='/admin/order/:id' element={
          <Protected isAdmin={true}>
            <UpdateOrder />
          </Protected>
        }/>
        <Route exact path='/admin/users' element={
          <Protected isAdmin={true}>
            <Users />
          </Protected>
        }/>
        <Route exact path='/admin/user/:id' element={
          <Protected isAdmin={true}>
            <UpdateUser />
          </Protected>
        }/>
        <Route exact path='/admin/reviews' element={
          <Protected isAdmin={true}>
            <ProductReviews />
          </Protected>
        }/>

      </Routes>
    </div>
  );
}

export default App;
