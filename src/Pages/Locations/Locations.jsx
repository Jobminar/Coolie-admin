import React, { useState } from "react";
import LocationManager from "./LocationManager"; // Import the LocationManager component
import DistrictManagement from "./DistrictManagement"; // Renamed TierManagement to DistrictManagement
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Import arrow icons
import "./Locations.css"; // Ensure appropriate CSS is applied

const Locations = () => {
  const [showDistrictManagement, setShowDistrictManagement] = useState(false); // Track the toggle between LocationManager and DistrictManagement

  // Function to go forward to DistrictManagement view
  const handleForward = () => {
    setShowDistrictManagement(true); // Show DistrictManagement
  };

  // Function to go back to LocationManager view
  const handleBackward = () => {
    setShowDistrictManagement(false); // Show LocationManager
  };

  return (
    <div>
      <div className="header-row">
        <h2>Locations Manager</h2>

        {/* Conditionally render forward and backward buttons */}
        {!showDistrictManagement ? (
          <button className="toggle-button forward" onClick={handleForward}>
            Manage Districts Pricing{" "}
            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
          </button>
        ) : (
          <button className="toggle-button backward" onClick={handleBackward}>
            <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon" />
            Back to Location Manager
          </button>
        )}
      </div>

      <div className="locations-container">
        {/* Conditionally render LocationManager or DistrictManagement */}
        {showDistrictManagement ? <DistrictManagement /> : <LocationManager />}
      </div>
    </div>
  );
};

export default Locations;
