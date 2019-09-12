import React, { useState } from 'react'
import Layout from '../core/Layout'
import { API } from '../config'
import { Link } from 'react-router-dom'

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        conPassword: '',
        error: '',
        success: false,
    })

    // initialisasi
    const { name, email, password, success, error } = values

    const handleChange = name => event => {
        setValues({ ...values, error: '', [name]: event.target.value })
    }

    // validati form
    const isValid = () => {
        if (name.length === 0) {
            setValues({ error: 'nama harus di isi' })
            return false
        }
        return true
    }

    // Signup Method
    const signup = user => {
        // console.log(name, email, password)
        return fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                return response.json()
            })
            .catch(err => console.log(err))
    }

    const clickSubmit = e => {
        e.preventDefault()
        setValues({ ...values, error: '' })
        if (isValid()) {
            // calling signup method
            signup({ name, email, password }).then(data => {
                if (data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        success: false,
                    })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true,
                    })
                }
            })
            // .catch(err => console.log(err))
        }
    }

    // error message
    const showError = () => (
        <div
            style={{ display: error ? '' : 'none' }}
            className="alert alert-danger"
        >
            {error}
        </div>
    )

    const showSuccess = () => (
        <div
            style={{ display: success ? '' : 'none' }}
            className="alert alert-info"
        >
            Register Sukses.. silahkan <Link to="/login">Login</Link>
        </div>
    )

    const registerForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label htmlFor="name" className="text-muted">
                    Nama
                </label>
                <input
                    onChange={handleChange('name')}
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email" className="text-muted">
                    Email
                </label>
                <input
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="text-muted">
                    Password
                </label>
                <input
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    required
                />
            </div>

            <button className="btn btn-block btn-raised btn-primary my-4">
                Daftar
            </button>
        </form>
    )

    return (
        <Layout className="col-md-6 offset-md-3" title="Register">
            <h2 className="text-center my-5">Register</h2>
            {showError()}
            {showSuccess()}
            {registerForm()}
        </Layout>
    )
}

export default Register
