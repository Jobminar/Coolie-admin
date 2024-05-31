import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const SubCategoryForm = ({
  subCategoryName,
  setSubCategoryName,
  subCategoryError,
  handleSubCategoryIconChange,
  subCategoryIcon,
  serviceVariant,
  setServiceVariant,
  handleAddSubCategory,
}) => {
  return (
    <div className="servermanager-card servermanager-add-sub-category-form">
      <h3>Add Sub-Category</h3>
      <div className="servermanager-input-container">
        <label htmlFor="subCategoryName">Sub-Category Name:</label>
        <input
          type="text"
          id="subCategoryName"
          className="servermanager-bottom-border-input"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          aria-label="Sub-Category Name"
        />
        {subCategoryError && <span className="error">{subCategoryError}</span>}
      </div>
      <div className="servermanager-upload-container">
        <input
          type="file"
          id="subCategoryIcon"
          onChange={handleSubCategoryIconChange}
          className="servermanager-file-upload"
          aria-label="Sub-Category Icon"
        />
        <label
          htmlFor="subCategoryIcon"
          className="servermanager-upload-icon-label"
        >
          Choose Icon
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            className="servermanager-upload-icon"
          />
        </label>
        {subCategoryIcon && (
          <img
            src={URL.createObjectURL(subCategoryIcon)}
            alt="Sub-Category Icon Preview"
            className="servermanager-upload-preview"
          />
        )}
      </div>
      <div className="servermanager-input-container">
        <label htmlFor="serviceVariant">Service Variant:</label>
        <select
          id="serviceVariant"
          className="servermanager-bottom-border-input"
          value={serviceVariant}
          onChange={(e) => setServiceVariant(e.target.value)}
          aria-label="Service Variant"
        >
          <option value="">Select a variant</option>
          <option value="Normal cleaning">Normal cleaning</option>
          <option value="Deep cleaning">Deep cleaning</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Hour">Hour</option>
          <option value="Daily">Daily</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      <button
        className="servermanager-submit-button"
        onClick={handleAddSubCategory}
        aria-label="Add Sub-Category"
      >
        Add
      </button>
    </div>
  );
};

SubCategoryForm.propTypes = {
  subCategoryName: PropTypes.string.isRequired,
  setSubCategoryName: PropTypes.func.isRequired,
  subCategoryError: PropTypes.string,
  handleSubCategoryIconChange: PropTypes.func.isRequired,
  subCategoryIcon: PropTypes.instanceOf(File),
  serviceVariant: PropTypes.string.isRequired,
  setServiceVariant: PropTypes.func.isRequired,
  handleAddSubCategory: PropTypes.func.isRequired,
};

export default SubCategoryForm;
