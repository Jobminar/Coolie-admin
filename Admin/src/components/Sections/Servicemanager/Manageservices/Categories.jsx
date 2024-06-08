import React from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Ensure axios is imported
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Categories = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setShowEditCategoryForm,
  fetchSubcategories,
  setSubCategories,
  setServices,
  setCategories,
  setShowCategoryMenu,
  showCategoryMenu,
  API_BASE_URL,
}) => {
  const handleCategorySelect = (category) => {
    setSelectedCategory(category._id);
    setSubCategories([]);
    setServices([]);
    fetchSubcategories(category._id);
  };

  const handleDeleteCategory = (categoryId) => {
    axios
      .delete(`${API_BASE_URL}/v1.0/core/categories/${categoryId}`)
      .then((response) => {
        setCategories((prev) =>
          prev.filter((category) => category._id !== categoryId),
        );
      })
      .catch((error) => console.error("Error deleting category:", error));
  };

  return (
    <div className="manageservice-card" id="category-card">
      <div className="manageservice-form-group">
        <div className="manageservice-category-header">
          <span>Select Category</span>
          <button
            className="manageservice-hamburger-icon"
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
          >
            &#9776;
          </button>
        </div>
      </div>

      {showCategoryMenu && (
        <div className="manageservice-menu">
          {categories.map((category) => (
            <div
              key={category._id}
              className={`manageservice-menu-item ${
                selectedCategory === category._id ? "selected" : ""
              }`}
            >
              <span onClick={() => handleCategorySelect(category)}>
                {category.name}
              </span>
              <div className="manageservice-icon-group">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="manageservice-edit-icon"
                  onClick={() => {
                    setSelectedCategory(category._id);
                    setShowEditCategoryForm(true);
                  }}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="manageservice-delete-icon"
                  onClick={() => handleDeleteCategory(category._id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func.isRequired,
  setShowEditCategoryForm: PropTypes.func.isRequired,
  fetchSubcategories: PropTypes.func.isRequired,
  setSubCategories: PropTypes.func.isRequired,
  setServices: PropTypes.func.isRequired,
  setCategories: PropTypes.func.isRequired,
  setShowCategoryMenu: PropTypes.func.isRequired,
  showCategoryMenu: PropTypes.bool.isRequired,
  API_BASE_URL: PropTypes.string.isRequired,
};

export default Categories;
