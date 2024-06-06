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
  setServiceTypes, // New prop to set service types
}) => {
  const [serviceTypeSelection, setServiceTypeSelection] = useState("");

  const handleServiceTypeChange = (e) => {
    const { value } = e.target;
    setServiceTypeSelection(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedServiceTypes = [];
    if (serviceTypeSelection === "Cleaning") {
      selectedServiceTypes.push("Normal cleaning", "Deep cleaning");
    }
    if (serviceTypeSelection === "Gender") {
      selectedServiceTypes.push("Male", "Female");
    }
    if (serviceTypeSelection === "Time") {
      selectedServiceTypes.push("Hour", "Daily", "Monthly");
    }
    setServiceTypes(selectedServiceTypes); // Pass selected service types to parent
    handleAddCategory(); // Add category after setting service types
  };

  return (
    <form
      className="servermanager-card servermanager-add-category-form"
      onSubmit={handleSubmit}
    >
      <h3>Add Category</h3>
      <div className="servermanager-input-container">
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
      <div className="servermanager-upload-container">
        <input
          type="file"
          id="categoryIcon"
          onChange={handleCategoryIconChange}
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
        {categoryIcon && (
          <img
            src={URL.createObjectURL(categoryIcon)}
            alt="Category Icon Preview"
            className="servermanager-upload-preview"
          />
        )}
      </div>
      <div className="servermanager-input-container">
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
            Time (Hour/Daily/Monthly)
          </label>
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
  setServiceTypes: PropTypes.func.isRequired, // New prop type
};

export default CategoryForm;
