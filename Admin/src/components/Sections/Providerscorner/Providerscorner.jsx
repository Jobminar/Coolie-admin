import React, { useState } from "react";
import "./ProvidersCorner.css";
import ProviderForm from "./ProviderForm";
import AddProvider from "./AddProviderForm";
import AuthenticateProvider from "./AuthenticateProvider";

const ProvidersCorner = () => {
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

  return (
    <div className="providers-container">
      <h3>Service Providers Corner</h3>
      <div className="providers-toolbar">
        <button
          className={`providers-btn ${
            activeComponent === "view" ? "active" : ""
          }`}
          onClick={() => setActiveComponent("view")}
        >
          Bird Eye View
        </button>
        <button
          className={`providers-btn ${
            activeComponent === "add" ? "active" : ""
          }`}
          onClick={() => setActiveComponent("add")}
        >
          Add a Provider
        </button>
        <button
          className={`providers-btn ${
            activeComponent === "authenticate" ? "active" : ""
          }`}
          onClick={() => setActiveComponent("authenticate")}
        >
          Authenticate
        </button>
        <button
          className={`providers-btn ${
            activeComponent === "manage" ? "active" : ""
          }`}
          onClick={() => setActiveComponent("manage")}
        >
          Manage Providers
        </button>
      </div>
      {activeComponent === "view" && (
        <>
          <div className="providers-sidebar">
            <button className="providers-arrow" onClick={handlePrev}>
              &lt;
            </button>
            <div className="providers-categories">
              {visibleCategories.map((category, index) => (
                <button
                  key={index}
                  className={`providers-category ${
                    index === activeCategory ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(index)}
                >
                  {category}
                </button>
              ))}
            </div>
            <button className="providers-arrow" onClick={handleNext}>
              &gt;
            </button>
          </div>
          <div className="providers-main-content">
            {/* Google Maps integration */}
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345094493!2d-122.41941538468188!3d37.77492917975861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5e1e6c3b%3A0x1c3abf24c9452b09!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1614892339630!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </>
      )}
      {activeComponent === "add" && <AddProvider />}
      {activeComponent === "manage" && <ProviderForm />}
      {activeComponent === "authenticate" && <AuthenticateProvider />}
    </div>
  );
};

export default ProvidersCorner;
