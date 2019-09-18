import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from './auth'
import { Link } from 'react-router-dom'

const UserDashboard = () => {
    const {
        user: { name, email, role },
    } = isAuthenticated()

    const userLink = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Menu</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/cart" className="nav-link">
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/profile/update" className="nav-link">
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userInfo = () => {
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

    const purchasedHistory = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purcashed Hostory</h3>
                <ul className="list-group">
                    <li className="list-group-item">history</li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title={`${name} Dashboard`}>
            <div className="row">
                <div className="col-md-3 mb-5">{userLink()}</div>
                <div className="col-md-9">
                    {userInfo()}
                    {purchasedHistory()}
                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard
