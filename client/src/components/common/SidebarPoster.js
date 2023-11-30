import React from 'react';
import { Link } from 'react-router-dom';

const SidebarPoster = (props) => {
    return (
        <div className="help-box text-white text-center">
          <a style={{cursor:'pointer'}} onClick={()=>{props.onClose(props.id)}} className="float-right close-btn text-white">
            <i  className="mdi mdi-close"></i>
          </a>
          <img src={props.svgIcon} height="90" alt="Icon Image" />
          <h5 className="mt-3">{props.title}</h5>
          <p className="mb-3">
            {props.description}
          </p>
          <Link to={props.btnClick} className="btn btn-outline-light btn-sm">{props.btnTitle}</Link>
        </div>
    )
}

export default SidebarPoster
