import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SidebarLink = (props) => {
  return (
    <React.Fragment key={props.id}>
      <li
        className={
          useLocation().pathname === props.linkTo
            ? "side-nav-item mm-active"
            : "side-nav-item"
        }
      >
        <NavLink
          activeClassName="active"
          to={props.linkTo}
          className="side-nav-link"
          onClick={()=>{document.body.classList.remove("sidebar-enable")}}
        >
          <i key={props.id + 'a'} className={props.iconName}></i>
          <span key={props.id + 'b'}> {props.title} </span>
        </NavLink>
      </li>
    </React.Fragment>
  );
};

export default SidebarLink;
