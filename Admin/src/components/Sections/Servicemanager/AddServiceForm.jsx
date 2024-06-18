import React, { useState, useEffect } from "react";
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
  const [isMostBooked, setIsMostBooked] = useState(false);
  const [tag, setTag] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const [serviceVariant, setServiceVariant] = useState("");
  const [creditEligibility, setCreditEligibility] = useState(false); // Toggle for credit eligibility
  const [selectedUserPackage, setSelectedUserPackage] = useState(""); // State for selected user package
  const [selectedProviderPackage, setSelectedProviderPackage] = useState(""); // State for selected provider package
  const [userPackages, setUserPackages] = useState([]); // State for user packages
  const [providerPackages, setProviderPackages] = useState([]); // State for provider packages
  const [platformCommission, setPlatformCommission] = useState(""); // State for platform commission

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
      isMostBooked,
      tag,
      isCash,
      serviceVariant,
      creditEligibility,
      selectedUserPackage,
      selectedProviderPackage,
      platformCommission, // Include platform commission in service data
    };
    onSubmit(serviceData);
  };

  // Function to fetch user and provider packages from APIs
  const fetchPackages = async () => {
    try {
      // Example API fetch
      const userPackagesResponse = await fetch("/api/user-packages");
      const providerPackagesResponse = await fetch("/api/provider-packages");
      const userPackagesData = await userPackagesResponse.json();
      const providerPackagesData = await providerPackagesResponse.json();
      setUserPackages(userPackagesData.packages);
      setProviderPackages(providerPackagesData.packages);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  // Fetch packages on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

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

      {/* User Packages dropdown */}
      <div className="form-group">
        <label>User Packages:</label>
        <select
          className="bottom-borders-input"
          value={selectedUserPackage}
          onChange={(e) => setSelectedUserPackage(e.target.value)}
        >
          <option value="">Select User Package</option>
          {userPackages.map((pkg, index) => (
            <option key={index} value={pkg.id}>
              {pkg.name}
            </option>
          ))}
        </select>
      </div>

      {/* Provider Packages dropdown */}
      <div className="form-group">
        <label>Provider Packages:</label>
        <select
          className="bottom-borders-input"
          value={selectedProviderPackage}
          onChange={(e) => setSelectedProviderPackage(e.target.value)}
        >
          <option value="">Select Provider Package</option>
          {providerPackages.map((pkg, index) => (
            <option key={index} value={pkg.id}>
              {pkg.name}
            </option>
          ))}
        </select>
      </div>

      {/* Platform Commission */}
      <div className="form-group">
        <label>Platform Commission (%):</label>
        <input
          type="text"
          className="bottom-borders-input"
          value={platformCommission}
          onChange={(e) => setPlatformCommission(e.target.value)}
        />
      </div>

      {/* Toggle buttons */}
      <div className="toggle-buttons">
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
        <div className="form-group toggle-group">
          <label>Credit Eligibility:</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={creditEligibility}
            onChange={(e) => setCreditEligibility(e.target.checked)}
          />
        </div>
      </div>

      <button type="submit" className="submissionbutton">
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
