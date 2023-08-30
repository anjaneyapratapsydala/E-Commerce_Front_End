import React from 'react'
import AdminProductDetail from '../features/admin/components/AdminProductDetail'
import Navbar from '../features/navbar/Navbar'

export default function AdminProductDetailPage() {
  return (
    <div>
        <Navbar> 
      <AdminProductDetail></AdminProductDetail> 
      </Navbar>
    </div>
  )
}
