import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import SideBar from './SideBar';
import {useAlert} from 'react-alert'
import { clearErrors, deleteUser, getAllUsers } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstant';

const Users = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  
  const {users,error} = useSelector((state) => state.allUsers)
  const {isDeleted, error: deleteUserError,message} = useSelector((state) => state.profile)

  useEffect(()=>{
    if(error){
    alert.error(error)
      clearErrors()
    }

    if(deleteUserError){
    alert.error(deleteUserError)
      clearErrors()
    }

    if(isDeleted){
      alert.success(message)
      navigate('/admin/users')
      dispatch({type: DELETE_USER_RESET})
    }

    dispatch(getAllUsers())
  },[error,alert,dispatch,isDeleted,navigate,message,deleteUserError])

   const handleDelete =(id)=>{
    dispatch(deleteUser(id))
   }

  const columns = [
    { field: 'id', headerName: 'User ID',flex: 0.8,minWith: 200},
    {field: 'email', headerName: 'Email',flex: 0.5,minWith: 150},
    { field: 'name', headerName: 'Name',flex: 0.5,minWith: 350},
    {field: 'role', headerName: 'Role',flex: 0.3,minWith: 270},
    {field: 'action', headerName: 'Actions',type: 'number',flex: 0.3,minWith: 150,sortable:false,
        renderCell: (params)=>{
            return(
              <>
                <Link to={`/admin/user/${params.id}`}>
                    <EditIcon/>
                </Link>
                <Button onClick={()=>handleDelete(params.id)}><DeleteIcon/></Button>
              </>
            )
        }
    },
]

const rows = []

users && users?.forEach((item,index)=>{
    rows.push({
        name: item.name,
        id: item._id,
        role: item.role,
        email: item.email

    })
})

  return (
    <>
      <MetaData title={'All Users-Admin'}/>
      <div className='dashboard'>
        <SideBar/>

        <div className='product_list_container'>
          <h1 className='product_list_header'>All USERS</h1>

          <DataGrid rows={rows} scrollable columns={columns} pageSize={10} className='product_list_table' disableSelectionOnClick/>
        </div>
      </div>
    </>
  )
}

export default Users
