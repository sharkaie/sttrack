import React, { useState } from "react";
import SidebarLink from "./SidebarLink";
import logo from "../../images/logo-dark.png";
import logoSm from "../../images/logo_sm.png";
import logod from "../../images/logo-dark.png";
import logoSmd from "../../images/logo_sm_dark.png";
import { Link } from "react-router-dom";
import SidebarNavGroup from "./SidebarNavGroup";
import helpIcon from "../../images/help-icon.svg";

const SideBar = (props) => {
  const dismissHandler = (id) => {
    setsideBarPosters((oldItems) => {
      return oldItems.filter((arr, index) => {
        return index != id;
      });
    });
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  }
  window.addEventListener('resize', handleResize);

  if (764 < screenWidth && screenWidth < 1034) {
    document.body.dataset.leftbarCompactMode = 'condensed';
  } else {
    document.body.dataset.leftbarCompactMode = '';
  }

  const [sideBarPosters, setsideBarPosters] = useState([
    {
      svgIcon: helpIcon,
      title: "Unlimited Access",
      description: "PLease share with your Friends",
      btnTitle: "Comming soon",
      onCLose: dismissHandler,
      btnClick: "/dashboard",
    },
  ]);

  return (
    <div className="left-side-menu">
      <Link to="/dashboard" className="logo text-center logo-light">
        <span className="logo-lg">
          <img src={logo} alt="" height="16" />
        </span>
        <span className="logo-sm">
          <img src={logoSm} alt="" height="16" />
        </span>
      </Link>

      <Link to="/dashboard" className="logo text-center logo-dark">
        <span className="logo-lg">
          <img src={logod} alt="" height="16" />
        </span>
        <span className="logo-sm">
          <img src={logoSmd} alt="" height="16" />
        </span>
      </Link>

      <div className="h-100" id="left-side-menu-container" data-simplebar>
        <ul className="metismenu side-nav">
          {props.links.map((arr, index1) => {
            return (
              <React.Fragment key={index1 + 'c'}>
                <SidebarNavGroup key={index1} title={arr.group} />
                {arr.links.map((link, index2) => {
                  return <SidebarLink key={index2} id={index2} title={link.title} linkTo={link.path} iconName={`uil-${link.icon}`} />
                })}
              </React.Fragment>
            );
          })}
        </ul>

        {/* <Posters poster={sideBarPosters} /> */}

        <div className="clearfix"></div>
      </div>
    </div>
  );
};

export default SideBar;
