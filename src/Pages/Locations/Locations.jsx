import React, { useState } from "react";
import LocationManager from "./LocationManager"; // Import the LocationManager component
import TierManagement from "./TierManagement"; // Import the TierManagement component
import TierDetails from "./TierDetails"; // Import the TierDetails component
import Pricing from "./Pricing"; // Import the Pricing component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Import arrow icon
import "./Locations.css"; // Ensure appropriate CSS is applied

const Locations = () => {
  const [showTierManagement, setShowTierManagement] = useState(false); // Track the toggle between LocationManager and TierManagement
  const [tierData, setTierData] = useState(null); // State to hold the data to show in TierDetails
  const [showPricing, setShowPricing] = useState(false); // Track if the Pricing component is displayed

  // Function to toggle between LocationManager and TierManagement views
  const toggleView = () => {
    console.log("Toggling view between LocationManager and TierManagement");
    setShowTierManagement(!showTierManagement);
    setTierData(null); // Reset TierData when toggling
    setShowPricing(false); // Reset Pricing view
  };

  // Function to display the TierDetails component from TierManagement
  const handleShowTierDetails = (data) => {
    console.log("Displaying TierDetails for tier:", data);
    setTierData(data); // Set the tier data when a user clicks "Know More"
    setShowPricing(false); // Ensure Pricing view is reset
  };

  // Function to go back from TierDetails to TierManagement
  const handleBackToTierManagement = () => {
    console.log("Going back to TierManagement view");
    setTierData(null); // Clear the tier data to go back to TierManagement view
    setShowPricing(false); // Reset Pricing view
  };

  // Function to show the Pricing component from TierDetails
  const handleShowPricing = () => {
    console.log("Navigating to Pricing component");
    setShowPricing(true); // Show Pricing component
  };

  // Function to go back from Pricing to TierDetails
  const handleBackToTierDetails = () => {
    console.log("Going back to TierDetails view from Pricing");
    setShowPricing(false); // Go back to TierDetails from Pricing
  };

  return (
    <div>
      <div className="header-row">
        <h2>Locations Manager</h2>

        {/* Button to toggle between LocationManager and TierManagement */}
        {tierData && !showPricing ? (
          // If in TierDetails, show "Back to Tier Table" button
          <button
            className="toggle-button"
            onClick={handleBackToTierManagement}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon" />
            Back to Tier Table
          </button>
        ) : showPricing ? (
          // If in Pricing, show "Back to Tier Details" button
          <button className="toggle-button" onClick={handleBackToTierDetails}>
            <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon" />
            Back to Tier Details
          </button>
        ) : (
          // Otherwise, show toggle button between LocationManager and TierManagement
          <button className="toggle-button" onClick={toggleView}>
            {showTierManagement ? (
              <>
                Back to Location Manager{" "}
                <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon" />
              </>
            ) : (
              <>
                Manage Tiers{" "}
                <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
              </>
            )}
          </button>
        )}
      </div>

      <div className="locations-container">
        {/* Conditionally render LocationManager, TierManagement, TierDetails, or Pricing */}
        {showTierManagement ? (
          tierData ? (
            showPricing ? (
              <Pricing
                tierName={tierData.tierName}
                group="default" // Pass tierData to Pricing
              />
            ) : (
              <TierDetails
                tierData={tierData}
                onBack={handleBackToTierManagement}
                onShowPricing={handleShowPricing} // Pass the function to show Pricing component
              />
            )
          ) : (
            <TierManagement showTierDetails={handleShowTierDetails} />
          )
        ) : (
          <LocationManager />
        )}
      </div>
    </div>
  );
};

export default Locations;
