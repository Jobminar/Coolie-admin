import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./servicemanager.css"; // Ensure the CSS file is correctly linked

const AddServiceForm = ({ onSubmit, serviceTypes = [] }) => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [isMostBooked, setIsMostBooked] = useState(false);
  const [tag, setTag] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const [creditEligibility, setCreditEligibility] = useState(false);
  const [selectedUserPackage, setSelectedUserPackage] = useState("");
  const [selectedProviderPackage, setSelectedProviderPackage] = useState("");
  const [userPackages, setUserPackages] = useState([]);
  const [providerPackages, setProviderPackages] = useState([]);
  const [platformCommission, setPlatformCommission] = useState("");
  const [serviceVariants, setServiceVariants] = useState([
    { variantName: "", price: "", serviceTime: "" },
  ]);

  const defaultServiceTypes = [
    "Daily",
    "Monthly",
    "Yearly",
    "Weekly",
    "MEN",
    "WOMEN",
    "DEEP",
    "NORMAL",
  ];

  const typesToDisplay =
    serviceTypes.length > 0 ? serviceTypes : defaultServiceTypes;

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

  const handleAddVariant = () => {
    setServiceVariants([
      ...serviceVariants,
      { variantName: "", price: "", serviceTime: "" },
    ]);
  };

  const handleRemoveVariant = (index) => {
    const newVariants = serviceVariants.filter((_, i) => i !== index);
    setServiceVariants(newVariants);
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = serviceVariants.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant,
    );
    setServiceVariants(newVariants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedServiceVariants = serviceVariants.map((variant) => ({
      variantName: variant.variantName,
      price: parseFloat(variant.price),
      serviceTime: parseFloat(variant.serviceTime),
    }));

    const serviceData = {
      name: serviceName,
      description,
      serviceVariants: formattedServiceVariants,
      locations,
      taxPercentage: parseFloat(taxPercentage),
      platformCommission: parseFloat(platformCommission),
      selectedUserPackage,
      selectedProviderPackage,
      isMostBooked,
      tag,
      isCash,
      creditEligibility,
      isActive: true,
      isDeleted: false,
    };
    console.log("Payload to be sent:", serviceData); // Logging the payload for debugging
    onSubmit(serviceData);
  };

  // Function to fetch user and provider packages from APIs
  const fetchPackages = async () => {
    try {
      const userResponse = await fetch(
        "http://13.126.118.3:3000/v1.0/admin/user-package",
      );
      const providerResponse = await fetch(
        "http://13.126.118.3:3000/v1.0/admin/provider-package",
      );

      if (!userResponse.ok || !providerResponse.ok) {
        throw new Error("Failed to fetch packages");
      }

      const userData = await userResponse.json();
      const providerData = await providerResponse.json();

      if (
        userData &&
        userData.length > 0 &&
        providerData &&
        providerData.length > 0
      ) {
        setUserPackages(userData);
        setProviderPackages(providerData);
      } else {
        throw new Error("Invalid package data structure");
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  // Fetch packages on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <form className="add-serviceForm-new" onSubmit={handleSubmit}>
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
        <label>Description:</label>
        <textarea
          className="textarea-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="form-group">
        <label>Service Variants:</label>
        {serviceVariants.map((variant, index) => (
          <div key={index} className="variant-input-group">
            <select
              className="bottom-borders-input"
              value={variant.variantName}
              onChange={(e) =>
                handleVariantChange(index, "variantName", e.target.value)
              }
            >
              <option value="">Select Service Type</option>
              {typesToDisplay.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <br />
            <input
              type="text"
              className="bottom-borders-input"
              placeholder="Price"
              value={variant.price}
              onChange={(e) =>
                handleVariantChange(index, "price", e.target.value)
              }
            />
            <br />
            <input
              type="text"
              className="bottom-borders-input"
              placeholder="Service Time"
              value={variant.serviceTime}
              onChange={(e) =>
                handleVariantChange(index, "serviceTime", e.target.value)
              }
            />
            <br />
            <FontAwesomeIcon
              icon={faTrash}
              className="remove-variant-icon"
              onClick={() => handleRemoveVariant(index)}
            />
          </div>
        ))}
        <FontAwesomeIcon
          icon={faPlus}
          className="add-variant-icon"
          onClick={handleAddVariant}
        />
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
        <label>Tax Percentage:</label>
        <input
          type="text"
          className="bottom-borders-input"
          value={taxPercentage}
          onChange={(e) => setTaxPercentage(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>User Packages:</label>
        <select
          className="bottom-borders-input"
          value={selectedUserPackage}
          onChange={(e) => setSelectedUserPackage(e.target.value)}
        >
          <option value="">Select User Package</option>
          {userPackages.map((pkg) => (
            <option key={pkg._id} value={pkg._id}>
              {pkg.packageName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Provider Packages:</label>
        <select
          className="bottom-borders-input"
          value={selectedProviderPackage}
          onChange={(e) => setSelectedProviderPackage(e.target.value)}
        >
          <option value="">Select Provider Package</option>
          {providerPackages.map((pkg) => (
            <option key={pkg._id} value={pkg._id}>
              {pkg.packageName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Platform Commission (%):</label>
        <input
          type="text"
          className="bottom-borders-input"
          value={platformCommission}
          onChange={(e) => setPlatformCommission(e.target.value)}
        />
      </div>

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
  serviceTypes: PropTypes.array, // Ensure serviceTypes is passed
};

export default AddServiceForm;
