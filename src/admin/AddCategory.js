import React, { useState } from 'react'
import Layout from '../core/Layout'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../user/auth'

function AddCategory() {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = e => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = e => {
        e.preventDefault()

        setError('')
        setSuccess(false)

        // make request to api to create category
    }

    const categoryForm = () => {
        return (
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="text-muted">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={name}
                        id="name"
                        autoFocus
                    />
                </div>
                <button className="btn btn-outline-primary">
                    Create Category
                </button>
            </form>
        )
    }

    return (
        <Layout title="Add Category">
            <div className="row">
                <div className="col-md-8 offset-md-2">{categoryForm()}</div>
            </div>
        </Layout>
    )
}

export default AddCategory
