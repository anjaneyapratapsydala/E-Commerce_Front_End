import Navbar from '../features/navbar/Navbar'
import ProductList  from '../features/product-list/components/ProductList'
import React from 'react'

export default function Home() {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
    </div>
  )
}
