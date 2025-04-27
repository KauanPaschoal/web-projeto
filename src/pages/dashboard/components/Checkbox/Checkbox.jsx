import React from 'react';
import './checkbox.css';

const Checkbox = ({ CheckboxValue, labelTitle, onChange, checked, disabled }) => {
    return (
        <div className={`checkbox-container ${disabled ? 'checkbox-disabled' : ''}`}>
            <input
                type="checkbox"
                value={CheckboxValue}
                onChange={onChange}
                checked={checked}
                disabled={disabled}
            />
            <label className='checkboxLabel'>{labelTitle}</label>
        </div>
    );
};

export default Checkbox;