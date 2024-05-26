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
  const [showServiceForm, setShowServiceForm] = useState(false);

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
      setExpandedCard("category");
    } else {
      setSelectedCategory(category);
      setExpandedCard(null);
      setShowSubCategoryMenu(true);
      setShowServiceVariantsMenu(false);
      setShowServiceForm(false);
    }
  };

  const handleSubCategorySelect = (subCategory) => {
    if (subCategory === "Add new sub-category") {
      setExpandedCard("subcategory");
      setShowServiceVariantsMenu(false);
      setShowServiceForm(false);
    } else {
      setSelectedSubCategory(subCategory);
      setExpandedCard(null);
      setShowServiceVariantsMenu(true);
      setShowServiceForm(false);
    }
  };

  const handleServiceVariantSelect = (variant) => {
    if (variant === "Add New Service Variant") {
      setExpandedCard("serviceVariant");
      setShowServiceForm(true);
    } else {
      setShowServiceForm(false);
    }
  };

  const handleAddSubCategory = () => {
    setExpandedCard(null);
    setShowServiceVariantsMenu(true);
  };

  const toggleServiceForm = () => {
    setShowServiceForm((prev) => !prev);
  };

  return (
    <div className="servermanager-container">
      <h2>Manage Service</h2>

      <div className="card-container">
        <div
          className={`card ${expandedCard === "category" ? "expanded" : ""}`}
          id="category-card"
        >
          <div className="form-group">
            <div className="category-header">
              <span>Select Category</span>
              <button
                className="add-button"
                onClick={() =>
                  setExpandedCard(
                    expandedCard === "category" ? null : "category",
                  )
                }
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

          {expandedCard === "category" && (
            <div className="add-category-form">
              <h3>Add Category</h3>
              <div className="form-group">
                <label>Category Name:</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Category Icon:</label>
                <input type="file" id="categoryIcon" />
                <label htmlFor="categoryIcon" className="upload-icon-label">
                  <i className="upload-icon">&#128247;</i> Upload
                </label>
              </div>
              <div className="form-group">
                <label>Category Type:</label>
                <select>
                  <option>Normal / Deep</option>
                  <option>Male / Female</option>
                  <option>Hour / Daily / Monthly</option>
                  <option>Laundry / Dry cleaning</option>
                </select>
              </div>
              <button className="submit-button">Add</button>
            </div>
          )}
        </div>

        {selectedCategory && (
          <div
            className={`card ${
              expandedCard === "subcategory" ? "expanded" : ""
            }`}
            id="subcategory-card"
          >
            <div className="form-group">
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
                    setExpandedCard(
                      expandedCard === "subcategory" ? null : "subcategory",
                    )
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

            {expandedCard === "subcategory" && (
              <div className="add-sub-category-form">
                <h3>Add Sub-Category</h3>
                <div className="form-group">
                  <label>Sub-Category Name:</label>
                  <input type="text" />
                </div>
                <div className="form-group">
                  <label>Sub-Category Icon:</label>
                  <input type="file" id="subCategoryIcon" />
                  <label
                    htmlFor="subCategoryIcon"
                    className="upload-icon-label"
                  >
                    <i className="upload-icon">&#128247;</i> Upload
                  </label>
                </div>
                <div className="form-group">
                  <label>Sub-Category Type:</label>
                  <select>
                    <option>Normal</option>
                    <option>Deep</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Hour</option>
                    <option>Daily</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <button
                  className="submit-button"
                  onClick={handleAddSubCategory}
                >
                  Add
                </button>
              </div>
            )}
          </div>
        )}

        {selectedSubCategory && (
          <div
            className={`card ${
              expandedCard === "serviceVariant" ? "expanded" : ""
            }`}
            id="service-variant-card"
          >
            <div className="form-group">
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
