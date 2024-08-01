import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./styles/serviceform.css";

const EditServiceForm = ({
  service,
  category,
  subCategory,
  onSave,
  onClose,
}) => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState("");
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [isMostBooked, setIsMostBooked] = useState(false);
  const [tag, setTag] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const [creditEligibility, setCreditEligibility] = useState(false);
  const [platformCommission, setPlatformCommission] = useState(0);
  const [miscFee, setMiscFee] = useState(0);
  const [serviceVariants, setServiceVariants] = useState([]);
  const [errors, setErrors] = useState({});
  const [uiVariant, setUiVariant] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUiVariant = async (category) => {
      const API_BASE_URL = "https://api.coolieno1.in/v1.0/core";
      const response = await axios.get(
        `${API_BASE_URL}/categories/${category}`,
      );
      return response.data.uiVariant;
    };

    const fetchData = async () => {
      if (category) {
        const uiVariantData = await fetchUiVariant(category);
        setUiVariant(uiVariantData);
      }

      if (service) {
        setServiceName(service.name || "");
        setDescription(service.description || "");
        setLocations(service.locations || []);
        setTaxPercentage(service.taxPercentage || 0);
        setIsMostBooked(service.isMostBooked || false);
        setTag(service.tag || false);
        setIsCash(service.isCash || false);
        setCreditEligibility(service.creditEligibility || false);
        setPlatformCommission(service.platformCommission || 0);
        setMiscFee(service.miscFee || 0);
        setServiceVariants(
          service.serviceVariants.map((variant) => ({
            variantName: variant.variantName || "",
            price: variant.price || "",
            serviceTime: variant.serviceTime || "",
            metric: variant.metric || "",
            min: variant.min || 0,
            max: variant.max || 100,
          })),
        );
      }
    };

    fetchData();
  }, [category, service]);

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
      {
        variantName: "",
        price: "",
        serviceTime: "",
        metric: "",
        min: 0,
        max: 100,
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
    if (isNaN(taxPercentage)) {
      newErrors.taxPercentage = "Valid Tax Percentage is required.";
    }
    if (isNaN(platformCommission)) {
      newErrors.platformCommission = "Valid Platform Commission is required.";
    }
    if (isNaN(miscFee)) {
      newErrors.miscFee = "Valid Misc Fee is required.";
    }
    serviceVariants.forEach((variant, index) => {
      if (!variant.variantName.trim()) {
        newErrors[`variantName-${index}`] = "Variant Name is required.";
      }
      if (isNaN(variant.price)) {
        newErrors[`price-${index}`] = "Valid Price is required.";
      }
      if (isNaN(variant.serviceTime)) {
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

    setLoading(true);
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
      formData.append(
        `serviceVariants[${index}][variantName]`,
        variant.variantName,
      );
      formData.append(`serviceVariants[${index}][price]`, variant.price);
      formData.append(
        `serviceVariants[${index}][serviceTime]`,
        variant.serviceTime,
      );
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

    axios
      .put(
        `https://api.coolieno1.in/v1.0/core/services/${service._id}`,
        formData,
      )
      .then((response) => {
        setSuccessMessage("Service updated successfully.");
        setErrorMessage("");
        onSave(response.data);
      })
      .catch((error) => {
        const errorResponse = error.response
          ? error.response.data
          : "Network error";
        setErrorMessage(`Failed to update service: ${errorResponse}`);
        setSuccessMessage("");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="servermanager-add-service-form" onSubmit={handleSubmit}>
      <h3>Edit Service</h3>
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <div className="servermanager-form-group">
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

      <div className="servermanager-form-group">
        <label>Description:</label>
        <textarea
          className="servermanager-textarea-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {errors.description && (
          <span className="error">{errors.description}</span>
        )}
      </div>

      <div className="servermanager-form-group">
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
              min="0"
              value={variant.min}
              onChange={(e) =>
                handleVariantChange(index, "min", e.target.value)
              }
            />
            <input
              type="number"
              className="service-input-borders"
              placeholder="Max"
              max="100"
              value={variant.max}
              onChange={(e) =>
                handleVariantChange(index, "max", e.target.value)
              }
            />
            <button
              type="button"
              className="servermanager-cancel-icon"
              onClick={() => handleRemoveVariant(index)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="servermanager-add-button"
          onClick={handleAddVariant}
        >
          <FontAwesomeIcon icon={faPlus} /> <h6>Add a new UI Variant</h6>
        </button>
      </div>

      <div className="servermanager-form-group">
        <label>Locations:</label>
        <div className="location-input-group">
          <input
            type="text"
            className="service-input-borders"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            placeholder="Type a new location"
          />
          <button
            type="button"
            className="servermanager-add-button"
            onClick={handleAddLocation}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
            <h6>Click here to add the new location</h6>
          </button>
        </div>
        {locations.map((location, index) => (
          <div key={index} className="servermanager-menu-item">
            <span>{location}</span>
            <button
              type="button"
              className="servermanager-cancel-icon"
              onClick={() => handleRemoveLocation(index)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>

      <div className="servermanager-form-group">
        <label>Tax Percentage:</label>
        <input
          type="number"
          className="service-input-borders"
          value={taxPercentage}
          onChange={(e) => setTaxPercentage(Number(e.target.value))}
        />
        {errors.taxPercentage && (
          <span className="error">{errors.taxPercentage}</span>
        )}
      </div>

      <div className="servermanager-form-group">
        <label>Platform Commission:</label>
        <input
          type="number"
          className="service-input-borders"
          value={platformCommission}
          onChange={(e) => setPlatformCommission(Number(e.target.value))}
        />
        {errors.platformCommission && (
          <span className="error">{errors.platformCommission}</span>
        )}
      </div>

      <div className="servermanager-form-group">
        <label>Misc Fee:</label>
        <input
          type="number"
          className="service-input-borders"
          value={miscFee}
          onChange={(e) => setMiscFee(Number(e.target.value))}
        />
        {errors.miscFee && <span className="error">{errors.miscFee}</span>}
      </div>

      <div className="servermanager-form-group">
        <label>Service Image:</label>
        <input
          type="file"
          className="service-input-borders"
          accept="image/*"
          onChange={handleImageChange}
        />
        {service.image && (
          <div className="manageServicePreviewContainer">
            <img
              src={service.image}
              alt="Service Icon"
              className="manageServicePreviewImage"
              onLoad={() => console.log("Image loaded successfully")}
              onError={(e) => {
                console.error("Error loading image:", e);
                e.target.src = ""; // Fallback in case the image fails to load
              }}
            />
          </div>
        )}
      </div>

      <div className="servermanager-toggle-group">
        <label>
          Most Booked
          <input
            type="checkbox"
            className="servermanager-toggle-input"
            checked={isMostBooked}
            onChange={() => setIsMostBooked(!isMostBooked)}
          />
        </label>
        <label>
          Tag
          <input
            type="checkbox"
            className="servermanager-toggle-input"
            checked={tag}
            onChange={() => setTag(!tag)}
          />
        </label>
        <label>
          Cash Payment
          <input
            type="checkbox"
            className="servermanager-toggle-input"
            checked={isCash}
            onChange={() => setIsCash(!isCash)}
          />
        </label>
        <label>
          Credit Eligibility
          <input
            type="checkbox"
            className="servermanager-toggle-input"
            checked={creditEligibility}
            onChange={() => setCreditEligibility(!creditEligibility)}
          />
        </label>
      </div>

      <button type="submit" className="servermanager-submissionbutton">
        {loading ? "Updating..." : "Update"}
      </button>
      <button
        type="button"
        className="servermanager-submissionbutton"
        onClick={() => {
          if (window.confirm("Are you sure you want to cancel the edit?")) {
            onClose();
          }
        }}
      >
        Close
      </button>
    </form>
  );
};

EditServiceForm.propTypes = {
  service: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    serviceVariants: PropTypes.arrayOf(
      PropTypes.shape({
        variantName: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        serviceTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        metric: PropTypes.string,
        min: PropTypes.number,
        max: PropTypes.number,
      }),
    ),
    description: PropTypes.string,
    locations: PropTypes.array,
    taxPercentage: PropTypes.number,
    isMostBooked: PropTypes.bool,
    tag: PropTypes.bool,
    isCash: PropTypes.bool,
    creditEligibility: PropTypes.bool,
    platformCommission: PropTypes.number,
    isActive: PropTypes.bool,
    isDeleted: PropTypes.bool,
    image: PropTypes.string,
    miscFee: PropTypes.number,
  }).isRequired,
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditServiceForm;
