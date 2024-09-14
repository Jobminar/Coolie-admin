import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LocationPriceFilter.css"; // Import the updated styles

const LocationPriceFilter = ({ onFilterChange }) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [serviceNames, setServiceNames] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedServiceName, setSelectedServiceName] = useState("");

  useEffect(() => {
    fetchLocationsData();
  }, []);

  const fetchLocationsData = async () => {
    try {
      const response = await axios.get(
        "https://api.coolieno1.in/v1.0/core/locations",
      );
      const data = response.data;

      setStates([...new Set(data.map((item) => item.state))]);
      setDistricts([...new Set(data.map((item) => item.district))]);
      setCategories([...new Set(data.map((item) => item.category))]);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleStateChange = (e) => {
    const selected = e.target.value;
    setSelectedState(selected);

    const filteredDistricts = districts.filter((d) => d.state === selected);
    setDistricts(filteredDistricts);
    onFilterChange({ state: selected });
  };

  const handleDistrictChange = (e) => {
    const selected = e.target.value;
    setSelectedDistrict(selected);

    const filteredLocations = locations.filter((l) => l.district === selected);
    setLocations(filteredLocations);
    onFilterChange({ district: selected });
  };

  const handleLocationChange = (e) => {
    const selected = e.target.value;
    setSelectedLocation(selected);

    const filteredPincodes = pincodes.filter((p) => p.location === selected);
    setPincodes(filteredPincodes);
    onFilterChange({ location: selected });
  };

  const handlePincodeChange = (e) => {
    const selected = e.target.value;
    setSelectedPincode(selected);

    const filteredCategories = categories.filter((c) => c.pincode === selected);
    setCategories(filteredCategories);
    onFilterChange({ pincode: selected });
  };

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);

    const filteredSubcategories = subcategories.filter(
      (sc) => sc.category === selected,
    );
    setSubcategories(filteredSubcategories);
    onFilterChange({ category: selected });
  };

  const handleSubcategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedSubcategory(selected);

    const filteredServiceNames = serviceNames.filter(
      (sn) => sn.subcategory === selected,
    );
    setServiceNames(filteredServiceNames);
    onFilterChange({ subcategory: selected });
  };

  const handleServiceNameChange = (e) => {
    const selected = e.target.value;
    setSelectedServiceName(selected);
    onFilterChange({ servicename: selected });
  };

  return (
    <div className="filter-container">
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select value={selectedDistrict} onChange={handleDistrictChange}>
        <option value="">Select District</option>
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>

      <select value={selectedLocation} onChange={handleLocationChange}>
        <option value="">Select Location</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      <select value={selectedPincode} onChange={handlePincodeChange}>
        <option value="">Select Pincode</option>
        {pincodes.map((pincode) => (
          <option key={pincode} value={pincode}>
            {pincode}
          </option>
        ))}
      </select>

      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
        <option value="">Select Subcategory</option>
        {subcategories.map((subcategory) => (
          <option key={subcategory} value={subcategory}>
            {subcategory}
          </option>
        ))}
      </select>

      <select value={selectedServiceName} onChange={handleServiceNameChange}>
        <option value="">Select Service Name</option>
        {serviceNames.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationPriceFilter;
