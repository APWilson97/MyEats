import React from 'react'
import classes from './thumbnails.module.css'
import { Link } from 'react-router-dom'
import StarRating from '../StarRating/StarRating'
import Price from '../Price/Price'

export default function Thumbnails({ foods }) {
  return (
  <ul className={classes.list}>
    {foods.map(food => (
        <li key={food.id}>
            <Link to={`/food/${food.id}`}>
                <img className={classes.image} src={`/foods/${food.imageUrl}`} alt={food.name} />
            <div className={classes.content}>
                <div className={classes.name}>{food.name}</div>
                {/* This will determine what the second classname will be depending on if food has a favourite property or not */}
                <span className={`${classes.favourite} ${food.favourite ? "" : classes.not }`}>
                    ❤ 
                </span>
                <div className={classes.stars}>
                    <StarRating stars={food.stars} />
                </div>
                <div className={classes.product_item_footer}>
                    <div className={classes.origins}>
                        {food.origins.map(origin => (
                            <span key={origin}>{origin}</span>
                        ))}
                    </div>
                    <div className={classes.cooking_time}>
                        <span>🕒</span>
                        {food.cookTime}
                    </div>
                </div>
                <div className={classes.price}>
                    <Price price={food.price} />
                </div>
            </div>
            </Link>
        </li>
    ))}
  </ul>  
  )
}
