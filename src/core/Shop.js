import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import Card from './Card'
import { getCategories } from '../admin/apiAdmin'
import Checkbox from './Checkbox'

function Shop() {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] },
    })

    const init = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setCategories(data)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        init()
    }, [])

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters
        setMyFilters(newFilters)
    }

    return (
        <Layout title="Shop">
            <div className="row">
                <div className="col-md-4">
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, 'category')
                            }
                        />
                    </ul>
                </div>
                <div className="col-md-8">{JSON.stringify(myFilters)}</div>
            </div>
        </Layout>
    )
}

export default Shop
