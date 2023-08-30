import React from 'react'
import ProductDetail from '../features/product/components/ProductDetail'
import Navbar from '../features/navbar/Navbar'

export default function ProductDetailPage() {
  return (
    <div>
        <Navbar>
      <ProductDetail></ProductDetail> 
      </Navbar>
    </div>
  )
}
