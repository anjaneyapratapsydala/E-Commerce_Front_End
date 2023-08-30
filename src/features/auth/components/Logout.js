import React, { useEffect } from 'react'
import { signOut } from '../authAPI'
import { selectLoggedInUser, signOutAsync } from '../authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export default function Logout() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser)
    useEffect(()=>{
        dispatch(signOutAsync())
    })
    
  return (
    <div>
      {!user && <Navigate to="/login" replace={true}></Navigate>}
    </div>
  )
}
