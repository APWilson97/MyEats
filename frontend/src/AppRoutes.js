import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage'
import FoodPage from './Pages/Home/Food/FoodPage'
import CartPage from './Pages/Home/Cart/CartPage'
import LoginPage from './Pages/Home/Login/LoginPage'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search/:searchTerm' element={<HomePage />} />
        <Route path='/tag/:tag' element={<HomePage />} />
        <Route path='/food/:id' element={<FoodPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}
