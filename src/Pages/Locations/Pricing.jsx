import React, { useState } from "react";
import CustomPricing from "./CustomPricing"; // Component for adding custom pricing
import PricingForm from "./PricingForm"; // Component to display the pricing form
import CustomLocationTable from "./CustomLocationTable"; // Corrected component name
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Pricing.css"; // Custom CSS for the Pricing component

const Pricing = () => {
  const [showCustomPricingTable, setShowCustomPricingTable] = useState(false); // To toggle between forms and table
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [isValid, setIsValid] = useState(false); // Track the validity
  const [isFormVisible, setIsFormVisible] = useState(false); // To control form visibility after location selection

  // Callback function to handle location selection from CustomPricing component
  const handleLocationSelected = ({ location, district, pincode, isValid }) => {
    setSelectedLocation(location);
    setSelectedDistrict(district);
    setSelectedPincode(pincode);
    setIsValid(isValid);
    setIsFormVisible(true); // Show the form after location is selected
  };

  // Toggle between CustomLocationTable and (CustomPricing + PricingForm)
  const toggleComponent = () => {
    setShowCustomPricingTable((prevState) => !prevState); // Toggle between table and form views
    setIsFormVisible(false); // Hide form when switching to table view
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

      {/* Conditionally render CustomLocationTable or (CustomPricing + PricingForm) */}
      {showCustomPricingTable ? (
        <CustomLocationTable />
      ) : (
        <>
          <CustomPricing onLocationSelected={handleLocationSelected} />

          {/* Show the form toggle button if a valid address is selected */}
          {selectedLocation && selectedDistrict && selectedPincode && (
            <div className="tiger-text-center mt-4">
              <button
                className="btn btn-info"
                onClick={() => setIsFormVisible((prev) => !prev)}
              >
                {isFormVisible ? "Hide Pricing Form" : "Show Pricing Form"}
              </button>
            </div>
          )}

          <hr />

          {/* Conditionally render PricingForm if the form is visible */}
          {isFormVisible && (
            <PricingForm
              location={selectedLocation}
              district={selectedDistrict}
              pincode={selectedPincode}
              isValid={isValid} // Pass the validity status for user information
            />
          )}
        </>
      )}
    </div>
  );
};

export default Pricing;
