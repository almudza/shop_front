import React, { useState } from 'react'
import Layout from '../core/Layout'

import { isAuthenticated } from '../user/auth'
import { createCategory } from './apiAdmin'
import showError from '../components/ShowError'
import { goBackAdminDashboard as goBack } from '../components/goBackAdminDashboard'

function AddCategory() {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // desctructure user and token from localstorage
    const { user, token } = isAuthenticated()

    const handleChange = e => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = e => {
        e.preventDefault()

        setError('')
        setSuccess(false)

        // make request to api to create category
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setError('')
                setSuccess(true)
            }
        })
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
                        required
                    />
                </div>
                <button className="btn btn-outline-primary">
                    Create Category
                </button>
            </form>
        )
    }

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is success created</h3>
        }
    }

    return (
        <Layout title="Add Category">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {error && showError(`${name} already exist, please unique`)}
                    {showSuccess()}
                    {categoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory
