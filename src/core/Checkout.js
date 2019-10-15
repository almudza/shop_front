import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../user/auth'

const Checkout = ({ products }) => {
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            console.log('currentValue', currentValue, 'next', nextValue.count)
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">Checkout</button>
        ) : (
            <Link to="/login">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        )
    }

    return (
        <div>
            <h2>Total : ${getTotal()}</h2>
            {showCheckout()}
        </div>
    )
}

export default Checkout
