"use client"
import React, { useState } from 'react'
import { addProduct, fetchProducts } from '../core/productLogic'
export default function CreateProductPage() {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: 0,
    discount: 0,
    category: '',
    quantity: 0
  })

  const handleChange = (e) => {
    const { name, value } = e.target
  
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("Product Submitted:", product)
    await addProduct(product)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Create Product</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Product ID</label>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={(event)=> {
                setProduct({...product,id:event.target.value})
            }}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter product ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter category"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Submit
        </button>
        
      </form>
        <button 
          onClick={async (event)=> fetchProducts()}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Get Products
        </button>
    </div>
  )
}