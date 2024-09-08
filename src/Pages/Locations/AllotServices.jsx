import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceForm from "./ServiceForm"; // Import the child component
import { fetchCategories, fetchSubcategories, fetchServices } from "./api"; // API helpers
import "./AllotServices.css"; // Styling for the component

const AllotServices = ({ group, tierName }) => {
  const [groupData, setGroupData] = useState([]);
  const [pincodeFilter, setPincodeFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [services, setServices] = useState([]); // This will store fetched services
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // Store category name
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState(""); // Store subcategory name
  const [selectedService, setSelectedService] = useState(null);
  const [showForm, setShowForm] = useState(false); // Control to show the form as a card
  const [usedCategories, setUsedCategories] = useState([]); // To track categories already used for the tier

  // Fetch group data on component mount
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(
          `https://api.coolieno1.in/v1.0/core/locations/group/${group}`,
        );
        const data = response.data;

        // Filter group data for the current tier and store used categories
        const usedCategoriesForTier = data
          .filter((item) => item.tierName === tierName)
          .map((item) => item.category);

        setUsedCategories(usedCategoriesForTier); // Store used categories
        setGroupData(data); // Store group data
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };
    fetchGroupData();
  }, [group, tierName]);

  // Fetch categories and exclude already used categories
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
    loadCategories();
  }, [usedCategories]);

  // Handle category selection and fetch subcategories
  const handleCategorySelect = async (categoryId, categoryName) => {
    setSelectedCategory(categoryId); // Set selected category ID
    setSelectedCategoryName(categoryName); // Set selected category name
    try {
      const subcategoriesResponse = await fetchSubcategories(categoryId);
      setSubcategories(subcategoriesResponse.data); // Update subcategories state
      setServices([]); // Reset services on new category select
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Handle subcategory selection and fetch services
  const handleSubcategorySelect = async (subcategoryId, subcategoryName) => {
    setSelectedSubcategory(subcategoryId); // Set selected subcategory ID
    setSelectedSubcategoryName(subcategoryName); // Set selected subcategory name
    try {
      const servicesResponse = await fetchServices(
        selectedCategory,
        subcategoryId,
      );
      setServices(servicesResponse.data.data); // Access the `data` array in the response
      console.log("Services fetched:", servicesResponse.data.data); // Debugging purpose
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Show form for selected service
  const handleServiceSelect = (service) => {
    setSelectedService(service); // Pass selected service to the form
    setShowForm(true); // Show the ServiceForm component as a card
  };

  return (
    <div className="allot-services__container">
      <h2 className="allot-services__header">
        Allot Services for Tier: {tierName}
      </h2>

      {/* Group Location Dropdown */}
      <div className="allot-services__filter">
        <label className="allot-services__label">Pincode:</label>
        <select
          className="allot-services__select"
          value={pincodeFilter}
          onChange={(e) => setPincodeFilter(e.target.value)}
        >
          <option value="">Select Pincode</option>
          {groupData.map((item, index) => (
            <option key={item.pincode + index} value={item.pincode}>
              {item.pincode}
            </option>
          ))}
        </select>
      </div>

      {/* Location, District, State Display */}
      {groupData.length > 0 && (
        <>
          <div className="allot-services__details">
            <p>Location: {groupData[0]?.location}</p>
            <p>District: {groupData[0]?.district}</p>
            <p>State: {groupData[0]?.state}</p>
          </div>
        </>
      )}

      {/* Category Selection */}
      <div className="allot-services__filter">
        <label className="allot-services__label">Select Category:</label>
        <select
          className="allot-services__select"
          value={selectedCategory}
          onChange={(e) => {
            const selectedOption = categories.find(
              (cat) => cat._id === e.target.value,
            );
            handleCategorySelect(selectedOption._id, selectedOption.name);
          }}
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
        <div className="allot-services__filter">
          <label className="allot-services__label">Select Subcategory:</label>
          <select
            className="allot-services__select"
            value={selectedSubcategory}
            onChange={(e) => {
              const selectedOption = subcategories.find(
                (sub) => sub._id === e.target.value,
              );
              handleSubcategorySelect(selectedOption._id, selectedOption.name);
            }}
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

      {/* Services Selection */}
      {selectedSubcategory && services.length > 0 && (
        <div className="allot-services__filter">
          <label className="allot-services__label">Select Service:</label>
          <select
            className="allot-services__select"
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

      {/* Show Service Form as a regular div styled as a card */}
      {showForm && selectedService && (
        <div className="allot-services__form-card">
          <ServiceForm
            group={group}
            tierName={tierName} // Pass tierName
            categoryName={selectedCategoryName} // Pass category name
            subcategoryName={selectedSubcategoryName} // Pass subcategory name
            serviceName={selectedService.name} // Pass service name
            pincode={pincodeFilter} // Pass selected pincode
            location={groupData[0]?.location} // Pass location
            district={groupData[0]?.district} // Pass district
            state={groupData[0]?.state} // Pass state
            onClose={() => setShowForm(false)} // Handle closing of form card
          />
        </div>
      )}

      {/* No services available */}
      {selectedSubcategory && services.length === 0 && (
        <p>No services available for the selected subcategory.</p>
      )}
    </div>
  );
};

export default AllotServices;
