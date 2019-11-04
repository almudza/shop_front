import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../user/auth'
import { detailOrder } from './apiAdmin'
import moment from 'moment'
import { goBackOrders } from '../components/goBackAdminDashboard'

const OrderDetail = props => {
    const [order, setOrder] = useState({})
    const [client, setClient] = useState({})
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadOrderDetail = (userId, token, orderId) => {
        detailOrder(userId, token, orderId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setOrder(data)
                setClient(data.user)
                setProducts(data.products)
                // console.log(data)
            }
        })
    }

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token
    const orderId = props.match.params.orderId

    useEffect(() => {
        loadOrderDetail(userId, token, orderId)
    }, [])

    const showInput = (key, input) => (
        <div className="input-group mb-2 mr-sm-auto">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                className="form-control"
                value={input}
                readOnly
            />
        </div>
    )

    return (
        <Layout title={`order by ${client.name}`}>
            {goBackOrders()}
            <div className="row">
                <div className="col-md-6">
                    <ul className="list-group">
                        <li className="list-group-item">
                            Name Customer : {client.name}
                        </li>
                        <li className="list-group-item">
                            Email : {client.email}
                        </li>
                        <li className="list-group-item">
                            ID transaction : {order._id}
                        </li>
                        <li className="list-group-item">
                            Transaction Date :{' '}
                            {moment(order.createdAt).fromNow()}
                        </li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <ul className="list-group">
                        <li className="list-group-item">
                            status : {order.status}{' '}
                        </li>
                        <li className="list-group-item">
                            Total amount: {order.amount}
                        </li>
                        <li className="list-group-item">
                            Delivery Address : {order.address}
                        </li>
                        <li className="list-group-item">
                            Note : MOST OF WHITE{' '}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {products.map((p, i) => (
                        <div
                            style={{
                                padding: '20px',
                                border: '1px solid indigo',
                            }}
                            key={i}
                            className="mb-4"
                        >
                            {showInput('Product Name : ', p.name)}
                            {showInput('Product Price : ', p.price)}
                            {showInput('Product count : ', p.count)}
                            {showInput('Product ID : ', p._id)}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default OrderDetail
