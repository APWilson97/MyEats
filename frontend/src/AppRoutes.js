import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage'
import FoodPage from './Pages/Home/Food/FoodPage'
import CartPage from './Pages/Home/Cart/CartPage'
import LoginPage from './Pages/Home/Login/LoginPage'
import RegisterPage from './Pages/Home/Register/RegisterPage'
import AuthRoute from './components/AuthRoute/AuthRoute'
import CheckoutPage from './Pages/Home/Checkout/CheckoutPage'
import PaymentPage from './Pages/Payment/PaymentPage'
import OrderTrackPage from './components/OrderTrack/OrderTrackPage'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search/:searchTerm' element={<HomePage />} />
        <Route path='/tag/:tag' element={<HomePage />} />
        <Route path='/food/:id' element={<FoodPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/checkout' 
        element={
        <AuthRoute>
          <CheckoutPage />
        </AuthRoute>} />
        <Route path='/payment' 
        element={
        <AuthRoute>
          <PaymentPage />
        </AuthRoute>} />
        <Route path='/track/:orderId' 
        element={
        <AuthRoute>
          <OrderTrackPage />
        </AuthRoute>} />
    </Routes>
  )
}
