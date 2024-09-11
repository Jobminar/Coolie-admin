import React, { useState, useEffect } from "react";
import { deleteLocation, uploadCsvFile } from "./api/Locations-api";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faTrash,
  faEdit,
  faClose,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./LocationManager.css";

const LocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDistricts, setExpandedDistricts] = useState({});
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
      setError("");
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError("No Locations are available.");
    } finally {
      setIsLoading(false);
    }
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

  const handleDeleteAll = async () => {
    confirmAlert({
      title: "Confirm to delete all",
      message: "Are you sure to delete all locations?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete(
                "https://api.coolieno1.in/v1.0/core/locations/delete",
              );
              setLocations([]);
            } catch (error) {
              console.error("Error deleting all locations:", error);
              setError("Failed to delete all locations.");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredLocations = locations.filter((location) =>
    Object.values(location).some((value) =>
      String(value).toLowerCase().includes(searchQuery),
    ),
  );

  const toggleDistrictExpansion = (district) => {
    setExpandedDistricts((prevState) => ({
      ...prevState,
      [district]: !prevState[district],
    }));
  };

  const groupedLocations = filteredLocations.reduce((acc, loc) => {
    acc[loc.district] = acc[loc.district] || [];
    acc[loc.district].push(loc);
    return acc;
  }, {});

  if (isLoading) {
    return <p>Loading locations...</p>;
  }

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

      {/* Search Input */}
      <div className="tiger-search-container">
        <input
          type="text"
          className="tiger-search-input"
          placeholder="Search locations..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Toggle Show Actions Column */}
      <div className="tiger-actions-toggle">
        <label className="tiger-toggle-label">
          <h4>Actions</h4>
          <input
            type="checkbox"
            checked={showActions}
            onChange={() => setShowActions(!showActions)}
            className="tiger-toggle-input"
          />
          <span className="tiger-toggle-slider"></span>
        </label>

        {/* Delete All Button */}
        {showActions && (
          <button className="tiger-delete-all-btn" onClick={handleDeleteAll}>
            Delete All
          </button>
        )}
      </div>

      {/* Display Locations Grouped by District */}
      <div className="tiger-locations-group">
        {Object.keys(groupedLocations).map((district) => (
          <div key={district} className="district-wrapper">
            <div className="district-strap">
              <span>{district}</span>
              <span>{groupedLocations[district].length} records</span>
              <FontAwesomeIcon
                icon={expandedDistricts[district] ? faChevronUp : faChevronDown}
                className="expand-icon"
                onClick={() => toggleDistrictExpansion(district)}
              />
            </div>

            {expandedDistricts[district] && (
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
                    {groupedLocations[district].map((location) => (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationManager;
