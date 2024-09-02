import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import * as api from "./api/servicemanager-api";

const SubCategoryForm = ({
  subCategoryName,
  setSubCategoryName,
  subCategoryError,
  handleSubCategoryIconChange,
  subCategoryIcon,
  handleAddSubCategory,
  lastCategoryId,
}) => {
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState("");

  useEffect(() => {
    if (lastCategoryId) {
      api
        .fetchCategoryById(lastCategoryId)
        .then((response) => {
          setVariants(response.data.uiVariant || []);
        })
        .catch((error) => {
          console.error("Error fetching category uiVariant:", error);
        });
    }
  }, [lastCategoryId]);

  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
  };

  const handleSubmit = () => {
    // Add detailed error logging to identify which field is missing
    if (subCategoryName.trim() === "") {
      console.error("Sub-category name is missing.");
    }
    if (!subCategoryIcon) {
      console.error("Sub-category icon is missing.");
    }
    if (!selectedVariant) {
      console.error("Sub-category variant is missing.");
    }

    if (subCategoryName.trim() === "" || !subCategoryIcon || !selectedVariant) {
      console.error("All fields are required.");
      return;
    }

    handleAddSubCategory(selectedVariant);
  };

  return (
    <div className="servermanager-card servermanager-add-sub-category-form">
      <h3>Add Sub-Category</h3>
      <div className="servermanagerinputcontainer">
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
      <div className="servermanageruploadcontainer">
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
      <div className="servermanagerinputcontainer">
        <label htmlFor="variantSelect">Select Variant:</label>
        <select
          id="variantSelect"
          value={selectedVariant}
          onChange={handleVariantChange}
          aria-label="Variant Name"
        >
          <option value="" disabled>
            Select a variant
          </option>
          {variants.map((variant, index) => (
            <option key={index} value={variant}>
              {variant}
            </option>
          ))}
        </select>
      </div>
      <button
        className="servermanager-submit-button"
        onClick={handleSubmit}
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
  lastCategoryId: PropTypes.string.isRequired,
};

export default SubCategoryForm;
