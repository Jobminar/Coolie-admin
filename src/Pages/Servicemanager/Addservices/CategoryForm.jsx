import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const CategoryForm = ({
  handleCategoryIconChange,
  handleAddCategory,
  setUiVariants,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [serviceTypeSelection, setServiceTypeSelection] = useState("");
  const [imageError, setImageError] = useState("");
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

  const handleServiceTypeChange = (e) => {
    setServiceTypeSelection(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageError("");
      setCategoryIcon(file);
      handleCategoryIconChange(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName) {
      setCategoryError("Category name is required");
      return;
    }

    const selectedUiVariants = [];

    switch (serviceTypeSelection) {
      case "Cleaning":
        selectedUiVariants.push("Normal", "Deep");
        break;
      case "Gender":
        selectedUiVariants.push("Female", "Male");
        break;
      case "Time":
        selectedUiVariants.push("Hourly", "Daily", "Monthly");
        break;
      case "Cloth":
        selectedUiVariants.push("Men", "Women", "Kids", "Households");
        break;
      case "None":
        selectedUiVariants.push("None");
        break;
      default:
        break;
    }

    setUiVariants(selectedUiVariants);
    handleAddCategory(selectedUiVariants);

    // Reset fields after submitting
    setCategoryName("");
    setCategoryIcon(null);
    setServiceTypeSelection("");
  };

  const handleCloseForm = () => {
    // Reset fields
    setCategoryName("");
    setCategoryIcon(null);
    setServiceTypeSelection("");
    setCategoryError("");
    setImageError("");

    // Hide the form by setting isVisible to false
    setIsVisible(false);
  };

  // Apply 'display: none' when the form is not visible
  if (!isVisible) {
    return null; // Return null to hide the component completely
  }

  return (
    <form
      className="servermanager-card servermanager-add-category-form"
      onSubmit={handleSubmit}
      style={{ display: isVisible ? "block" : "none" }} // Toggle display
    >
      <div className="servermanager-form-group">
        <div className="servermanager-category-header">
          <span>Add Category</span>
          <button
            type="button"
            className="servermanager-close-icon"
            onClick={handleCloseForm} // Close form on button click
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
      <div className="servermanagerinput-wrapper">
        <div className="servermanagerinputcontainer">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            className="servermanager-bottom-border-input"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            aria-label="Category Name"
          />
          {categoryError && <span className="error">{categoryError}</span>}
        </div>
        <div className="servermanageruploadcontainer">
          <input
            type="file"
            id="categoryIcon"
            onChange={handleFileChange}
            className="servermanager-file-upload"
            aria-label="Category Icon"
          />
          <label
            htmlFor="categoryIcon"
            className="servermanager-upload-icon-label"
          >
            Choose Icon
            <FontAwesomeIcon
              icon={faArrowUpFromBracket}
              className="servermanager-upload-icon"
            />
          </label>
          {imageError && <span className="error">{imageError}</span>}
          {categoryIcon && (
            <img
              src={URL.createObjectURL(categoryIcon)}
              alt="Category Icon Preview"
              className="servermanager-upload-preview"
            />
          )}
        </div>
        <div className="servermanagerinputcontainer">
          <label>Service Types:</label>
          <div className="radio-group">
            <label className="servermanager-radio-label">
              <input
                type="radio"
                name="serviceType"
                value="Cleaning"
                checked={serviceTypeSelection === "Cleaning"}
                onChange={handleServiceTypeChange}
              />
              Cleaning (Normal/Deep)
            </label>
            <label className="servermanager-radio-label">
              <input
                type="radio"
                name="serviceType"
                value="Gender"
                checked={serviceTypeSelection === "Gender"}
                onChange={handleServiceTypeChange}
              />
              Gender (Female/Male)
            </label>
            <label className="servermanager-radio-label">
              <input
                type="radio"
                name="serviceType"
                value="Time"
                checked={serviceTypeSelection === "Time"}
                onChange={handleServiceTypeChange}
              />
              Time (Hourly/Daily/Monthly)
            </label>
            <label className="servermanager-radio-label">
              <input
                type="radio"
                name="serviceType"
                value="Cloth"
                checked={serviceTypeSelection === "Cloth"}
                onChange={handleServiceTypeChange}
              />
              Cloth (Men/Women/Kids/Households)
            </label>
            <label className="servermanager-radio-label">
              <input
                type="radio"
                name="serviceType"
                value="None"
                checked={serviceTypeSelection === "None"}
                onChange={handleServiceTypeChange}
              />
              None
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="servermanager-submit-button"
        aria-label="Add Category"
      >
        Add
      </button>
    </form>
  );
};

CategoryForm.propTypes = {
  handleCategoryIconChange: PropTypes.func.isRequired,
  handleAddCategory: PropTypes.func.isRequired,
  setUiVariants: PropTypes.func.isRequired,
};

export default CategoryForm;
