export const getUser = () => {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

export const login = (email, password) => {
    const data = fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password }) 
    })
    .then(response => response.json())
    .then(data => data)
    
    return data
}

export const logout = () => {
    localStorage.removeItem('user')
}