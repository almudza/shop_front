import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './user/Register'
import Login from './user/Login'
import Home from './core/Home'
import Menu from './core/Menu'

const Routes = () => {
    return (
        <BrowserRouter>
            <Menu />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
