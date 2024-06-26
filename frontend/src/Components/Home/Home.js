import React, { Fragment, useEffect } from 'react'
import {CgMouse} from 'react-icons/cg'
import './Home.css'
import Product from '../Product/Product'
import MetaData from '../Layout/MetaData'
import { clearErrors, getProducts } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Layout/Loader/Loader'
import { useAlert } from 'react-alert'


const Home = () => {

  const alert = useAlert()

  const dispatch = useDispatch();
  const {loading,error,products} = useSelector((state)=>state.products)

  useEffect(() => {

    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }

    dispatch(getProducts());
  }, [dispatch,error,alert]);

  return (
    <Fragment>
      {loading ? <Loader/> : <>
    <MetaData title={'ECOMMERCE'}/>
      <div className='banners'>
        <h1>Welcome to ECOMMERCE</h1>
        <h3>Find Amazing Products Here</h3>

        <a href='#container' className='home_container'>
            <button >
                Scroll <CgMouse/>
            </button>
        </a>
      </div>
      <h2 className='homeHeading'>Featured Products</h2>

      <div className='home_container' id='container'>
        {
          products && products?.map((product)=>{
            return(
              <Product product={product} key={product._id}/>
            )
          })
        }
      </div>
    </>}
    </Fragment>
  )
}

export default Home
