import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const filterOnChange = (e) => {
        dispatch(setFilter(e.target.value))
    }

    return (
        <div>
            <span>filter </span>
            <input name="filter" type="text" onChange={filterOnChange} />
        </div>
    )
}

export default Filter
