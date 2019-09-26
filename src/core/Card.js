import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage'

const Cart = ({ product }) => {
    return (
        <div className="col-md-4 my-3">
            <div className="card">
                <div className="card-header">{product.name}</div>
                <div className="card-body">
                    <ShowImage item={product} url="product" />
                    <p>{product.description} </p>
                    <p>{product.price} </p>
                    <Link to="/" className="btn btn-outline-primary mr-2">
                        View Product
                    </Link>
                    <Link to="/" className="btn btn-outline-warning">
                        Add to Cart
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart
