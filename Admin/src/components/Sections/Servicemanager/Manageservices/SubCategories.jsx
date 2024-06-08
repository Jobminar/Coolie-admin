import React from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Ensure axios is imported
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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
}) => {
  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory._id);
    fetchServices(selectedCategory, subCategory._id);
  };

  const handleDeleteSubCategory = (subCategoryId) => {
    axios
      .delete(`${API_BASE_URL}/v1.0/core/sub-categories/${subCategoryId}`)
      .then(() => {
        setSubCategories((prev) =>
          prev.filter((sub) => sub._id !== subCategoryId),
        );
      })
      .catch((error) => console.error("Error deleting sub-category:", error));
  };

  return (
    <div className="manageservice-card" id="subcategory-card">
      <div className="manageservice-form-group">
        <div className="manageservice-category-header">
          <span>Select Sub-Category</span>
          <button
            className="manageservice-hamburger-icon"
            onClick={() => setShowSubCategoryMenu(!showSubCategoryMenu)}
          >
            &#9776;
          </button>
        </div>
      </div>

      {showSubCategoryMenu && (
        <div className="manageservice-menu">
          {subCategories.length > 0 ? (
            subCategories.map((subCategory) => (
              <div
                key={subCategory._id}
                className={`manageservice-menu-item ${
                  selectedSubCategory === subCategory._id ? "selected" : ""
                }`}
              >
                <span onClick={() => handleSubCategorySelect(subCategory)}>
                  {subCategory.name}
                </span>
                <div className="manageservice-icon-group">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="manageservice-edit-icon"
                    onClick={() => {
                      setSelectedSubCategory(subCategory._id);
                      setShowEditSubCategoryForm(true);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="manageservice-delete-icon"
                    onClick={() => handleDeleteSubCategory(subCategory._id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="manageservice-menu-item">
              No subcategories found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

SubCategories.propTypes = {
  subCategories: PropTypes.array.isRequired,
  selectedSubCategory: PropTypes.string,
  setSelectedSubCategory: PropTypes.func.isRequired,
  setShowEditSubCategoryForm: PropTypes.func.isRequired,
  setShowSubCategoryMenu: PropTypes.func.isRequired,
  showSubCategoryMenu: PropTypes.bool.isRequired,
  setSubCategories: PropTypes.func.isRequired,
  fetchServices: PropTypes.func.isRequired,
  API_BASE_URL: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default SubCategories;
