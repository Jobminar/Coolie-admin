import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faEdit,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import EditServiceForm from "./EditServiceForm";
import "./servermanager.css"; // Ensure the CSS file is correctly linked

const ManageService = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSubCategoryMenu, setShowSubCategoryMenu] = useState(false);
  const [showServiceVariantsMenu, setShowServiceVariantsMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);
  const [showEditSubCategoryForm, setShowEditSubCategoryForm] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [subCategoryIcon, setSubCategoryIcon] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [serviceVariant, setServiceVariant] = useState("");

  const categories = ["Cleaning service", "Salon At Home"];
  const subCategories = [
    "Kitchen cleaning",
    "House cleaning",
    "Swimming pool",
    "Salon At Home",
  ];

  const servicesMap = {
    "Kitchen cleaning": [
      {
        name: "Sink cleaning",
        type: "Normal cleaning",
        price: "100",
        time: "30 mins",
        description: "Cleaning of sink area",
        locations: "All",
        city: "City A",
        tax: "5",
        commission: "10",
        mostBooked: true,
        tag: true,
        cashAfterService: false,
      },
      {
        name: "Platform cleaning",
        type: "Deep cleaning",
        price: "200",
        time: "45 mins",
        description: "Deep cleaning of kitchen platform",
        locations: "All",
        city: "City A",
        tax: "5",
        commission: "10",
        mostBooked: false,
        tag: false,
        cashAfterService: true,
      },
    ],
    "House cleaning": [
      {
        name: "Room cleaning",
        type: "Normal cleaning",
        price: "150",
        time: "1 hour",
        description: "Cleaning of room area",
        locations: "All",
        city: "City B",
        tax: "5",
        commission: "10",
        mostBooked: true,
        tag: true,
        cashAfterService: false,
      },
      {
        name: "Window cleaning",
        type: "Deep cleaning",
        price: "250",
        time: "1 hour 30 mins",
        description: "Deep cleaning of windows",
        locations: "All",
        city: "City B",
        tax: "5",
        commission: "10",
        mostBooked: false,
        tag: false,
        cashAfterService: true,
      },
    ],
    "Swimming pool": [
      {
        name: "Pool cleaning",
        type: "Normal cleaning",
        price: "300",
        time: "2 hours",
        description: "Cleaning of pool area",
        locations: "All",
        city: "City C",
        tax: "5",
        commission: "10",
        mostBooked: true,
        tag: true,
        cashAfterService: false,
      },
      {
        name: "Water testing",
        type: "Deep cleaning",
        price: "400",
        time: "2 hours 30 mins",
        description: "Testing of pool water",
        locations: "All",
        city: "City C",
        tax: "5",
        commission: "10",
        mostBooked: false,
        tag: false,
        cashAfterService: true,
      },
    ],
    "Salon At Home": [
      {
        name: "Haircut",
        type: "Normal cleaning",
        price: "50",
        time: "30 mins",
        description: "Basic haircut",
        locations: "All",
        city: "City D",
        tax: "5",
        commission: "10",
        mostBooked: true,
        tag: true,
        cashAfterService: false,
      },
      {
        name: "Facial",
        type: "Deep cleaning",
        price: "100",
        time: "1 hour",
        description: "Facial treatment",
        locations: "All",
        city: "City D",
        tax: "5",
        commission: "10",
        mostBooked: false,
        tag: false,
        cashAfterService: true,
      },
    ],
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryName(category); // Set the initial value of the category name
    setShowCategoryMenu(false);
    setShowEditCategoryForm(true);
    setShowEditSubCategoryForm(false);
    setShowServiceVariantsMenu(false);
  };

  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSubCategoryName(subCategory); // Set the initial value of the sub-category name
    setShowSubCategoryMenu(false);
    setShowEditSubCategoryForm(true);
    setShowServiceVariantsMenu(false);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleCategoryIconChange = (e) => {
    setCategoryIcon(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubCategoryIconChange = (e) => {
    setSubCategoryIcon(URL.createObjectURL(e.target.files[0]));
  };

  const handleEditCategory = () => {
    if (categoryName.trim() === "") {
      setCategoryError("Category name is required.");
      return;
    }
    if (serviceVariant.trim() === "") {
      setCategoryError("Service variant is required.");
      return;
    }
    // Logic to edit category
    setShowEditSubCategoryForm(true);
  };

  const handleEditSubCategory = () => {
    if (subCategoryName.trim() === "") {
      setSubCategoryError("Sub-category name is required.");
      return;
    }
    // Logic to edit sub-category
    setShowEditSubCategoryForm(false);
    setShowServiceVariantsMenu(false);
    setSelectedService({
      name: "Example Service",
      type: "Normal cleaning",
      price: "100",
      time: "1 hour",
      description: "Example service description",
      locations: "All",
      city: "Example City",
      tax: "5",
      commission: "10",
      mostBooked: true,
      tag: true,
      cashAfterService: false,
    });
  };

  const handleEditServiceVariant = () => {
    if (serviceVariant.trim() === "") {
      setCategoryError("Service variant is required.");
      return;
    }
    setShowServiceVariantsMenu(false);
    setSelectedService({
      name: "Example Service",
      type: serviceVariant,
      price: "100",
      time: "1 hour",
      description: "Example service description",
      locations: "All",
      city: "Example City",
      tax: "5",
      commission: "10",
      mostBooked: true,
      tag: true,
      cashAfterService: false,
    });
  };

  const closeEditServiceForm = () => {
    setSelectedService(null);
  };

  const handleCancelEditCategory = () => {
    setShowEditCategoryForm(false);
  };

  const handleCancelEditSubCategory = () => {
    setShowEditSubCategoryForm(false);
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
                >
                  <span onClick={() => handleCategorySelect(category)}>
                    {category}
                  </span>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="edit-icon"
                    onClick={() => {
                      setShowEditCategoryForm(true);
                      setCategoryName(category); // Set the initial value for the category name input
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {showEditCategoryForm && (
          <div className="card edit-category-form">
            <h3>
              Edit Category
              <FontAwesomeIcon
                icon={faTimes}
                className="cancel-icon"
                onClick={handleCancelEditCategory}
              />
            </h3>
            <div className="input-container">
              <label>Category Name:</label>
              <input
                type="text"
                className="bottom-border-input"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              {categoryError && <span className="error">{categoryError}</span>}
            </div>
            <div className="upload-container">
              <input
                type="file"
                id="categoryIcon"
                onChange={handleCategoryIconChange}
                className="file-upload"
              />
              <label htmlFor="categoryIcon" className="upload-icon-label">
                Choose Icon
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  className="upload-icon"
                />
              </label>
              {categoryIcon && (
                <img
                  src={categoryIcon}
                  alt="Category Icon"
                  className="upload-preview"
                />
              )}
            </div>
            <div className="input-container">
              <label>Service Variant:</label>
              <select
                className="bottom-border-input"
                value={serviceVariant}
                onChange={(e) => setServiceVariant(e.target.value)}
              >
                <option value="">Select a variant</option>
                <option value="Normal cleaning">Normal cleaning</option>
                <option value="Deep cleaning">Deep cleaning</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Hour">Hour</option>
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <button
              id="update-category-button"
              className="submit-button"
              onClick={handleEditCategory}
            >
              Update
            </button>
          </div>
        )}

        {showEditSubCategoryForm && (
          <div className="card edit-sub-category-form">
            <h3>
              Edit Sub-Category
              <FontAwesomeIcon
                icon={faTimes}
                className="cancel-icon"
                onClick={handleCancelEditSubCategory}
              />
            </h3>
            <div className="input-container">
              <label>Sub-Category Name:</label>
              <input
                type="text"
                className="bottom-border-input"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
              />
              {subCategoryError && (
                <span className="error">{subCategoryError}</span>
              )}
            </div>
            <div className="upload-container">
              <input
                type="file"
                id="subCategoryIcon"
                onChange={handleSubCategoryIconChange}
                className="file-upload"
              />
              <label htmlFor="subCategoryIcon" className="upload-icon-label">
                Choose Icon
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  className="upload-icon"
                />
              </label>
              {subCategoryIcon && (
                <img
                  src={subCategoryIcon}
                  alt="Sub-Category Icon"
                  className="upload-preview"
                />
              )}
            </div>
            <button
              id="update-subcategory-button"
              className="submit-button"
              onClick={handleEditSubCategory}
            >
              Update
            </button>
          </div>
        )}

        {showServiceVariantsMenu && (
          <div className="card" id="service-card">
            <div className="form-group">
              <div className="category-header">
                <span>Select Service</span>
                <button
                  className="hamburger-icon"
                  onClick={() =>
                    setShowServiceVariantsMenu(!showServiceVariantsMenu)
                  }
                >
                  &#9776;
                </button>
              </div>
            </div>

            {showServiceVariantsMenu && (
              <div className="menu">
                {(servicesMap[selectedSubCategory] || []).map(
                  (service, index) => (
                    <div
                      key={index}
                      className={`menu-item ${
                        selectedService === service ? "selected" : ""
                      }`}
                    >
                      <span onClick={() => handleServiceSelect(service)}>
                        {service.name}
                      </span>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="edit-icon"
                        onClick={() => setSelectedService(service)}
                      />
                    </div>
                  ),
                )}
              </div>
            )}
            <button
              id="update-service-variant-button"
              className="submit-button"
              onClick={handleEditServiceVariant}
            >
              Update
            </button>
          </div>
        )}
      </div>

      {selectedService && (
        <>
          <hr style={{ borderTop: "2px solid #D70D09", height: "1px" }} />
          <EditServiceForm
            service={selectedService}
            onSave={(updatedService) => {
              // Logic to save the updated service
              closeEditServiceForm();
            }}
          />
        </>
      )}
    </div>
  );
};

export default ManageService;
