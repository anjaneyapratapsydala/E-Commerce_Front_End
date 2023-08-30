import { Link } from 'react-router-dom'
import Navbar from '../features/navbar/Navbar'
import ProductList  from '../features/product/components/ProductList'
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
