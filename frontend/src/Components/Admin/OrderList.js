import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import SideBar from './SideBar';
import {useAlert} from 'react-alert'
import { clearErrors, deleteOrder, getAllOrders } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';

const OrderList = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  
  const {orders,error} = useSelector((state) => state.allOrders)
  const {isDeleted, error:deleteError} = useSelector((state) => state.order)

  useEffect(()=>{
    if(error){
    alert.error(error)
      clearErrors()
    }
    if(deleteError){
    alert.error(deleteError)
      clearErrors()
    }
    if(isDeleted){
      alert.success('Order Deleted Successfully')
      navigate('/admin/orders')
      dispatch({type: DELETE_ORDER_RESET})
    }
    dispatch(getAllOrders())
  },[error,alert,dispatch,deleteError,isDeleted,navigate])

   const handleDelete =(id)=>{
    dispatch(deleteOrder(id))
    
   }

  const columns = [
    { field: 'id', headerName: 'Order ID',flex: 1,minWith: 300},
    { field: 'status', headerName: 'Status',flex: 0.5,minWith: 150},
    {field: 'itemsQty', headerName: 'Items Qty',type: 'number',flex: 0.3,minWith: 150},
    {field: 'amount', headerName: 'Amount',type: 'number',flex: 0.5,minWith: 250},
    {field: 'action', headerName: 'Actions',type: 'number',flex: 0.3,minWith: 150,sortable:false,
        renderCell: (params)=>{
            return(
              <>
                <Link to={`/admin/order/${params.id}`}>
                    <EditIcon/>
                </Link>
                <Button onClick={()=>handleDelete(params.id)}><DeleteIcon/></Button>
              </>
            )
        }
    },
]

const rows = []

orders && orders?.forEach((item,index)=>{
    rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        amount: item.totalPrice,
        status: item.orderStatus

    })
})

  return (
    <>
      <MetaData title={'All Orders-Admin'}/>
      <div className='dashboard'>
        <SideBar/>

        <div className='product_list_container'>
          <h1 className='product_list_header'>All Orders</h1>

          <DataGrid rows={rows} scrollable columns={columns} pageSize={10} className='product_list_table' disableSelectionOnClick/>
        </div>
      </div>
    </>
  )
}

export default OrderList
