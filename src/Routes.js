import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './user/Register'
import Login from './user/Login'
import Home from './core/Home'
import PrivateRoute from './user/UserPrivateRoute'
import UserDashboard from './user/UserDashboard'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <PrivateRoute
                    path="/dashboard"
                    exact
                    component={UserDashboard}
                />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
