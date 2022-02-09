import React from "react";

const Button = props => {
  return (
    <button onClick={props.onClick} className="p-3 rounded-lg bg-orange-400">{props.name}</button>
  );
};

export default Button;