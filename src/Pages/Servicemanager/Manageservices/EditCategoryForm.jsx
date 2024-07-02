import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/manageservice.css";

const EditCategoryForm = ({
  selectedCategory,
  setShowEditCategoryForm,
  API_BASE_URL,
  AWS_BASE_URL,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.name || "");
      setCategoryIcon(selectedCategory.imageKey || "");
    }
  }, [selectedCategory]);

  const handleCategoryIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryIcon(URL.createObjectURL(file));
    }
  };

  const handleEditCategory = () => {
    if (!selectedCategory) {
      setCategoryError("No category selected.");
      return;
    }

    if (!categoryName.trim()) {
      setCategoryError("Category name is required.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("isActive", true);
    formData.append("isDeleted", false);

    // Only append image if it's a new one
    if (categoryIcon.startsWith("blob:")) {
      formData.append("image", categoryIcon);
    }

    axios
      .put(
        `${API_BASE_URL}/v1.0/core/categories/${selectedCategory._id}`,
        formData,
      )
      .then(() => {
        setSuccessMessage("Category updated successfully");
        setErrorMessage("");
        setShowEditCategoryForm(false);
      })
      .catch((error) => {
        const errorResponse = error.response
          ? error.response.data
          : "Network error";
        setErrorMessage(`Failed to update category: ${errorResponse}`);
        setSuccessMessage("");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="manageServiceCard manageServiceEditCategoryForm">
      <h3>
        Edit Category
        <FontAwesomeIcon
          icon={faTimes}
          className="manageServiceCancelIcon"
          onClick={() => setShowEditCategoryForm(false)}
        />
      </h3>
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <div className="manageServiceInputContainer">
        <label htmlFor="categoryName">Category Name:</label>
        <input
          type="text"
          id="categoryName"
          className="manageServiceBottomBorderInput"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {categoryError && <span className="error">{categoryError}</span>}
      </div>
      {categoryIcon && (
        <div className="manageServicePreviewContainer">
          <img
            src={
              categoryIcon.startsWith("blob:")
                ? categoryIcon
                : `${AWS_BASE_URL}/${categoryIcon}`
            }
            alt="Category Icon"
            className="manageServicePreviewImage"
          />
        </div>
      )}
      <div className="manageServiceUploadContainer">
        <input
          type="file"
          id="categoryIcon"
          onChange={handleCategoryIconChange}
          className="manageServiceFileUpload"
        />
        <label htmlFor="categoryIcon" className="manageServiceUploadIconLabel">
          Choose Icon
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            className="manageServiceUploadIcon"
          />
        </label>
      </div>
      <button
        id="manageServiceUpdateCategoryButton"
        className="manageServiceSubmitButton"
        onClick={handleEditCategory}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

EditCategoryForm.propTypes = {
  selectedCategory: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    imageKey: PropTypes.string,
  }),
  setShowEditCategoryForm: PropTypes.func.isRequired,
  API_BASE_URL: PropTypes.string.isRequired,
  AWS_BASE_URL: PropTypes.string.isRequired,
};

export default EditCategoryForm;
