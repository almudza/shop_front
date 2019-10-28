import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from './auth'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
    const {
        user: { name, email, role },
    } = isAuthenticated()

    const adminLink = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Menu</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/create/category" className="nav-link">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/create/product" className="nav-link">
                            Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/orders/list" className="nav-link">
                            Orders List
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Info</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email} </li>
                    <li className="list-group-item">
                        {role === 1 ? 'Admin' : 'Registered User'}
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title={`${name} Dashboard`}>
            <div className="row">
                <div className="col-md-3 mb-5">{adminLink()}</div>
                <div className="col-md-9">{adminInfo()}</div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
