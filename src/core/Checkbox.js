import React, { useState } from 'react'

function Checkbox({ categories, handleFilters }) {
    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {
        // return the first index or -1
        // console.log('check is ', checked)
        // indexOf c === -1 cause value checked is -1 (pertama dari belakang)
        const currentCategoryId = checked.indexOf(c)
        // console.log('currentCategoryId', currentCategoryId)
        const newCheckedCategoryId = [...checked]
        // if currently checked was not already in hecked state > push
        // else pull /take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c)
        } else {
            // and remove where currentCategoryId = id checked with 1 item
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        // console.log('newCheckedCategoryId', newCheckedCategoryId)
        setChecked(newCheckedCategoryId)

        // passing data to parent / Shop
        handleFilters(newCheckedCategoryId)
    }

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input
                type="checkbox"
                id={`checkitem-${c._id}`}
                className="form-check-input"
                onChange={handleToggle(c._id)}
                value={checked.indexOf(c._id === -1)}
            />
            <label htmlFor={`checkitem-${c._id}`} className="form-check-label">
                {c.name}{' '}
            </label>
        </li>
    ))
}

export default Checkbox
