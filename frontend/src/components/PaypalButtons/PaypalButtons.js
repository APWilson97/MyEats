import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import React, { useEffect } from 'react'
import { useLoading } from '../../hooks/useLoading'
import { pay } from '../../services/orderService'
import { useCart } from '../../hooks/useCart'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function PaypalButtons({ order }) {
  return (
    <PayPalScriptProvider options={{
        clientId: "ARGiU6vQF3Sv1rglhiXOCjeyHn7_FAHD5UjM6PaCgNgW7alaDBLFCBcN-rPIdDq4A-yeyHdCaTo5VqI2",
        currency: 'GBP'
    }}>
        <Buttons order={order} />
    </PayPalScriptProvider>
  )
}


function Buttons({ order }) {
    const navigate = useNavigate()
    const { clearCart } = useCart()
    const [{ isPending }] = usePayPalScriptReducer()
    const { showLoading, hideLoading } = useLoading()

    useEffect(() => {
        isPending? showLoading() : hideLoading()
    })

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice
                    }
                }
            ]
        })
    }

    const onApprove = async (data, actions) => {
        try {
            const payment = await actions.order.capture()
            const orderId = await pay(payment.id)
            clearCart()
            toast.success('Payment successful', 'Success')
            navigate('/track/' + orderId)
        } catch (error) {
            toast.error('Payment failed', 'Error')
        }
    }

    const onError = (err) => {
        toast.error('Payment failed', 'Error')
    }

    return (
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
    )
}