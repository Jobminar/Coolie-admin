import React, { useContext, useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";
import FilterBar from "../FilterBar/FilterBar";
import PropTypes from "prop-types";
import { FilterBarContext } from "../../FilterBarContext";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filterBarProps, setFilterBarProps } = useContext(FilterBarContext);
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [serviceManagerDropdown, setServiceManagerDropdown] = useState(false);
  const [promotionsDropdown, setPromotionsDropdown] = useState(false);
  const [packagesDropdown, setPackagesDropdown] = useState(false);
  const [marketingDropdown, setMarketingDropdown] = useState(false);
  const [bannersDropdown, setBannersDropdown] = useState(false);
  const [inductionDropdown, setInductionDropdown] = useState(false);
  const [activeDropdownItem, setActiveDropdownItem] = useState("");

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path, dropdownItem = "") => {
    setActiveItem(path);
    if (dropdownItem) {
      setActiveDropdownItem(dropdownItem);
    } else {
      setActiveDropdownItem("");
    }
    // Only close dropdowns if navigating to a non-dropdown item
    if (!dropdownItem) {
      closeAllDropdowns();
    }
    navigate(path);
  };

  const closeAllDropdowns = () => {
    setServiceManagerDropdown(false);
    setPromotionsDropdown(false);
    setPackagesDropdown(false);
    setMarketingDropdown(false);
    setBannersDropdown(false);
    setInductionDropdown(false);
  };

  const toggleServiceManagerDropdown = () => {
    setServiceManagerDropdown((prev) => !prev);
    closeOtherDropdowns("serviceManager");
    // Do not set activeItem to the dropdown path
  };

  const togglePromotionsDropdown = () => {
    setPromotionsDropdown((prev) => !prev);
    closeOtherDropdowns("promotions");
    // Do not set activeItem to the dropdown path
  };

  const togglePackagesDropdown = () => {
    setPackagesDropdown((prev) => !prev);
    closeOtherDropdowns("packages");
    // Do not set activeItem to the dropdown path
  };

  const toggleMarketingDropdown = () => {
    setMarketingDropdown((prev) => !prev);
    closeOtherDropdowns("marketing");
    // Do not set activeItem to the dropdown path
  };

  const toggleBannersDropdown = () => {
    setBannersDropdown((prev) => !prev);
    closeOtherDropdowns("banners");
    // Do not set activeItem to the dropdown path
  };

  const toggleInductionDropdown = () => {
    setInductionDropdown((prev) => !prev);
    closeOtherDropdowns("induction");
    // Do not set activeItem to the dropdown path
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
    const filterBarExcludedComponents = [
      "/loyalitycards",
      "/userbanners",
      "/providerbanners",
      "/popupbanners",
      "/promotionsDropdown",
      "/userpromotion",
      "/providerpromotions",
      "/packagesDropdown",
      "/userpackages",
      "/providerpackages",
      "/inductionDropdown",
      "/induction",
      "/training",
      "/subadmin",
      "/inductionmain",
      "/marketingDropdown",
      "/user",
      "/provider",
      "/non-user",
    ];

    if (filterBarExcludedComponents.includes(activeItem)) {
      return null;
    }

    let activeComponentName = "";

    if (activeItem === "/") {
      activeComponentName = "Jobs Area";
    } else if (activeItem === "/providersrcorner") {
      activeComponentName = "Providers Corner";
    } else if (activeItem === "/usercorner") {
      activeComponentName = "User Corner";
    } else if (activeItem === "/serviceManagerDropdown") {
      activeComponentName = "Service Manager";
    }

    return (
      <FilterBar
        {...filterBarProps}
        showServiceFilter={
          activeItem !== "/usercorner" &&
          activeItem !== "/providersrcorner" &&
          !(
            activeItem === "/providersrcorner" &&
            filterBarProps.activeComponentState !== "list"
          )
        }
        showGenderFilter={activeItem === "/usercorner"}
        showPackageFilter={
          activeItem === "/providersrcorner" &&
          filterBarProps.activeComponentState === "list"
        }
        showLocationFilter={
          !(
            activeItem === "/providersrcorner" &&
            filterBarProps.activeComponentState === "view"
          )
        }
        showDateFilter={
          !(
            activeItem === "/providersrcorner" &&
            filterBarProps.activeComponentState === "manage"
          )
        }
        activeComponent={activeComponentName}
      />
    );
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
                className={`dropdown-item ${
                  activeDropdownItem === "addservice" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/addservice", "Add Service")}
              >
                Add Service
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "manageservice" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/manageservice", "Manage Service")
                }
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
                className={`dropdown-item ${
                  activeDropdownItem === "userbanners" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/userbanners", "User Banners")}
              >
                User Banners
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "providerbanners" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/providerbanners", "Provider Banners")
                }
              >
                Provider Banners
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "popupbanners" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/popupbanners", "Popup Banner")
                }
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
                className={`dropdown-item ${
                  activeDropdownItem === "userpromotion" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/userpromotion", "User Promotions")
                }
              >
                User Promotions
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "providerpromition" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/providerpromition", "Provider Promotions")
                }
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
                className={`dropdown-item ${
                  activeDropdownItem === "userpackages" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/userpackages", "User Packages")
                }
              >
                User Packages
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "providerpackages" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/providerpackages", "Provider Packages")
                }
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
              <div
                className={activeItem === "/induction" ? "active" : ""}
                onClick={() => handleNavigation("/inductionmain")}
              >
                Induction
              </div>
              <div
                className={activeItem === "/trainingcon" ? "active" : ""}
                onClick={() => handleNavigation("/trainingcon")}
              >
                Training main
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
          Induction Main
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
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "user" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/user", "User")}
              >
                User
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "provider" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/provider", "Provider")}
              >
                Provider
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "non-user" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/non-user", "Non-User")}
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
