import { FaPaperPlane } from "react-icons/fa";
import "./sendButton.css";

const SendButton = ({
  type = "button",
  textContent = "Enviar",
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={`send-btn ${disabled ? "send-btn-disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <FaPaperPlane />
      {textContent}
    </button>
  );
};

export default SendButton;
