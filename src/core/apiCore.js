import { API } from '../config'
import queryString from 'query-string'

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
