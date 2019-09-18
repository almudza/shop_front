import React, { useState } from 'react'
import Layout from '../core/Layout'
import { Link } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from './auth'
import { showError } from '../components/ShowError'
import { spinner } from '../components/Spinner'

const Login = props => {
    // console.log(props)
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        button: false,
    })

    const redirect = () => {
        if (isAuthenticated()) {
            let { from } = props.location.state || {
                from: { pathname: '/' },
            }
            props.history.push(from)
        }
    }

    // initial
    const { email, password, error, button, loading } = values

    const handleChange = name => e => {
        setValues({ ...values, error: '', [name]: e.target.value })
    }

    const clickSubmit = e => {
        e.preventDefault()
        setValues({ ...values, loading: true, button: true })

        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                })
            } else {
                setTimeout(() => {
                    authenticate(data, () => {
                        let { from } = props.location.state || {
                            from: { pathname: '/dashboard' },
                        }
                        props.history.push(from)
                    })
                }, 1000)
            }
        })
    }

    const LoginForm = () => (
        <form onSubmit={clickSubmit}>
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
                    // required
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
                    // required
                />
            </div>

            {button ? (
                <button
                    disabled
                    className="btn btn-raised btn-block btn-waring"
                >
                    Login
                </button>
            ) : (
                <button className="btn btn-block btn-raised btn-second my-4">
                    Login
                </button>
            )}
        </form>
    )

    return (
        <Layout className="col-md-4 offset-md-4 mt-5" title="Login">
            {redirect()}
            {showError(error)}
            <div className="card mt-1">
                <h2 className="text-center card-title pt-4">Login</h2>
                {loading ? spinner() : ''}
                <div className="card-body">{LoginForm()}</div>
                <div className="card-footer">
                    <p className="text-muted">
                        Belum punya akun? silahkan{' '}
                        <Link to="/register">
                            Register <i className="fas fa-angle-left"></i>
                        </Link>{' '}
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Login
