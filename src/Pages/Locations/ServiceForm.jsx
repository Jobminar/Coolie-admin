import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./ServiceForm.css"; // Import Tiger theme CSS for styling

const ServiceForm = ({
  categoryName,
  subcategoryName,
  serviceName,
  pincode,
  location,
  district,
  state,
  onClose,
}) => {
  const [pricingDetails, setPricingDetails] = useState({}); // Store dynamic pricing fields
  const [newPriceKey, setNewPriceKey] = useState(""); // Key for new price field
  const [newPriceValue, setNewPriceValue] = useState(""); // Value for new price field
  const [miscFee, setMiscFee] = useState(""); // Miscellaneous fees
  const [minPrice, setMinPrice] = useState(""); // Minimum price
  const [maxPrice, setMaxPrice] = useState(""); // Maximum price
  const [metric, setMetric] = useState(""); // Metric (e.g., kg, piece)
  const [creditEligibility, setCreditEligibility] = useState(false); // Credit eligibility
  const [taxPercentage, setTaxPercentage] = useState(0); // Tax percentage
  const [platformCommission, setPlatformCommission] = useState(0); // Platform commission
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false); // Cash on delivery option
  const [errors, setErrors] = useState({}); // Error state for validation

  // Handle form submission
  const handleFormSubmit = async (e) => {
    const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
    e.preventDefault();

    // Validate mandatory fields
    if (!pincode) {
      setErrors({
        pincode: !pincode ? "Pincode is required" : "",
      });
      return;
    }

    // Prepare the data to send to the API
    const newLocationData = {
      category: categoryName,
      subcategory: subcategoryName,
      servicename: serviceName,
      location,
      pincode,
      district,
      state,
      price: pricingDetails,
      miscFee,
      min: minPrice,
      max: maxPrice,
      metric,
      creditEligibility,
      taxPercentage,
      platformCommission,
      isCash: isCashOnDelivery,
    };

    try {
      await axios.post(
        `${AZURE_BASE_URL}/v1.0/core/locations/post`,
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
      <h4 className="tiger-form-header">Service Pricing</h4>
      <form onSubmit={handleFormSubmit} className="tiger-service-form">
        {/* Display validation errors */}
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
            <div key={key} className="tiger-service-form__dynamic-field">
              <label>{key}:</label>
              <span>{pricingDetails[key]}</span>
              <button
                type="button"
                className="tiger-btn-remove"
                onClick={() => handleRemovePriceField(key)}
              >
                <FontAwesomeIcon icon={faTrashAlt} /> Remove
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
              <FontAwesomeIcon icon={faPlus} /> Add Pricing Field
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
        {/* Min and Max Price */}
        <div className="tiger-form-group">
          <label className="tiger-form-label">Min Price:</label>
          <input
            type="number"
            className="tiger-form-control tiger-form-input"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Enter minimum price"
          />
        </div>
        <div className="tiger-form-group">
          <label className="tiger-form-label">Max Price:</label>
          <input
            type="number"
            className="tiger-form-control tiger-form-input"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Enter maximum price"
          />
        </div>
        {/* Metric */}
        <div className="tiger-form-group">
          <label className="tiger-form-label">Metric (e.g., kg, piece):</label>
          <input
            type="text"
            className="tiger-form-control tiger-form-input"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            placeholder="Enter metric"
          />
        </div>
        {/* Credit Eligibility */}
        <div className="tiger-form-group tiger-form-checkbox-group">
          <label className="tiger-form-label">Credit Eligibility:</label>
          <input
            type="checkbox"
            checked={creditEligibility}
            onChange={() => setCreditEligibility(!creditEligibility)}
          />
        </div>
        {/* Tax Percentage */}
        <div className="tiger-form-group">
          <label className="tiger-form-label">Tax Percentage (%):</label>
          <input
            type="number"
            className="tiger-form-control tiger-form-input"
            value={taxPercentage}
            onChange={(e) => setTaxPercentage(e.target.value)}
            placeholder="Enter tax percentage"
          />
        </div>
        {/* Platform Commission */}
        <div className="tiger-form-group">
          <label className="tiger-form-label">Platform Commission (%):</label>
          <input
            type="number"
            className="tiger-form-control tiger-form-input"
            value={platformCommission}
            onChange={(e) => setPlatformCommission(e.target.value)}
            placeholder="Enter platform commission"
          />
        </div>{" "}
        {/* Cash on Delivery */}
        <div className="tiger-form-group tiger-form-checkbox-group">
          <label className="tiger-form-label">Cash on Delivery:</label>
          <input
            type="checkbox"
            checked={isCashOnDelivery}
            onChange={() => setIsCashOnDelivery(!isCashOnDelivery)}
          />
        </div>
        {/* Submit and Close Buttons */}
        <div className="tiger-service-form__actions">
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
