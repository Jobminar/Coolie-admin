import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./servicemanager.css"; // Ensure the CSS file is correctly linked

const AddServiceForm = ({ onSubmit, serviceTypes }) => {
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [platformCommissionGoldCr, setPlatformCommissionGoldCr] = useState("");
  const [platformCommissionGoldRs, setPlatformCommissionGoldRs] = useState("");
  const [platformCommissionPlatinumCr, setPlatformCommissionPlatinumCr] =
    useState("");
  const [platformCommissionPlatinumRs, setPlatformCommissionPlatinumRs] =
    useState("");
  const [platformCommissionDiamondCr, setPlatformCommissionDiamondCr] =
    useState("");
  const [platformCommissionDiamondRs, setPlatformCommissionDiamondRs] =
    useState("");
  const [isMostBooked, setIsMostBooked] = useState(false);
  const [tag, setTag] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const [serviceVariant, setServiceVariant] = useState("");

  const handleAddLocation = () => {
    if (locationInput.trim() !== "") {
      setLocations([...locations, locationInput.trim()]);
      setLocationInput("");
    }
  };

  const handleRemoveLocation = (index) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceData = {
      serviceName,
      price,
      serviceTime,
      description,
      locations,
      taxPercentage,
      platformCommissionGoldCr,
      platformCommissionGoldRs,
      platformCommissionPlatinumCr,
      platformCommissionPlatinumRs,
      platformCommissionDiamondCr,
      platformCommissionDiamondRs,
      isMostBooked,
      tag,
      isCash,
      serviceVariant,
    };
    onSubmit(serviceData);
  };

  return (
    <form className="add-service-form" onSubmit={handleSubmit}>
      <h3>Add Service</h3>
      <div className="form-group">
        <label>Service Name:</label>
        <input
          type="text"
          className="bottom-borders-input"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Service Price:</label>
        <input
          type="text"
          className="bottom-borders-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Total Service Time:</label>
        <input
          type="text"
          className="bottom-borders-input"
          value={serviceTime}
          onChange={(e) => setServiceTime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          className="textarea-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Locations:</label>
        <div className="location-input-group">
          <input
            type="text"
            className="bottom-borders-input"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faPlus}
            className="add-location-icon"
            onClick={handleAddLocation}
          />
        </div>
        <ul className="location-list">
          {locations.map((loc, index) => (
            <li key={index} className="location-item">
              {loc}
              <FontAwesomeIcon
                icon={faTrash}
                className="remove-location-icon"
                onClick={() => handleRemoveLocation(index)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="form-group">
        <label>Service Variant:</label>
        <select
          className="bottom-borders-input"
          value={serviceVariant}
          onChange={(e) => setServiceVariant(e.target.value)}
        >
          <option value="">None</option>
          {serviceTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Tax Percentage:</label>
        <input
          type="text"
          className="bottom-borders-input"
          value={taxPercentage}
          onChange={(e) => setTaxPercentage(e.target.value)}
        />
      </div>

      {/* New fields for platform commissions */}
      <div className="form-group">
        <label>Platform Commission Gold (Cr):</label>
        <input
          type="text"
          className="bottom-borders-input"
          value={platformCommissionGoldCr}
          onChange={(e) => setPlatformCommissionGoldCr(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Platform Commission Gold (Rs):</label>
        <input
          type="text"
          className="bottom-borders-input"
          value={platformCommissionGoldRs}
          onChange={(e) => setPlatformCommissionGoldRs(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Platform Commission Platinum (Cr):</label>
        <input
          type="text"
          className="bottom-borders-input"
          value={platformCommissionPlatinumCr}
          onChange={(e) => setPlatformCommissionPlatinumCr(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Platform Commission Platinum (Rs):</label>
        <input
          type="text"
          className="bottom-borders-input"
          value={platformCommissionPlatinumRs}
          onChange={(e) => setPlatformCommissionPlatinumRs(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Platform Commission Diamond (Cr):</label>
        <input
          type="text"
          className="bottom-borders-input"
          value={platformCommissionDiamondCr}
          onChange={(e) => setPlatformCommissionDiamondCr(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Platform Commission Diamond (Rs):</label>
        <input
          type="text"
          className="bottom-borders-input"
          value={platformCommissionDiamondRs}
          onChange={(e) => setPlatformCommissionDiamondRs(e.target.value)}
        />
      </div>

      <div className="form-group toggle-group">
        <label>Add to most booked service</label>
        <input
          type="checkbox"
          className="toggle-input"
          checked={isMostBooked}
          onChange={(e) => setIsMostBooked(e.target.checked)}
        />
      </div>
      <div className="form-group toggle-group">
        <label>TAG</label>
        <input
          type="checkbox"
          className="toggle-input"
          checked={tag}
          onChange={(e) => setTag(e.target.checked)}
        />
      </div>
      <div className="form-group toggle-group">
        <label>Cash After Service</label>
        <input
          type="checkbox"
          className="toggle-input"
          checked={isCash}
          onChange={(e) => setIsCash(e.target.checked)}
        />
      </div>
      <button type="submit" className="submit-button">
        Add Service
      </button>
    </form>
  );
};

AddServiceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  serviceTypes: PropTypes.array.isRequired,
};

export default AddServiceForm;
