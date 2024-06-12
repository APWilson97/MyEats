export const getAll = () => {
    const data = fetch('/api/foods')
    .then((response) => response.json())
    .then((data => data))
    return data
}

export const search = (searchTerm) => {
    const data = fetch('/api/foods/search/' + searchTerm).then((response) => response.json()).then((data) => data)
    return data
}


export const getAllTags = () => {
    const data = fetch('/api/foods/tags').then((response) => response.json()).then((data) => data)
    return data
}

export const getAllByTag = (tag) => {
    if(tag === 'All') {
        return getAll();
    } else {
        const data = fetch('/api/foods/tag/' + tag).then((response) => response.json()).then((data) => data)
        return data  
    }
}

export const getById = (foodId) => {
    const data = fetch('/api/foods/' + foodId).then(response => response.json()).then(data => data)
    return data
}