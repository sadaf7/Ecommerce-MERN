import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';

const SideBar = () => {

    
  return (
    <div className='sidebar'>
      <Link to={'/admin/dashboard'}>
        <p>
            <DashboardIcon/> Dashboard
        </p>
      </Link>
      <Link>
        <SimpleTreeView defaultCollapseIcon={<ExpandMoreIcon/>} defaultExpandIcon={<ImportExportIcon/>}>
            <TreeItem nodeId="1" itemId='1' label="Products">
              <Link to={'/admin/products'}>
                <TreeItem nodeId="2" itemId='2' label="All Products" icon={<PostAddIcon/>}/>
              </Link>
              <Link to={'/admin/product'}>
                <TreeItem nodeId="3" itemId='3' label="Create" icon={<AddIcon/>}/>
              </Link>
            </TreeItem>
        </SimpleTreeView>
      </Link>
      <Link to={'/admin/orders'}>
        <ListAltIcon/> Orders
      </Link>
      <Link to={'/admin/users'}>
        <PeopleIcon/> Users
      </Link>
      <Link to={'/admin/reviews'}>
        <RateReviewIcon/> Reviews
      </Link>
    </div>
  )
}

export default SideBar
