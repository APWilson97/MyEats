import { Router } from "express";
import handler from 'express-async-handler'
import auth from '../middleware/auth.mid.js'
import { Order } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";
import { User } from "../models/user.model.js";

const router = Router()
router.use(auth)

router.post('/create', handler(async (req, res) => {
    const order = req.body

    if (order.items.length <= 0) res.status(401).send('Cart is empty!')

    await Order.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    })

    const newOrder = new Order({...order, user: req.user.id})
    await newOrder.save()
    res.send(newOrder)
}))

router.put('/pay', handler(async (req, res) => {
    const { paymentId } = req.body
    const order = await getNewOrder(req)

    if (!order) {
        res.status(400).send('Order not found!')
    } 
    
    order.paymentId = paymentId
    order.status = OrderStatus.PAID
    await order.save()

    res.send(order._id)
}))

router.get('/track/:orderId', handler(async (req, res) => {
    const { orderId } = req.params;
    const user = await User.findById(req.user.id)

    const filter = {
        _id: orderId
    }

    if (!user.isAdmin) {
        filter.user = user._id
    }

    const order = await Order.findOne(filter)

    if (!order) return res.send(401)
    
    return res.send(order)
}))

router.get('/newOrderForCurrentUser', handler(async (req, res) => {
    const order = await getNewOrder(req)
    if (order) {
        res.send(order)
    } else {
        res.status(400).send()
    }
}))

const getNewOrder = async (req) => {
    return Order.findOne({ user: req.user.id, status: OrderStatus.NEW })
}

export default router