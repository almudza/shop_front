import React from 'react'
import { createProduct } from './apiAdmin'
import Layout from '../core/Layout'
import { goBackAdminDashboard as goBack } from '../components/goBackAdminDashboard'

function AddProduct() {
    return (
        <Layout title="Add Product">
            <div className="row">
                <div className="col-md-8 offset-md-2">Add Product</div>
                {goBack()}
            </div>
        </Layout>
    )
}

export default AddProduct
