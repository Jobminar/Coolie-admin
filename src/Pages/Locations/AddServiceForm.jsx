import React, { useState, useEffect } from "react";
import { fetchCategories, fetchSubcategories, fetchServices } from "./api"; // Import API functions
import ServiceForm from "./ServiceForm"; // Import the ServiceForm component
import "./AddServiceForm.css"; // Import styling for this component

const AddServiceForm = () => {
  const [categories, setCategories] = useState([]); // Store categories
  const [subcategories, setSubcategories] = useState([]); // Store subcategories
  const [services, setServices] = useState([]); // Store services

  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const [selectedSubcategory, setSelectedSubcategory] = useState(""); // Track selected subcategory
  const [selectedService, setSelectedService] = useState(null); // Track selected service object

  const [errorMessage, setErrorMessage] = useState(""); // Track errors
  const [loading, setLoading] = useState(false); // Track loading status
  const [showForm, setShowForm] = useState(false); // Toggle for showing the form

  // Fetch all categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const categoriesResponse = await fetchCategories();
        setCategories(categoriesResponse.data);
        setErrorMessage(""); // Clear any previous error messages
      } catch (error) {
        setErrorMessage("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Handle category selection
  const handleCategorySelect = async (categoryId) => {
    setSelectedCategory(categoryId);
    setSubcategories([]); // Clear previous subcategories
    setServices([]); // Clear previous services
    setSelectedSubcategory(""); // Reset selected subcategory
    setSelectedService(null); // Reset selected service

    try {
      const subcategoriesResponse = await fetchSubcategories(categoryId);
      setSubcategories(subcategoriesResponse.data);
      setErrorMessage(""); // Clear previous errors
    } catch (error) {
      setErrorMessage("Failed to fetch subcategories.");
    }
  };

  // Handle subcategory selection
  const handleSubcategorySelect = async (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    setServices([]); // Clear previous services
    setSelectedService(null); // Reset selected service

    try {
      const servicesResponse = await fetchServices(
        selectedCategory,
        subcategoryId,
      );
      setServices(servicesResponse.data.data); // Assuming services data is inside `data.data`
      setErrorMessage(""); // Clear previous errors
    } catch (error) {
      setErrorMessage("Failed to fetch services.");
    }
  };

  // Handle service selection
  const handleServiceSelect = (service) => {
    setSelectedService(service); // Set the selected service object
    setShowForm(true); // Show the ServiceForm component
  };

  return (
    <div className="add-service-form__container">
      <h2 className="tiger-form-header">Add New Service</h2>

      {/* Error Message */}
      {errorMessage && <p className="tiger-error-message">{errorMessage}</p>}

      {/* Loading Message */}
      {loading && <p>Loading data...</p>}

      {/* Category Selection */}
      <div className="tiger-form-group">
        <label className="tiger-form-label">Select Category:</label>
        <select
          className="tiger-form-select"
          value={selectedCategory}
          onChange={(e) => handleCategorySelect(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Selection */}
      {selectedCategory && (
        <div className="tiger-form-group">
          <label className="tiger-form-label">Select Subcategory:</label>
          <select
            className="tiger-form-select"
            value={selectedSubcategory}
            onChange={(e) => handleSubcategorySelect(e.target.value)}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Service Selection */}
      {selectedSubcategory && (
        <div className="tiger-form-group">
          <label className="tiger-form-label">Select Service:</label>
          <select
            className="tiger-form-select"
            onChange={(e) =>
              handleServiceSelect(
                services.find((s) => s._id === e.target.value),
              )
            }
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display the selected service and the ServiceForm */}
      {showForm && selectedService && (
        <div className="selected-service__card">
          <ServiceForm
            group="default"
            tierName="Gold" // You can dynamically set this based on your data
            categoryName="Category Name" // This should be dynamic
            subcategoryName="Subcategory Name" // This should be dynamic
            serviceName={selectedService.name}
            pincode="123456"
            location="New York"
            district="Manhattan"
            state="New York"
            onClose={() => setShowForm(false)} // Close form
          />
        </div>
      )}
    </div>
  );
};

export default AddServiceForm;
