import React, { useState } from "react";
import AddServiceForm from "./AddServiceForm";
import "./servermanager.css"; // Ensure the CSS file is correctly linked

const Servermanager = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSubCategoryMenu, setShowSubCategoryMenu] = useState(false);
  const [showServiceVariantsMenu, setShowServiceVariantsMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showAddSubCategoryForm, setShowAddSubCategoryForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [subCategoryIcon, setSubCategoryIcon] = useState(null);

  const categories = ["Cleaning service", "Salon At Home", "Add new category"];
  const subCategories = [
    "Kitchen cleaning",
    "House cleaning",
    "Swimming pool",
    "Salon At Home",
    "Add new sub-category",
  ];
  const serviceVariants = ["Variant 1", "Variant 2", "Add New Service Variant"];

  const handleCategorySelect = (category) => {
    if (category === "Add new category") {
      setShowAddCategoryForm(true);
    } else {
      setSelectedCategory(category);
      setShowCategoryMenu(false);
      setShowAddCategoryForm(false);
      setShowSubCategoryMenu(true);
      setShowServiceVariantsMenu(false);
      setShowServiceForm(false);
    }
  };

  const handleSubCategorySelect = (subCategory) => {
    if (subCategory === "Add new sub-category") {
      setShowAddSubCategoryForm(true);
      setShowServiceVariantsMenu(false);
      setShowServiceForm(false);
    } else {
      setSelectedSubCategory(subCategory);
      setShowSubCategoryMenu(false);
      setShowAddSubCategoryForm(false);
      setShowServiceVariantsMenu(true);
      setShowServiceForm(false);
    }
  };

  const handleServiceVariantSelect = (variant) => {
    if (variant === "Add New Service Variant") {
      setShowServiceForm(true);
    } else {
      setShowServiceForm(false);
    }
  };

  const toggleServiceForm = () => {
    setShowServiceForm((prev) => !prev);
  };

  const handleCategoryIconChange = (e) => {
    setCategoryIcon(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubCategoryIconChange = (e) => {
    setSubCategoryIcon(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="servermanager-container">
      <h2>Manage Service</h2>

      <div className="card-container">
        <div className="card" id="category-card">
          <div className="form-group">
            <div className="category-header">
              <span>Select Category</span>
              <button
                className="add-button"
                onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}
              >
                +
              </button>
              <button
                className="hamburger-icon"
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              >
                &#9776;
              </button>
            </div>
          </div>

          {showCategoryMenu && (
            <div className="menu">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`menu-item ${
                    selectedCategory === category ? "selected" : ""
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        {showAddCategoryForm && (
          <div className="card add-category-form">
            <h3>Add Category</h3>
            <div className="input-container">
              <label>Category Name:</label>
              <input type="text" className="bottom-border-input" />
            </div>
            <div className="upload-container">
              <div className="input-container">
                <label>Category Icon:</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="categoryIcon"
                    onChange={handleCategoryIconChange}
                  />
                  <label htmlFor="categoryIcon" className="upload-icon-label">
                    <i className="upload-icon">&#128247;</i> Upload
                  </label>
                </div>
                {categoryIcon && (
                  <img
                    src={categoryIcon}
                    alt="Category Icon"
                    className="upload-preview"
                  />
                )}
              </div>
            </div>
            <div className="input-container">
              <label>Category Type:</label>
              <select className="bottom-border-input">
                <option>Normal / Deep</option>
                <option>Male / Female</option>
                <option>Hour / Daily / Monthly</option>
                <option>Laundry / Dry cleaning</option>
              </select>
            </div>
            <button className="submit-button">Add</button>
          </div>
        )}

        {selectedCategory && (
          <div className="card" id="subcategory-card">
            <div className="form-group">
              <label>Select Sub-Category</label>
              <div className="category-header">
                <button
                  className="hamburger-icon"
                  onClick={() => setShowSubCategoryMenu(!showSubCategoryMenu)}
                >
                  &#9776;
                </button>
                <span>Select Sub-Category</span>
                <button
                  className="add-button"
                  onClick={() =>
                    setShowAddSubCategoryForm(!showAddSubCategoryForm)
                  }
                >
                  +
                </button>
              </div>
            </div>

            {showSubCategoryMenu && (
              <div className="menu">
                {subCategories.map((subCategory, index) => (
                  <div
                    key={index}
                    className={`menu-item ${
                      selectedSubCategory === subCategory ? "selected" : ""
                    }`}
                    onClick={() => handleSubCategorySelect(subCategory)}
                  >
                    {subCategory}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {showAddSubCategoryForm && (
          <div className="card add-sub-category-form">
            <h3>Add Sub-Category</h3>
            <div className="input-container">
              <label>Sub-Category Name:</label>
              <input type="text" className="bottom-border-input" />
            </div>
            <div className="upload-container">
              <div className="input-container">
                <label>Sub-Category Icon:</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="subCategoryIcon"
                    onChange={handleSubCategoryIconChange}
                  />
                  <label
                    htmlFor="subCategoryIcon"
                    className="upload-icon-label"
                  >
                    <i className="upload-icon">&#128247;</i> Upload
                  </label>
                </div>
                {subCategoryIcon && (
                  <img
                    src={subCategoryIcon}
                    alt="Sub-Category Icon"
                    className="upload-preview"
                  />
                )}
              </div>
            </div>
            <div className="input-container">
              <label>Sub-Category Type:</label>
              <select className="bottom-border-input">
                <option>Normal</option>
                <option>Deep</option>
                <option>Male</option>
                <option>Female</option>
                <option>Hour</option>
                <option>Daily</option>
                <option>Monthly</option>
              </select>
            </div>
            <button className="submit-button">Add</button>
          </div>
        )}

        {selectedSubCategory && (
          <div className="card" id="service-variant-card">
            <div className="form-group">
              <label>Service Variants</label>
              <div className="category-header">
                <button
                  className="hamburger-icon"
                  onClick={() =>
                    setShowServiceVariantsMenu(!showServiceVariantsMenu)
                  }
                >
                  &#9776;
                </button>
                <span>Service Variants</span>
                <button className="add-button" onClick={toggleServiceForm}>
                  +
                </button>
              </div>
            </div>

            {showServiceVariantsMenu && (
              <div className="menu">
                {serviceVariants.map((variant, index) => (
                  <div
                    key={index}
                    className={`menu-item ${showServiceForm ? "selected" : ""}`}
                    onClick={() => handleServiceVariantSelect(variant)}
                  >
                    {variant}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showServiceForm && <AddServiceForm />}
    </div>
  );
};

export default Servermanager;
