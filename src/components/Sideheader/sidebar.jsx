import React, { useContext, useEffect, useState, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";
import FilterBar from "../FilterBar/FilterBar";
import PropTypes from "prop-types";
import { FilterBarContext } from "../../FilterBarContext";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filterBarProps } = useContext(FilterBarContext);
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [serviceManagerDropdown, setServiceManagerDropdown] = useState(false);
  const [promotionsDropdown, setPromotionsDropdown] = useState(false);
  const [packagesDropdown, setPackagesDropdown] = useState(false);
  const [marketingDropdown, setMarketingDropdown] = useState(false);
  const [bannersDropdown, setBannersDropdown] = useState(false);
  const [inductionDropdown, setInductionDropdown] = useState(false);
  const [locationsDropdown, setLocationsDropdown] = useState(false);
  const [activeDropdownItem, setActiveDropdownItem] = useState("");

  const sidebarRef = useRef(null); // Ref to detect clicks outside sidebar

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  // Close dropdown when clicking outside the dropdown area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (path, dropdownItem = "") => {
    setActiveItem(path);
    if (dropdownItem) {
      setActiveDropdownItem(dropdownItem);
    } else {
      setActiveDropdownItem("");
    }
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
    setLocationsDropdown(false);
  };

  const toggleDropdown = (setDropdownFn, isOpen, firstItem, firstPath) => {
    closeAllDropdowns(); // Close all other dropdowns first
    setDropdownFn(!isOpen);
    if (!isOpen) {
      setActiveDropdownItem(firstItem);
      handleNavigation(firstPath, firstItem);
    }
  };

  const toggleServiceManagerDropdown = () =>
    toggleDropdown(
      setServiceManagerDropdown,
      serviceManagerDropdown,
      "addservice",
      "/addservice",
    );

  const togglePromotionsDropdown = () =>
    toggleDropdown(
      setPromotionsDropdown,
      promotionsDropdown,
      "user-promotion",
      "/user-promotion",
    );

  const togglePackagesDropdown = () =>
    toggleDropdown(
      setPackagesDropdown,
      packagesDropdown,
      "user-packages",
      "/user-packages",
    );

  const toggleMarketingDropdown = () =>
    toggleDropdown(setMarketingDropdown, marketingDropdown, "user", "/user");

  const toggleBannersDropdown = () =>
    toggleDropdown(
      setBannersDropdown,
      bannersDropdown,
      "user-banners",
      "/user-banners",
    );

  const toggleInductionDropdown = () =>
    toggleDropdown(
      setInductionDropdown,
      inductionDropdown,
      "induction",
      "/induction",
    );

  const toggleLocationsDropdown = () =>
    toggleDropdown(
      setLocationsDropdown,
      locationsDropdown,
      "locations",
      "/locations",
    );

  const handleInclusionsNavigation = () => {
    handleNavigation("/inclusions-exclusions");
  };

  const handleFAQNavigation = () => {
    handleNavigation("/faq");
  };
  const handleLocationNavigation = () => {
    handleNavigation("/locations");
  };

  const handleBlogsNavigation = () => {
    handleNavigation("/blogs");
  };
  const renderFilterBar = () => {
    const filterBarExcludedComponents = [
      "/loyality-cards",
      "/user-banners",
      "/provider-banners",
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
      <div className="sidebar" ref={sidebarRef}>
        <div
          className={activeItem === "/" ? "active" : ""}
          onClick={() => handleNavigation("/")}
        >
          Jobs Area
        </div>

        {/* Locations & Pricing Dropdown */}
        {/* Replace Locations & Pricing Dropdown with a Single Div */}
        <div
          className={activeItem === "/locations-pricing" ? "active" : ""}
          onClick={handleLocationNavigation}
        >
          Locations & Pricing
        </div>

        {/* Service Manager Dropdown */}
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
                onClick={() => handleNavigation("/addservice", "addservice")}
              >
                Add Service
                {activeDropdownItem === "addservice" && (
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ color: "#ffa226", marginLeft: "5px" }}
                  />
                )}
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "manageservice" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/manageservice", "manageservice")
                }
              >
                Manage Service
                {activeDropdownItem === "manageservice" && (
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ color: "#ffa226", marginLeft: "5px" }}
                  />
                )}
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

        {/* Banners Dropdown */}
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
                  activeDropdownItem === "user-banners" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/user-banners", "user-banners")
                }
              >
                User Banners
                {activeDropdownItem === "user-banners" && (
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ color: "#ffa226", marginLeft: "5px" }}
                  />
                )}
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "provider-banners" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/provider-banners", "provider-banners")
                }
              >
                Provider Banners
                {activeDropdownItem === "provider-banners" && (
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ color: "#ffa226", marginLeft: "5px" }}
                  />
                )}
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "popup-banners" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/popup-banners", "popup-banners")
                }
              >
                Popup Banner
                {activeDropdownItem === "popup-banners" && (
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ color: "#ffa226", marginLeft: "5px" }}
                  />
                )}
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
                  handleNavigation("/user-promotion", "user-promotion")
                }
              >
                User Promotions
                {activeDropdownItem === "user-promotion" && (
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ color: "#ffa226", marginLeft: "5px" }}
                  />
                )}
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "provider-promotion" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/provider-promotion", "provider-promotion")
                }
              >
                Provider Promotions
                {activeDropdownItem === "provider-promotion" && (
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ color: "#ffa226", marginLeft: "5px" }}
                  />
                )}
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
                  handleNavigation("/user-packages", "user-packages")
                }
              >
                User Promotions
                {activeDropdownItem === "user-packages" && (
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ color: "#ffa226", marginLeft: "5px" }}
                  />
                )}
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "provider-packages" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/provider-packages", "provider-packages")
                }
              >
                Provider Packages
                {activeDropdownItem === "provider-packages" && (
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ color: "#ffa226", marginLeft: "5px" }}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Induction & Training Dropdown */}
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
                onClick={() => handleNavigation("/induction")}
              >
                Induction
                {activeItem === "/induction" && (
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ color: "#ffa226", marginLeft: "5px" }}
                  />
                )}
              </div>
              <div
                className={activeItem === "/training" ? "active" : ""}
                onClick={() => handleNavigation("/training")}
              >
                Training
                {activeItem === "/training" && (
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ color: "#ffa226", marginLeft: "5px" }}
                  />
                )}
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
          className={activeItem === "/blogs" ? "active" : ""}
          onClick={handleBlogsNavigation}
        >
          Blogs
        </div>
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
