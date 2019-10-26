import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../user/auth'
import { getBraintreeClientToken, processPayment } from './apiCore'
import DropIn from 'braintree-web-drop-in-react'
import { emptyCart } from './cartHelpers'

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: '',
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                setData({
                    ...data,
                    error: data.error,
                })
            } else {
                setData({
                    clientToken: data.clientToken,
                })
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            console.log('currentValue', currentValue, 'next', nextValue.count)
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropin()}</div>
        ) : (
            <Link to="/login">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        )
    }

    const buy = () => {
        // send the nonce to your server
        // nonce = data.instance.requestPaymenMethod()
        let nonce
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                // console.log(data)
                nonce = data.nonce
                // once you have nonce (card typr, card number) send nonce as 'PaymentMrthodNonce'
                // and also total to be charged
                // console.log(
                //     'send nonce and total to process',
                //     nonce,
                //     getTotal(products)
                // )

                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products),
                }

                processPayment(userId, token, paymentData)
                    .then(response => {
                        setData({
                            ...data,
                            success: response.success,
                        })

                        // called Remove cart item
                        emptyCart(() => {
                            setRun(!run)
                            setData({
                                success: true,
                            })
                            console.log('transaction success and remove item')
                        })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                // console.log('dropin error : ', error)
                setData({ ...data, error: error.message })
            })
    }

    const showDropin = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button onClick={buy} className="btn btn-success">
                        Pay
                    </button>
                </div>
            ) : null}
        </div>
    )

    const showError = error => (
        <div
            className="alert alert-danger"
            style={{ display: error ? '' : 'none' }}
        >
            {error}
        </div>
    )

    const showSuccess = success => (
        <div
            className="alert alert-info"
            style={{ display: success ? '' : 'none' }}
        >
            Thanks... Your payment was successful!
        </div>
    )

    return (
        <div>
            <h2>Total : ${getTotal()}</h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
}

export default Checkout
