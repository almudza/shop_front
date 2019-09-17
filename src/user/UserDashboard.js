import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from './auth'

const UserDashboard = () => {
    return (
        <Layout title={`${isAuthenticated().user.name} Dashboard`}>
            <p>{isAuthenticated().user.name}</p>
        </Layout>
    )
}

export default UserDashboard
