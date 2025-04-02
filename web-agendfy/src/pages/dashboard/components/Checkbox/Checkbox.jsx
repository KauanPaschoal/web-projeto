import React from 'react'
import './checkbox.css'


const Checkbox = ({ CheckboxValue, labelTitle }) => {

    return (
        <div>
            <input type="checkbox" value={CheckboxValue} />
            <label className='checkboxLabel'>{labelTitle}</label>
        </div>

    )
}

export default Checkbox