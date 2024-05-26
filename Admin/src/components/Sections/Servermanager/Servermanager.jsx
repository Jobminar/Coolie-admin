import React, { useState } from "react";
import AddServiceForm from "./AddServiceForm";
import "./servermanager.css"; // Ensure the CSS file is correctly linked

const Servermanager = () => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSubCategoryMenu, setShowSubCategoryMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showAddSubCategoryForm, setShowAddSubCategoryForm] = useState(false);
  const [showServiceVariants, setShowServiceVariants] = useState(false);
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
      setShowAddCategoryForm(true);
    } else {
      setSelectedCategory(category);
      setShowCategoryMenu(false);
      setShowSubCategoryMenu(true);
      setShowServiceVariants(false);
      setShowServiceForm(false);
    }
  };

  const handleSubCategorySelect = (subCategory) => {
    if (subCategory === "Add new sub-category") {
      setShowAddSubCategoryForm(true);
      setShowServiceVariants(false);
      setShowServiceForm(false);
    } else {
      setSelectedSubCategory(subCategory);
      setShowSubCategoryMenu(false);
      setShowServiceVariants(true);
      setShowAddSubCategoryForm(false);
    }
  };

  const handleServiceVariantSelect = (variant) => {
    if (variant === "Add New Service Variant") {
      setShowServiceForm(true);
    } else {
      setShowServiceForm(false);
    }
  };

  const handleAddSubCategory = () => {
    setShowAddSubCategoryForm(false);
    setShowServiceVariants(true);
  };

  return (
    <div className="servermanager-container">
      <h2>Manage Service</h2>

      <div className="card-container">
        <div className="card fixed-card">
          <div className="form-group">
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>{selectedCategory || "Select Category"}</span>
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
                  className="menu-item"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}

          {showAddCategoryForm && (
            <div className="card add-category-card">
              <h3>Add Category</h3>
              <div className="form-group">
                <label>Category Name:</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Category Icon:</label>
                <input type="file" />
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
          <div className="card fixed-card">
            <div className="form-group">
              <label>Select Sub-Category</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  className="hamburger-icon"
                  onClick={() => setShowSubCategoryMenu(!showSubCategoryMenu)}
                >
                  &#9776;
                </button>
                <span>{selectedSubCategory || "Select Sub-Category"}</span>
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
                    className="menu-item"
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
          <div className="card add-sub-category-card fixed-card">
            <h3>Add Sub-Category</h3>
            <div className="form-group">
              <label>Sub-Category Name:</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Sub-Category Icon:</label>
              <input type="file" />
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
            <button className="submit-button" onClick={handleAddSubCategory}>
              Add
            </button>
          </div>
        )}

        {showServiceVariants && (
          <div className="card fixed-card">
            <div className="form-group">
              <label>Service Variants</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  className="hamburger-icon"
                  onClick={() => setShowSubCategoryMenu(!showSubCategoryMenu)}
                >
                  &#9776;
                </button>
                <span>{selectedSubCategory || "Select Sub-Category"}</span>
                <button
                  className="add-button"
                  onClick={() => setShowServiceForm(true)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="menu">
              {serviceVariants.map((variant, index) => (
                <div
                  key={index}
                  className="menu-item"
                  onClick={() => handleServiceVariantSelect(variant)}
                >
                  {variant}
                </div>
              ))}
            </div>
          </div>
        )}

        {showServiceForm && <AddServiceForm />}
      </div>
    </div>
  );
};

export default Servermanager;
