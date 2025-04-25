import React from "react";
import { FaEdit } from "react-icons/fa";
import "./EditButton.css";

const EditButton = ({ onClick, text = "Editar" }) => {
  return (
    <button
      type="button"
      className="edit_button btn_primario flex items-center gap-2"
      onClick={onClick}
    >
      <FaEdit />
      {text}
    </button>
  );
};

export default EditButton;
