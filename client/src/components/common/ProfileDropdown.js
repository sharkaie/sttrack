import React, { useState } from "react";
import { Link } from 'react-router-dom'


const ProfileDropdown = (props) => {

    const [dropdownState,setDropdownState] = useState(false);

    const toggleDropdown = () => {
        setDropdownState(!dropdownState);
    }

    let dropwdownStyle = {};

    if(dropdownState){
        dropwdownStyle = {
            position:'absolute',
            transform: 'translate3d(13px, 70px, 0px)',
            willChange: 'transform'
        }
    }else{
        dropwdownStyle = {};
    }
    

  return (
    <>
      <li className={`dropdown notification-list ${dropdownState ? 'show' : ''}`}>
        <a
          className="nav-link dropdown-toggle nav-user arrow-none mr-0"
          role="button" onClick={toggleDropdown}
        >
          <span className="account-user-avatar">
            <img src={props.userPic} alt="user-image" className="rounded-circle" />
          </span>
          <span>
            <span className="account-user-name">{`Hi, ${props.firstname}`}</span>
            <span className="account-position">Student</span>
          </span>
        </a>
        <div className={`dropdown-menu dropdown-menu-right dropdown-menu-animated topbar-dropdown-menu profile-dropdown ${dropdownState ? 'show' : ''}`} style={dropwdownStyle} x-placement='bottom-end'>
          <div className=" dropdown-header noti-title">
            <h6 className="text-overflow m-0">Welcome !</h6>
          </div>

            {props.links.map((obj, index)=>{
                return (
                    <Link key={index} to={obj.toLink} className="dropdown-item notify-item">
                        <i className={`mdi mdi-${obj.linkIcon} mr-1`}></i>
                        <span>{obj.linkTitle}</span>
                    </Link>
                )
            })}
            <a onClick={props.onLogout} role="button" className="dropdown-item notify-item">
            <i className={`mdi mdi-${props.logout_linkIcon} mr-1`}></i>
                        <span>{props.logout_linkTitle}</span>
            </a>

          

          {/* <Link className="dropdown-item notify-item">
            <i className="mdi mdi-account-edit mr-1"></i>
            <span>Settings</span>
          </Link>

          <Link className="dropdown-item notify-item">
            <i className="mdi mdi-lifebuoy mr-1"></i>
            <span>Support</span>
          </Link>

          <Link className="dropdown-item notify-item">
            <i className="mdi mdi-lock-outline mr-1"></i>
            <span>Lock Screen</span>
          </Link>

          <Link className="dropdown-item notify-item">
            <i className="mdi mdi-logout mr-1"></i>
            <span>Logout</span>
          </Link> */}
        </div>
      </li>
    </>
  );
};

export default ProfileDropdown;
