import React, { useState } from 'react'
import Category from './Category'
import Text from './Text'
const CustomeForm = () => {
    const [data, setData] = useState(null)
    const handleAddField = () => {
        setData(<Text />)
    };
    return (
        <div>
            <Category />
            <button onClick={handleAddField}>Add Field</button>
            {data}
        </div>
    )
}

export default CustomeForm