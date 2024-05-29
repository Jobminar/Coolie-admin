import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("/");
  const [serviceManagerDropdown, setServiceManagerDropdown] = useState(false);

  const handleNavigation = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  const toggleServiceManagerDropdown = () => {
    setServiceManagerDropdown((prev) => !prev);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div
          className={activeItem === "/" ? "active" : ""}
          onClick={() => handleNavigation("/")}
        >
          Jobs Area
        </div>
        <div className={`dropdown ${serviceManagerDropdown ? "active" : ""}`}>
          <div
            className={
              activeItem === "/servermanager" || activeItem === "/manageservice"
                ? "active"
                : ""
            }
            onClick={toggleServiceManagerDropdown}
          >
            Service Manager <FaCaretDown />
          </div>
          {serviceManagerDropdown && (
            <div className="dropdown-menu">
              <div
                className={activeItem === "/addservice" ? "active" : ""}
                onClick={() => handleNavigation("/addservice")}
              >
                Add Service
              </div>
              <div
                className={activeItem === "/manageservice" ? "active" : ""}
                onClick={() => handleNavigation("/manageservice")}
              >
                Manage Service
              </div>
            </div>
          )}
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
          Loyalty Cards
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
