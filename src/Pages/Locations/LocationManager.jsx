import React, { useState, useEffect } from "react";
import { deleteLocation, uploadCsvFile } from "./api/Locations-api";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faTrash,
  faEdit,
  faClose,
  faDownload,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./LocationManager.css";

// Import the LocationPriceFilter component
import LocationPriceFilter from "./LocationPriceFilter";

const LocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.coolieno1.in/v1.0/core/locations",
      );
      setLocations(response.data);
      setFilteredLocations(response.data); // Set initial filtered locations to all
      setError("");
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError("No Locations are available.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filters) => {
    let filtered = locations;

    // Apply filters if any filter is selected
    if (filters.state) {
      filtered = filtered.filter((loc) => loc.state === filters.state);
    }
    if (filters.district) {
      filtered = filtered.filter((loc) => loc.district === filters.district);
    }
    if (filters.location) {
      filtered = filtered.filter((loc) => loc.location === filters.location);
    }
    if (filters.pincode) {
      filtered = filtered.filter((loc) => loc.pincode === filters.pincode);
    }
    if (filters.category) {
      filtered = filtered.filter((loc) => loc.category === filters.category);
    }
    if (filters.subcategory) {
      filtered = filtered.filter(
        (loc) => loc.subcategory === filters.subcategory,
      );
    }
    if (filters.servicename) {
      filtered = filtered.filter(
        (loc) => loc.servicename === filters.servicename,
      );
    }

    setFilteredLocations(filtered);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a valid CSV file before uploading.");
      return;
    }

    setIsUploading(true);
    try {
      await uploadCsvFile(file, "default");
      await fetchLocations();
      setFile(null); // Reset file to null to hide upload button and clear file state
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearFile = () => {
    setFile(null);
  };

  const handleDelete = async (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this location?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await deleteLocation(id);
              setLocations(locations.filter((loc) => loc._id !== id));
              handleFilterChange({});
            } catch (error) {
              console.error("Error deleting location:", error);
              setError("Failed to delete location.");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="tiger-location-manager">
      <h1 className="tiger-header">Upload Locations and Pricing</h1>

      {/* File Upload Section */}
      <div className="tiger-upload-container">
        {/* Custom Label to trigger file upload */}
        <label className="custom-file-label" htmlFor="file-upload">
          <FontAwesomeIcon icon={faUpload} /> Choose File
        </label>

        {/* Hidden file input */}
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="custom-file-input"
        />

        {/* Display selected file name and clear button */}
        {file && (
          <div className="file-name-wrapper">
            <p className="file-name">{file.name}</p>
            <FontAwesomeIcon
              icon={faClose}
              className="file-clear-icon"
              onClick={handleClearFile}
            />
          </div>
        )}

        {/* Conditionally render the Upload button when a file is selected */}
        {file && (
          <button
            onClick={handleUpload}
            className="tiger-upload-btn"
            disabled={isUploading}
          >
            <FontAwesomeIcon icon={faUpload} />{" "}
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Filters Section */}
      <LocationPriceFilter onFilterChange={handleFilterChange} />

      {/* Buttons Section (Add Location, Add Services, Export) */}
      <div className="district-strap">
        <div className="strap-actions">
          <button className="add-location-btn">
            <FontAwesomeIcon icon={faPlus} /> Add Location
          </button>
          <button className="add-services-btn">
            <FontAwesomeIcon icon={faPlus} /> Add More Services
          </button>
          <button className="export-btn">
            <FontAwesomeIcon icon={faDownload} /> Download as Excel
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="district-records-table">
        <table className="tiger-locations-table">
          <thead>
            <tr>
              <th>Location</th>
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
            {filteredLocations.map((location) => (
              <tr key={location._id}>
                <td>{location.location}</td>
                <td>{location.state}</td>
                <td>{location.category}</td>
                <td>{location.subcategory}</td>
                <td>{location.servicename}</td>
                <td>{JSON.stringify(location.price)}</td>
                <td>{location.min}</td>
                <td>{location.max}</td>
                <td>
                  <button className="tiger-edit-btn">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="tiger-delete-btn"
                    onClick={() => handleDelete(location._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationManager;
