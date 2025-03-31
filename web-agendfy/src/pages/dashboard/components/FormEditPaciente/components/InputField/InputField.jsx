import React from 'react'
import './inputField.css'


const InputField = ({labelTitle, type}) => {

    return (
        <div className='inputContainer'>
            <label>{labelTitle}:</label>
            <input type={type ? type : 'text'} className='inputField'/>
        </div>
        
    )
}

export default InputField