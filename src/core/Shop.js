import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories } from '../admin/apiAdmin'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import { prices } from './fixedPrices'
import { getFilteredProducts } from './apiCore'

function Shop() {
    const [skip, setSkip] = useState(0)
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] },
    })

    const [limit, setLimit] = useState(6)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

    useEffect(() => {
        init()

        loadFilteredResult(skip, limit, myFilters.filters)
    }, [])

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

    const loadFilteredResult = newFilters => {
        setSkip(0)
        // console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                console.log('from data: ', data)
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMore = () => {
        let toSkip = skip + limit

        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button
                    onClick={loadMore}
                    className="btn btn-block btn-second mb-5"
                >
                    Load More
                </button>
            )
        )
    }

    // filter by Category
    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters
        // console.log(filters, 'fikl')
        setLimit(6)
        setSkip(0)

        // price
        if (filterBy === 'price') {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }

        // load filter to show product
        // console.log('loadfilter', myFilters.filters)
        // loadFilteredResult(myFilters.filters)

        setMyFilters(newFilters)
        // console.log('new filters', newFilters)
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

    const clickApply = e => {
        e.preventDefault()
        setSkip(0)
        loadFilteredResult(myFilters.filters)
    }

    const apply = () => {
        return (
            <button
                type="submit"
                onClick={clickApply}
                className="btn my-2 btn-sm btn-outline-primary"
            >
                Apply
            </button>
        )
    }

    return (
        <Layout title="Shop">
            <div className="row">
                <div className="col-md-3">
                    <h4 id="filt">Filter By Category</h4>
                    <ul className="form-check">
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
                    {apply()}
                </div>
                <div className="col-md-9">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <div className="col-md-3 my-3">
                                <Card key={i} product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop
