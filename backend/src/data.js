export const sample_foods = [
    {
        id: '1',
        name: 'Pepperoni Pizza',
        cookTime: '10-20',
        price: 10,
        favourite: false,
        origins:['italy'],
        stars: 4.5,
        imageUrl: 'food-1.jpg',
        tags: ['FastFood', 'Pizza', 'Lunch']
    },
    {
        id: '2',
        name: 'Ramen',
        cookTime: '30-45',
        price: 15,
        favourite: true,
        origins:['japan'],
        stars: 5,
        imageUrl: 'food-2.jpg',
        tags: ['FastFood', 'Noodles', 'Dinner'] 
    }
]

export const sample_tags = [
    { name: 'All', count: 2},
    { name: 'FastFood', count: 2},
    { name: 'Pizza', count: 1},
    { name: 'Noodles', count: 1},
    { name: 'Lunch', count: 1},
    { name: 'Dinner', count: 1}
]

export const sample_users = [
    {
        id: 1, 
        name: 'John Smith',
        email: 'john@gmail.com',
        password: '12345',
        address: 'London',
        isAdmin: false
        
    },
    {
        id: 2,
        name: 'Elly Uzuki',
        email: 'elly@gmail.com',
        password: '12345',
        address: 'Tokyo',
        isAdmin: true
    }
]