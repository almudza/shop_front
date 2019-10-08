import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'

const Cart = ({
    product,
    showViewDetail = true,
    quantity = false,
    description = false,
}) => {
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

    return (
        <div className="card">
            {/* <div className="card-header">{product.name}</div> */}
            <ShowImage item={product} url="product" />
            <div className="card-body">
                {showViewLink(showViewDetail)}
                {showStock(quantity)}
                <p>${product.price}</p>
                <p>Category: {product.category && product.category.name}</p>
                {showDescription(description)}
                <Link to="/" className="btn btn-outline-danger">
                    Add to Cart
                </Link>
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

export default Cart
