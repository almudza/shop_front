import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../user/auth'
import './menu.css'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ffff' }
    } else {
        return { color: 'hsla(0,0%,100%,.5)' }
    }
}

const firstName = () => {
    if (isAuthenticated()) {
        let fullName = isAuthenticated().user.name
        let showName = fullName.split(' ').slice(0, 1)
        return showName
    }
}

// const firstName = fullName.split(' ').slice(0, -1)
// .join(' ')
// const lastName = fullName
//     .split(' ')
//     .slice(-1)
//     .join(' ')

const hamberger = () => {
    const element = document.getElementById('animated')
    element.classList.toggle('open')
    return element
}

const Menu = ({ history }) => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-md mb-2 navbar-dark bg-main">
                <div className="container">
                    {/* Navbar brand */}
                    <Link
                        to="/"
                        className="navbar-brand"
                        style={{ cursor: 'pointer' }}
                    >
                        Brand
                    </Link>

                    {/* Collapse Button */}
                    <button
                        onClick={() => {
                            hamberger()
                        }}
                        className="navbar-toggler first-button"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportContent"
                        aria-controls="navbarSupportContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <div id="animated" className="animated-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>

                    {/* collapsible content */}
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportContent"
                    >
                        {/* link */}
                        <ul className="navbar-nav ml-2 mr-auto">
                            <li className="nav-item dropdown float-sm-right">
                                <span
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdown"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Categories
                                </span>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <Link to="/" className="dropdown-item">
                                        Shoes
                                    </Link>
                                    <Link to="/" className="dropdown-item">
                                        Hondas
                                    </Link>
                                </div>
                            </li>
                        </ul>
                        {/* search form */}
                        <form className="form-inline mr-auto d-flex justify-content-md-center">
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="input-search-custom"
                                    className="form-control bg-light text-dark"
                                />
                                <div className="input-group-append">
                                    <span className="btn btn-sm btn-second">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                        <ul className="navbar-nav float-md-right">
                            <li className="nav-item mr-2">
                                <Link
                                    // style={isActive(history, '/cart')}
                                    to="/"
                                    className="nav-link"
                                >
                                    <i className="fas fa-shopping-cart"></i>
                                </Link>
                            </li>
                            {!isAuthenticated() && (
                                <Fragment>
                                    <li className="nav-item">
                                        <Link
                                            style={isActive(history, '/login')}
                                            to="/login"
                                            className="nav-link"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </Fragment>
                            )}

                            {isAuthenticated() && (
                                <Fragment>
                                    <li className="nav-item dropdown float-sm-right">
                                        <span
                                            className="nav-link dropdown-toggle"
                                            id="navbarDropdown"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {firstName()}'S {'  '}
                                            <i className="fas fa-user"></i>
                                        </span>
                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby="navbarDropdown"
                                        >
                                            {isAuthenticated() &&
                                            isAuthenticated().user.role ===
                                                1 ? (
                                                <Link
                                                    to="/admin/dashboard"
                                                    className="dropdown-item"
                                                >
                                                    Dashboard
                                                </Link>
                                            ) : (
                                                <Link
                                                    to="/user/dashboard"
                                                    className="dropdown-item"
                                                >
                                                    Dashboard
                                                </Link>
                                            )}
                                            <Link
                                                to="/"
                                                className="dropdown-item"
                                            >
                                                History
                                            </Link>
                                            <div className="dropdown-divider"></div>
                                            <span
                                                onClick={() => {
                                                    signout(() => {
                                                        history.push('/')
                                                    })
                                                }}
                                                className="dropdown-item"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                SigunOut
                                            </span>
                                        </div>
                                    </li>
                                </Fragment>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default withRouter(Menu)
