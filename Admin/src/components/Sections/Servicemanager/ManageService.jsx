import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faEdit,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import EditServiceForm from "./EditServiceForm";
import "./manageservice.css"; // Ensure the CSS file is correctly linked

const ManageService = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSubCategoryMenu, setShowSubCategoryMenu] = useState(false);
  const [showServiceVariantsMenu, setShowServiceVariantsMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
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
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [services, setServices] = useState([]);

  const API_BASE_URL = "http://13.126.118.3:3000"; // Store the base URL for clarity

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/v1.0/core/categories`)
      .then((response) => {
        console.log("Categories fetched:", response.data);
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const fetchSubcategories = (categoryId) => {
    axios
      .get(`${API_BASE_URL}/v1.0/core/sub-categories/category/${categoryId}`)
      .then((response) => {
        console.log("Subcategories fetched:", response.data);
        setSubCategories(response.data);
      })
      .catch((error) => console.error("Error fetching subcategories:", error));
  };

  const fetchServices = (categoryId, subCategoryId) => {
    axios
      .get(
        `${API_BASE_URL}/v1.0/core/services/filter/${categoryId}/${subCategoryId}`,
      )
      .then((response) => {
        console.log("Services fetched:", response.data);
        setServices(response.data.data);
      })
      .catch((error) => console.error("Error fetching services:", error));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category._id);
    setCategoryName(category.name); // Set the initial value of the category name
    setCategoryIcon(`${API_BASE_URL}/${category.imageKey}`);
    fetchSubcategories(category._id);
    setShowCategoryMenu(false);
    setShowEditCategoryForm(true);
    setShowEditSubCategoryForm(false);
    setShowServiceVariantsMenu(false);
  };

  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory._id);
    setSubCategoryName(subCategory.name); // Set the initial value of the sub-category name
    setSubCategoryIcon(`${API_BASE_URL}/${subCategory.imageKey}`);
    fetchServices(selectedCategory, subCategory._id);
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
    setShowEditCategoryForm(false);
    setShowEditSubCategoryForm(true);
  };

  const handleEditSubCategory = () => {
    if (subCategoryName.trim() === "") {
      setSubCategoryError("Sub-category name is required.");
      return;
    }
    setShowEditSubCategoryForm(false);
    setShowServiceVariantsMenu(false);
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
    <div className="manageservice-container">
      <h2>Manage Service</h2>

      <div className="manageservice-card-container">
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
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="manageservice-edit-icon"
                    onClick={() => {
                      setShowEditCategoryForm(true);
                      setCategoryName(category.name); // Set the initial value for the category name input
                      setCategoryIcon(`${API_BASE_URL}/${category.imageKey}`);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {showEditCategoryForm && (
          <div className="manageservice-card manageservice-edit-category-form">
            <h3>
              Edit Category
              <FontAwesomeIcon
                icon={faTimes}
                className="manageservice-cancel-icon"
                onClick={handleCancelEditCategory}
              />
            </h3>
            <div className="manageservice-input-container">
              <label>Category Name:</label>
              <input
                type="text"
                className="manageservice-bottom-border-input"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              {categoryError && <span className="error">{categoryError}</span>}
            </div>
            <div className="manageservice-upload-container">
              <input
                type="file"
                id="categoryIcon"
                onChange={handleCategoryIconChange}
                className="manageservice-file-upload"
              />
              <label
                htmlFor="categoryIcon"
                className="manageservice-upload-icon-label"
              >
                Choose Icon
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  className="manageservice-upload-icon"
                />
              </label>
              {categoryIcon ? (
                <img
                  src={
                    categoryIcon.startsWith("blob:")
                      ? categoryIcon
                      : `${API_BASE_URL}/${categoryIcon}`
                  }
                  alt="Category Icon"
                  className="manageservice-upload-preview"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if image fails to load
                    e.target.src = "/path/to/default-image.jpg"; // Set a default image
                  }}
                />
              ) : (
                <div>Loading Icon...</div> // Show a loading message while fetching
              )}
            </div>

            <button
              id="manageservice-update-category-button"
              className="manageservice-submit-button"
              onClick={handleEditCategory}
            >
              Update
            </button>
          </div>
        )}

        {selectedCategory && (
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
                {subCategories.map((subCategory) => (
                  <div
                    key={subCategory._id}
                    className={`manageservice-menu-item ${
                      selectedSubCategory === subCategory._id ? "selected" : ""
                    }`}
                  >
                    <span onClick={() => handleSubCategorySelect(subCategory)}>
                      {subCategory.name}
                    </span>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="manageservice-edit-icon"
                      onClick={() => {
                        setShowEditSubCategoryForm(true);
                        setSubCategoryName(subCategory.name); // Set the initial value for the sub-category name input
                        setSubCategoryIcon(
                          `${API_BASE_URL}/${subCategory.imageKey}`,
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {showEditSubCategoryForm && (
          <div className="manageservice-card manageservice-edit-sub-category-form">
            <h3>
              Edit Sub-Category
              <FontAwesomeIcon
                icon={faTimes}
                className="manageservice-cancel-icon"
                onClick={handleCancelEditSubCategory}
              />
            </h3>
            <div className="manageservice-input-container">
              <label>Sub-Category Name:</label>
              <input
                type="text"
                className="manageservice-bottom-border-input"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
              />
              {subCategoryError && (
                <span className="error">{subCategoryError}</span>
              )}
            </div>
            <div className="manageservice-upload-container">
              <input
                type="file"
                id="subCategoryIcon"
                onChange={handleSubCategoryIconChange}
                className="manageservice-file-upload"
              />
              <label
                htmlFor="subCategoryIcon"
                className="manageservice-upload-icon-label"
              >
                Choose Icon
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  className="manageservice-upload-icon"
                />
              </label>
              {subCategoryIcon ? (
                <img
                  src={
                    subCategoryIcon.startsWith("blob:")
                      ? subCategoryIcon
                      : `${API_BASE_URL}/${subCategoryIcon}`
                  }
                  alt="Sub-Category Icon"
                  className="manageservice-upload-preview"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if image fails to load
                    e.target.src = "/path/to/default-image.jpg"; // Set a default image
                  }}
                />
              ) : (
                <div>Loading Icon...</div> // Show a loading message while fetching
              )}
            </div>
            <div className="manageservice-input-container">
              <label>Service Variant:</label>
              <select
                className="manageservice-bottom-border-input"
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
              className="manageservice-submit-button"
              onClick={handleEditSubCategory}
            >
              Update
            </button>
          </div>
        )}

        {selectedSubCategory && (
          <div className="manageservice-card" id="service-card">
            <div className="manageservice-form-group">
              <div className="manageservice-category-header">
                <span>Select Service</span>
                <button
                  className="manageservice-hamburger-icon"
                  onClick={() =>
                    setShowServiceVariantsMenu(!showServiceVariantsMenu)
                  }
                >
                  &#9776;
                </button>
              </div>
            </div>

            {showServiceVariantsMenu && (
              <div className="manageservice-menu">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className={`manageservice-menu-item ${
                      selectedService && selectedService._id === service._id
                        ? "selected"
                        : ""
                    }`}
                  >
                    <span onClick={() => handleServiceSelect(service)}>
                      {service.name}
                    </span>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="manageservice-edit-icon"
                      onClick={() => setSelectedService(service)}
                    />
                  </div>
                ))}
              </div>
            )}
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
