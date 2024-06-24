import React, { useState, useEffect } from "react";
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
  updateSubCategoryInParent,
  fetchServices,
  selectedCategory,
}) => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryIcon, setSubCategoryIcon] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Pre-fill the form with the current subcategory details
    if (selectedSubCategory) {
      setSubCategoryName(selectedSubCategory.name || "");
      setSubCategoryIcon(selectedSubCategory.imageKey || "");
    }
  }, [selectedSubCategory]);

  const handleSubCategoryIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubCategoryIcon(URL.createObjectURL(file));
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

    if (!window.confirm("Are you sure you want to update this sub-category?")) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", subCategoryName);
    formData.append("isActive", true);
    formData.append("isDeleted", false);

    // Only append image if it's a new one
    if (subCategoryIcon.startsWith("blob:")) {
      formData.append("image", subCategoryIcon);
    }

    axios
      .put(
        `${API_BASE_URL}/v1.0/core/sub-categories/${selectedSubCategory._id}`,
        formData,
      )
      .then((response) => {
        const updatedSubCategory = response.data;
        setSuccessMessage("Sub-category updated successfully");
        setErrorMessage("");
        updateSubCategoryInParent(updatedSubCategory); // Update the parent component's state
        setShowEditSubCategoryForm(false);
        fetchServices(selectedCategory, selectedSubCategory._id); // Fetch services after update
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
    <div className="manageServiceCard manageServiceEditSubCategoryForm">
      <h3>
        Edit Sub-Category
        <FontAwesomeIcon
          icon={faTimes}
          className="manageServiceCancelIcon"
          onClick={() => {
            if (window.confirm("Are you sure you want to cancel the edit?")) {
              setShowEditSubCategoryForm(false);
            }
          }}
        />
      </h3>
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <div className="manageServiceInputContainer">
        <label>Sub-Category Name:</label>
        <input
          type="text"
          className="manageServiceBottomBorderInput"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
        />
        {subCategoryError && <span className="error">{subCategoryError}</span>}
      </div>
      {subCategoryIcon && (
        <div className="manageServicePreviewContainer">
          <img
            src={
              subCategoryIcon.startsWith("blob:")
                ? subCategoryIcon
                : `${AWS_BASE_URL}/${subCategoryIcon}`
            }
            alt="Sub-Category Icon"
            className="manageServicePreviewImage"
          />
        </div>
      )}
      <div className="manageServiceUploadContainer">
        <input
          type="file"
          id="subCategoryIcon"
          onChange={handleSubCategoryIconChange}
          className="manageServiceFileUpload"
        />
        <label
          htmlFor="subCategoryIcon"
          className="manageServiceUploadIconLabel"
        >
          Choose Icon
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            className="manageServiceUploadIcon"
          />
        </label>
      </div>
      <button
        id="manageServiceUpdateSubCategoryButton"
        className="manageServiceSubmitButton"
        onClick={handleEditSubCategory}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

EditSubCategoryForm.propTypes = {
  selectedSubCategory: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    imageKey: PropTypes.string,
  }).isRequired,
  setShowEditSubCategoryForm: PropTypes.func.isRequired,
  API_BASE_URL: PropTypes.string.isRequired,
  AWS_BASE_URL: PropTypes.string.isRequired,
  updateSubCategoryInParent: PropTypes.func.isRequired,
  fetchServices: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default EditSubCategoryForm;
