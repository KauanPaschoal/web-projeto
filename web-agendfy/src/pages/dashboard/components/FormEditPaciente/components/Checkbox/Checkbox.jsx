import React from 'react'
import './checkbox.css'


const Checkbox = (props) => {

    return (
        <div>
            <input type="checkbox" />
            <label>{props.labelTitle}</label>
        </div>
        
    )
}

export default Checkbox