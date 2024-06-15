export const createOrder = async (order) => {
    const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
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