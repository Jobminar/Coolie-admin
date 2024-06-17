import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "./ProvidersCorner.css";
import ProviderForm from "./ProviderForm";
import AddProvider from "./AddProviderForm";
import AuthenticateProvider from "./AuthenticateProvider";
import ProviderList from "./ProviderList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FilterBarContext } from "../../../FilterBarContext";

const ProvidersCorner = () => {
  const { setFilterBarProps } = useContext(FilterBarContext);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeComponent, setActiveComponent] = useState("view");

  const allCategories = [
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Beauty & salon",
    "Labour supply",
    "Painting",
    "Gardening",
    "HVAC",
    "Pest Control",
    "Moving",
    "General Maintenance",
  ];

  const getVisibleCategories = () => {
    const startIndex = activeCategory;
    const endIndex = (startIndex + 6) % allCategories.length;
    if (endIndex > startIndex) {
      return allCategories.slice(startIndex, endIndex);
    } else {
      return [
        ...allCategories.slice(startIndex),
        ...allCategories.slice(0, endIndex),
      ];
    }
  };

  const visibleCategories = getVisibleCategories();

  const handlePrev = () => {
    setActiveCategory(
      (prev) => (prev - 1 + allCategories.length) % allCategories.length,
    );
  };

  const handleNext = () => {
    setActiveCategory((prev) => (prev + 1) % allCategories.length);
  };

  useEffect(() => {
    // Set filter bar props for Providers Corner
    setFilterBarProps({
      activeComponent: "Providers Corner",
      activeComponentState: activeComponent,
      setActiveComponentState: setActiveComponent,
    });
  }, [activeComponent, setFilterBarProps]);

  const providers = [
    {
      id: 1,
      name: "Provider 1",
      email: "provider1@example.com",
      phone: "1234567890",
      location: "Location 1",
      joinDate: "2021-01-01",
      loyaltyPoints: 100,
      package: "Basic",
      status: "active",
    },
    // ... other providers
  ];

  const handleEdit = (provider) => {
    console.log("Edit provider:", provider.id);
  };

  const handleDelete = (providerId) => {
    console.log("Delete provider:", providerId);
  };

  return (
    <div className="birdviewProvidersContainer">
      {activeComponent === "view" && (
        <>
          <div className="birdviewProvidersSidebar">
            <button className="birdviewProvidersArrow" onClick={handlePrev}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="birdviewProvidersCategories">
              {visibleCategories.map((category, index) => (
                <button
                  key={index}
                  className={`birdviewProvidersCategory ${
                    category === allCategories[activeCategory]
                      ? "birdviewActive"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveCategory(allCategories.indexOf(category))
                  }
                >
                  {category}
                </button>
              ))}
            </div>
            <button className="birdviewProvidersArrow" onClick={handleNext}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

          <div className="providersMainContent" style={{ width: "100%" }}>
            <iframe
              title="Map of India"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31151829.295752527!2d69.65351685000001!3d22.3511148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e3738d7d283579%3A0x7b847d6e0c7aaf28!2sIndia!5e0!3m2!1sen!2sus!4v1687062079313!5m2!1sen!2sus"
              width="100%"
              height="600"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </>
      )}

      {activeComponent === "list" && (
        <ProviderList
          providers={providers}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      {activeComponent === "add" && <AddProvider />}
      {activeComponent === "manage" && <ProviderForm />}
      {activeComponent === "authenticate" && <AuthenticateProvider />}
    </div>
  );
};

ProvidersCorner.propTypes = {
  setFilterBarProps: PropTypes.func.isRequired,
};

export default ProvidersCorner;
