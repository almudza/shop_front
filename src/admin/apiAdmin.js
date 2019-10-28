import { API } from '../config'

/**
 * =======  CATEGORY ====================================
 */

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    })
        .then(responese => {
            return responese.json()
        })
        .catch(err => console.log(err))
}

/**
 * ================ PRODUCT ====================================
 *
 */

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: product,
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

/**
 * ==================== GET Categories ==================
 */

export const getCategories = () => {
    return fetch(`${API}/category/all`, {
        method: 'GET',
    })
        .then(responese => {
            return responese.json()
        })
        .catch(err => console.log(err))
}

/**
 * =============@method GET ======================================
 * =============@url /api/order/list/:userId ==================
 * =============@desc get show all Orders authenticated by Admin ============
 */

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
