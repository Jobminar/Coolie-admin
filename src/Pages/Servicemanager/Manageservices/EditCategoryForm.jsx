import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";
import "./styles/manageservice.css";

const EditCategoryForm = ({
  selectedCategory,
  setShowEditCategoryForm,
  API_BASE_URL,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [categoryFile, setCategoryFile] = useState(null);
  const [categoryError, setCategoryError] = useState("");
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
      setCategoryFile(file);
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

    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to update this category?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", categoryName);
            formData.append("isActive", true);
            formData.append("isDeleted", false);

            if (categoryFile) {
              formData.append("image", categoryFile);
            }

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
                toast.success("Category updated successfully.");
                setShowEditCategoryForm(false);
              })
              .catch((error) => {
                const errorResponse = error.response
                  ? error.response.data
                  : "Network error";
                toast.error(`Failed to update category: ${errorResponse}`);
              })
              .finally(() => {
                setLoading(false);
              });
          },
        },
        {
          label: "No",
        },
      ],
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
            confirmAlert({
              title: "Confirm",
              message: "Are you sure you want to cancel the edit?",
              buttons: [
                {
                  label: "Yes",
                  onClick: () => setShowEditCategoryForm(false),
                },
                {
                  label: "No",
                },
              ],
            });
          }}
        />
      </h3>
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
            src={categoryIcon.startsWith("blob:") ? categoryIcon : categoryIcon}
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
};

export default EditCategoryForm;
