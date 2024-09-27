import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchCategories, fetchSubcategories, fetchServices } from "./api";
import { FaPlus, FaTrash } from "react-icons/fa";
import Switch from "react-switch";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast
import "./AddServiceForm.css";

// Fetch Locations API
const fetchLocations = async () => {
  const AZURE_BASE_URL = import.meta.env.VITE_AZURE_BASE_URL;
  try {
    const response = await axios.get(`${AZURE_BASE_URL}/locations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

const AddServiceForm = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [services, setServices] = useState([]);
  const [locationsData, setLocationsData] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [uniqueDistricts, setUniqueDistricts] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);
  const [uniquePincodes, setUniquePincodes] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");

  const [priceVariants, setPriceVariants] = useState({});
  const [variantKey, setVariantKey] = useState("");
  const [variantValue, setVariantValue] = useState("");

  const [creditEligibility, setCreditEligibility] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const [taxPercentage, setTaxPercentage] = useState("");
  const [miscFee, setMiscFee] = useState("");
  const [platformCommission, setPlatformCommission] = useState("");
  const [metric, setMetric] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const categoriesResponse = await fetchCategories();
        setCategories(categoriesResponse.data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    const loadLocations = async () => {
      try {
        const locationsResponse = await fetchLocations();
        setLocationsData(locationsResponse);
        extractUniqueLocations(locationsResponse);
      } catch (error) {
        setErrorMessage("Failed to fetch locations.");
      }
    };

    loadCategories();
    loadLocations();
  }, []);

  const extractUniqueLocations = (locations) => {
    const uniqueLocs = Array.from(
      new Set(locations.map((loc) => loc.location)),
    );
    const uniqueDists = Array.from(
      new Set(locations.map((loc) => loc.district)),
    );
    const uniqueStates = Array.from(new Set(locations.map((loc) => loc.state)));
    const uniquePins = Array.from(new Set(locations.map((loc) => loc.pincode)));

    setUniqueLocations(uniqueLocs);
    setUniqueDistricts(uniqueDists);
    setUniqueStates(uniqueStates);
    setUniquePincodes(uniquePins);
  };

  const handleCategorySelect = async (categoryId) => {
    setSelectedCategory(categoryId);
    setSubcategories([]);
    setServices([]);
    setSelectedSubcategory("");
    setSelectedService(null);

    try {
      const subcategoriesResponse = await fetchSubcategories(categoryId);
      setSubcategories(subcategoriesResponse.data);
    } catch (error) {
      setErrorMessage("Failed to fetch subcategories.");
    }
  };

  const handleSubcategorySelect = async (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    setServices([]);
    setSelectedService(null);

    try {
      const servicesResponse = await fetchServices(
        selectedCategory,
        subcategoryId,
      );
      setServices(servicesResponse.data);
    } catch (error) {
      setErrorMessage("Failed to fetch services.");
    }
  };

  const handleAddVariant = () => {
    if (variantKey && variantValue) {
      setPriceVariants((prev) => ({ ...prev, [variantKey]: variantValue }));
      setVariantKey("");
      setVariantValue("");
    } else {
      alert("Please enter both variant name and price.");
    }
  };

  const handleDeleteVariant = (key) => {
    const updatedVariants = { ...priceVariants };
    delete updatedVariants[key];
    setPriceVariants(updatedVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      district: selectedDistrict,
      location: selectedLocation,
      pincode: selectedPincode,
      state: selectedState,
      category: `${selectedCategory.name}(${selectedCategory.id})`,
      subcategory: `${selectedSubcategory.name}(${selectedSubcategory.id})`,
      servicename: `${selectedService.name}(${selectedService.id})`,
      price: priceVariants,
      creditEligibility,
      taxPercentage,
      miscFee,
      platformCommission,
      isCash,
      isCustom: false,
      metric,
      min,
      max,
    };

    try {
      const response = await axios.post(API_POST_URL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("The form submitted successfully!");

        // Reset form fields
        setSelectedCategory("");
        setSelectedSubcategory("");
        setSelectedService(null);
        setSelectedLocation("");
        setSelectedDistrict("");
        setSelectedState("");
        setSelectedPincode("");
        setPriceVariants({});
        setVariantKey("");
        setVariantValue("");
        setCreditEligibility(false);
        setIsCash(false);
        setTaxPercentage("");
        setMiscFee("");
        setPlatformCommission("");
        setMetric("");
        setMin("");
        setMax("");
      }
    } catch (error) {
      console.error("Error saving location:", error);
      setErrorMessage("Failed to save location.");
    }
  };

  return (
    <div className="tigershade-pricing-form-container">
      <h2 className="tigershade-form-header">Add New Service</h2>

      {errorMessage && (
        <p className="tigershade-error-message">{errorMessage}</p>
      )}

      <Toaster position="top-right" reverseOrder={false} />

      <form onSubmit={handleSubmit} className="tigershade-form">
        {/* Location Dropdown */}
        <div className="tigershade-form-group">
          <label>Location</label>
          <select
            className="tigershade-form-control"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            {uniqueLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        <div className="tigershade-form-group">
          <label>District</label>
          <select
            className="tigershade-form-control"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">Select District</option>
            {uniqueDistricts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
        <div className="tigershade-form-group">
          <label>State</label>
          <select
            className="tigershade-form-control"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select State</option>
            {uniqueStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Pincode Dropdown */}
        <div className="tigershade-form-group">
          <label>Pincode</label>
          <select
            className="tigershade-form-control"
            value={selectedPincode}
            onChange={(e) => setSelectedPincode(e.target.value)}
          >
            <option value="">Select Pincode</option>
            {uniquePincodes.map((pincode, index) => (
              <option key={index} value={pincode}>
                {pincode}
              </option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="tigershade-form-group">
          <label>Category</label>
          <select
            className="tigershade-form-control"
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

        {/* Subcategory Dropdown */}
        {selectedCategory && (
          <div className="tigershade-form-group">
            <label>Subcategory</label>
            <select
              className="tigershade-form-control"
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

        {/* Services Dropdown */}
        {selectedSubcategory && (
          <div className="tigershade-form-group">
            <label>Service</label>
            <select
              className="tigershade-form-control"
              onChange={(e) =>
                setSelectedService(
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

        {/* Price Variants */}
        <div className="tigershade-form-group">
          <label>Service Variants</label>
          <div className="tigershade-variant-group">
            <input
              type="text"
              className="tigershade-form-control"
              placeholder="Variant Name"
              value={variantKey}
              onChange={(e) => setVariantKey(e.target.value)}
            />
            <input
              type="number"
              className="tigershade-form-control"
              placeholder="Variant Price"
              value={variantValue}
              onChange={(e) => setVariantValue(e.target.value)}
            />
            <button
              type="button"
              className="tigershade-btn-add-variant"
              onClick={handleAddVariant}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* List of Price Variants */}
        {Object.keys(priceVariants).length > 0 && (
          <div className="tigershade-variant-list">
            <ul>
              {Object.entries(priceVariants).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                  <button
                    type="button"
                    className="tigershade-delete-btn"
                    onClick={() => handleDeleteVariant(key)}
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Metric, Min, Max */}
        <div className="tigershade-form-group">
          <label>Metric</label>
          <input
            type="text"
            className="tigershade-form-control"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
          />
        </div>

        <div className="tigershade-form-group">
          <label>Min Quantity</label>
          <input
            type="number"
            className="tigershade-form-control"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
        </div>

        <div className="tigershade-form-group">
          <label>Max Quantity</label>
          <input
            type="number"
            className="tigershade-form-control"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>

        {/* Toggles */}
        <div className="tigershade-form-group">
          <label>Credit Eligibility</label>
          <Switch
            onChange={() => setCreditEligibility(!creditEligibility)}
            checked={creditEligibility}
          />
        </div>

        <div className="tigershade-form-group">
          <label>Is Cash Payment</label>
          <Switch onChange={() => setIsCash(!isCash)} checked={isCash} />
        </div>

        {/* Tax and Fees */}
        <div className="tigershade-form-group">
          <label>Tax Percentage</label>
          <input
            type="number"
            className="tigershade-form-control"
            value={taxPercentage}
            onChange={(e) => setTaxPercentage(e.target.value)}
          />
        </div>

        <div className="tigershade-form-group">
          <label>Miscellaneous Fees</label>
          <input
            type="number"
            className="tigershade-form-control"
            value={miscFee}
            onChange={(e) => setMiscFee(e.target.value)}
          />
        </div>

        <div className="tigershade-form-group">
          <label>Platform Commission</label>
          <input
            type="number"
            className="tigershade-form-control"
            value={platformCommission}
            onChange={(e) => setPlatformCommission(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="tigershade-form-group">
          <button type="submit" className="tigershade-btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServiceForm;
