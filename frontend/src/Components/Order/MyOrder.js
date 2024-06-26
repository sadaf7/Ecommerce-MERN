import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { clearErrors, myOrders } from '../../actions/orderAction';
import { DataGrid } from '@mui/x-data-grid';
import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader/Loader';
import {useAlert} from 'react-alert'
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import './MyOrder.css'



const MyOrder = () => {

    const {orders,loading,error} = useSelector(state=>state.myOrder)
    const {user} = useSelector(state=>state.user)

    const dispatch = useDispatch();
    const alert = useAlert()

    const columns = [
        { field: 'id', headerName: 'Order ID',flex: 1,minWith: 300},
        { field: 'status', headerName: 'Status',flex: 0.5,minWith: 150},
        {field: 'itemsQty', headerName: 'Items Qty',type: 'number',flex: 0.3,minWith: 150},
        {field: 'amount', headerName: 'Amount',type: 'number',flex: 0.5,minWith: 250},
        {field: 'action', headerName: 'Actions',type: 'number',flex: 0.3,minWith: 150,sortable:false,
            renderCell: (params)=>{
                return(
                    <Link to={`/order/${params.id}`}>
                        <LaunchIcon/>
                    </Link>
                )
            }
        },
    ]

    const rows = []

    orders && orders.forEach((item,index)=>{
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice

        })
    })

    useEffect(()=>{

        if(error){
            alert.error(error)
            clearErrors()
        }

        dispatch(myOrders())

    },[dispatch,error,alert])

  return (
    <>
        <MetaData title={`${user.name}'s Order`}/>
        {loading?(<Loader/>):(
            <div className="my_order_page">
                <DataGrid rows={rows} columns={columns} autoHeight pageSize={10} className='mu_order_tablr' disableSelectionOnClick/>

                <h3>{user.name}'s Orders</h3>
            </div>
        )}
        
    </>
  )
}

export default MyOrder
