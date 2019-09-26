import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage'

const Cart = ({ product }) => {
    return (
        <div className="col-md-3 my-3">
            <div className="card">
                {/* <div className="card-header">{product.name}</div> */}
                <ShowImage item={product} url="product" />
                <div className="card-body">
                    <Link to="/">
                        <p>{product.name} </p>
                    </Link>
                    <p>${product.price}</p>
                    <Link to="/" className="btn btn-outline-danger">
                        Add to Cart
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart
