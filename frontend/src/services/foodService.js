export const getAll = async () => {
    const data = await fetch('http://localhost:5000/api/foods')
    .then((response) => response.json())
    .then((data => data))
    return data
}

export const search = async (searchTerm) => {
    const data = await fetch('http://localhost:5000/api/foods/search/' + searchTerm).then((response) => response.json()).then((data) => data)
    return data
}


export const getAllTags = async () => {
    const data = await fetch('http://localhost:5000/api/foods/tags').then((response) => response.json()).then((data) => data)
    return data
}

export const getAllByTag = async (tag) => {
    if(tag === 'All') {
        return getAll();
    } else {
        const data = await fetch('http://localhost:5000/api/foods/tag/' + tag).then((response) => response.json()).then((data) => data)
        return data  
    }
}

export const getById = async (foodId) => {
    const data = await fetch('http://localhost:5000/api/foods/' + foodId).then(response => response.json()).then(data => data)
    return data
}