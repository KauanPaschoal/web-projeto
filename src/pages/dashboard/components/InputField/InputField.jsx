import React from 'react'
import './inputField.css'


const InputField = ({labelTitle, type = 'text', placeholder, id, name, onChange, onBlur, list, required, className, value, icon}) => {

    return (
        <div className='inputContainer'>
            <label>{labelTitle}:</label>
            <div className="input-with-icon">
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    list={list}
                    required={required}
                    className={`inputField ${className}`}
                    value={value}
                />
            </div>
        </div>
    )
}

export default InputField