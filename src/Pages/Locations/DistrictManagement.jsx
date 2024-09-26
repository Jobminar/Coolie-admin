import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import EditDistrictForm from "./EditDistrictForm"; // Import the new EditDistrictForm component
import AddServiceForm from "./AddServiceForm"; // Import the AddServiceForm component
import "./DistrictManagement.css";

const DistrictManagement = () => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districtData, setDistrictData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal states for Edit and Add forms
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showAddService, setShowAddService] = useState(false); // Toggle for AddServiceForm
  const [selectedRecord, setSelectedRecord] = useState(null); // Record to edit

  // Fetch all locations and extract unique districts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core/locations",
        );
        const allLocations = response.data;
        const uniqueDistricts = [
          ...new Set(allLocations.map((location) => location.district)),
        ];
        setDistricts(uniqueDistricts);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching locations:", error);
        setErrorMessage("Failed to fetch districts.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Handle district selection
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    fetchDistrictData(e.target.value);
  };

  // Fetch data for the selected district
  const fetchDistrictData = async (district) => {
    try {
      const response = await axios.get(
        `https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core/locations/district/${district}`,
      );
      setDistrictData(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching district data:", error);
      setErrorMessage("Failed to fetch district data.");
    }
  };

  // Open modal for editing
  const openModal = (record) => {
    setSelectedRecord(record);
    setModalIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Handle successful update from the form
  const handleUpdateSuccess = () => {
    fetchDistrictData(selectedDistrict); // Refresh the district data after update
    setModalIsOpen(false);
  };

  // Toggle AddServiceForm visibility
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
              <FontAwesomeIcon icon={faPlus} /> Back to District Data
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPlus} /> Add New Service
            </>
          )}
        </button>
      </div>

      {/* Toggle between AddServiceForm and viewing district data */}
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
                    <th>Actions</th>
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
                      <td>
                        <button
                          className="district-edit-button"
                          onClick={() => openModal(location)}
                        >
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Edit District Modal */}
      {modalIsOpen && (
        <EditDistrictForm
          isOpen={modalIsOpen}
          onClose={closeModal}
          selectedRecord={selectedRecord}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default DistrictManagement;
