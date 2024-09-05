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
    closeAllDropdowns(); // Close all other dropdowns
    setDropdownFn(!isOpen); // Toggle the clicked dropdown
    if (!isOpen) {
      // If dropdown is being opened, make the first item active
      setActiveDropdownItem(firstItem);
      handleNavigation(firstPath, firstItem); // Navigate to the first item
    }
  };

  const toggleLocationsDropdown = () =>
    toggleDropdown(
      setLocationsDropdown,
      locationsDropdown,
      "locations",
      "/locations",
    );
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
  const toggleInductionDropdown = () =>
    toggleDropdown(
      setInductionDropdown,
      inductionDropdown,
      "induction",
      "/induction",
    );

  const handleInclusionsNavigation = () => {
    handleNavigation("/inclusions-exclusions");
  };

  const handleFAQNavigation = () => {
    handleNavigation("/faq");
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

        {/* Locations Dropdown */}
        <div
          className={`dropdown locationsDropdown ${
            locationsDropdown ? "active" : ""
          }`}
        >
          <div onClick={toggleLocationsDropdown}>
            Locations & Pricing <FaCaretDown />
          </div>
          {locationsDropdown && (
            <div className="dropdown-menu">
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "locations" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/locations", "Locations")}
              >
                Locations
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "pricing" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/pricing", "Pricing")}
              >
                Pricing
              </div>
            </div>
          )}
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

        {/* Promotions Dropdown */}
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

        {/* Packages Dropdown */}
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
                }
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

        {/* Other sidebar items */}
        <div
          className={activeItem === "/reels" ? "active" : ""}
          onClick={() => handleNavigation("/reels")}
        >
          Reels
        </div>
        <div
          className={activeItem === "/subadmin" ? "active" : ""}
          onClick={() => handleNavigation("/subadmin")}
        >
          Sub-Admin
        </div>

        {/* Marketing Dropdown */}
        <div
          className={`dropdown marketingDropdown ${
            marketingDropdown ? "active" : ""
          }`}
        >
          <div onClick={toggleMarketingDropdown}>
            Marketing <FaCaretDown />
          </div>
          {marketingDropdown && (
            <div className="dropdown-menu">
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
                }
                }`}
                onClick={() => handleNavigation("/provider", "Provider")}
              >
                Provider
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "non-user" ? "active" : ""
                }
                }`}
                onClick={() => handleNavigation("/non-user", "Non-User")}
              >
                Non-User
              </div>
            </div>
          )}
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
