import React from 'react'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom'

export default function Protected({children}) {
    const user = useSelector(selectLoggedInUser)
    if(!user){
        return<Navigate to='/login' replace={true}></Navigate>
    }
  return children
}
