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

  // Add your new items here
  const handleInclusionsNavigation = () => {
    handleNavigation("/inclusions-exclusions");
  };

  const handleFAQNavigation = () => {
    handleNavigation("/faq");
  };

  const toggleServiceManagerDropdown = () => {
    setServiceManagerDropdown((prev) => !prev);
    closeOtherDropdowns("serviceManager");
    if (!serviceManagerDropdown) {
      handleNavigation("/addservice", "Add Service");
    }
  };

  const togglePromotionsDropdown = () => {
    setPromotionsDropdown((prev) => !prev);
    closeOtherDropdowns("promotions");
    if (!promotionsDropdown) {
      handleNavigation("/user-promotion", "User Promotions");
    }
  };

  const togglePackagesDropdown = () => {
    setPackagesDropdown((prev) => !prev);
    closeOtherDropdowns("packages");
    if (!packagesDropdown) {
      handleNavigation("/user-packages", "User Packages");
    }
  };

  const toggleMarketingDropdown = () => {
    setMarketingDropdown((prev) => !prev);
    closeOtherDropdowns("marketing");
    if (!marketingDropdown) {
      handleNavigation("/user", "User");
    }
  };

  const toggleBannersDropdown = () => {
    setBannersDropdown((prev) => !prev);
    closeOtherDropdowns("banners");
    if (!bannersDropdown) {
      handleNavigation("/user-banners", "User Banners");
    }
  };

  const toggleInductionDropdown = () => {
    setInductionDropdown((prev) => !prev);
    closeOtherDropdowns("induction");
    if (!inductionDropdown) {
      handleNavigation("/induction", "Induction");
    }
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
      "/loyality-cards",
      "/user-banners",
      "/provider-banners",
      "/reels",
      "/popup-banners",
      "/promotionsDropdown",
      "/user-promotion",
      "/provider-promotion",
      "/packagesDropdown",
      "/user-packages",
      "/provider-packages",
      "/inductionDropdown",
      "/induction",
      "/training",
      "/subadmin",
      "/induction",
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
          className={activeItem === "/loyality-cards" ? "active" : ""}
          onClick={() => handleNavigation("/loyality-cards")}
        >
          Loyalty Cards
        </div>
        <div
          className={`dropdown bannersDropdown ${
            bannersDropdown ? "active" : ""
          }`}
        >
          <div onClick={toggleBannersDropdown}>
            Banners & Reels
            <FaCaretDown />
          </div>
          {bannersDropdown && (
            <div className="dropdown-menu">
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "user-banners" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/user-banners", "User Banners")
                }
              >
                User Banners
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "provider-banners" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/provider-banners", "Provider Banners")
                }
              >
                Provider Banners
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "popup-banners" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/popup-banners", "Popup Banner")
                }
              >
                Popup Banner
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "reels" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/reels", "Reels")}
              >
                Reels
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
                  activeDropdownItem === "user-promotion" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/user-promotion", "User Promotions")
                }
              >
                User Promotions
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "provider-promotion" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/provider-promotion", "Provider Promotions")
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
                  activeDropdownItem === "user-packages" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/user-packages", "User Packages")
                }
              >
                User Packages
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "provider-packages" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/provider-packages", "Provider Packages")
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
            Induction & training <FaCaretDown />
          </div>
          {inductionDropdown && (
            <div className="dropdown-menu">
              <div
                className={activeItem === "/induction" ? "active" : ""}
                onClick={() => handleNavigation("/induction")}
              >
                Induction
              </div>
              <div
                className={activeItem === "/training" ? "active" : ""}
                onClick={() => handleNavigation("/training")}
              >
                Training
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

        {/* New Sidebar Items */}
        <div
          className={activeItem === "/inclusions-exclusions" ? "active" : ""}
          onClick={handleInclusionsNavigation}
        >
          Inclusions & Exclusions
        </div>
        <div
          className={activeItem === "/faq" ? "active" : ""}
          onClick={handleFAQNavigation}
        >
          FAQ
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
