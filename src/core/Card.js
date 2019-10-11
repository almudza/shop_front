import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem } from './cartHelpers'

const Card = ({
    product,
    showViewDetail = true,
    quantity = false,
    description = false,
}) => {
    const [redirect, setRedirect] = useState(false)

    const showViewLink = showViewDetail => {
        return showViewDetail ? (
            <Link to={`/product/${product._id}`}>
                <p>{product.name} </p>
            </Link>
        ) : (
            <p>{product.name} </p>
        )
    }

    const showDescription = description => {
        return description ? <p> {product.description} </p> : ''
    }

    const showStock = quantity => {
        if (quantity) {
            return quantity && product.quantity > 0 ? (
                <span className="badge badge-primary badge-pill">In Stock</span>
            ) : (
                <span className="badge badge-danger badge-pill">
                    Out of Stock
                </span>
            )
        } else {
            return ''
        }
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = () => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    return (
        <div className="card">
            {/* <div className="card-header">{product.name}</div> */}
            <ShowImage item={product} url="product" />
            <div className="card-body">
                {shouldRedirect(redirect)}
                {showViewLink(showViewDetail)}
                {showStock(quantity)}
                <p>${product.price}</p>
                <p>Category: {product.category && product.category.name}</p>
                {showDescription(description)}
                <button onClick={addToCart} className="btn btn-outline-danger">
                    Add to Cart
                </button>
            </div>
            <div className="card-footer">
                <span className="text-secondary mb-2">
                    {' '}
                    Added on {moment(product.createdAt).fromNow()}{' '}
                </span>
            </div>
        </div>
    )
}

export default Card
