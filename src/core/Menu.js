import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../user/auth'

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

const Menu = ({ history }) => {
    return (
        <div className="">
            <nav className="navbar navbar-expand-sm navbar-dark bg-main mb-2">
                <div className="container">
                    <span
                        style={{ cursor: 'pointer' }}
                        className="navbar-brand"
                    >
                        Home
                    </span>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className="nav-link"
                                    style={isActive(history, '/')}
                                >
                                    Shop
                                </Link>
                            </li>
                        </ul>

                        {/* Seatch form Product */}
                        {/* <div className="d-flex justify-content-center h-100">
                            <div className="searchbar">
                                <input
                                    className="search_input"
                                    type="text"
                                    name=""
                                    placeholder="Search..."
                                />
                                <span className="search_icon">
                                    <i className="fas fa-search"></i>
                                </span>
                            </div>
                        </div> */}
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

                        {/* This is a right Menu */}
                        <ul className="navbar-nav float-sm-right">
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
                                    <li className="nav-item">
                                        <Link
                                            to="/register"
                                            className="nav-link"
                                            style={isActive(
                                                history,
                                                '/register'
                                            )}
                                        >
                                            Register
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
                                            <Link className="dropdown-item">
                                                Profile
                                            </Link>
                                            <Link className="dropdown-item">
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
                                                SignOut
                                            </span>
                                        </div>
                                    </li>
                                </Fragment>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(Menu)
