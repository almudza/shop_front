import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../user/auth'
import { listOrders } from './apiAdmin'
import moment from 'moment'

const Orders = () => {
    const [orders, setOrders] = useState([])

    const { user, token } = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    }

    useEffect(() => {
        loadOrders()
    }, [])

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return <h4 className="text-danger">Total orders {orders.length}</h4>
        } else {
            return <h4 className="text-fanger">No Orders</h4>
        }
    }

    const getTotal = order => {
        const reducer = (accumulator, currentValue) => {
            // console.log('accumulator', accumulator, currentValue)
            return accumulator + currentValue
        }

        let count = order.products
            .map(cp => {
                return cp.count
            })
            .reduce(reducer)
        return <p> {count}</p>
    }

    return (
        <Layout title="Orders List">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>Order By</th>
                                <th>Ordered On</th>
                                <th>Status</th>
                                <th>Delivery Address</th>
                                <th>Products</th>
                                <th>Total Products</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => {
                                return (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.transaction_id}</td>
                                        <td>{order.amount}</td>
                                        <td>{order.user.name}</td>
                                        <td>
                                            {moment(order.createdAt).fromNow()}
                                        </td>
                                        <td>{order.status}</td>
                                        <td>{order.address}</td>
                                        <td>{order.products.length}</td>
                                        <td>{getTotal(order)} </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default Orders
