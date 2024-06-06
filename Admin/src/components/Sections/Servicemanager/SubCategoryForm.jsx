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
  handleAddSubCategory: PropTypes.func.isRequired,
};

export default SubCategoryForm;
