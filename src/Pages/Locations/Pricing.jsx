import React, { useState } from "react";
import PricingForm from "./PricingForm"; // Component to display the pricing form
import CustomLocationTable from "./CustomLocationTable"; // Corrected component name
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Pricing.css"; // Custom CSS for the Pricing component

const Pricing = ({ isCustom }) => {
  const [showCustomPricingTable, setShowCustomPricingTable] = useState(false); // To toggle between forms and table
  const [isFormVisible, setIsFormVisible] = useState(true); // Always show the form by default

  // Toggle between CustomLocationTable and PricingForm
  const toggleComponent = () => {
    setShowCustomPricingTable((prevState) => !prevState); // Toggle between table and form views
  };

  return (
    <div className="tiger-pricing-container">
      <div className="tiger-header-row">
        <h2>Custom Pricing</h2>

        {/* Conditionally render the toggle button with arrow and message */}
        <button className="tiger-toggle-button" onClick={toggleComponent}>
          {showCustomPricingTable ? (
            <>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="tiger-arrow-icon"
              />
              Go to Add Custom Pricing
            </>
          ) : (
            <>
              Go to Custom Pricing Locations Table
              <FontAwesomeIcon
                icon={faArrowRight}
                className="tiger-arrow-icon"
              />
            </>
          )}
        </button>
      </div>

      <hr />

      {/* Conditionally render CustomLocationTable or PricingForm */}
      {showCustomPricingTable ? (
        <CustomLocationTable />
      ) : (
        <>
          {/* PricingForm is always displayed now */}
          <PricingForm
            location="Default Location"
            district="Default District"
            pincode="000000"
            isValid={true}
            isCustom={isCustom}
          />
        </>
      )}
    </div>
  );
};

export default Pricing;
