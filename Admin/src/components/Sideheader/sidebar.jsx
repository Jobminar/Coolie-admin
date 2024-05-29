import React, { useState } from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("/");

  const handleNavigation = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <div className="mainContainer">
      <div className="sidebar">
        <div
          className={activeItem === "/" ? "active" : ""}
          onClick={() => handleNavigation("/")}
        >
          Jobs Area
        </div>
        <div
          className={activeItem === "/servermanager" ? "active" : ""}
          onClick={() => handleNavigation("/servermanager")}
        >
          Server manager
        </div>
        <div
          className={activeItem === "/usercorner" ? "active" : ""}
          onClick={() => handleNavigation("/usercorner")}
        >
          User Corner
        </div>
        <div
          className={activeItem === "/providersrcorner" ? "active" : ""}
          onClick={() => handleNavigation("/providersrcorner")}
        >
          Providers Corner
        </div>
        <div
          className={activeItem === "/loyalitycards" ? "active" : ""}
          onClick={() => handleNavigation("/loyalitycards")}
        >
          Loyality Cards
        </div>
        <div
          className={activeItem === "/banners" ? "active" : ""}
          onClick={() => handleNavigation("/banners")}
        >
          Banners
        </div>
        <div
          className={activeItem === "/accounting" ? "active" : ""}
          onClick={() => handleNavigation("/accounting")}
        >
          Accounting
        </div>
        <div
          className={activeItem === "/marketing" ? "active" : ""}
          onClick={() => handleNavigation("/marketing")}
        >
          Marketing
        </div>
        <div
          className={activeItem === "/subadmin" ? "active" : ""}
          onClick={() => handleNavigation("/subadmin")}
        >
          Sub-Admin
        </div>
        <div
          className={activeItem === "/inductionmain" ? "active" : ""}
          onClick={() => handleNavigation("/inductionmain")}
        >
          Induction
        </div>
        <div
          className={activeItem === "/promotion" ? "active" : ""}
          onClick={() => handleNavigation("/promotion")}
        >
          Promotion
        </div>
       
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
