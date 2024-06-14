import { connect, set } from "mongoose";
import { User } from '../models/user.model.js';
import { Food } from '../models/food.models.js';
import { sample_users } from "../data.js";
import { sample_foods } from "../data.js";
import bcrypt from 'bcryptjs';
const PASSWORD_HASH_SALT_ROUNDS = 10;

set('strictQuery', true)

export const dbconnect = async () => {
    try {
        connect(process.env.MONGO_URI)
        console.log('Connected to db successfully----')
        await seedUsers();
        await seedFoods();
    } catch (err) {
        console.log(err)
    }
}

const seedUsers = async () => {
    const usersCount = await User.countDocuments()
    if (usersCount > 0) {
        console.log('Users table already seeded!')
        return
    } else {
        for (const user of sample_users) {
            user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS)
            await User.create(user)
        }
    }

    console.log('Users table seeded!')
}

const seedFoods = async () => {
    const foodsCount = await Food.countDocuments()
    if (foodsCount > 0) {
        console.log('Foods table already seeded!')
        return
    } else {
        for (const food of sample_foods) {
            food.imageUrl = `/foods/${food.imageUrl}`
            await Food.create(food)
        }
    }
    console.log('Foods table seeded!')
}