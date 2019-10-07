import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { getProducts } from './apiCore'
import Cart from './Card'
import showError from '../components/ShowError'
import Search from './Search'

const Home = () => {
    const [productBySell, setProductBySell] = useState([])
    const [productByArrival, setProductByArrival] = useState([])
    const [error, setError] = useState('')

    const loadProductBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductBySell(data)
            }
        })
    }

    const loadProductByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProductBySell()
        loadProductByArrival()
    }, [])

    return (
        <Layout
            title="Home Page"
            className="container"
            description="Node ecommerce"
        >
            <Search />
            {error && showError(error)}
            <h2 className="mb-4">Best Seller</h2>
            <div className="row">
                {productBySell.map((product, i) => (
                    <Cart key={i} product={product} />
                ))}
            </div>
            <h2 className="mb-4">New Arrival</h2>
            <div className="row">
                {productByArrival.map((product, i) => (
                    <Cart key={i} product={product} />
                ))}
            </div>
        </Layout>
    )
}

export default Home
