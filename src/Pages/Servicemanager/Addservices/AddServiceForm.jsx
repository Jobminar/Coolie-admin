import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./styles/servicemanager.css";

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
  const [platformCommission, setPlatformCommission] = useState("");
  const [serviceVariants, setServiceVariants] = useState([
    { variantName: "", price: "", serviceTime: "", metric: "", min: 1, max: 1 },
  ]);
  const [showVariantFields, setShowVariantFields] = useState(false);

  const [errors, setErrors] = useState({});

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
  const defaultMetrics = ["sqmts", "mts", "members", "quantity"];
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
    setShowVariantFields(true);
    setServiceVariants([
      ...serviceVariants,
      {
        variantName: "",
        price: "",
        serviceTime: "",
        metric: "",
        min: 1,
        max: 1,
      },
    ]);
  };

  const handleRemoveVariant = (index) => {
    if (serviceVariants.length > 1) {
      const newVariants = serviceVariants.filter((_, i) => i !== index);
      setServiceVariants(newVariants);
    }
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = serviceVariants.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant,
    );
    setServiceVariants(newVariants);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!serviceName.trim()) {
      newErrors.serviceName = "Service Name is required.";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!taxPercentage.trim() || isNaN(taxPercentage)) {
      newErrors.taxPercentage = "Valid Tax Percentage is required.";
    }
    if (!platformCommission.trim() || isNaN(platformCommission)) {
      newErrors.platformCommission = "Valid Platform Commission is required.";
    }
    serviceVariants.forEach((variant, index) => {
      if (!variant.variantName.trim()) {
        newErrors[`variantName-${index}`] = "Variant Name is required.";
      }
      if (!variant.price.trim() || isNaN(variant.price)) {
        newErrors[`price-${index}`] = "Valid Price is required.";
      }
      if (!variant.serviceTime.trim() || isNaN(variant.serviceTime)) {
        newErrors[`serviceTime-${index}`] = "Valid Service Time is required.";
      }
      if (!variant.metric.trim()) {
        newErrors[`metric-${index}`] = "Metric is required.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formattedServiceVariants = serviceVariants.map((variant) => ({
      variantName: variant.variantName,
      price: parseFloat(variant.price),
      serviceTime: parseFloat(variant.serviceTime),
      metric: variant.metric,
      min: parseFloat(variant.min),
      max: parseFloat(variant.max),
    }));

    const serviceData = {
      name: serviceName,
      description,
      serviceVariants: formattedServiceVariants,
      locations,
      taxPercentage: parseFloat(taxPercentage),
      platformCommission: parseFloat(platformCommission),
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

  return (
    <form className="add-serviceForm-new" onSubmit={handleSubmit}>
      <h3>Add Service</h3>
      <div className="form-group">
        <label>Service Name:</label>
        <input
          type="text"
          className="service-input-borders"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        {errors.serviceName && (
          <span className="error">{errors.serviceName}</span>
        )}
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea
          className="textarea-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {errors.description && (
          <span className="error">{errors.description}</span>
        )}
      </div>

      <div className="form-group">
        <label>Service Variants:</label>
        {serviceVariants.map((variant, index) => (
          <div key={index} className="variant-input-group">
            <select
              className="service-input-borders"
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
            {errors[`variantName-${index}`] && (
              <span className="error">{errors[`variantName-${index}`]}</span>
            )}
            <br />
            <input
              type="number"
              className="service-input-borders"
              placeholder="Price"
              value={variant.price}
              onChange={(e) =>
                handleVariantChange(index, "price", e.target.value)
              }
            />
            {errors[`price-${index}`] && (
              <span className="error">{errors[`price-${index}`]}</span>
            )}
            <br />
            <input
              type="number"
              className="service-input-borders"
              placeholder="Service Time"
              value={variant.serviceTime}
              onChange={(e) =>
                handleVariantChange(index, "serviceTime", e.target.value)
              }
            />
            {errors[`serviceTime-${index}`] && (
              <span className="error">{errors[`serviceTime-${index}`]}</span>
            )}
            <br />
            <select
              className="service-input-borders"
              value={variant.metric}
              onChange={(e) =>
                handleVariantChange(index, "metric", e.target.value)
              }
            >
              <option value="">Select Metric</option>
              {defaultMetrics.map((metric, i) => (
                <option key={i} value={metric}>
                  {metric}
                </option>
              ))}
            </select>
            {errors[`metric-${index}`] && (
              <span className="error">{errors[`metric-${index}`]}</span>
            )}
            <br />
            <label htmlFor={`min-${index}`} style={{ fontSize: "0.8em" }}>
              Min:
              <input
                type="number"
                className="service-input-borders"
                id={`min-${index}`}
                placeholder="Min"
                value={variant.min}
                onChange={(e) =>
                  handleVariantChange(index, "min", e.target.value)
                }
              />
            </label>
            <br />
            <label htmlFor={`max-${index}`} style={{ fontSize: "0.8em" }}>
              Max:
              <input
                type="number"
                className="service-input-borders"
                id={`max-${index}`}
                placeholder="Max"
                value={variant.max}
                onChange={(e) =>
                  handleVariantChange(index, "max", e.target.value)
                }
              />
            </label>

            <br />
            {serviceVariants.length > 1 && (
              <FontAwesomeIcon
                icon={faTrash}
                className="remove-variant-icon"
                onClick={() => handleRemoveVariant(index)}
              />
            )}
          </div>
        ))}
        {!showVariantFields && (
          <FontAwesomeIcon
            icon={faPlus}
            className="add-variant-icon"
            onClick={handleAddVariant}
          />
        )}
      </div>

      <div className="form-group">
        <label>Locations:</label>
        <div className="location-input-group">
          <input
            type="text"
            className="service-input-borders"
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
          type="number"
          className="service-input-borders"
          value={taxPercentage}
          onChange={(e) => setTaxPercentage(e.target.value)}
        />
        {errors.taxPercentage && (
          <span className="error">{errors.taxPercentage}</span>
        )}
      </div>

      <div className="form-group">
        <label>Platform Commission (%):</label>
        <input
          type="number"
          className="service-input-borders"
          value={platformCommission}
          onChange={(e) => setPlatformCommission(e.target.value)}
        />
        {errors.platformCommission && (
          <span className="error">{errors.platformCommission}</span>
        )}
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
