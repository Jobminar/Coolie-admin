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
    setInductionDropdown(false);
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
    let activeComponentName = "";

    if (activeItem === "/") {
      activeComponentName = "Jobs Area";
    } else if (activeItem === "/providersrcorner") {
      activeComponentName = "Providers Corner";
    } else if (activeItem === "/usercorner") {
      activeComponentName = "User Corner";
    } else if (activeItem === "/serviceManagerDropdown") {
      activeComponentName = "Service Manager";
    } else if (activeItem === "/addservice") {
      activeComponentName = "Add Service";
    } else if (activeItem === "/manageservice") {
      activeComponentName = "Manage Service";
    } else if (activeItem === "/loyalitycards") {
      activeComponentName = "Loyalty Cards";
    } else if (activeItem === "/userbanners") {
      activeComponentName = "User Banners";
    } else if (activeItem === "/providerbanners") {
      activeComponentName = "Provider Banners";
    } else if (activeItem === "/popupbanners") {
      activeComponentName = "Popup Banners";
    } else if (activeItem === "/promotionsDropdown") {
      activeComponentName = "Promotions";
    } else if (activeItem === "/userpromotion") {
      activeComponentName = "User Promotions";
    } else if (activeItem === "/providerpromotions") {
      activeComponentName = "Provider Promotions";
    } else if (activeItem === "/packagesDropdown") {
      activeComponentName = "Packages";
    } else if (activeItem === "/userpackages") {
      activeComponentName = "User Packages";
    } else if (activeItem === "/providerpackages") {
      activeComponentName = "Provider Packages";
    } else if (activeItem === "/inductionDropdown") {
      activeComponentName = "Induction & Training";
    } else if (activeItem === "/induction") {
      activeComponentName = "Induction";
    } else if (activeItem === "/training") {
      activeComponentName = "Training";
    } else if (activeItem === "/subadmin") {
      activeComponentName = "Sub-Admin";
    } else if (activeItem === "/inductionmain") {
      activeComponentName = "Induction Main";
    } else if (activeItem === "/marketingDropdown") {
      activeComponentName = "Marketing";
    } else if (activeItem === "/user") {
      activeComponentName = "User Marketing";
    } else if (activeItem === "/provider") {
      activeComponentName = "Provider Marketing";
    } else if (activeItem === "/non-user") {
      activeComponentName = "Non-User Marketing";
    }

    return (
      <FilterBar
        {...filterBarProps}
        showServiceFilter={
          activeItem !== "/usercorner" && activeItem !== "/providersrcorner"
        }
        showGenderFilter={activeItem === "/usercorner"}
        showPackageFilter={activeItem === "/providersrcorner"}
        activeComponent={activeComponentName}
        activeComponentState={filterBarProps.activeComponentState}
        setActiveComponentState={filterBarProps.setActiveComponentState}
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
                className={activeItem === "/providerpromotions" ? "active" : ""}
                onClick={() => handleNavigation("/providerpromotions")}
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
