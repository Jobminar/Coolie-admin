import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import AddServiceForm from "./AddServiceForm";
import ServiceDetailCard from "./ServiceDetailCard";
import "./servicemanager.css"; // Ensure the CSS file is correctly linked

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
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [serviceVariant, setServiceVariant] = useState("");

  const categories = ["Cleaning service", "Salon At Home", "Add new category"];
  const subCategories = [
    "Kitchen cleaning",
    "House cleaning",
    "Swimming pool",
    "Salon At Home",
    "Add new sub-category",
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
      { name: "Add New Service" },
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
      { name: "Add New Service" },
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
      { name: "Add New Service" },
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
      { name: "Add New Service" },
    ],
  };

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

  const handleServiceSelect = (service) => {
    if (service.name === "Add New Service") {
      setShowServiceForm(true);
      setSelectedService(null); // Hide ServiceDetailCard
    } else {
      setSelectedService(service);
      setShowServiceForm(false); // Hide AddServiceForm
    }
  };

  const toggleServiceForm = () => {
    setShowServiceForm((prev) => !prev);
    setSelectedService(null); // Hide ServiceDetailCard
  };

  const handleCategoryIconChange = (e) => {
    setCategoryIcon(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubCategoryIconChange = (e) => {
    setSubCategoryIcon(URL.createObjectURL(e.target.files[0]));
  };

  const handleAddCategory = () => {
    if (categoryName.trim() === "") {
      setCategoryError("Category name is required.");
      return;
    }
    if (serviceVariant.trim() === "") {
      setCategoryError("Service variant is required.");
      return;
    }
    // Logic to add category
    setShowAddSubCategoryForm(true);
  };

  const handleAddSubCategory = () => {
    if (subCategoryName.trim() === "") {
      setSubCategoryError("Sub-category name is required.");
      return;
    }
    // Logic to add sub-category
    setShowServiceForm(true);
  };

  const closeServiceDetailCard = () => {
    setSelectedService(null);
  };

  return (
    <div className="servermanager-container">
      <h2>Add Service</h2>

      <div className="servermanager-card-container">
        <div className="servermanager-card" id="category-card">
          <div className="servermanager-form-group">
            <div className="servermanager-category-header">
              <span>Select Category</span>
              <button
                className="servermanager-add-button"
                onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}
              >
                +
              </button>
              <button
                className="servermanager-hamburger-icon"
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              >
                &#9776;
              </button>
            </div>
          </div>

          {showCategoryMenu && (
            <div className="servermanager-menu">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`servermanager-menu-item ${
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
          <div className="servermanager-card servermanager-add-category-form">
            <h3>Add Category</h3>
            <div className="servermanager-input-container">
              <label>Category Name:</label>
              <input
                type="text"
                className="servermanager-bottom-border-input"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              {categoryError && <span className="error">{categoryError}</span>}
            </div>
            <div className="servermanager-upload-container">
              <input
                type="file"
                id="categoryIcon"
                onChange={handleCategoryIconChange}
                className="servermanager-file-upload"
              />
              <label
                htmlFor="categoryIcon"
                className="servermanager-upload-icon-label"
              >
                Choose Icon
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  className="servermanager-upload-icon"
                />
              </label>
              {categoryIcon && (
                <img
                  src={categoryIcon}
                  alt="Category Icon"
                  className="servermanager-upload-preview"
                />
              )}
            </div>
            <div className="servermanager-input-container">
              <label>Service Variant:</label>
              <select
                className="servermanager-bottom-border-input"
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
              className="servermanager-submit-button"
              onClick={handleAddCategory}
            >
              Add
            </button>
          </div>
        )}

        {selectedCategory && (
          <div className="servermanager-card" id="subcategory-card">
            <div className="servermanager-form-group">
              <div className="servermanager-category-header">
                <span>Select Sub-Category</span>
                <button
                  className="servermanager-add-button"
                  onClick={() =>
                    setShowAddSubCategoryForm(!showAddSubCategoryForm)
                  }
                >
                  +
                </button>
                <button
                  className="servermanager-hamburger-icon"
                  onClick={() => setShowSubCategoryMenu(!showSubCategoryMenu)}
                >
                  &#9776;
                </button>
              </div>
            </div>

            {showSubCategoryMenu && (
              <div className="servermanager-menu">
                {subCategories.map((subCategory, index) => (
                  <div
                    key={index}
                    className={`servermanager-menu-item ${
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
          <div className="servermanager-card servermanager-add-sub-category-form">
            <h3>Add Sub-Category</h3>
            <div className="servermanager-input-container">
              <label>Sub-Category Name:</label>
              <input
                type="text"
                className="servermanager-bottom-border-input"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
              />
              {subCategoryError && (
                <span className="error">{subCategoryError}</span>
              )}
            </div>
            <div className="servermanager-upload-container">
              <input
                type="file"
                id="subCategoryIcon"
                onChange={handleSubCategoryIconChange}
                className="servermanager-file-upload"
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
                  src={subCategoryIcon}
                  alt="Sub-Category Icon"
                  className="servermanager-upload-preview"
                />
              )}
            </div>
            <button
              className="servermanager-submit-button"
              onClick={handleAddSubCategory}
            >
              Add
            </button>
          </div>
        )}

        {selectedSubCategory && (
          <div className="servermanager-card" id="service-card">
            <div className="servermanager-form-group">
              <div className="servermanager-category-header">
                <span>Select Service</span>
                <button
                  className="servermanager-add-button"
                  onClick={toggleServiceForm}
                >
                  +
                </button>
                <button
                  className="servermanager-hamburger-icon"
                  onClick={() =>
                    setShowServiceVariantsMenu(!showServiceVariantsMenu)
                  }
                >
                  &#9776;
                </button>
              </div>
            </div>

            {showServiceVariantsMenu && (
              <div className="servermanager-menu">
                {(servicesMap[selectedSubCategory] || []).map(
                  (service, index) => (
                    <div
                      key={index}
                      className={`servermanager-menu-item ${
                        selectedService === service ? "selected" : ""
                      }`}
                      onClick={() => handleServiceSelect(service)}
                    >
                      {service.name}
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {showServiceForm && <AddServiceForm />}
      {selectedService && (
        <>
          <hr style={{ borderTop: "2px solid #D70D09", height: "1px" }} />
          <ServiceDetailCard
            service={selectedService}
            category={selectedCategory}
            subCategory={selectedSubCategory}
            onClose={closeServiceDetailCard}
          />
        </>
      )}
    </div>
  );
};

export default Servermanager;
