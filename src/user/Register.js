import React, { useState } from 'react'
import Layout from '../core/Layout'
import { API } from '../config'
import { Link } from 'react-router-dom'
import styles from './Spinner.module.css'

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        loading: false,
        button: false,
    })

    // initialisasi
    const { name, email, password, success, error, loading, button } = values

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
        setValues({ ...values, error: '', loading: true, button: true })
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
                    setTimeout(() => {
                        setValues({
                            ...values,
                            name: '',
                            email: '',
                            password: '',
                            error: '',
                            success: true,
                            loading: false,
                            button: false,
                        })
                    }, 10000)
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

            {button ? (
                <button
                    disabled
                    className="btn btn-raised btn-block btn-waring"
                >
                    Daftar
                </button>
            ) : (
                <button className="btn btn-block btn-raised btn-second my-4">
                    Daftar
                </button>
            )}
        </form>
    )

    const spinner = () => (
        <div className="text-center">
            <div className={styles.loading}></div>
        </div>
    )

    return (
        <Layout className="col-md-4 offset-md-4 mt-5" title="Register">
            {showError()}
            {showSuccess()}
            <div className="card mt-1">
                <h2 className="text-center card-title pt-4">Register</h2>
                {loading ? spinner() : ''}
                <div className="card-body">{registerForm()}</div>
                <div className="card-footer">
                    <p className="text-muted">
                        Sudah punya akun? silahkan{' '}
                        <Link to="/login">
                            Login <i className="fas fa-angle-right"></i>
                        </Link>{' '}
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Register
