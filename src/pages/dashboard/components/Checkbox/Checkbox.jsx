import React from 'react';
import './checkbox.css';

const Checkbox = ({ CheckboxValue, labelTitle, onChange, checked }) => {
    return (
        <div>
            <input
                type="checkbox"
                value={CheckboxValue}
                onChange={onChange}
                checked={checked}
            />
            <label className='checkboxLabel'>{labelTitle}</label>
        </div>
    );
};

export default Checkbox;