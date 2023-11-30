import React from "react";

const Tdata = (props) => {
  return <td className={props.className} width={props.width} style={props.styles}>{props.children}</td>;
};

export default Tdata;
