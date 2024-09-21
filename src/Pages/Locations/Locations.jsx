import React, { useState } from "react";
import LocationManager from "./LocationManager"; // Import the LocationManager component
import Pricing from "./Pricing"; // Import the Pricing component
import CustomPricing from "./CustomPricing"; // Import CustomPricing component
import "./Locations.css"; // Styling for tabs and content

const Locations = () => {
  const [selectedTab, setSelectedTab] = useState(
    "Add Location and Default Pricing",
  );

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="locations-container">
      <div className="tabs-container">
        {/* Tab 1: Add Location and Default Pricing */}
        <button
          className={`tab-button ${
            selectedTab === "Add Location and Default Pricing" ? "active" : ""
          }`}
          onClick={() => handleTabClick("Add Location and Default Pricing")}
        >
          Add Location and Default Pricing
        </button>

        {/* Tab 2: Add Location and Custom Pricing */}
        <button
          className={`tab-button ${
            selectedTab === "Add Location and Custom Pricing" ? "active" : ""
          }`}
          onClick={() => handleTabClick("Add Location and Custom Pricing")}
        >
          Add Location and Custom Pricing
        </button>

        {/* Tab 3: Location Validator */}
        <button
          className={`tab-button ${
            selectedTab === "Location Validator" ? "active" : ""
          }`}
          onClick={() => handleTabClick("Location Validator")}
        >
          Location Validator
        </button>
      </div>

      {/* Render Tab Content */}
      <div className="tab-content">
        {selectedTab === "Add Location and Default Pricing" && (
          <LocationManager />
        )}
        {selectedTab === "Add Location and Custom Pricing" && (
          <Pricing isCustom={true} />
        )}
        {selectedTab === "Location Validator" && <CustomPricing />}
      </div>
    </div>
  );
};

export default Locations;
