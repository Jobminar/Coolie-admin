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
  const [activeDropdown, setActiveDropdown] = useState("");
  const [activeDropdownItem, setActiveDropdownItem] = useState("");

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path, dropdownItem = "") => {
    setActiveItem(path);
    if (dropdownItem) {
      setActiveDropdownItem(dropdownItem);
    } else {
      setActiveDropdown("");
      setActiveDropdownItem("");
    }
    navigate(path);
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown("");
      setActiveDropdownItem("");
    } else {
      setActiveDropdown(dropdown);
      // Set the first item of the dropdown as active by default
      if (dropdown === "serviceManager") {
        handleNavigation("/addservice", "addservice");
      } else if (dropdown === "banners") {
        handleNavigation("/userbanners", "userbanners");
      } else if (dropdown === "promotions") {
        handleNavigation("/userpromotion", "userpromotion");
      } else if (dropdown === "packages") {
        handleNavigation("/userpackages", "userpackages");
      } else if (dropdown === "induction") {
        handleNavigation("/inductionmain");
      } else if (dropdown === "marketing") {
        handleNavigation("/user", "user");
      }
    }
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

    let activeComponentName = activeItem
      .split("/")
      .pop()
      .replace(/^[a-z]/, (match) =>
        match.toUpperCase().replace("Dropdown", ""),
      ); // Improved dynamic naming

    return (
      <FilterBar {...filterBarProps} activeComponent={activeComponentName} />
    );
  };

  return (
    <div className="mainContainer">
      <div className="sidebar">
        <div
          className={activeItem === "/" && !activeDropdown ? "active" : ""}
          onClick={() => handleNavigation("/")}
        >
          Jobs Area
        </div>
        <div
          className={`dropdown serviceManagerDropdown ${
            activeDropdown === "serviceManager" ? "active" : ""
          }`}
        >
          <div onClick={() => toggleDropdown("serviceManager")}>
            Service Manager <FaCaretDown />
          </div>
          {activeDropdown === "serviceManager" && (
            <div className="dropdown-menu">
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "addservice" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/addservice", "addservice")}
              >
                Add Service
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
              </div>
            </div>
          )}
        </div>
        <div
          className={
            activeItem === "/usercorner" && !activeDropdown ? "active" : ""
          }
          onClick={() => handleNavigation("/usercorner")}
        >
          User Corner
        </div>
        <div
          className={
            activeItem === "/providersrcorner" && !activeDropdown
              ? "active"
              : ""
          }
          onClick={() => handleNavigation("/providersrcorner")}
        >
          Providers Corner
        </div>
        <div
          className={
            activeItem === "/loyalitycards" && !activeDropdown ? "active" : ""
          }
          onClick={() => handleNavigation("/loyalitycards")}
        >
          Loyalty Cards
        </div>
        <div
          className={`dropdown bannersDropdown ${
            activeDropdown === "banners" ? "active" : ""
          }`}
        >
          <div onClick={() => toggleDropdown("banners")}>
            Banners <FaCaretDown />
          </div>
          {activeDropdown === "banners" && (
            <div className="dropdown-menu">
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "userbanners" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/userbanners", "userbanners")}
              >
                User Banners
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "providerbanners" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/providerbanners", "providerbanners")
                }
              >
                Provider Banners
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "popupbanners" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/popupbanners", "popupbanners")
                }
              >
                Popup Banner
              </div>
            </div>
          )}
        </div>
        <div
          className={`dropdown promotionsDropdown ${
            activeDropdown === "promotions" ? "active" : ""
          }`}
        >
          <div onClick={() => toggleDropdown("promotions")}>
            Promotions <FaCaretDown />
          </div>
          {activeDropdown === "promotions" && (
            <div className="dropdown-menu">
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "userpromotion" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/userpromotion", "userpromotion")
                }
              >
                User Promotions
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "providerpromotions" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/providerpromotions", "providerpromotions")
                }
              >
                Provider Promotions
              </div>
            </div>
          )}
        </div>
        <div
          className={`dropdown packagesDropdown ${
            activeDropdown === "packages" ? "active" : ""
          }`}
        >
          <div onClick={() => toggleDropdown("packages")}>
            Packages <FaCaretDown />
          </div>
          {activeDropdown === "packages" && (
            <div className="dropdown-menu">
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "userpackages" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/userpackages", "userpackages")
                }
              >
                User Packages
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "providerpackages" ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation("/providerpackages", "providerpackages")
                }
              >
                Provider Packages
              </div>
            </div>
          )}
        </div>
        <div
          className={`dropdown inductionDropdown ${
            activeDropdown === "induction" ? "active" : ""
          }`}
        >
          <div onClick={() => toggleDropdown("induction")}>
            Induction & Training <FaCaretDown />
          </div>
          {activeDropdown === "induction" && (
            <div className="dropdown-menu">
              <div
                className={activeItem === "/inductionmain" ? "active" : ""}
                onClick={() => handleNavigation("/inductionmain")}
              >
                Induction
              </div>
              <div
                className={activeItem === "/trainingcon" ? "active" : ""}
                onClick={() => handleNavigation("/trainingcon")}
              >
                Training Main
              </div>
            </div>
          )}
        </div>
        <div
          className={
            activeItem === "/subadmin" && !activeDropdown ? "active" : ""
          }
          onClick={() => handleNavigation("/subadmin")}
        >
          Sub-Admin
        </div>
        <div
          className={
            activeItem === "/inductionmain" && !activeDropdown ? "active" : ""
          }
          onClick={() => handleNavigation("/inductionmain")}
        >
          Induction Main
        </div>
        <div
          className={`dropdown marketingDropdown ${
            activeDropdown === "marketing" ? "active" : ""
          }`}
        >
          <div onClick={() => toggleDropdown("marketing")}>
            Marketing <FaCaretDown />
          </div>
          {activeDropdown === "marketing" && (
            <div className="dropdown-menu marketing-dropdown-menu">
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "user" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/user", "user")}
              >
                User
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "provider" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/provider", "provider")}
              >
                Provider
              </div>
              <div
                className={`dropdown-item ${
                  activeDropdownItem === "non-user" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/non-user", "non-user")}
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
