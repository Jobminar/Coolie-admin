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
  const [subCategoryFile, setSubCategoryFile] = useState(null);
  const [subCategoryError, setSubCategoryError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("Initial props:", {
    selectedSubCategory,
    API_BASE_URL,
    AWS_BASE_URL,
    selectedCategory,
  });

  useEffect(() => {
    // Pre-fill the form with the current subcategory details
    if (selectedSubCategory) {
      console.log("Selected sub-category:", selectedSubCategory);
      setSubCategoryName(selectedSubCategory.name || "");
      setSubCategoryIcon(selectedSubCategory.imageKey || "");
    }
  }, [selectedSubCategory]);

  const handleSubCategoryIconChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (file) {
      setSubCategoryIcon(URL.createObjectURL(file));
      setSubCategoryFile(file);
    }
  };

  const handleEditSubCategory = () => {
    console.log("Starting sub-category edit...");
    console.log("Current state before edit:", {
      subCategoryName,
      subCategoryIcon,
      subCategoryFile,
    });

    if (!selectedSubCategory) {
      console.log("No sub-category selected.");
      setSubCategoryError("No sub-category selected.");
      return;
    }

    if (subCategoryName.trim() === "") {
      console.log("Sub-category name is required.");
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
    if (subCategoryFile) {
      console.log("Appending image file to form data:", subCategoryFile);
      formData.append("image", subCategoryFile);
    }

    console.log("Form data before sending:", formData);

    axios
      .put(
        `${API_BASE_URL}/v1.0/core/sub-categories/${selectedSubCategory._id}`,
        formData,
      )
      .then((response) => {
        console.log("Sub-category updated successfully:", response);
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
        console.log("Failed to update sub-category:", errorResponse);
        setErrorMessage(`Failed to update sub-category: ${errorResponse}`);
        setSuccessMessage("");
      })
      .finally(() => {
        setLoading(false);
        console.log("Finished sub-category edit.");
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
              console.log("Closing edit sub-category form.");
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
          onChange={(e) => {
            console.log("Sub-category name changed:", e.target.value);
            setSubCategoryName(e.target.value);
          }}
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
            onLoad={() => console.log("Image loaded successfully")}
            onError={(e) => {
              console.error("Error loading image:", e);
              e.target.src = ""; // Fallback in case the image fails to load
            }}
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
