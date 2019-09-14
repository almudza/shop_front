import React from 'react'

export const showError = error => (
    <div
        style={{ display: error ? '' : 'none' }}
        className="alert alert-danger"
    >
        {error}
    </div>
)
