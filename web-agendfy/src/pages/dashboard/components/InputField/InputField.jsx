import React from 'react'
import './inputField.css'


const InputField = ({labelTitle, type, placeholder}) => {

    return (
        <div className='inputContainer'>
            <label>{labelTitle}:</label>
            <input type={type ? type : 'text'} placeholder={placeholder} className='inputField'/>
        </div>
        
    )
}

export default InputField