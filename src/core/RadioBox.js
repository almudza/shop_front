import React, { useState } from 'react'

function RadioBox({ prices, handleFilters }) {
    const [value, setValue] = useState(0)

    const handleChange = e => {
        handleFilters(e.target.value)
        setValue(e.target.value)
    }

    return prices.map((pr, i) => (
        <div key={i}>
            <input
                type="radio"
                name={pr}
                id={`rad-${pr._id}`}
                className="mx-2"
                onChange={handleChange}
                value={`${pr._id}`}
            />
            <label htmlFor={`rad-${pr._id}`} className="from-check-label">
                {pr.name}{' '}
            </label>
        </div>
    ))
}

export default RadioBox
