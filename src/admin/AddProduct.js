import React, { useState, useEffect } from 'react'
import { createProduct, getCategories } from './apiAdmin'
import Layout from '../core/Layout'
import { goBackAdminDashboard as goBack } from '../components/goBackAdminDashboard'
import { isAuthenticated } from '../user/auth'
import showError from '../components/ShowError'
import { spinner } from '../components/Spinner'

function AddProduct() {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectTo: false,
        formData: '',
    })

    const { user, token } = isAuthenticated()

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectTo,
        formData,
    } = values

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                })
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData(),
                })
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    const handleChange = name => event => {
        const value =
            name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, error: '', createdProduct: '' })
    }

    const clickSubmit = event => {
        //
        event.preventDefault()
        setValues({
            ...values,
            error: '',
            loading: true,
            createdProduct: '',
        })

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, createdProduct: '' })
            } else {
                setValues({
                    ...values,
                    error: '',
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name,
                    formData: new FormData(),
                })
            }
        })
    }

    const newProductForm = () => (
        <form onSubmit={clickSubmit}>
            <h4 className="text-muted">Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        type="file"
                        accept="image/*"
                        name="photo"
                        onChange={handleChange('photo')}
                    />
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="name" className="text-muted">
                    Name
                </label>
                <input
                    type="text"
                    value={name}
                    className="form-control"
                    onChange={handleChange('name')}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description" className="text-muted">
                    Descripton
                </label>
                <textarea
                    type="text"
                    value={description}
                    className="form-control"
                    onChange={handleChange('description')}
                />
            </div>
            <div className="form-group">
                <label htmlFor="price" className="text-muted">
                    Price
                </label>
                <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={handleChange('price')}
                />
            </div>
            <div className="form-group">
                <label htmlFor="category" className="text-muted">
                    Category
                </label>
                <select
                    className="form-control"
                    onChange={handleChange('category')}
                >
                    <option>Select category</option>
                    {categories &&
                        categories.map((cat, i) => {
                            return (
                                <option key={i} value={cat._id}>
                                    {cat.name}{' '}
                                </option>
                            )
                        })}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="Shipping" className="text-muted">
                    Shipping
                </label>
                <select
                    name="shipping"
                    id="shipping"
                    className="form-select"
                    onChange={handleChange('shipping')}
                >
                    <option>Please Select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input
                    onChange={handleChange('quantity')}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            <button className="btn btn-primary">Create</button>
        </form>
    )
    const productCreated = () => (
        <div className="alert alert-primary">{createdProduct} success</div>
    )

    return (
        <Layout title="Add Product">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="text-muted my-5">Add Product</h2>
                    {error && showError(error)}
                    {createdProduct && productCreated()}
                    {loading && spinner()}
                    {newProductForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct
