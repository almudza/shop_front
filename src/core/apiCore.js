import { API } from '../config'

export const getProducts = sortBy => {
    return fetch(`${API}/product?sortBy=${sortBy}&order=desc&imit=6`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}
