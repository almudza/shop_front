import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../config'
import defaultImg from '../img/people.jpg'
import { updateItem, removeItem, getCart } from './cartHelpers'

function CartProduct({
    product,
    setRun = f => f, // default value of function,
    run = undefined, // default value of undefined
}) {
    const [count, setCount] = useState(product.count)

    const handleChange = productId => event => {
        setRun(!run) // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value)

        if (event.target.value >= 1) {
            updateItem(productId, event.target.value)
        }
    }

    return (
        <>
            <tbody>
                <tr>
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
                            onError={img => (img.target.src = `${defaultImg}`)}
                        />
                    </td>
                    <td>
                        <Link to={`/product/${product._id}`}>
                            {' '}
                            {product.name}
                        </Link>
                    </td>
                    <td>Rp. {product.price} </td>
                    <td>
                        <input
                            type="number"
                            value={count}
                            onChange={handleChange(product._id)}
                            className="form-control col-md-2"
                        />
                    </td>
                    <td>
                        {' '}
                        <span className="mr-auto col-md-4">7999</span>{' '}
                    </td>
                    <td>
                        <span
                            onClick={() => {
                                setRun(!run) // run useEffect in parent Cart
                                removeItem(product._id)
                            }}
                            className="btn btn-danger"
                        >
                            <i class="fas fa-trash"></i>
                        </span>
                    </td>
                </tr>
            </tbody>
        </>
    )
}

export default CartProduct
