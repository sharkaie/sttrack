import React from "react";

const MobileMenuBtn = () => {
  const toggleSidebar = () => {
    if (!document.body.classList.contains("sidebar-enable")) {
      document.body.classList.add("sidebar-enable");
    } else {
      document.body.classList.remove("sidebar-enable");
    }
  };

  return (
    <>
      <button
        className="button-menu-mobile open-left disable-btn"
        onClick={toggleSidebar}
      >
        <i className="mdi mdi-menu"></i>
      </button>
    </>
  );
};

export default MobileMenuBtn;
