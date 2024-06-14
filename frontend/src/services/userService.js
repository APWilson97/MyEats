export const getUser = () => {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

export const login = async (email, password) => {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password }) 
    })
    
    if (response.status !== 200) {
        let data = await response.json()
        throw new Error(data.message)
    } else {
        let data = await response.json()
        localStorage.setItem('user', JSON.stringify(data))
        return data
    }
}

export const register = async (signupData) => {
    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(signupData)
    })

    if (response.status !== 200) {
        let data = await response.json()
        throw new Error(data.message)
    } else {
        let data = await response.json()
        localStorage.setItem('user', JSON.stringify(data))
        return data
    }
}

export const logout = () => {
    localStorage.removeItem('user')
}