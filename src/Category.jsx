import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changefiled } from './dataSlice'
const Category = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <select onChange={(e) => dispatch(changefiled(e.target.value))}>
                <option value="...Select">...Select</option>
                <option value="text">Text</option>
                <option value="dropdown">Dropdown</option>
                <option value="date">Date</option>
            </select>
        </div>
    )
}

export default Category