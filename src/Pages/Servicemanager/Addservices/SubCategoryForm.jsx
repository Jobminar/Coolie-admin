import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const SubCategoryForm = ({
  subCategoryName,
  setSubCategoryName,
  subCategoryError,
  handleSubCategoryIconChange,
  subCategoryIcon,
  handleAddSubCategory,
}) => {
  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("subCategoryName changed:", subCategoryName);
  }, [subCategoryName]);

  useEffect(() => {
    console.log("subCategoryError changed:", subCategoryError);
  }, [subCategoryError]);

  useEffect(() => {
    console.log("subCategoryIcon changed:", subCategoryIcon);
  }, [subCategoryIcon]);

  console.log("Rendering SubCategoryForm");

  return (
    <div className="servermanager-card servermanager-add-sub-category-form">
      <h3>Add Sub-Category</h3>
      <div className="servermanagerinputcontainer">
        <label htmlFor="subCategoryName">Sub-Category Name:</label>
        <input
          type="text"
          id="subCategoryName"
          className="servermanager-bottom-border-input"
          value={subCategoryName}
          onChange={(e) => {
            console.log("Sub-category name input changed:", e.target.value);
            setSubCategoryName(e.target.value);
          }}
          aria-label="Sub-Category Name"
        />
        {subCategoryError && (
          <span className="error">
            {console.log("Displaying subCategoryError:", subCategoryError)}
            {subCategoryError}
          </span>
        )}
      </div>
      <div className="servermanageruploadcontainer">
        <input
          type="file"
          id="subCategoryIcon"
          onChange={(e) => {
            console.log("File input changed:", e.target.files[0]);
            handleSubCategoryIconChange(e);
          }}
          className="servermanager-file-upload"
          aria-label="Sub-Category Icon"
        />
        <label
          htmlFor="subCategoryIcon"
          className="servermanager-upload-icon-label"
        >
          Choose Icon
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            className="servermanager-upload-icon"
          />
        </label>
        {subCategoryIcon && (
          <img
            src={URL.createObjectURL(subCategoryIcon)}
            alt="Sub-Category Icon Preview"
            className="servermanager-upload-preview"
          />
        )}
      </div>
      <button
        className="servermanager-submit-button"
        onClick={() => {
          console.log("Add Sub-Category button clicked");
          handleAddSubCategory();
        }}
        aria-label="Add Sub-Category"
      >
        Add
      </button>
    </div>
  );
};

SubCategoryForm.propTypes = {
  subCategoryName: PropTypes.string.isRequired,
  setSubCategoryName: PropTypes.func.isRequired,
  subCategoryError: PropTypes.string,
  handleSubCategoryIconChange: PropTypes.func.isRequired,
  subCategoryIcon: PropTypes.instanceOf(File),
  handleAddSubCategory: PropTypes.func.isRequired,
};

export default SubCategoryForm;
