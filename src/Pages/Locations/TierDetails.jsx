import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import the green tick icon
import ListofCategories from "./ListofCategories"; // Import ListofCategories component
import ListofLocations from "./ListofLocations"; // Import ListofLocations component
import "./TierDetails.css"; // Import CSS for styling

// Main TierDetails component
const TierDetails = ({ tierData, onShowPricing }) => {
  // Make sure to accept the onShowPricing prop
  // Track the active group between 'default' and 'custom'
  const [activeGroup, setActiveGroup] = useState("default");

  // Track whether to display List of Categories, Locations, or Pricing
  const [activeComponent, setActiveComponent] = useState("categories");

  // Handle when there's no data for the tier
  if (!tierData) {
    return <div>No data available for this tier.</div>;
  }

  // Function to toggle between Default and Custom groups
  const handleToggle = (group) => {
    setActiveGroup(group); // Set the active group (default/custom)
  };

  // Function to handle dropdown selection (either Categories or Locations)
  const handleDropdownChange = (event) => {
    setActiveComponent(event.target.value); // Set the selected component
  };

  // Function to handle the "Manage Services" button (navigate to Pricing component)
  const handleManageServices = () => {
    onShowPricing(activeGroup); // Pass activeGroup when calling onShowPricing
  };

  return (
    <div className="tier-detail-container">
      {/* Header Section */}
      <div className="tier-detail-header">
        <h2>Tier Name: {tierData.tierName}</h2>
        <button className="tier-detail-edit-icon">
          <i className="edit icon"></i>{" "}
          {/* Edit icon, can be replaced with FontAwesome */}
        </button>
      </div>

      {/* Tier Information */}
      <p>
        <strong>State:</strong> {tierData.state}
      </p>
      <p>
        <strong>District:</strong> {tierData.district}
      </p>
      <p>
        <strong>No. of Pincodes:</strong> {tierData.totalPincodes}
      </p>

      {/* Display Default and Custom Pin Codes */}
      <div className="tier-detail-pincode-section">
        <h3>Default Pin Codes:</h3>
        <p>
          {tierData.defaultGroupPincodes.length > 0
            ? tierData.defaultGroupPincodes.join(", ")
            : "No Default Pincodes"}
        </p>

        <h3>Custom Pin Codes:</h3>
        <p>
          {tierData.customGroupPincodes.length > 0
            ? tierData.customGroupPincodes.join(", ")
            : "No Custom Pincodes"}
        </p>
      </div>

      {/* Toggle buttons for Default and Custom */}
      <div className="tier-detail-toggle-buttons">
        <div className="tier-detail-toggle-wrapper">
          {/* Default button with conditional tick icon */}
          <button
            className={`tier-detail-toggle-btn ${
              activeGroup === "default" ? "active" : ""
            }`}
            onClick={() => handleToggle("default")}
          >
            {activeGroup === "default" && (
              <FaCheckCircle className="tier-detail-green-check-icon inside" />
            )}
            Default
          </button>

          {/* Custom button with conditional tick icon */}
          <button
            className={`tier-detail-toggle-btn ${
              activeGroup === "custom" ? "active" : ""
            }`}
            onClick={() => handleToggle("custom")}
          >
            Custom
            {activeGroup === "custom" && (
              <FaCheckCircle className="tier-detail-green-check-icon inside" />
            )}
          </button>
        </div>
      </div>

      {/* Manage Locations and Services Buttons */}
      <div className="tier-detail-manage-buttons">
        <button className="ui orange button tier-detail-styled-btn">
          Manage Locations {/* Button to manage locations */}
        </button>
        <button
          className="ui orange button tier-detail-styled-btn"
          onClick={handleManageServices} // Trigger the Pricing component
        >
          Manage Services {/* Button to manage services */}
        </button>
      </div>

      {/* Dropdown to switch between Categories and Locations */}
      <div className="tier-detail-dropdown-section">
        <label htmlFor="tier-detail-data-select">Show:</label>
        <select
          id="tier-detail-data-select"
          className="tier-detail-styled-dropdown"
          value={activeComponent} // Set the dropdown to show the active component
          onChange={handleDropdownChange} // Handle dropdown changes
        >
          <option value="categories">List of Categories</option>
          <option value="locations">List of Locations</option>
        </select>
      </div>

      {/* Conditionally render ListofCategories, ListofLocations */}
      {activeComponent === "categories" ? (
        <ListofCategories tierName={tierData.tierName} group={activeGroup} />
      ) : (
        <ListofLocations tierName={tierData.tierName} group={activeGroup} />
      )}
    </div>
  );
};

export default TierDetails;
