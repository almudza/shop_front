import React from 'react'
import Layout from './Layout'
import { API } from '../config'

const Home = () => {
    return (
        <Layout
            title="Home Page"
            className="container"
            description="Node ecommerce"
        >
            <div className="card">
                <h1>Home</h1>
                <p>{API} </p>
            </div>
        </Layout>
    )
}

export default Home
