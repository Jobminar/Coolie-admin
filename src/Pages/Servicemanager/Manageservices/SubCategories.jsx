import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";

const SubCategories = ({
  subCategories,
  selectedSubCategory,
  setSelectedSubCategory,
  setShowEditSubCategoryForm,
  setShowSubCategoryMenu,
  showSubCategoryMenu,
  setSubCategories,
  fetchServices,
  API_BASE_URL,
  selectedCategory,
  subCategoriesError,
}) => {
  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
    fetchServices(selectedCategory, subCategory._id);
  };

  const handleDeleteSubCategory = (subCategoryId) => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete this sub-category?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(
                `${API_BASE_URL}/v1.0/core/sub-categories/${subCategoryId}`,
              )
              .then(() => {
                setSubCategories((prev) =>
                  prev.filter((sub) => sub._id !== subCategoryId),
                );
                toast.success("Sub-category deleted successfully.");
              })
              .catch((error) => {
                console.error("Error deleting sub-category:", error);
                toast.error("Error deleting sub-category.");
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleEditSubCategory = (subCategory) => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to edit this sub-category?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setSelectedSubCategory(subCategory);
            setShowEditSubCategoryForm(true);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="manageServiceCard" id="subCategoryCard">
      <div className="manageServiceFormGroup">
        <div className="manageServiceCategoryHeader">
          <span>Select Sub-Category</span>
          <button
            className="manageServiceHamburgerIcon"
            onClick={() => setShowSubCategoryMenu(!showSubCategoryMenu)}
          >
            &#9776;
          </button>
        </div>
      </div>

      {showSubCategoryMenu && (
        <div className="manageServiceMenu">
          {subCategoriesError ? (
            <div className="manageServiceMenuItem">
              No available subcategories
            </div>
          ) : subCategories.length > 0 ? (
            subCategories.map((subCategory) => (
              <div
                key={subCategory._id}
                className={`manageServiceMenuItem ${
                  selectedSubCategory?._id === subCategory._id ? "selected" : ""
                }`}
              >
                <span onClick={() => handleSubCategorySelect(subCategory)}>
                  {subCategory.name}
                </span>
                <div className="manageServiceIconGroup">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="manageServiceEditIcon"
                    onClick={() => handleEditSubCategory(subCategory)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="manageServiceDeleteIcon"
                    onClick={() => handleDeleteSubCategory(subCategory._id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="manageServiceMenuItem">No subcategories found</div>
          )}
        </div>
      )}
    </div>
  );
};

SubCategories.propTypes = {
  subCategories: PropTypes.array.isRequired,
  selectedSubCategory: PropTypes.object,
  setSelectedSubCategory: PropTypes.func.isRequired,
  setShowEditSubCategoryForm: PropTypes.func.isRequired,
  setShowSubCategoryMenu: PropTypes.func.isRequired,
  showSubCategoryMenu: PropTypes.bool.isRequired,
  setSubCategories: PropTypes.func.isRequired,
  fetchServices: PropTypes.func.isRequired,
  API_BASE_URL: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  subCategoriesError: PropTypes.bool.isRequired,
};

export default SubCategories;
