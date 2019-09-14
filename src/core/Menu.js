import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ffff' }
    } else {
        return { color: 'hsla(0,0%,100%,.5)' }
    }
}

const Menu = ({ history }) => {
    return (
        <div className="">
            <nav className="navbar navbar-expand-sm navbar-dark bg-main mb-2">
                <div className="container">
                    <span className="navbar-brand">Home</span>
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
                            <li className="nav-item">
                                <Link
                                    to="/about"
                                    className="nav-link"
                                    style={isActive(history, '/about')}
                                >
                                    About
                                </Link>
                            </li>
                        </ul>

                        {/* This is a right Menu */}
                        <ul className="navbar-nav float-sm-right">
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
                                    style={isActive(history, '/register')}
                                >
                                    Register
                                </Link>
                            </li>
                        </ul>
                        {/* <ul className="navbar-nav float-sm-right">
                            <li className="nav-item dropdown float-sm-right">
                                <span
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdown"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Mudza's
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
                                    <Link className="dropdown-item">
                                        SignOut
                                    </Link>
                                </div>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(Menu)
