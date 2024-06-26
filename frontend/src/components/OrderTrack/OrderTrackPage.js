import React, { useEffect, useState } from 'react'
import classes from './orderTrackPage.module.css'
import { Link, useParams } from 'react-router-dom'
import { trackOrderById } from '../../services/orderService'
import NotFound from '../NotFound/NotFound'
import DateTime from '../DateTime/DateTime'
import OrderItemsList from '../OrderItemsList/OrderItemsList'
import Title from '../Title/Title'
import Map from '../Map/Map'

export default function OrderTrackPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState()

  useEffect(() => {
    orderId && 
    trackOrderById(orderId)
    .then(order => {
      setOrder(order)
    })
  }, [])

  if (!orderId) return <NotFound message='Order not found' linkText='Go to home page' />

  return (
    order &&
    <div className={classes.container}>
      <div className={classes.content}>
      <h1>Order #{order.id}</h1>
      <div className={classes.header}>
        <div>
          <strong>Date</strong>
          <DateTime date={order.createdAt} />
        </div>

        <div>
          <strong>Name</strong>
          {order.name}
        </div>

        <div>
          <strong>Address</strong>
          {order.address}
        </div>

        <div>
          <strong>State</strong>
          {order.status}
        </div>

        {order.paymentId && (
          <div>
            <strong>Payment ID</strong>
            {order.paymentId}
          </div>
        )}
      </div>

      <OrderItemsList order={order} />
      </div>

      <div>
        <Title title='Your location' fontSize='1.6rem' />
        <Map location={order.addressLatLng} readonly={true} />
      </div>

      {
        order.status === 'NEW' && (
          <div className={classes.payment}>
            <Link to='/payment'>Go to payment</Link>
          </div>
        )
      }
    </div>
  )
}
