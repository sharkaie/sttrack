import React from "react";

const Input = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        className={`form-control ${props.extraClass}`}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChanged}
        autoFocus={props.focus?true:false}
      />
    </div>
  );
};

export default Input;
