import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const CategoryForm = ({
  categoryName,
  setCategoryName,
  categoryError,
  handleCategoryIconChange,
  categoryIcon,
  handleAddCategory,
  setUiVariants,
}) => {
  const [serviceTypeSelection, setServiceTypeSelection] = useState("");
  const [imageError, setImageError] = useState("");

  const handleServiceTypeChange = (e) => {
    setServiceTypeSelection(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageError("");
      handleCategoryIconChange(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        selectedUiVariants.push("Men", "Women", "Kids");
        break;
      case "None":
        selectedUiVariants.push("None");
        break;
      default:
        break;
    }

    setUiVariants(selectedUiVariants);
    handleAddCategory(selectedUiVariants);
  };

  return (
    <form
      className="servermanager-card servermanager-add-category-form"
      onSubmit={handleSubmit}
    >
      <h3>Add Category</h3>
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
            <label>
              <input
                type="radio"
                name="serviceType"
                value="Cleaning"
                checked={serviceTypeSelection === "Cleaning"}
                onChange={handleServiceTypeChange}
              />
              Cleaning (Normal/Deep)
            </label>
            <label>
              <input
                type="radio"
                name="serviceType"
                value="Gender"
                checked={serviceTypeSelection === "Gender"}
                onChange={handleServiceTypeChange}
              />
              Gender (Male/Female)
            </label>
            <label>
              <input
                type="radio"
                name="serviceType"
                value="Time"
                checked={serviceTypeSelection === "Time"}
                onChange={handleServiceTypeChange}
              />
              Time (Hourly/Daily/Monthly)
            </label>
            <label>
              <input
                type="radio"
                name="serviceType"
                value="Cloth"
                checked={serviceTypeSelection === "Cloth"}
                onChange={handleServiceTypeChange}
              />
              Cloth (Men/Women/Kids)
            </label>
            <label>
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
  categoryName: PropTypes.string.isRequired,
  setCategoryName: PropTypes.func.isRequired,
  categoryError: PropTypes.string,
  handleCategoryIconChange: PropTypes.func.isRequired,
  categoryIcon: PropTypes.instanceOf(File),
  handleAddCategory: PropTypes.func.isRequired,
  setUiVariants: PropTypes.func.isRequired,
};

export default CategoryForm;
