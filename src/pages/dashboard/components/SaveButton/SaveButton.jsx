import React from "react";
import { FaSave } from "react-icons/fa";
import "./saveButton.css";

const SaveButton = ({
  type = "button",
  textContent = "Salvar Alterações",
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      className="save-btn"
      onClick={onClick}
      disabled={disabled}
    >
      <FaSave />
      {textContent}
    </button>
  );
};

export default SaveButton;
