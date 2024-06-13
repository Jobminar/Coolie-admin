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
  const [visibleCategories, setVisibleCategories] = useState([
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Carpentry",
  ]);
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

  const handlePrev = () => {
    setActiveCategory((prev) =>
      prev > 0 ? prev - 1 : allCategories.length - 1,
    );
    setVisibleCategories((prev) => [
      ...prev.slice(1),
      allCategories[
        (activeCategory + allCategories.length - 1) % allCategories.length
      ],
    ]);
  };

  const handleNext = () => {
    setActiveCategory((prev) => (prev + 1) % allCategories.length);
    setVisibleCategories((prev) => [
      allCategories[(activeCategory + 1) % allCategories.length],
      ...prev.slice(0, -1),
    ]);
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
    <div className="providersContainer">
      {activeComponent === "view" && (
        <>
          <div className="providersSidebar">
            <button className="providersArrow" onClick={handlePrev}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="providersCategories">
              {visibleCategories.map((category, index) => (
                <button
                  key={index}
                  className={`providersCategory ${
                    index === activeCategory ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(index)}
                >
                  {category}
                </button>
              ))}
            </div>
            <button className="providersArrow" onClick={handleNext}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div className="providersMainContent">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7613426.778745689!2d75.27071929097744!3d17.469591203347576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93b7ab12627d%3A0xbc6f7e1d7d72e727!2sHyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sus!4v1625244827741!5m2!1sen!2sus"
              width="100%"
              height="450"
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
