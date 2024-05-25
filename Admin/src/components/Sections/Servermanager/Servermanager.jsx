import React, { useState } from "react";
import "./servermanager.css"; // Add necessary CSS here

const Servermanager = () => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSubCategoryMenu, setShowSubCategoryMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showAddSubCategoryForm, setShowAddSubCategoryForm] = useState(false);

  const categories = ["Home Cleaning", "Add New Category"];
  const subCategories = ["Kitchen Cleaning", "Add New Sub-Category"];

  const handleCategorySelect = (category) => {
    if (category === "Add New Category") {
      setShowAddCategoryForm(true);
    } else {
      setSelectedCategory(category);
      setShowCategoryMenu(false);
      setShowSubCategoryMenu(true);
    }
  };

  const handleSubCategorySelect = (subCategory) => {
    if (subCategory === "Add New Sub-Category") {
      setShowAddSubCategoryForm(true);
    } else {
      setSelectedSubCategory(subCategory);
      setShowSubCategoryMenu(false);
    }
  };

  return (
    <div className="servermanager-container">
      <h2>Server Manager</h2>

      <div className="card-container">
        <div className="card">
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
            <div className="card">
              <h3>Add Category</h3>
              {/* Implement form fields for adding a new category here */}
              <div className="form-group">
                <label>Category Name:</label>
                <input type="text" />
              </div>
              <button className="submit-button">Submit</button>
            </div>
          )}
        </div>

        {selectedCategory && (
          <div className="card">
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
      </div>

      {/* Add Service Form at the bottom of the page */}
      <div className="card add-service-form">
        <h3>Add Service</h3>
        {/* Form fields for adding a new service */}
        <div className="form-group">
          <label>Service Name:</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Service Type:</label>
          <div>
            <label>
              <input type="checkbox" /> Normal
            </label>
            <label>
              <input type="checkbox" /> Deep
            </label>
            <label>
              <input type="checkbox" /> Male
            </label>
            <label>
              <input type="checkbox" /> Female
            </label>
            <label>
              <input type="checkbox" /> Hour
            </label>
            <label>
              <input type="checkbox" /> Daily
            </label>
            <label>
              <input type="checkbox" /> Monthly
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Service Price:</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Total Service Time:</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea></textarea>
        </div>
        <div className="form-group">
          <label>Locations:</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Pincode:</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Latitude:</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Longitude:</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Radius (kms):</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>TAX %:</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Provider commission:</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" /> Add to most booked service
          </label>
        </div>
        <div className="form-group">
          <label>TAG:</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" /> Cash After Service
          </label>
        </div>
        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default Servermanager;
