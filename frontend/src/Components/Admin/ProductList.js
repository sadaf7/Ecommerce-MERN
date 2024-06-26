import React, { useEffect } from 'react'
import './ProductList.css'
import {useDispatch, useSelector} from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import SideBar from './SideBar';
import {useAlert} from 'react-alert'
import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction';
import { PRODUCT_DELETE_RESET } from '../../constants/productConstant';

const ProductList = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  
  const {products,error,loading} = useSelector((state) => state.products)
  const {error: deleteProdError, isDeleted,} = useSelector((state) => state.deleteProd)

  useEffect(()=>{
    if(error){
    alert.error(error)
      clearErrors()
    }
    if(deleteProdError){
    alert.error(deleteProdError)
      clearErrors()
    }
    if(isDeleted){
      alert.success('Product Deleted Successfully')
      navigate('/admin/dashboard')
      dispatch({type: PRODUCT_DELETE_RESET})
    }
    dispatch(getAdminProducts())
  },[error,alert,dispatch,deleteProdError,isDeleted,navigate])

   const handleDelete =(id)=>{
    dispatch(deleteProduct(id))
    
   }

  const columns = [
    { field: 'id', headerName: 'Product ID',flex: 0.5,minWith: 200},
    { field: 'name', headerName: 'Name',flex: 1,minWith: 350},
    {field: 'stock', headerName: 'Stock',type: 'number',flex: 0.3,minWith: 150},
    {field: 'price', headerName: 'Price',type: 'number',flex: 0.5,minWith: 270},
    {field: 'action', headerName: 'Actions',type: 'number',flex: 0.3,minWith: 150,sortable:false,
        renderCell: (params)=>{
            return(
              <>
                <Link to={`/admin/product/${params.id}`}>
                    <EditIcon/>
                </Link>
                <Button onClick={()=>handleDelete(params.id)}><DeleteIcon/></Button>
              </>
            )
        }
    },
]

const rows = []

products && products?.forEach((item,index)=>{
    rows.push({
        stock: item.stock,
        id: item._id,
        price: item.price,
        name: item.name

    })
})
  return (
    <>
      <MetaData title={'All Products-Admin'}/>
      <div className='dashboard'>
        <SideBar/>

        <div className='product_list_container'>
          <h1 className='product_list_header'>All Products</h1>

          <DataGrid rows={rows} scrollable columns={columns} pageSize={10} className='product_list_table' disableSelectionOnClick/>
        </div>
      </div>
    </>
  )
}

export default ProductList
