import { API } from '../config'
import queryString from 'query-string'

/**
 * ==============@NOTE JSON TYPE of server api commincate==
 * ===============@JSON or @OBJECT =======================
 *
 */
//  if data from front end or input = Object type and then store to
//  api where use json to communicate
// if data send from api or server api is Json type not
// to be change to object

export const getProducts = sortBy => {
    return fetch(`${API}/product?sortBy=${sortBy}&order=desc&imit=6`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

// Show Product by filter
export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters,
    }

    return fetch(`${API}/product/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

// Serach List
export const listSearch = params => {
    const query = queryString.stringify(params)
    console.log('query', query)
    return fetch(`${API}/product/search?${query}`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

// Show product detail
export const read = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

// Related Product
export const listRelated = productId => {
    return fetch(`${API}/product/related/${productId}`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

// Braintree GetToken
export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

// Braintree payment
// post to database and response
export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

/**
 * ================ Order Create to backend api server -=========
 * =============@method POST ======================
 * ==============@url /api/order/create/:userId =====
 */

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order: createOrderData }),
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
