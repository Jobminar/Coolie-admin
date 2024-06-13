import React, { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";
import FilterBar from "../FilterBar/FilterBar"; // Import the FilterBar component
import PropTypes from "prop-types";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [serviceManagerDropdown, setServiceManagerDropdown] = useState(false);
  const [promotionsDropdown, setPromotionsDropdown] = useState(false);
  const [packagesDropdown, setPackagesDropdown] = useState(false);
  const [marketingDropdown, setMarketingDropdown] = useState(false);
  const [bannersDropdown, setBannersDropdown] = useState(false);
  const [inductionDropdown, setInductionDropdown] = useState(false); // Add state for Induction dropdown

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
    setBannersDropdown(false);
    setInductionDropdown(false); // Close Induction dropdown
  };

  const toggleServiceManagerDropdown = () => {
    setServiceManagerDropdown((prev) => !prev);
    closeOtherDropdowns("serviceManager");
    setActiveItem("/serviceManagerDropdown");
  };

  const togglePromotionsDropdown = () => {
    setPromotionsDropdown((prev) => !prev);
    closeOtherDropdowns("promotions");
    setActiveItem("/promotionsDropdown");
  };

  const togglePackagesDropdown = () => {
    setPackagesDropdown((prev) => !prev);
    closeOtherDropdowns("packages");
    setActiveItem("/packagesDropdown");
  };

  const toggleMarketingDropdown = () => {
    setMarketingDropdown((prev) => !prev);
    closeOtherDropdowns("marketing");
    setActiveItem("/marketingDropdown");
  };

  const toggleBannersDropdown = () => {
    setBannersDropdown((prev) => !prev);
    closeOtherDropdowns("banners");
    setActiveItem("/bannersDropdown");
  };

  const toggleInductionDropdown = () => {
    setInductionDropdown((prev) => !prev);
    closeOtherDropdowns("induction");
    setActiveItem("/inductionDropdown");
  };

  const closeOtherDropdowns = (activeDropdown) => {
    if (activeDropdown !== "serviceManager") setServiceManagerDropdown(false);
    if (activeDropdown !== "promotions") setPromotionsDropdown(false);
    if (activeDropdown !== "packages") setPackagesDropdown(false);
    if (activeDropdown !== "marketing") setMarketingDropdown(false);
    if (activeDropdown !== "banners") setBannersDropdown(false);
    if (activeDropdown !== "induction") setInductionDropdown(false);
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
          Loyality cards
        </div>
        <div
          className={`dropdown bannersDropdown ${
            bannersDropdown ? "active" : ""
          }`}
        >
          <div onClick={toggleBannersDropdown}>
            Banners <FaCaretDown />
          </div>
          {bannersDropdown && (
            <div className="dropdown-menu">
              <div
                className={activeItem === "/userbanners" ? "active" : ""}
                onClick={() => handleNavigation("/userbanners")}
              >
                User Banners
              </div>
              <div
                className={activeItem === "/providerbanners" ? "active" : ""}
                onClick={() => handleNavigation("/providerbanners")}
              >
                Provider Banners
              </div>
              <div
                className={activeItem === "/popupbanners" ? "active" : ""}
                onClick={() => handleNavigation("/popupbanners")}
              >
                Popup Banner
              </div>
            </div>
          )}
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
              <div
                className={activeItem === "/userpromotion" ? "active" : ""}
                onClick={() => handleNavigation("/userpromotion")}
              >
                User Promotions
              </div>
              <div
                className={activeItem === "/providerpromitions" ? "active" : ""}
                onClick={() => handleNavigation("/providerpromitions")}
              >
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
              <div
                className={activeItem === "/userpackages" ? "active" : ""}
                onClick={() => handleNavigation("/userpackages")}
              >
                User Packages
              </div>
              <div
                className={activeItem === "/providerpackages" ? "active" : ""}
                onClick={() => handleNavigation("/providerpackages")}
              >
                Provider Packages
              </div>
            </div>
          )}
        </div>
        <div
          className={`dropdown inductionDropdown ${
            inductionDropdown ? "active" : ""
          }`}
        >
          <div onClick={toggleInductionDropdown}>
            Induction & Training <FaCaretDown />
          </div>
          {inductionDropdown && (
            <div className="dropdown-menu">
              {/* <div
                className={activeItem === "/induction" ? "active" : ""}
                onClick={() => handleNavigation("/inductionmain")}
              >
                Induction
              </div>
              <div
                className={activeItem === "/training" ? "active" : ""}
                onClick={() => handleNavigation("/training")}
              >
                Training
              </div> */}
            </div>
          )}
        </div>
        <div
          className={activeItem === "/subadmin" ? "active" : ""}
          onClick={() => handleNavigation("/subadmin")}
        >
          Sub-Admin
        </div>
        {/* <div
          className={activeItem === "/inductionmain" ? "active" : ""}
          onClick={() => handleNavigation("/inductionmain")}
        >
          Induction Main
        </div> */}
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
              <div
                className={activeItem === "/user" ? "active" : ""}
                onClick={() => handleNavigation("/user")}
              >
                User
              </div>
              <div
                className={activeItem === "/provider" ? "active" : ""}
                onClick={() => handleNavigation("/provider")}
              >
                Provider
              </div>
              <div
                className={activeItem === "/non-user" ? "active" : ""}
                onClick={() => handleNavigation("/non-user")}
              >
                Non-User
              </div>
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

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
