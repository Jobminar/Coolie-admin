import React, { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";
import FilterBar from "../FilterBar/FilterBar"; // Import the FilterBar component

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [serviceManagerDropdown, setServiceManagerDropdown] = useState(false);
  const [promotionsDropdown, setPromotionsDropdown] = useState(false);
  const [packagesDropdown, setPackagesDropdown] = useState(false);
  const [marketingDropdown, setMarketingDropdown] = useState(false);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    setActiveItem(path);
    closeAllDropdowns();
    navigate(path);
  };

  const closeAllDropdowns = () => {
    setServiceManagerDropdown(false);
    setPromotionsDropdown(false);
    setPackagesDropdown(false);
    setMarketingDropdown(false);
  };

  const toggleServiceManagerDropdown = () => {
    setServiceManagerDropdown((prev) => !prev);
    closeOtherDropdowns("serviceManager");
  };

  const togglePromotionsDropdown = () => {
    setPromotionsDropdown((prev) => !prev);
    closeOtherDropdowns("promotions");
  };

  const togglePackagesDropdown = () => {
    setPackagesDropdown((prev) => !prev);
    closeOtherDropdowns("packages");
  };

  const toggleMarketingDropdown = () => {
    setMarketingDropdown((prev) => !prev);
    closeOtherDropdowns("marketing");
  };

  const closeOtherDropdowns = (activeDropdown) => {
    if (activeDropdown !== "serviceManager") setServiceManagerDropdown(false);
    if (activeDropdown !== "promotions") setPromotionsDropdown(false);
    if (activeDropdown !== "packages") setPackagesDropdown(false);
    if (activeDropdown !== "marketing") setMarketingDropdown(false);
  };

  const renderFilterBar = () => {
    if (
      activeItem === "/" ||
      activeItem === "/providersrcorner" ||
      activeItem === "/usercorner"
    ) {
      return (
        <FilterBar
          showServiceFilter={
            activeItem !== "/usercorner" && activeItem !== "/providersrcorner"
          }
          showGenderFilter={activeItem === "/usercorner"}
          showPackageFilter={activeItem === "/providersrcorner"}
        />
      );
    }
    return null;
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
          className={`dropdown serviceManagerDropdown ${
            serviceManagerDropdown ? "active" : ""
          }`}
        >
          <div onClick={toggleServiceManagerDropdown}>
            Service Manager <FaCaretDown />
          </div>
          {serviceManagerDropdown && (
            <div className="dropdown-menu">
              <div onClick={() => handleNavigation("/addservice")}>
                Add Service
              </div>
              <div onClick={() => handleNavigation("/manageservice")}>
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
          className={`dropdown promotionsDropdown ${
            promotionsDropdown ? "active" : ""
          }`}
        >
          <div onClick={togglePromotionsDropdown}>
            Promotions <FaCaretDown />
          </div>
          {promotionsDropdown && (
            <div className="dropdown-menu">
              <div onClick={() => handleNavigation("/userpromotion")}>
                User Promotions
              </div>
              <div onClick={() => handleNavigation("/providerpromotion")}>
                Provider Promotions
              </div>
            </div>
          )}
        </div>
        <div
          className={`dropdown packagesDropdown ${
            packagesDropdown ? "active" : ""
          }`}
        >
          <div onClick={togglePackagesDropdown}>
            Packages <FaCaretDown />
          </div>
          {packagesDropdown && (
            <div className="dropdown-menu">
              <div onClick={() => handleNavigation("/userpackages")}>
                User Packages
              </div>
              <div onClick={() => handleNavigation("/providerpackages")}>
                Provider Packages
              </div>
            </div>
          )}
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
          className={`dropdown marketingDropdown ${
            marketingDropdown ? "active" : ""
          }`}
        >
          <div onClick={toggleMarketingDropdown}>
            Marketing <FaCaretDown />
          </div>
          {marketingDropdown && (
            <div className="dropdown-menu marketing-dropdown-menu">
              <div onClick={() => handleNavigation("/user")}>User</div>
              <div onClick={() => handleNavigation("/provider")}>Provider</div>
              <div onClick={() => handleNavigation("/non-user")}>Non-User</div>
            </div>
          )}
        </div>
      </div>
      <main>
        {renderFilterBar()}
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
