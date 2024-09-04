import React from "react";
import LocationManager from "./LocationManager"; // Import the LocationManager component

const Locations = () => {
  return (
    <div>
      <div className="header-row">
        <h2>Locations Manager</h2>
      </div>
      <div className="locations-container">
        {/* Main Title */}

        {/* Location Manager Component */}
        <LocationManager />
      </div>
    </div>
  );
};

export default Locations;
