import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./styles/servicemanager.css";

const AddServiceForm = ({ category, onSubmit }) => {
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
  const [miscFee, setMiscFee] = useState("");
  const [serviceVariants, setServiceVariants] = useState([
    { variantName: "", price: "", serviceTime: "", metric: "", min: 1, max: 1 },
  ]);
  const [showVariantFields, setShowVariantFields] = useState(false);
  const [errors, setErrors] = useState({});
  const [uiVariant, setUiVariant] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const fetchUiVariant = async (category) => {
    const API_BASE_URL = "https://api.coolieno1.in/v1.0/core";
    const response = await fetch(`${API_BASE_URL}/categories/${category._id}`);
    const data = await response.json();
    return data.uiVariant;
  };

  useEffect(() => {
    if (category) {
      fetchUiVariant(category).then((data) => setUiVariant(data));
    }
  }, [category]);

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
      { variantName: "", price: "", serviceTime: "", metric: "", min: 1, max: 1 },
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
      i === index ? { ...variant, [field]: value } : variant
    );
    setServiceVariants(newVariants);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
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
    if (!miscFee.trim() || isNaN(miscFee)) {
      newErrors.miscFee = "Valid Misc Fee is required.";
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

    const formData = new FormData();
    formData.append("name", serviceName);
    formData.append("description", description);
    formData.append("taxPercentage", taxPercentage);
    formData.append("platformCommission", platformCommission);
    formData.append("miscFee", miscFee);
    formData.append("isMostBooked", isMostBooked);
    formData.append("tag", tag);
    formData.append("isCash", isCash);
    formData.append("creditEligibility", creditEligibility);
    formData.append("isActive", true);
    formData.append("isDeleted", false);

    serviceVariants.forEach((variant, index) => {
      formData.append(`serviceVariants[${index}][variantName]`, variant.variantName);
      formData.append(`serviceVariants[${index}][price]`, variant.price);
      formData.append(`serviceVariants[${index}][serviceTime]`, variant.serviceTime);
      formData.append(`serviceVariants[${index}][metric]`, variant.metric);
      formData.append(`serviceVariants[${index}][min]`, variant.min);
      formData.append(`serviceVariants[${index}][max]`, variant.max);
    });

    locations.forEach((location, index) => {
      formData.append(`locations[${index}]`, location);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    console.log("Payload to be sent:", formData); // Logging the payload for debugging
    onSubmit(formData);
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
              {uiVariant.map((type, i) => (
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
              {["sqmts", "mts", "members", "quantity"].map((metric, i) => (
                <option key={i} value={metric}>
                  {metric}
                </option>
              ))}
            </select>
            {errors[`metric-${index}`] && (
              <span className="error">{errors[`metric-${index}`]}</span>
            )}
            <br />
            <input
              type="number"
              className="service-input-borders"
              placeholder="Min"
              min="1"
              value={variant.min}
              onChange={(e) =>
                handleVariantChange(index, "min", e.target.value)
              }
            />
            <input
              type="number"
              className="service-input-borders"
              placeholder="Max"
              min="1"
              value={variant.max}
              onChange={(e) =>
                handleVariantChange(index, "max", e.target.value)
              }
            />
            <button
              type="button"
              className="remove-variant-btn"
              onClick={() => handleRemoveVariant(index)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddVariant}>
          <FontAwesomeIcon icon={faPlus} /> Add Variant
        </button>
        {showVariantFields && serviceVariants.length > 1 && (
          <button
            type="button"
            className="remove-variant-btn"
            onClick={() => setShowVariantFields(false)}
          >
            <FontAwesomeIcon icon={faTrash} /> Remove Last Variant
          </button>
        )}
      </div>

      <div className="form-group">
        <label>Locations:</label>
        <input
          type="text"
          className="service-input-borders"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <button type="button" onClick={handleAddLocation}>
          Add Location
        </button>
        {locations.map((location, index) => (
          <div key={index} className="location-item">
            <span>{location}</span>
            <button
              type="button"
              className="remove-location-btn"
              onClick={() => handleRemoveLocation(index)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
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
        <label>Platform Commission:</label>
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

      <div className="form-group">
        <label>Misc Fee:</label>
        <input
          type="number"
          className="service-input-borders"
          value={miscFee}
          onChange={(e) => setMiscFee(e.target.value)}
        />
        {errors.miscFee && <span className="error">{errors.miscFee}</span>}
      </div>

      <div className="form-group">
        <label>Service Image:</label>
        <input
          type="file"
          className="service-input-borders"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={isMostBooked}
            onChange={() => setIsMostBooked(!isMostBooked)}
          />
          Most Booked
        </label>
        <label>
          <input
            type="checkbox"
            checked={tag}
            onChange={() => setTag(!tag)}
          />
          Tag
        </label>
        <label>
          <input
            type="checkbox"
            checked={isCash}
            onChange={() => setIsCash(!isCash)}
          />
          Cash Payment
        </label>
        <label>
          <input
            type="checkbox"
            checked={creditEligibility}
            onChange={() => setCreditEligibility(!creditEligibility)}
          />
          Credit Eligibility
        </label>
      </div>

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

AddServiceForm.propTypes = {
  category: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddServiceForm;
