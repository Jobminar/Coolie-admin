import React, { useState, useEffect } from "react";
import { fetchCategories, fetchSubcategories, fetchServices } from "./api";
import { FaEdit, FaSave, FaPlus, FaTrash } from "react-icons/fa";
import Switch from "react-switch";
import "./PricingForm.css";
import axios from "axios";

const PricingForm = ({ location, district, pincode, isValid, isCustom }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
  });
  const [selectedSubcategory, setSelectedSubcategory] = useState({
    id: "",
    name: "",
  });
  const [selectedService, setSelectedService] = useState({ id: "", name: "" });
  const [priceVariants, setPriceVariants] = useState({});
  const [variantKey, setVariantKey] = useState("");
  const [variantValue, setVariantValue] = useState("");

  // Metric group state (toggle and fields)
  const [showMetricFields, setShowMetricFields] = useState(false);
  const [metric, setMetric] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");

  const [creditEligibility, setCreditEligibility] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const [taxPercentage, setTaxPercentage] = useState("");
  const [miscFee, setMiscFee] = useState("");
  const [platformCommission, setPlatformCommission] = useState("");

  // Editable fields
  const [isLocationEditable, setIsLocationEditable] = useState(false);
  const [isDistrictEditable, setIsDistrictEditable] = useState(false);
  const [isPincodeEditable, setIsPincodeEditable] = useState(false);
  const [editedLocation, setEditedLocation] = useState(location || "");
  const [editedDistrict, setEditedDistrict] = useState(district || "");
  const [editedPincode, setEditedPincode] = useState(pincode || "");

  const API_POST_URL = "https://api.coolieno1.in/v1.0/core/locations/post";

  useEffect(() => {
    // Initialize edited fields with prop values
    setEditedLocation(location);
    setEditedDistrict(district);
    setEditedPincode(pincode);
  }, [location, district, pincode]);

  useEffect(() => {
    // Fetch all categories when the component mounts
    const fetchAllCategories = async () => {
      try {
        const response = await fetchCategories();
        console.log("Categories fetched:", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchAllCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    // Handle category change
    const categoryId = e.target.value;
    const categoryName =
      categories.find((cat) => cat._id === categoryId)?.name || "";
    setSelectedCategory({ id: categoryId, name: categoryName });
    setSelectedSubcategory({ id: "", name: "" });
    setServices([]);

    console.log("Selected category:", categoryName);

    try {
      const response = await fetchSubcategories(categoryId);
      console.log(
        "Subcategories fetched for category:",
        categoryName,
        response.data,
      );
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubcategoryChange = async (e) => {
    // Handle subcategory change
    const subCategoryId = e.target.value;
    const subCategoryName =
      subcategories.find((sub) => sub._id === subCategoryId)?.name || "";
    setSelectedSubcategory({ id: subCategoryId, name: subCategoryName });
    setServices([]);

    console.log("Selected subcategory:", subCategoryName);

    try {
      const response = await fetchServices(selectedCategory.id, subCategoryId);
      console.log(
        "Services fetched for subcategory:",
        subCategoryName,
        response.data,
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleAddVariant = () => {
    // Add a new service variant
    if (variantKey && variantValue) {
      setPriceVariants((prevVariants) => ({
        ...prevVariants,
        [variantKey]: variantValue,
      }));
      setVariantKey("");
      setVariantValue("");
      console.log("Added variant:", variantKey, variantValue);
    } else {
      alert("Please enter both variant name and price.");
    }
  };

  const handleDeleteVariant = (key) => {
    // Delete a service variant
    const updatedVariants = { ...priceVariants };
    delete updatedVariants[key];
    setPriceVariants(updatedVariants);
    console.log("Deleted variant:", key);
  };

  const handleToggleEdit = (field) => {
    // Toggle editing for location, district, or pincode
    if (field === "location") {
      setIsLocationEditable((prev) => !prev);
    } else if (field === "district") {
      setIsDistrictEditable((prev) => !prev);
    } else if (field === "pincode") {
      setIsPincodeEditable((prev) => !prev);
    }
    console.log(`Toggled edit for ${field}`);
  };

  const handleSubmit = async (e) => {
    // Handle form submission
    e.preventDefault();

    if (!selectedCategory.name || !selectedService.name) {
      alert("Please complete all required fields.");
      return;
    }

    const formData = {
      district: editedDistrict,
      location: editedLocation,
      pincode: editedPincode,
      category: selectedCategory.name, // Send name only
      subcategory: selectedSubcategory.name, // Send name only
      servicename: selectedService.name, // Send name only
      price: priceVariants,
      creditEligibility,
      taxPercentage,
      miscFee,
      platformCommission,
      isCash,
      isCustom, // Always setting isCustom to true
    };

    // Conditionally add metric-related data
    if (showMetricFields) {
      formData.metric = metric;
      formData.min = minQuantity;
      formData.max = maxQuantity;
    }

    console.log("Form data to be submitted:", formData);

    try {
      const response = await axios.post(API_POST_URL, formData);
      if (response.status === 200 || response.status === 201) {
        alert("Form submitted successfully!");
        console.log("Form submission success:", response.data);
      } else {
        alert(`Form submission failed with status: ${response.status}`);
        console.log("Form submission failed:", response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="zomato-pricing-form-container">
      <h3 className="zomato-form-title">Pricing Form</h3>

      {!isValid ? (
        <div className="zomato-alert zomato-alert-warning" role="alert">
          Warning: The selected address does not match the service area.
        </div>
      ) : (
        <div className="zomato-alert zomato-alert-success" role="alert">
          Success: The selected address is within the service area.
        </div>
      )}

      <div className="zomato-pricing-form-content">
        <form onSubmit={handleSubmit} className="zomato-scrollable-form">
          {/* Location, District, and Pincode Fields */}
          <div className="zomato-form-group zomato-animated">
            <label>Location</label>
            <div className="input-with-icon">
              <input
                type="text"
                className="zomato-form-control"
                value={editedLocation}
                readOnly={!isLocationEditable}
                onChange={(e) => setEditedLocation(e.target.value)}
              />
              <span
                className="edit-icon"
                onClick={() => handleToggleEdit("location")}
              >
                {isLocationEditable ? <FaSave /> : <FaEdit />}
              </span>
            </div>
          </div>

          <div className="zomato-form-group zomato-animated">
            <label>District</label>
            <div className="input-with-icon">
              <input
                type="text"
                className="zomato-form-control"
                value={editedDistrict}
                readOnly={!isDistrictEditable}
                onChange={(e) => setEditedDistrict(e.target.value)}
              />
              <span
                className="edit-icon"
                onClick={() => handleToggleEdit("district")}
              >
                {isDistrictEditable ? <FaSave /> : <FaEdit />}
              </span>
            </div>
          </div>

          <div className="zomato-form-group zomato-animated">
            <label>Pincode</label>
            <div className="input-with-icon">
              <input
                type="text"
                className="zomato-form-control"
                value={editedPincode}
                readOnly={!isPincodeEditable}
                onChange={(e) => setEditedPincode(e.target.value)}
              />
              <span
                className="edit-icon"
                onClick={() => handleToggleEdit("pincode")}
              >
                {isPincodeEditable ? <FaSave /> : <FaEdit />}
              </span>
            </div>
          </div>

          {/* Category and Subcategory Fields */}
          <div className="zomato-form-group zomato-animated">
            <label>Category</label>
            <select
              className="zomato-form-control"
              value={selectedCategory.id}
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

          <div className="zomato-form-group zomato-animated">
            <label>Subcategory</label>
            <select
              className="zomato-form-control"
              value={selectedSubcategory.id}
              onChange={handleSubcategoryChange}
              disabled={!selectedCategory.id}
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          <div className="zomato-form-group zomato-animated">
            <label>Service</label>
            <select
              className="zomato-form-control"
              value={selectedService.id}
              onChange={(e) =>
                setSelectedService({
                  id: e.target.value,
                  name:
                    services.find((service) => service._id === e.target.value)
                      ?.name || "",
                })
              }
              disabled={!selectedSubcategory.id}
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Variants */}
          <div className="zomato-form-group zomato-animated">
            <label className="variant-label">Service Variants</label>
            <div className="zomato-variant-group">
              <input
                type="text"
                className="zomato-form-control"
                placeholder="Variant Name (e.g. Normal, Deep)"
                value={variantKey}
                onChange={(e) => setVariantKey(e.target.value)}
              />
              <input
                type="number"
                className="zomato-form-control"
                placeholder="Variant Price"
                value={variantValue}
                onChange={(e) => setVariantValue(e.target.value)}
              />
              <button
                type="button"
                className="zomato-btn-add-variant"
                onClick={handleAddVariant}
              >
                <FaPlus />
              </button>
            </div>

            {Object.keys(priceVariants).length > 0 && (
              <div className="zomato-variant-list">
                <ul>
                  {Object.entries(priceVariants).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}{" "}
                      <button
                        type="button"
                        className="zomato-delete-btn"
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

          {/* Toggle Metric Group */}
          <div className="zomato-form-group zomato-animated">
            <label>Include Metric Information</label>
            <Switch
              onChange={() => setShowMetricFields(!showMetricFields)}
              checked={showMetricFields}
              onColor="#28a745"
              offColor="#d9534f"
              uncheckedIcon={false}
              checkedIcon={false}
              height={22}
              width={44}
            />
          </div>

          {/* Conditional Metric, Min/Max Quantity Fields */}
          {showMetricFields && (
            <>
              <div className="zomato-form-group zomato-animated">
                <label>Metric (e.g., per unit, per hour)</label>
                <input
                  type="text"
                  className="zomato-form-control"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                />
              </div>

              <div className="zomato-form-group zomato-animated">
                <label>Min Quantity (Lower Limit)</label>
                <input
                  type="number"
                  className="zomato-form-control"
                  value={minQuantity}
                  onChange={(e) => setMinQuantity(e.target.value)}
                />
              </div>

              <div className="zomato-form-group zomato-animated">
                <label>Max Quantity (Upper Limit)</label>
                <input
                  type="number"
                  className="zomato-form-control"
                  value={maxQuantity}
                  onChange={(e) => setMaxQuantity(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Tax, Fees, Platform Commission */}
          <div className="zomato-form-group zomato-animated">
            <label>Tax Percentage (%)</label>
            <input
              type="number"
              className="zomato-form-control"
              value={taxPercentage}
              onChange={(e) => setTaxPercentage(e.target.value)}
            />
          </div>

          <div className="zomato-form-group zomato-animated">
            <label>Miscellaneous Fees (₹)</label>
            <input
              type="number"
              className="zomato-form-control"
              value={miscFee}
              onChange={(e) => setMiscFee(e.target.value)}
            />
          </div>

          <div className="zomato-form-group zomato-animated">
            <label>Platform Commission (%)</label>
            <input
              type="number"
              className="zomato-form-control"
              value={platformCommission}
              onChange={(e) => setPlatformCommission(e.target.value)}
            />
          </div>

          {/* Toggles for Credit Eligibility and Cash */}
          <div className="zomato-form-group zomato-animated">
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

          <div className="zomato-form-group zomato-animated">
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

          {/* Submit Button in Sticky Footer */}
          <div className="zomato-sticky-footer">
            <button type="submit" className="zomato-btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PricingForm;
