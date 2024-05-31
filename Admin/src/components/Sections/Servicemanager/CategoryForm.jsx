import React from "react";
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
}) => {
  return (
    <div className="servermanager-card servermanager-add-category-form">
      <h3>Add Category</h3>
      <div className="servermanager-input-container">
        <label>Category Name:</label>
        <input
          type="text"
          className="servermanager-bottom-border-input"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {categoryError && <span className="error">{categoryError}</span>}
      </div>
      <div className="servermanager-upload-container">
        <input
          type="file"
          id="categoryIcon"
          onChange={handleCategoryIconChange}
          className="servermanager-file-upload"
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
            alt="Category Icon"
            className="servermanager-upload-preview"
          />
        )}
      </div>
      <button
        className="servermanager-submit-button"
        onClick={handleAddCategory}
      >
        Add
      </button>
    </div>
  );
};

// Adding PropTypes
CategoryForm.propTypes = {
  categoryName: PropTypes.string.isRequired,
  setCategoryName: PropTypes.func.isRequired,
  categoryError: PropTypes.string,
  handleCategoryIconChange: PropTypes.func.isRequired,
  categoryIcon: PropTypes.instanceOf(File), // This assumes categoryIcon is a File object
  handleAddCategory: PropTypes.func.isRequired,
};

export default CategoryForm;
