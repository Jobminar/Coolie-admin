import React, { useState } from "react";
import LocationManager from "./LocationManager"; // Import the LocationManager component
import TierManagement from "./TierManagement"; // Import the TierManagement component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Import arrow icon
import "./Locations.css"; // Optional: Add appropriate CSS for styling

const Locations = () => {
  const [showTierManagement, setShowTierManagement] = useState(false);

  // Handle button click to toggle between LocationManager and TierManagement
  const toggleView = () => {
    setShowTierManagement(!showTierManagement);
  };

  return (
    <div>
      <div className="header-row">
        <h2>Locations Manager</h2>
        {/* Button to toggle between LocationManager and TierManagement */}
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
      </div>

      <div className="locations-container">
        {/* Conditionally render LocationManager or TierManagement */}
        {showTierManagement ? <TierManagement /> : <LocationManager />}
      </div>
    </div>
  );
};

export default Locations;
