import React, { useState, useEffect } from "react";
import { deleteLocation, uploadCsvFile } from "./api/Locations-api";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Papa from "papaparse";
import { confirmAlert } from "react-confirm-alert"; // Import for confirmation dialogs
import "react-confirm-alert/src/react-confirm-alert.css"; // Import default styles for confirmation
import "./LocationManager.css";

const LocationManager = () => {
  const [locations, setLocations] = useState([]); // State to hold locations
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [showActions, setShowActions] = useState(false);

  // Fetch locations from the backend
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

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a valid CSV file before uploading.");
      return;
    }

    setIsUploading(true);
    try {
      await uploadCsvFile(file, "default");

      await fetchLocations(); // Fetch updated locations after upload
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file.");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle location deletion
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

              setLocations(locations.filter((loc) => loc._id !== id)); // Remove from local state
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

  // Handle delete all locations
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

              setLocations([]); // Clear local state
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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter locations based on search query
  const filteredLocations = locations.filter((location) =>
    Object.values(location).some((value) =>
      String(value).toLowerCase().includes(searchQuery),
    ),
  );

  // Handle sorting by column
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sort locations based on sort configuration
  const sortedLocations = [...filteredLocations].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Fetch all locations when the component mounts
  useEffect(() => {
    fetchLocations(); // Fetch on component mount
  }, []);

  // Display a loading message or error
  if (isLoading) {
    return <p>Loading locations...</p>;
  }

  return (
    <div className="tiger-location-manager">
      <h1 className="tiger-header">Upload Locations and Pricing</h1>

      {/* File Upload Section */}
      <div className="tiger-upload-container">
        <label className="custom-file-label" htmlFor="file-upload">
          <FontAwesomeIcon icon={faUpload} /> Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          className="custom-file-input"
        />

        {/* Show the selected file name */}
        {file && <p className="file-name">{file.name}</p>}

        <button
          onClick={handleUpload}
          className="tiger-upload-btn"
          disabled={!file || isUploading}
        >
          <FontAwesomeIcon icon={faUpload} />{" "}
          {isUploading ? "Uploading..." : "Upload"}
        </button>
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

      {/* Locations Table */}
      <div className="tiger-locations-table-wrapper">
        {locations.length > 0 ? (
          <table className="tiger-locations-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("district")}>District</th>
                <th onClick={() => handleSort("location")}>Location</th>
                <th onClick={() => handleSort("pincode")}>Pincode</th>
                <th onClick={() => handleSort("state")}>State</th>
                <th onClick={() => handleSort("category")}>Category</th>
                <th onClick={() => handleSort("subcategory")}>Subcategory</th>
                <th onClick={() => handleSort("servicename")}>Service Name</th>
                <th onClick={() => handleSort("price")}>Price</th>
                <th onClick={() => handleSort("min")}>Min</th>
                <th onClick={() => handleSort("max")}>Max</th>
                {showActions && <th className="sticky-col">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {sortedLocations.map((location) => (
                <tr key={location._id}>
                  <td>{location.district}</td>
                  <td>{location.location}</td>
                  <td>{location.pincode}</td>
                  <td>{location.state}</td>
                  <td>{location.category}</td>
                  <td>{location.subcategory}</td>
                  <td>{location.servicename}</td>
                  <td>{JSON.stringify(location.price)}</td>
                  <td>{location.min}</td>
                  <td>{location.max}</td>
                  {showActions && (
                    <td className="sticky-col">
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
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No locations available.</p>
        )}
      </div>
    </div>
  );
};

export default LocationManager;
