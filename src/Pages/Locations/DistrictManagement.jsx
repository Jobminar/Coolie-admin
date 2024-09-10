import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AddServiceForm from "./AddServiceForm"; // The component for adding more services
import axios from "axios";
import "./DistrictManagement.css"; // Custom styling for this component

const DistrictManagement = () => {
  const [districts, setDistricts] = useState([]); // Ensure this is an array by default
  const [selectedDistrict, setSelectedDistrict] = useState(""); // The selected district
  const [districtData, setDistrictData] = useState(null); // Data for the selected district
  const [showAddService, setShowAddService] = useState(false); // Toggle for rendering the Add Service form
  const [errorMessage, setErrorMessage] = useState(""); // To track errors
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the districts from backend on component mount
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get("/api/districts"); // Adjust API endpoint as needed
        setDistricts(response.data);
        setErrorMessage(""); // Clear any previous error
      } catch (error) {
        console.error("Error fetching districts:", error);
        setErrorMessage("Failed to fetch districts.");
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, []);

  // Function to handle district selection
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    fetchDistrictData(e.target.value); // Fetch data for the selected district
  };

  // Function to fetch data for the selected district
  const fetchDistrictData = async (district) => {
    try {
      const response = await axios.get(`/api/districts/${district}`); // Adjust API endpoint as needed
      setDistrictData(response.data);
      setErrorMessage(""); // Clear any previous error
    } catch (error) {
      console.error("Error fetching district data:", error);
      setErrorMessage("Failed to fetch district data.");
    }
  };

  // Toggle between showing the add service form and district data
  const toggleAddService = () => {
    setShowAddService(!showAddService);
  };

  // Display loading or error message if any
  if (loading) {
    return <p>Loading districts...</p>;
  }

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  return (
    <div className="district-management">
      <div className="tiger-header-row">
        <h2>District Management</h2>
        <button className="toggle-button" onClick={toggleAddService}>
          {showAddService ? (
            <>
              <FontAwesomeIcon icon={faArrowLeft} /> Back to District Profile
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPlus} /> Add More Services
            </>
          )}
        </button>
      </div>

      {/* Toggle between adding services and viewing district data */}
      {showAddService ? (
        <AddServiceForm />
      ) : (
        <>
          <div className="dropdown-container">
            <label>Select a District: </label>
            <select value={selectedDistrict} onChange={handleDistrictChange}>
              <option value="">Select District</option>
              {Array.isArray(districts) &&
                districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
            </select>
          </div>

          {districtData && (
            <div className="district-profile">
              <h3>{districtData.name} Profile</h3>

              {districtData.categories.map((category) => (
                <div key={category.id} className="category-section">
                  <h4>{category.name}</h4>

                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="subcategory-section">
                      <h5>{subcategory.name}</h5>

                      <ul className="services-list">
                        {subcategory.services.map((service) => (
                          <li key={service.id} className="service-item">
                            <span
                              onClick={() =>
                                alert(`Showing pricing for ${service.name}`)
                              }
                            >
                              {service.name}
                            </span>
                            {/* Here you can render the pricing when clicked */}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DistrictManagement;
