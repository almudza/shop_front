import React, { Fragment, useState, useEffect } from 'react'
import { getCategories } from '../admin/apiAdmin'
import { listSearch } from './apiCore'
import Card from './Card'

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        result: [],
        searched: false,
    })

    const { category, categories, search, result, searched } = data

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setData({ ...data, categories: data })
            }
        })
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const searchData = () => {
        // console.log(search, category)
        if (search) {
            listSearch({
                search: search || undefined,
                category: category,
            }).then(response => {
                if (response.error) {
                    console.log(response.error)
                    console.log('error from response')
                } else {
                    setData({ ...data, result: response, searched: true })
                }
            })
        }
    }

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false })
    }

    const searchSubmit = e => {
        e.preventDefault()
        searchData()
    }

    const searchMessage = (searched, result) => {
        if (searched && result.length > 0) {
            return `Found ${result.length} products`
        }
        if (searched && result.length < 1) {
            return `No Product Found`
        }
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select
                            className="btn-mr-2"
                            onChange={handleChange('category')}
                        >
                            <option value="All">All</option>
                            {categories.map((cat, i) => (
                                <option key={i} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange('search')}
                        placeholder="search by name"
                    />
                </div>
                <div
                    className="btn input-group-append"
                    style={{ border: 'none' }}
                >
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    )

    const searchedProducts = (result = []) => {
        return (
            <Fragment>
                <h2 className="my-4">{searchMessage(searched, result)}</h2>
                <div className="row">
                    {result.map((product, i) => (
                        <Card key={i} product={product} />
                    ))}
                </div>
            </Fragment>
        )
    }

    return (
        <div className="row">
            <div className="container">
                {searchForm()}
                {searchedProducts(result)}
            </div>
        </div>
    )
}

export default Search
