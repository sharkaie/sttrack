import React from "react";

const TextArea = (props) => {
  return (
    <div className="form-group">
      <label htmlFor="project-overview">{props.label}</label>
      <textarea
        id={props.id}
        name={props.name}
        className={`form-control ${props.extraClass}`}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChanged}
        rows={props.rows}
        
      ></textarea>
    </div>
  );
};

export default TextArea;
