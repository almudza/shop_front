import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './user/Register'
import Login from './user/Login'
import Home from './core/Home'
import PrivateRoute from './user/UserPrivateRoute'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './user/AdminRoute'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <PrivateRoute
                    path="/user/dashboard"
                    exact
                    component={UserDashboard}
                />
                <AdminRoute
                    path="/admin/dashboard"
                    exact
                    component={AdminDashboard}
                />
                <AdminRoute
                    path="/create/category"
                    exact
                    component={AddCategory}
                />
                <AdminRoute
                    path="/create/product"
                    exact
                    component={AddProduct}
                />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
