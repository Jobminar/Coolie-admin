import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./styles/serviceform.css";

const EditServiceForm = ({
  service,
  category,
  subCategory,
  onSave,
  onClose,
}) => {
  const [serviceName, setServiceName] = useState(service.name || "");
  const [description, setDescription] = useState(service.description || "");
  const [variantName] = useState(service.variantName || ""); // Display as text, not editable
  const [isMostBooked, setIsMostBooked] = useState(
    service.isMostBooked || false,
  );
  const [tag, setTag] = useState(service.tag || false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("name", serviceName);
    formData.append("description", description);
    formData.append("variantName", variantName); // Directly using variantName from backend data
    formData.append("isMostBooked", isMostBooked);
    formData.append("tag", tag);
    formData.append("isActive", true);
    formData.append("isDeleted", false);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.put(
        `https://api.coolieno1.in/v1.0/core/services/${service._id}`,
        formData,
      );
      setSuccessMessage("Service updated successfully.");
      setErrorMessage("");
      onSave(response.data);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : "Network error";
      setErrorMessage(`Failed to update service: ${errorResponse}`);
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
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
        <label>Variant Name:</label>
        <input
          type="text"
          className="service-input-borders"
          value={service.variantName}
          readOnly
        />
      </div>

      <div className="servermanager-form-group">
        <label>Service Image:</label>
        <input
          type="file"
          className="service-input-borders"
          accept="image/*"
          onChange={handleImageChange}
        />
        {service.image && !imageFile && (
          <div className="manageServicePreviewContainer">
            <img
              src={service.image}
              alt="Service Icon"
              className="manageServicePreviewImage"
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
    description: PropTypes.string,
    variantName: PropTypes.string,
    isMostBooked: PropTypes.bool,
    tag: PropTypes.bool,
    image: PropTypes.string,
  }).isRequired,
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditServiceForm;
