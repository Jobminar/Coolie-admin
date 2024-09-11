import React, { useState, useEffect } from "react";
import { fetchCategories, fetchSubcategories, fetchServices } from "./api"; // API methods
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa";
import Switch from "react-switch"; // For toggling credit eligibility and cash payment
import "./PricingForm.css"; // Custom CSS
import axios from "axios";

const PricingForm = ({ location, district, pincode, isValid }) => {
  // State for form fields
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [priceVariants, setPriceVariants] = useState({});
  const [variantKey, setVariantKey] = useState(""); // Variant name (e.g. Normal, Deep)
  const [variantValue, setVariantValue] = useState(""); // Variant price
  const [metric, setMetric] = useState("");
  const [creditEligibility, setCreditEligibility] = useState(false);
  const [isCash, setIsCash] = useState(false);

  // Prefill form fields with props values
  const [isLocationEditable, setIsLocationEditable] = useState(false);
  const [isDistrictEditable, setIsDistrictEditable] = useState(false);
  const [isPincodeEditable, setIsPincodeEditable] = useState(false);
  const [editedLocation, setEditedLocation] = useState(location || "");
  const [editedDistrict, setEditedDistrict] = useState(district || "");
  const [editedPincode, setEditedPincode] = useState(pincode || "");

  // API URL for submitting form data
  const API_POST_URL = "https://api.coolieno1.in/v1.0/core/locations/post";

  // Update form fields when props change (prefilling)
  useEffect(() => {
    setEditedLocation(location);
    setEditedDistrict(district);
    setEditedPincode(pincode);
  }, [location, district, pincode]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data); // Set categories from API response
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchAllCategories();
  }, []);

  // Handle category change and fetch subcategories
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
    setServices([]); // Reset services when category changes

    try {
      const response = await fetchSubcategories(categoryId);
      setSubcategories(response.data); // Set subcategories from API response
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Handle subcategory change and fetch services
  const handleSubcategoryChange = async (e) => {
    const subCategoryId = e.target.value;
    setSelectedSubcategory(subCategoryId);
    setServices([]); // Reset services when subcategory changes

    try {
      const response = await fetchServices(selectedCategory, subCategoryId);
      setServices(response.data); // Set services from API response
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Add service variant (with price) to the form
  const handleAddVariant = () => {
    if (variantKey && variantValue) {
      setPriceVariants((prevVariants) => ({
        ...prevVariants,
        [variantKey]: variantValue,
      }));
      setVariantKey("");
      setVariantValue("");
    } else {
      alert("Please enter both variant name and price.");
    }
  };

  // Delete a service variant
  const handleDeleteVariant = (key) => {
    const updatedVariants = { ...priceVariants };
    delete updatedVariants[key];
    setPriceVariants(updatedVariants);
  };

  // Toggle editable fields
  const handleToggleEdit = (field) => {
    if (field === "location") {
      setIsLocationEditable((prev) => !prev);
    } else if (field === "district") {
      setIsDistrictEditable((prev) => !prev);
    } else if (field === "pincode") {
      setIsPincodeEditable((prev) => !prev);
    }
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!selectedCategory || !selectedService || !metric) {
      alert("Please complete all required fields.");
      return;
    }

    const formData = {
      district: editedDistrict,
      location: editedLocation,
      pincode: editedPincode,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      servicename: selectedService,
      price: priceVariants,
      metric,
      creditEligibility,
      isCash,
      isCustom: true,
    };

    try {
      const response = await axios.post(API_POST_URL, formData);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="pricing-form-container">
      <h3 className="form-title">Pricing Form</h3>

      {/* Address validation message */}
      {!isValid ? (
        <div className="alert alert-warning" role="alert">
          Warning: The selected address does not match the service area.
        </div>
      ) : (
        <div className="alert alert-success" role="alert">
          Success: The selected address is within the service area.
        </div>
      )}

      {/* Form Content */}
      <div className="pricing-form-content">
        <form onSubmit={handleSubmit} className="scrollable-form">
          {/* Editable Location */}
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              value={editedLocation}
              readOnly={!isLocationEditable}
              onChange={(e) => setEditedLocation(e.target.value)}
            />
            <button
              type="button"
              className="edit-btn"
              onClick={() => handleToggleEdit("location")}
            >
              {isLocationEditable ? <FaSave /> : <FaEdit />}
            </button>
          </div>

          {/* Editable District */}
          <div className="form-group">
            <label>District</label>
            <input
              type="text"
              className="form-control"
              value={editedDistrict}
              readOnly={!isDistrictEditable}
              onChange={(e) => setEditedDistrict(e.target.value)}
            />
            <button
              type="button"
              className="edit-btn"
              onClick={() => handleToggleEdit("district")}
            >
              {isDistrictEditable ? <FaSave /> : <FaEdit />}
            </button>
          </div>

          {/* Editable Pincode */}
          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              className="form-control"
              value={editedPincode}
              readOnly={!isPincodeEditable}
              onChange={(e) => setEditedPincode(e.target.value)}
            />
            <button
              type="button"
              className="edit-btn"
              onClick={() => handleToggleEdit("pincode")}
            >
              {isPincodeEditable ? <FaSave /> : <FaEdit />}
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Dropdown */}
          <div className="form-group">
            <label>Subcategory</label>
            <select
              className="form-control"
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              disabled={!selectedCategory}
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          {/* Service Dropdown */}
          <div className="form-group">
            <label>Service</label>
            <select
              className="form-control"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              disabled={!selectedSubcategory}
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Add Service Variants */}
          <div className="form-group">
            <label>Service Variants</label>
            <div className="variant-group">
              <input
                type="text"
                className="form-control"
                placeholder="Variant Name (e.g. Normal, Deep)"
                value={variantKey}
                onChange={(e) => setVariantKey(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Variant Price"
                value={variantValue}
                onChange={(e) => setVariantValue(e.target.value)}
              />
              <button
                type="button"
                className="btn-add-variant"
                onClick={handleAddVariant}
              >
                <FaPlus /> Add Variant
              </button>
            </div>

            {/* Display added variants */}
            {Object.keys(priceVariants).length > 0 && (
              <div className="variant-list">
                <ul>
                  {Object.entries(priceVariants).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}{" "}
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleDeleteVariant(key)}
                      >
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Metric Input */}
          <div className="form-group">
            <label>Metric</label>
            <input
              type="text"
              className="form-control"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              required
            />
          </div>

          {/* Credit Eligibility Toggle */}
          <div className="form-group grid">
            <label>Credit Eligibility</label>
            <Switch
              onChange={() => setCreditEligibility(!creditEligibility)}
              checked={creditEligibility}
              onColor="#28a745"
              offColor="#d9534f"
              uncheckedIcon={false}
              checkedIcon={false}
              height={22}
              width={44}
            />
          </div>

          {/* Cash Payment Toggle */}
          <div className="form-group grid">
            <label>Is Cash Payment</label>
            <Switch
              onChange={() => setIsCash(!isCash)}
              checked={isCash}
              onColor="#28a745"
              offColor="#d9534f"
              uncheckedIcon={false}
              checkedIcon={false}
              height={22}
              width={44}
            />
          </div>

          {/* Submit Button */}
          <div className="sticky-footer">
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PricingForm;
