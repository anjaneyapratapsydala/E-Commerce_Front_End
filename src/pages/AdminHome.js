import Navbar from '../features/navbar/Navbar'
import AdminProductList from '../features/admin/components/AdminProductList'
import React from 'react'

export default function AdminHome() {
  return (
    <div>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  )
}
