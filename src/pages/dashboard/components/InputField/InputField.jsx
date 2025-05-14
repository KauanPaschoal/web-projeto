import React from "react";
import "./inputField.css";

const InputField = ({ labelTitle, type = "text", placeholder, id, name, onChange, onBlur, list, required, className, value, icon, width, disabled, maxLength}) => {
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
          className={`inputField ${width || "w-[100%]"}`}
          disabled={disabled}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
};

export default InputField;
