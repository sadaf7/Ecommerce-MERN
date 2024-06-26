import React, { useState } from 'react'
import './Shipping.css'
import {Country, State} from 'country-state-city'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../Layout/MetaData'
import CheckoutStep from './CheckoutStep'
import {saveShippingInfo} from '../../actions/cartAction'
import {useNavigate} from 'react-router-dom'


const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {shippingInfo} = useSelector(state=>state.cart)

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const handleSubmit=(e)=>{
      e.preventDefault();

      dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}))
      navigate('/order/confirm')
    }

  return (
    <>
    <MetaData title={"Shipping Details"}/>
    <CheckoutStep activeStep={0}/>
      <div className='shipping_container'>
        <div className='shipping_box'>
            <div className='container'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
    
      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label" for="form2Example1">Address</label>
        <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control" />
      </div>
    
      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label " for="form2Example2">City</label>
        <input value={city} onChange={(e)=>setCity(e.target.value)} type="text" id="form2Example2" className="form-control" />
      </div>

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label " for="form2Example2">Phone</label>
        <input value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} type="text" id="form2Example2" className="form-control" />
      </div>

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label " for="form2Example2">Country</label>
        <div>
        <select required value={country} onChange={(e)=>setCountry(e.target.value)}>
            <option value={''}>Select</option>
            {Country && Country.getAllCountries().map((item)=>{
                return(
                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                )
            })}
        </select>
        </div>
      </div>

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label " for="form2Example2">State</label>
        {country && (
            <div>
                <select required value={state} onChange={(e)=>setState(e.target.value)}>
                    <option value={''}>Select</option>
                    {State && State.getStatesOfCountry(country).map((item)=>{
                        return(
                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                        )
                    })}
                </select>
            </div>    
        )}
      </div>

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label " for="form2Example2">Zip-Code</label>
        <input value={pinCode} onChange={(e)=>setPinCode(e.target.value)} type="text" id="form2Example2" className="form-control" />
      </div>
    
    
      <button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Continue</button>
    
    </form>    
        </div>
        </div>
      </div> 
    </>
  )
}

export default Shipping
