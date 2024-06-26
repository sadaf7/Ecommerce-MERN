import React, { useEffect, useState } from 'react'
import './NewProduct.css'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../Layout/MetaData';
import SideBar from './SideBar';
import { clearErrors, createProduct } from '../../actions/productAction';
import { NEW_PRODUCT_RESET } from '../../constants/productConstant';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {

  const dispatch = useDispatch();
  const alert = useAlert()
  const navigate = useNavigate()

  const {error,loading,success,product} = useSelector(state=>state.newProduct)

  const [name,setName]=useState('')
  const [description,setDescription]=useState('')
  const [price,setPrice]=useState('')
  const [stock,setStock]=useState('')
  const [category,setCategory]=useState('')
  const [images,setImages]=useState([])
  const [imagePreview,setImgPreview]=useState([])

  const categories = [
    'Machine',
    'car',
    'Jeans',
    'Sweater'
]

useEffect(()=>{
  if(error){
  alert.error(error)
    clearErrors()
  }
  if(success){
    alert.success('Product Created Successfully')
    navigate('/admin/dashboard')
    dispatch({type: NEW_PRODUCT_RESET})
  }
},[error,alert,dispatch,success,navigate])

  const handleSubmit = (e)=>{
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.set("category", category);

    images.forEach((images)=>{
      myForm.append('images',images)
    })
    dispatch(createProduct(myForm))
  }

  const productImageChange = (e)=>{
    const files = Array.from(e.target.files)
    setImages([])
    setImgPreview([])

    files.forEach((file)=>{
      const reader = new FileReader()

        reader.onload=()=>{
          if(reader.readyState===2){
            setImgPreview((old)=>[...old,reader.result])
            setImages((old)=>[...old,reader.result])
          }
        }
        reader.readAsDataURL(file)
    })
  }



  return (
    <>
      <MetaData title={'Create Product'}/>
      <div className='dashboard'>
        <SideBar/>

      <div className='new_product_container'>
        <form onSubmit={handleSubmit} className="mx-1 mx-md-4" encType='multipart/form-data'>
          <h1 className='new_product_heading'>Create Product</h1>

          <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <div data-mdb-input-init className="form-outline flex-fill mb-0">
              <label className="form-label" for="form3Example1c">Product Name</label>
              <input required name='name' type="text" value={name} onChange={(e)=>setName(e.target.value)} id="form3Example1c" className="form-control" />
            </div>
          </div>
          
          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
          <div data-mdb-input-init className="form-outline flex-fill mb-0">
            <label className="form-label" for="form3Example1c">Price</label>
            <input required name='price' type="number" value={price} onChange={(e)=>setPrice(e.target.value)} id="form3Example1c" className="form-control" />
          </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
          <div data-mdb-input-init className="form-outline flex-fill mb-0">
            <label className="form-label" for="form3Example1c">Product Description</label>
            <textarea required name='description' type="text" value={description} onChange={(e)=>setDescription(e.target.value)} id="form3Example1c" className="form-control" >
            </textarea>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
          <div>
            <select value={category} onChange={(e)=>setCategory(e.target.value)} >
              <option value={''}>Choose Category</option>
              {categories.map((cate)=>{
                return(
                  <option value={cate} key={cate}>{cate}</option>
                )
              })}
            </select>
          </div>
          </div>
          
          <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
          <div data-mdb-input-init className="form-outline flex-fill mb-0">
            <label className="form-label" for="form3Example1c">Stock</label>
            <input required name='stock' type="number" value={stock} onChange={(e)=>setStock(e.target.value)} id="form3Example1c" className="form-control" />
          </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
          <div data-mdb-input-init className="form-outline flex-fill mb-0">
            <label className="form-label" for="form3Example4c">Upload Picture</label>
            <input type="file" name='images' accept='image/*' multiple onChange={productImageChange} id="fileInput" className="form-control" />
          </div>
          </div>
            <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
          <div className='product_img_prev'>
             {imagePreview.map((img,index)=>{
              return(
                <img key={index} src={img} alt='Img Prev'/>
              )
             })}
          </div>
          </div>
          <div className=" mx-4 mb-3 mb-lg-4">
          <button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Create</button>
          </div>
        </form>
      </div>
      </div>
    </>
  )
}

export default NewProduct
