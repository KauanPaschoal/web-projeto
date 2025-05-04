import React from "react";
import "./inputField.css";

const InputField = ({ labelTitle, type = "text", placeholder, id, name, onChange, onBlur, list, required, className, value, icon, width, disabled}) => {
  return (
    <div className={`inputContainer ${width || "w-[45%]"}`}>
      <label>{labelTitle}:</label>
      <div className="flex">
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
          value={value}
          className={`inputField ${className}`}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default InputField;
