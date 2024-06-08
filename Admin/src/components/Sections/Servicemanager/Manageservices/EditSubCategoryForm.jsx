import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const EditSubCategoryForm = ({
  selectedSubCategory,
  setShowEditSubCategoryForm,
  API_BASE_URL,
  AWS_BASE_URL,
}) => {
  const [subCategoryName, setSubCategoryName] = useState(
    selectedSubCategory.name,
  );
  const [subCategoryIcon, setSubCategoryIcon] = useState(
    selectedSubCategory.imageKey,
  );
  const [subCategoryError, setSubCategoryError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubCategoryIconChange = (e) => {
    if (e.target.files[0]) {
      setSubCategoryIcon(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleEditSubCategory = () => {
    if (!selectedSubCategory) {
      setSubCategoryError("No sub-category selected.");
      return;
    }

    if (subCategoryName.trim() === "") {
      setSubCategoryError("Sub-category name is required.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", subCategoryName);
    formData.append("isActive", true);
    formData.append("isDeleted", false);
    if (subCategoryIcon.startsWith("blob:")) {
      formData.append("image", subCategoryIcon);
    }

    axios
      .put(
        `${API_BASE_URL}/v1.0/core/sub-categories/${selectedSubCategory._id}`,
        formData,
      )
      .then((response) => {
        setSuccessMessage("Sub-category updated successfully");
        setErrorMessage("");
        setShowEditSubCategoryForm(false);
      })
      .catch((error) => {
        const errorResponse = error.response
          ? error.response.data
          : "Network error";
        setErrorMessage(`Failed to update sub-category: ${errorResponse}`);
        setSuccessMessage("");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="manageservice-card manageservice-edit-sub-category-form">
      <h3>
        Edit Sub-Category
        <FontAwesomeIcon
          icon={faTimes}
          className="manageservice-cancel-icon"
          onClick={() => setShowEditSubCategoryForm(false)}
        />
      </h3>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="manageservice-input-container">
        <label>Sub-Category Name:</label>
        <input
          type="text"
          className="manageservice-bottom-border-input"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
        />
        {subCategoryError && <span className="error">{subCategoryError}</span>}
      </div>
      {subCategoryIcon && (
        <div className="manageservice-preview-container">
          <img
            src={
              subCategoryIcon.startsWith("blob:")
                ? subCategoryIcon
                : `${AWS_BASE_URL}/${subCategoryIcon}`
            }
            alt="Sub-Category Icon"
            className="manageservice-preview-image"
          />
        </div>
      )}
      <div className="manageservice-upload-container">
        <input
          type="file"
          id="subCategoryIcon"
          onChange={handleSubCategoryIconChange}
          className="manageservice-file-upload"
        />
        <label
          htmlFor="subCategoryIcon"
          className="manageservice-upload-icon-label"
        >
          Choose Icon
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            className="manageservice-upload-icon"
          />
        </label>
      </div>
      <button
        id="manageservice-update-subcategory-button"
        className="manageservice-submit-button"
        onClick={handleEditSubCategory}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

EditSubCategoryForm.propTypes = {
  selectedSubCategory: PropTypes.object.isRequired,
  setShowEditSubCategoryForm: PropTypes.func.isRequired,
  API_BASE_URL: PropTypes.string.isRequired,
  AWS_BASE_URL: PropTypes.string.isRequired,
};

export default EditSubCategoryForm;
