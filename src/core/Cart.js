import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import CartProduct from './CartProduct'
import { getCart } from './cartHelpers'

function Cart() {
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(getCart())
    }, [])

    const showItems = items => {
        return (
            <>
                <h2>Your cart has {`${items.length}`}</h2>
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {items.map((product, i) => (
                            <CartProduct key={i} product={product} />
                        ))}
                    </table>
                </div>
            </>
        )
    }

    const notItemsMessage = () => (
        <h2>
            Your cart is EMpty. <br />
            <Link to="/shop">continue shopping</Link>
        </h2>
    )

    return (
        <Layout title="Cart Page" className="container">
            <div className="row">
                <div className="col-md-12">
                    {items.length > 0 ? showItems(items) : notItemsMessage()}
                </div>
            </div>
            <div className="col-md-6">
                <p>show checkout</p>
            </div>
        </Layout>
    )
}

export default Cart
