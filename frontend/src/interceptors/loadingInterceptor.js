export const fetchAPIRequestInterceptor = async (endpoint) => {
    const { fetch:  originalFetch } = window
    window.fetch = async (...args) => {
        console.log("Fetch intercepted with args:", args)
        console.log(endpoint)
        const response = await originalFetch(endpoint)
        console.log(response.json())
        return response
    }
}
