import { API } from '../config'

/**
 * ======= Create Category
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
