import Navbar from '../features/navbar/Navbar'
import AdminProductList from '../features/admin/components/AdminProductList'
import React from 'react'
import AdminOrders from '../features/admin/components/AdminOrders'

export default function AdminOrdersPage() {
  return (
    <div>
      <Navbar>
        <AdminOrders></AdminOrders>
      </Navbar>
    </div>
  )
}
