import React from 'react'
import { Link } from 'react-router-dom'

export const goBackAdminDashboard = () => {
    return (
        <div className="mt-5">
            <Link to="/admin/dashboard">Back to Dashboard</Link>
        </div>
    )
}
