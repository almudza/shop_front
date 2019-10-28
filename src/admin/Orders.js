import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../user/auth'
import { listOrders } from './apiAdmin'

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

    const noOrders = orders => {
        return orders.length < 1 ? <h4>No Orders</h4> : null
    }

    return (
        <Layout title="Orders List">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {noOrders(orders)}
                    {JSON.stringify(orders)}
                </div>
            </div>
        </Layout>
    )
}

export default Orders