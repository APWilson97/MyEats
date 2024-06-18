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
    let data = await fetch('/api/orders/newOrderForCurrentUser', {
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