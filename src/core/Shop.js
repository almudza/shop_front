import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import Card from './Card'
import { getCategories } from '../admin/apiAdmin'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import { prices } from './fixedPrices'

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

    // filter by Category
    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters
        console.log(filters, 'fikl')

        // price
        if (filterBy === 'price') {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }

        setMyFilters(newFilters)
    }

    // Filter By price
    const handlePrice = value => {
        const data = prices
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array
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
                    <h4>Filter by Price</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filter =>
                                handleFilters(filter, 'price')
                            }
                        />
                    </div>
                </div>
                <div className="col-md-8">{JSON.stringify(myFilters)}</div>
            </div>
        </Layout>
    )
}

export default Shop
