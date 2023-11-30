import React from "react";

const Trow = (props) => {
  return (
    <tr className={props.className}>
      {props.children}
    </tr>
  );
};

export default Trow;
