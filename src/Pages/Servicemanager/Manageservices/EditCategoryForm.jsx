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
  const [categoryFile, setCategoryFile] = useState(null);
  const [categoryError, setCategoryError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("Initial props:", {
    selectedCategory,
    API_BASE_URL,
    AWS_BASE_URL,
  });

  useEffect(() => {
    if (selectedCategory) {
      console.log("Selected category:", selectedCategory);
      setCategoryName(selectedCategory.name || "");
      setCategoryIcon(selectedCategory.imageKey || "");
    }
  }, [selectedCategory]);

  const handleCategoryIconChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (file) {
      setCategoryIcon(URL.createObjectURL(file));
      setCategoryFile(file);
    }
  };

  const handleEditCategory = () => {
    console.log("Starting category edit...");
    console.log("Current state before edit:", {
      categoryName,
      categoryIcon,
      categoryFile,
    });

    if (!selectedCategory) {
      console.log("No category selected.");
      setCategoryError("No category selected.");
      return;
    }

    if (!categoryName.trim()) {
      console.log("Category name is required.");
      setCategoryError("Category name is required.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("isActive", true);
    formData.append("isDeleted", false);

    // Only append image if it's a new one
    if (categoryFile) {
      console.log("Appending image file to form data:", categoryFile);
      formData.append("image", categoryFile);
    }

    console.log("Form data before sending:", formData);

    axios
      .put(
        `${API_BASE_URL}/v1.0/core/categories/${selectedCategory._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((response) => {
        console.log("Category updated successfully:", response);
        setSuccessMessage("Category updated successfully");
        setErrorMessage("");
        setShowEditCategoryForm(false);
      })
      .catch((error) => {
        const errorResponse = error.response
          ? error.response.data
          : "Network error";
        console.log("Failed to update category:", errorResponse);
        setErrorMessage(`Failed to update category: ${errorResponse}`);
        setSuccessMessage("");
      })
      .finally(() => {
        setLoading(false);
        console.log("Finished category edit.");
      });
  };

  return (
    <div className="manageServiceCard manageServiceEditCategoryForm">
      <h3>
        Edit Category
        <FontAwesomeIcon
          icon={faTimes}
          className="manageServiceCancelIcon"
          onClick={() => {
            console.log("Closing edit category form.");
            setShowEditCategoryForm(false);
          }}
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
          onChange={(e) => {
            console.log("Category name changed:", e.target.value);
            setCategoryName(e.target.value);
          }}
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
