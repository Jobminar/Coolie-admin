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

const EditSubCategoryForm = ({
  selectedSubCategory,
  setShowEditSubCategoryForm,
  API_BASE_URL,
  updateSubCategoryInParent,
  fetchServices,
  selectedCategory,
}) => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryIcon, setSubCategoryIcon] = useState("");
  const [subCategoryFile, setSubCategoryFile] = useState(null);
  const [subCategoryError, setSubCategoryError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uiVariants, setUiVariants] = useState([]);
  const [selectedVariantName, setSelectedVariantName] = useState("");

  useEffect(() => {
    if (selectedSubCategory) {
      setSubCategoryName(selectedSubCategory.name || "");
      setSubCategoryIcon(selectedSubCategory.imageKey || "");
      setSelectedVariantName(selectedSubCategory.variantName || "");
    }
  }, [selectedSubCategory]);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`${API_BASE_URL}/v1.0/core/categories/${selectedCategory}`)
        .then((response) => {
          setUiVariants(response.data.uiVariant || []);
        })
        .catch((error) => {
          console.error("Error fetching category uiVariants:", error);
          toast.error("Failed to load category variants.");
        });
    }
  }, [selectedCategory, API_BASE_URL]);

  const handleSubCategoryIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubCategoryIcon(URL.createObjectURL(file));
      setSubCategoryFile(file);
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

    if (selectedVariantName.trim() === "") {
      setSubCategoryError("Variant name is required.");
      return;
    }

    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to update this sub-category?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", subCategoryName);
            formData.append("variantName", selectedVariantName);
            formData.append("isActive", true);
            formData.append("isDeleted", false);

            if (subCategoryFile) {
              formData.append("image", subCategoryFile);
            }

            axios
              .put(
                `${API_BASE_URL}/v1.0/core/sub-categories/${selectedSubCategory._id}`,
                formData,
              )
              .then((response) => {
                const updatedSubCategory = response.data;
                toast.success("Sub-category updated successfully.");
                updateSubCategoryInParent(updatedSubCategory);
                setShowEditSubCategoryForm(false);
                fetchServices(selectedCategory, selectedSubCategory._id);
              })
              .catch((error) => {
                const errorResponse = error.response
                  ? error.response.data
                  : "Network error";
                toast.error(`Failed to update sub-category: ${errorResponse}`);
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
    <div className="manageServiceCard manageServiceEditSubCategoryForm">
      <h3>
        Edit Sub-Category
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
                  onClick: () => setShowEditSubCategoryForm(false),
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
        <label>Sub-Category Name:</label>
        <input
          type="text"
          className="manageServiceBottomBorderInput"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
        />
        {subCategoryError && <span className="error">{subCategoryError}</span>}
      </div>
      <div className="manageServiceInputContainer">
        <label>Variant Name:</label>
        <select
          className="manageServiceBottomBorderInput"
          value={selectedVariantName}
          onChange={(e) => setSelectedVariantName(e.target.value)}
        >
          <option value="" disabled>
            Select a variant
          </option>
          {uiVariants.map((variant) => (
            <option key={variant} value={variant}>
              {variant}
            </option>
          ))}
        </select>
        {subCategoryError && <span className="error">{subCategoryError}</span>}
      </div>
      {subCategoryIcon && (
        <div className="manageServicePreviewContainer">
          <img
            src={
              subCategoryIcon.startsWith("blob:")
                ? subCategoryIcon
                : subCategoryIcon
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
    variantName: PropTypes.string, // Added variantName prop type
  }).isRequired,
  setShowEditSubCategoryForm: PropTypes.func.isRequired,
  API_BASE_URL: PropTypes.string.isRequired,
  updateSubCategoryInParent: PropTypes.func.isRequired,
  fetchServices: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default EditSubCategoryForm;
