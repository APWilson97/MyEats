import { Router } from "express";
import handler from 'express-async-handler'
import auth from '../middleware/auth.mid.js'
import { Order } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";

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