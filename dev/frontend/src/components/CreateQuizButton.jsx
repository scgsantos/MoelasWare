import React from "react";
import { useNavigate } from "react-router-dom";

function Button(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.to);
  };

  return (
    <button onClick={handleClick} className={props.className}>
      {props.text}
    </button>
  );
}

export default Button;
