import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListofLocations.css"; // Optional for styling

const ListofLocations = ({ tierName, group }) => {
  const [locationsData, setLocationsData] = useState([]);
  const [selectedPincode, setSelectedPincode] = useState(null); // Track selected pincode
  const [selectedLocation, setSelectedLocation] = useState(null); // Track selected location

  useEffect(() => {
    // Fetch locations based on group (default/custom) and tierName
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `https://api.coolieno1.in/v1.0/core/locations/group/${group}`,
        );
        // Filter data by tierName
        const filteredData = response.data.filter(
          (item) => item.tierName === tierName,
        );
        setLocationsData(filteredData);
      } catch (error) {
        console.error("Failed to fetch locations data:", error);
      }
    };

    fetchLocations();
  }, [tierName, group]);

  // Merge duplicate items (for pincodes, locations, and states)
  const getUniqueItems = (array) => Array.from(new Set(array));

  // Handle pincode selection
  const handlePincodeClick = (pincode) => {
    setSelectedPincode(pincode);
    setSelectedLocation(null); // Reset location selection
  };

  // Handle location selection
  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  // Render list of pincodes
  const renderPincodes = () => {
    const uniquePincodes = getUniqueItems(
      locationsData.map((item) => item.pincode),
    );

    return (
      <div className="pincode-cards small-scrollable">
        {uniquePincodes.map((pincode, index) => (
          <div
            key={index}
            className={`pincode-link ${
              selectedPincode === pincode ? "active" : ""
            }`}
            onClick={() => handlePincodeClick(pincode)}
          >
            {pincode}
          </div>
        ))}
      </div>
    );
  };

  // Render list of locations based on selected pincode
  const renderLocations = () => {
    const locationsInPincode = locationsData.filter(
      (item) => item.pincode === selectedPincode,
    );

    const uniqueLocations = getUniqueItems(
      locationsInPincode.map((item) => item.location),
    );

    return (
      <div className="location-container">
        <h4>Locations in Pincode {selectedPincode}</h4>
        <div className="location-list small-scrollable">
          {uniqueLocations.map((location, index) => (
            <div
              key={index}
              className={`location-link ${
                selectedLocation === location ? "active" : ""
              }`}
              onClick={() => handleLocationClick(location)}
            >
              {location}
            </div>
          ))}
        </div>

        {selectedLocation && renderStates(locationsInPincode)}
      </div>
    );
  };

  // Render states based on selected location
  const renderStates = (locationsInPincode) => {
    const statesInLocation = locationsInPincode
      .filter((item) => item.location === selectedLocation)
      .map((item) => item.state);

    const uniqueStates = getUniqueItems(statesInLocation);

    return (
      <div className="state-container">
        <h4>State(s) in Location {selectedLocation}</h4>
        <div className="state-list small-scrollable">
          {uniqueStates.map((state, index) => (
            <div key={index} className="state-link">
              {state}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="locations-container">
      <h3>
        Locations and States ({group.charAt(0).toUpperCase() + group.slice(1)})
      </h3>

      {renderPincodes()}

      {selectedPincode && renderLocations()}
    </div>
  );
};

export default ListofLocations;
