import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
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
    setSelectedSubCategory(subCategory);
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
          {subCategories.length > 0 ? (
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
                    onClick={() => {
                      setSelectedSubCategory(subCategory);
                      setShowEditSubCategoryForm(true);
                    }}
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
};

export default SubCategories;
