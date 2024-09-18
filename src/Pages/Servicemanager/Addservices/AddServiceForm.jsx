import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as api from "./api/servicemanager-api"; // Import your API functions
import "./styles/servicemanager.css";

const AddServiceForm = ({ category, subCategory, subCategoryId, onSubmit }) => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [isMostBooked, setIsMostBooked] = useState(false); // Added toggle for Most Booked
  const [imageFile, setImageFile] = useState(null);
  const [variantName, setVariantName] = useState(""); // To store fetched variantName
  const [errors, setErrors] = useState({});

  // Fetch the subcategory details and set the variantName using the provided API
  useEffect(() => {
    if (subCategoryId) {
      api
        .fetchSubcategoryDetails(subCategoryId) // Use the new API to fetch subcategory details
        .then((response) => {
          if (response.data) {
            setVariantName(response.data.variantName);
          }
        })
        .catch((error) =>
          console.error("Error fetching subcategory details:", error),
        );
    }
  }, [subCategoryId]);

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
    if (!imageFile) {
      newErrors.image = "Service image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    // Add the fields corresponding to the servicesSchema
    formData.append("image", imageFile);
    formData.append("name", serviceName);
    formData.append("description", description);
    formData.append("categoryId", category._id);
    formData.append("subCategoryId", subCategoryId); // Add subCategoryId
    formData.append("variantName", variantName); // Directly set the variantName from subcategory
    formData.append("isMostBooked", isMostBooked); // Append the isMostBooked field

    // Log formData for debugging purposes
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Submit the form data
    onSubmit(formData);
  };

  return (
    <>
      <div className="selected-category-info">
        <h6>Category: {category?.name || "No category selected"}</h6>
        <h6>Sub-Category: {subCategory?.name || "No sub-category selected"}</h6>
      </div>
      <form className="servermanager-add-service-form" onSubmit={handleSubmit}>
        <h3>Add Service</h3>
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
            value={variantName}
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
          {errors.image && <span className="error">{errors.image}</span>}
        </div>

        <div className="servermanager-form-group toggle-group">
          <label>Most Booked:</label>
          <input
            type="checkbox"
            checked={isMostBooked}
            onChange={(e) => setIsMostBooked(e.target.checked)} // Handle the toggle switch state
            className="toggle-input"
          />
        </div>

        <button type="submit" className="servermanager-submissionbutton">
          Submit
        </button>
      </form>
    </>
  );
};

AddServiceForm.propTypes = {
  category: PropTypes.object.isRequired,
  subCategory: PropTypes.object.isRequired,
  subCategoryId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddServiceForm;
