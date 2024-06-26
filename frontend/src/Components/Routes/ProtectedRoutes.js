import React from 'react'
import { useSelector } from 'react-redux';
import { Route,Routes,redirect } from 'react-router-dom';

const ProtectedRoutes = ({element: Element, ...rest}) => {

    const {isAuthenticated,user,loading} = useSelector((state)=>state.user);

  return (
    <>
     {loading===false && (
        
            <Route {...rest}
            render={(props) => {
                if (isAuthenticated===false) {
                    return redirect('/login')
                } 
                if(isAdmin===true && user.role !== 'admin'){
                  return <Navigate to={'/login'}/>
                }
                return <Element {...props}/>
            } }
        />
        
     )} 
    </>
  )
}

export default ProtectedRoutes
