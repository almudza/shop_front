import React from 'react'
import { Link } from 'react-router-dom'
import { API } from '../config'
import defaultImg from '../img/people.jpg'

function CartProduct({ products }) {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th>price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, i) => (
                        <tr key={i}>
                            <td>
                                <img
                                    src={`${API}/product/photo/${
                                        product._id
                                    }?${new Date().getTime()}`}
                                    alt={product.name}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '15px',
                                    }}
                                    onError={img =>
                                        (img.target.src = `${defaultImg}`)
                                    }
                                />
                            </td>
                            <td>
                                <Link to={`/product/${product._id}`}>
                                    {' '}
                                    {product.name}
                                </Link>
                            </td>
                            <td>Rp. {product.price} </td>
                            <td>Quantity</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default CartProduct
