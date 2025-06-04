import React from "react";
import { FaPen } from "react-icons/fa";
import "./EditButton.css";

const EditButton = ({ onClick, text = "Editar", className = "" }) => {
  return (
    <button
      type="button"
      className={`btn_agendamento rounded-full edit_button btn_primario flex items-center gap-2 ${className}`}
      onClick={onClick}
    >
      <FaPen />
      {text}
    </button>
  );
};

export default EditButton;
