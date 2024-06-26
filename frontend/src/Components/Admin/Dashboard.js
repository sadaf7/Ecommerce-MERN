import React, { useEffect } from 'react'
import SideBar from './SideBar'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import {Doughnut,Line} from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement, } from "chart.js";
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../../actions/productAction'
import { getAllOrders } from '../../actions/orderAction'
import { getAllUsers } from '../../actions/userAction'


const Dashboard = () => {

  ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement);

  const dispatch = useDispatch()
  const {products} = useSelector((state) => state.products)
  const {orders} = useSelector((state) => state.allOrders)
  const {users} = useSelector((state) => state.allUsers)

  let outOfStock = 0;

  products && products.forEach((item)=>{
    // item.stock < 1 ? outOfStock++ : outOfStock
    if(item.stock === 0){
      outOfStock += 1
    }
  })

  useEffect(()=>{
    dispatch(getAdminProducts())
    dispatch(getAllOrders())
    dispatch(getAllUsers())
  },[dispatch])

  let lineState={
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'Total Amount',
        data: [0, 2000],
        backgroundColor: ['red'],

      },
    ],
  }
  let doughnutState={
    labels: ['Out Of Stock', 'In Stock'],
    datasets: [
      {
        label: 'Total Amount',
        data: [outOfStock, products?.length - outOfStock],
        backgroundColor: ['red','green'],

      },
    ],
  }

  return (
    <div className='dashboard'>
      <SideBar/>

      <div className='dashboard_container'>
        <h1>Dashboard</h1>

        <div className='dashboard_summary'>
          <div className='dashboard_summary_item_1'>
            <p>Total Amount: $500</p>
          </div>
          <div className='dashboard_summary_item_2'>
            <Link to={'/admin/products'}>
              <p>Products: {products&&products?.length}</p>
            </Link>
            <Link to={'/admin/orders'}>
              <p>Orders: {orders?.length}</p>
            </Link>
            <Link to={'/admin/users'}>
              <p>Users: {users?.length}</p>
            </Link>
          </div>
        </div>

        <div className='line_chart'>
          <Line data={lineState}/>
        </div>
        <div className='doughnut_chart'>
          <Doughnut data={doughnutState}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
