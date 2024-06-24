import { getUser } from "./userService.js"
const user = getUser()

export const createOrder = async (order) => {
    const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'access_token': user.token
        },
        body: JSON.stringify(order)
    })

    if (response.status !== 200) {
        let data = await response.json()
        throw new Error(data.message)
    }

    let data = await response.json()
    return data
}

export const getNewOrderForCurrentUser = async () => {
    const data = await fetch('/api/orders/newOrderForCurrentUser', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'access_token': user.token
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        return data
    })
    return data
}

export const pay = async (paymentId) => {
    try {
        const data = await fetch('/api/orders/pay', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'access_token': user.token
            },
            body: JSON.stringify({paymentId: paymentId})
        })
        .then(response => response.json())
        .then(data => data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const trackOrderById = async (orderId) => {
    const data = await fetch('/api/orders/track/' + orderId).then(response => response.json()).then(data => data)
    return data
}