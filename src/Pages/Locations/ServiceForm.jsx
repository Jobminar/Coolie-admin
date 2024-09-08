import React, { useState } from "react";
import axios from "axios";
import "./ServiceForm.css"; // Tiger theme CSS for styling

const ServiceForm = ({
  group,
  tierName, // Tier name (mandatory)
  categoryName, // Category name to be sent to the API
  subcategoryName, // Subcategory name to be sent to the API
  serviceName, // Service name to be sent to the API
  pincode, // Pincode (mandatory)
  location,
  district,
  state,
  onClose,
}) => {
  // State for handling dynamic form inputs
  const [pricingDetails, setPricingDetails] = useState({});
  const [newPriceKey, setNewPriceKey] = useState(""); // Key for a new price field
  const [newPriceValue, setNewPriceValue] = useState(""); // Value for a new price field
  const [miscFee, setMiscFee] = useState(""); // Miscellaneous fees
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false); // Cash on delivery option
  const [errors, setErrors] = useState({}); // Error state for validation

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate mandatory fields
    if (!tierName || !pincode) {
      setErrors({
        tierName: !tierName ? "Tier Name is required" : "",
        pincode: !pincode ? "Pincode is required" : "",
      });
      return;
    }

    // Prepare the data to send to the API
    const newLocationData = {
      group,
      tierName,
      category: categoryName,
      subcategory: subcategoryName,
      servicename: serviceName,
      location,
      pincode,
      district,
      state,
      price: pricingDetails, // All key-value pairs for pricing
      miscFee,
      isCash: isCashOnDelivery,
    };

    try {
      await axios.post(
        `https://api.coolieno1.in/v1.0/core/locations/post`,
        newLocationData,
      );
      alert("Location and service added successfully!");
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error("Error adding location and service:", error);
      alert("An error occurred while saving the service. Please try again.");
    }
  };

  // Handle adding a new key-value pair for pricing
  const handleAddPriceField = () => {
    if (newPriceKey && newPriceValue) {
      setPricingDetails({
        ...pricingDetails,
        [newPriceKey]: newPriceValue,
      });
      setNewPriceKey("");
      setNewPriceValue("");
    }
  };

  // Handle removing a pricing field
  const handleRemovePriceField = (key) => {
    const updatedPricing = { ...pricingDetails };
    delete updatedPricing[key];
    setPricingDetails(updatedPricing);
  };

  return (
    <div className="tiger-service-form__container">
      <h4 className="tiger-form-header">Add New Service</h4>
      <form onSubmit={handleFormSubmit} className="tiger-service-form">
        {/* Display validation errors */}
        {errors.tierName && (
          <div className="tiger-error-message">{errors.tierName}</div>
        )}
        {errors.pincode && (
          <div className="tiger-error-message">{errors.pincode}</div>
        )}

        {/* Location Details */}
        <div className="tiger-form-group">
          <label className="tiger-form-label">Location:</label>
          <input
            type="text"
            className="tiger-form-control tiger-form-input"
            value={location}
            readOnly
          />
        </div>

        <div className="tiger-form-group">
          <label className="tiger-form-label">Pincode:</label>
          <input
            type="text"
            className="tiger-form-control tiger-form-input"
            value={pincode}
            readOnly
          />
        </div>

        <div className="tiger-form-group">
          <label className="tiger-form-label">District:</label>
          <input
            type="text"
            className="tiger-form-control tiger-form-input"
            value={district}
            readOnly
          />
        </div>

        <div className="tiger-form-group">
          <label className="tiger-form-label">State:</label>
          <input
            type="text"
            className="tiger-form-control tiger-form-input"
            value={state}
            readOnly
          />
        </div>

        {/* Dynamic Pricing Fields */}
        <div className="tiger-form-group">
          <h4>Pricing Details</h4>
          {Object.keys(pricingDetails).map((key) => (
            <div key={key} className="tiger-dynamic-field">
              <label>{key}:</label>
              <span>{pricingDetails[key]}</span>
              <button
                type="button"
                className="tiger-btn-remove"
                onClick={() => handleRemovePriceField(key)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Add new key-value pair for pricing */}
          <div className="tiger-add-price-field">
            <input
              type="text"
              className="tiger-form-control tiger-form-input"
              placeholder="Enter pricing type (e.g., normal, deep)"
              value={newPriceKey}
              onChange={(e) => setNewPriceKey(e.target.value)}
            />
            <input
              type="number"
              className="tiger-form-control tiger-form-input"
              placeholder="Enter price"
              value={newPriceValue}
              onChange={(e) => setNewPriceValue(e.target.value)}
            />
            <button
              type="button"
              className="tiger-btn-add"
              onClick={handleAddPriceField}
            >
              Add Pricing Field
            </button>
          </div>
        </div>

        {/* Misc Fee */}
        <div className="tiger-form-group">
          <label className="tiger-form-label">Misc Fee:</label>
          <input
            type="number"
            className="tiger-form-control tiger-form-input"
            value={miscFee}
            onChange={(e) => setMiscFee(e.target.value)}
            placeholder="Enter misc fee"
          />
        </div>

        {/* Cash on Delivery Checkbox */}
        <div className="tiger-form-group tiger-form-checkbox-group">
          <label className="tiger-form-label">Cash on Delivery:</label>
          <input
            type="checkbox"
            checked={isCashOnDelivery}
            onChange={() => setIsCashOnDelivery(!isCashOnDelivery)}
          />
        </div>

        {/* Submit and Close Buttons */}
        <div className="tiger-form-actions">
          <button type="submit" className="tiger-btn-submit">
            Add Service
          </button>
          <button type="button" className="tiger-btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
