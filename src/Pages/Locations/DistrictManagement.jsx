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

  // Fetch all locations and extract unique districts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://api.coolieno1.in/v1.0/core/locations",
        ); // Adjust API endpoint as needed
        const allLocations = response.data;

        // Extract unique districts from the locations
        const uniqueDistricts = [
          ...new Set(allLocations.map((location) => location.district)),
        ];
        setDistricts(uniqueDistricts);
        setErrorMessage(""); // Clear any previous error
      } catch (error) {
        console.error("Error fetching locations:", error);
        setErrorMessage("Failed to fetch districts.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Function to handle district selection
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    fetchDistrictData(e.target.value); // Fetch data for the selected district
  };

  // Function to fetch data for the selected district
  const fetchDistrictData = async (district) => {
    try {
      const response = await axios.get(
        `https://api.coolieno1.in/v1.0/core/locations/district/${district}`,
      ); // Adjust API endpoint as needed
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
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {districtData && (
            <div className="district-profile">
              <h3>{selectedDistrict} Profile</h3>

              <table className="district-data-table">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Pincode</th>
                    <th>State</th>
                    <th>Category</th>
                    <th>Subcategory</th>
                    <th>Service Name</th>
                    <th>Price</th>
                    <th>Min</th>
                    <th>Max</th>
                  </tr>
                </thead>
                <tbody>
                  {districtData.map((location) => (
                    <tr key={location._id}>
                      <td>{location.location}</td>
                      <td>{location.pincode}</td>
                      <td>{location.state}</td>
                      <td>{location.category}</td>
                      <td>{location.subcategory}</td>
                      <td>{location.servicename}</td>
                      <td>{JSON.stringify(location.price)}</td>
                      <td>{location.min}</td>
                      <td>{location.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DistrictManagement;
