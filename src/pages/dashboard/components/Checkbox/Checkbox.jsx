import React from 'react';
import './checkbox.css';

const Checkbox = ({ CheckboxValue, labelTitle, onChange, checked, disabled }) => {
    return (
        <div className={`checkbox-container ${disabled ? 'checkbox-disabled' : ''}`}>
            <label class="switch">
                <input type="checkbox"
                value={CheckboxValue}
                onChange={onChange}
                checked={checked}
                disabled={disabled}
                />
                <span class="slider"></span>
            </label>
            <label className='checkboxLabel'>{labelTitle}</label>
        </div>
    );
};

export default Checkbox;