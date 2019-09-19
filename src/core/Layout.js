import React, { useEffect } from 'react'
import Menu from '../core/Menu'

const Layout = ({ title = 'Title', className = 'container', children }) => {
    // Set Header Title
    useEffect(() => {
        document.title = `${title} - Ecom`
    })
    return (
        <div>
            <Menu />
            <div className="container">
                <div className={className}>{children}</div>
            </div>
        </div>
    )
}

export default Layout
