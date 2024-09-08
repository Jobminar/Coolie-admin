import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceForm from "./ServiceForm"; // Import the ServiceForm component
import { fetchCategories, fetchSubcategories, fetchServices } from "./api"; // Import API helpers
import "./UpdateTier.css"; // CSS for card styling

const UpdateTier = ({ group, tierName }) => {
  const [locationsData, setLocationsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // Store category name
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState(""); // Store subcategory name
  const [selectedService, setSelectedService] = useState(null);
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [usedCategories, setUsedCategories] = useState([]); // Track already used categories in group
  const [noServicesMessage, setNoServicesMessage] = useState("");
  // Fetch group data on component mount
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(
          `https://api.coolieno1.in/v1.0/core/locations/group/${group}`,
        );
        setLocationsData(response.data);

        // Extract used categories from group data
        const usedCategories = response.data.map((item) => item.category);
        setUsedCategories(usedCategories);
      } catch (error) {
        console.error("Error fetching locations data:", error);
      }
    };
    fetchGroupData();
  }, [group]);

  // Fetch categories from the API, excluding those already used in the group
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesResponse = await fetchCategories();
        const availableCategories = categoriesResponse.data.filter(
          (category) => !usedCategories.includes(category.name),
        );
        setCategories(availableCategories); // Set only categories that are not used
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    if (usedCategories.length) {
      loadCategories();
    }
  }, [usedCategories]);

  // Handle category selection and fetch subcategories from the API
  const handleCategorySelect = async (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    setSelectedCategory(categoryId);
    setSelectedCategoryName(category?.name || ""); // Store category name
    setSelectedSubcategory("");
    setSelectedSubcategoryName(""); // Reset subcategory name
    setSelectedService(null);
    try {
      const subcategoriesResponse = await fetchSubcategories(categoryId);
      setSubcategories(subcategoriesResponse.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Handle subcategory selection and fetch services from the API
  // Handle subcategory selection and fetch services from the API
  const handleSubcategorySelect = async (subcategoryId) => {
    const subcategory = subcategories.find((sub) => sub._id === subcategoryId);
    setSelectedSubcategory(subcategoryId);
    setSelectedSubcategoryName(subcategory?.name || ""); // Store subcategory name
    setSelectedService(null);
    try {
      const servicesResponse = await fetchServices(
        selectedCategory,
        subcategoryId,
      );
      if (servicesResponse.data.data && servicesResponse.data.data.length > 0) {
        setServices(servicesResponse.data.data); // Access the data array in the response
        setNoServicesMessage(""); // Clear any no services message
      } else {
        setNoServicesMessage("No service available"); // Show no services message
        setServices([]); // Clear services
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setNoServicesMessage("No service available"); // Show message on 404 error
        setServices([]); // Clear services
      } else {
        console.error("Error fetching services:", error);
      }
    }
  };

  // Handle pincode change and update location, district, and state
  const handlePincodeChange = (selectedPincode) => {
    const locationData = locationsData.find(
      (item) => item.pincode === selectedPincode,
    );
    if (locationData) {
      setLocation(locationData.location || "");
      setDistrict(locationData.district || "");
      setState(locationData.state || "");
    }
    setPincode(selectedPincode);
  };

  return (
    <div className="tiger-update-tier__container">
      <h2>Update Tier for Group: {group}</h2>

      {/* Pincode Dropdown */}
      <div className="tiger-form-group">
        <label>Pincode:</label>
        <select
          className="tiger-form-control"
          value={pincode}
          onChange={(e) => handlePincodeChange(e.target.value)}
        >
          <option value="">Select Pincode</option>
          {locationsData.map((item, index) => (
            <option key={item.pincode + index} value={item.pincode}>
              {item.pincode}
            </option>
          ))}
        </select>
      </div>

      {/* Category Selection */}
      <div className="tiger-form-group">
        <label>Select Category:</label>
        <select
          className="tiger-form-control"
          value={selectedCategory || ""}
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
          <label>Select Subcategory:</label>
          <select
            className="tiger-form-control"
            value={selectedSubcategory || ""}
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
      {selectedSubcategory && services.length > 0 && (
        <div className="tiger-form-group">
          <label>Select Service:</label>
          <select
            className="tiger-form-control"
            onChange={(e) => {
              setSelectedService(
                services.find((s) => s._id === e.target.value),
              );
              setShowServiceForm(true); // Show the form when service is selected
            }}
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
      {/* No Services Available Message */}
      {noServicesMessage && (
        <div className="tiger-no-services-message">
          <p>{noServicesMessage}</p>
        </div>
      )}

      {/* Show the ServiceForm with the selected data */}
      {showServiceForm && selectedService && (
        <ServiceForm
          group={group}
          tierName={tierName} // Pass the tierName here
          categoryName={selectedCategoryName} // Send category name
          subcategoryName={selectedSubcategoryName} // Send subcategory name
          serviceName={selectedService.name} // Send service name
          pincode={pincode}
          location={location}
          district={district}
          state={state}
          onClose={() => setShowServiceForm(false)}
        />
      )}
    </div>
  );
};

export default UpdateTier;
