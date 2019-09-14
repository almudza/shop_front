import { API } from '../config'

// Signup Method
/**
 *
 * @param {/signup} user
 * signup user to api
 */
export const signup = user => {
    // console.log(name, email, password)
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

/**
 * =========== Signin method and authenticate
 *
 */
/**
 *
 * @param {/signin} user
 *  signin user to api
 */
// SignIn method api
export const signin = user => {
    console.log(user)
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

/**
 *
 * @param {Set data as jwt to loacal storacge} data
 * @param {*} next
 */
export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}
