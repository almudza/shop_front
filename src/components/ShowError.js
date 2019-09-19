import React from 'react'

const showError = error => (
    <div
        style={{ display: error ? '' : 'none' }}
        className="alert alert-danger"
    >
        {error}
    </div>
)

export default showError
