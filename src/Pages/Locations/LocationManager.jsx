import React, { useState, useEffect } from "react";
import { deleteLocation, uploadCsvFile } from "./api/Locations-api";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import Select from "react-select"; // For multi-select filters
import Form from "react-bootstrap/Form"; // For the toggle switch
import Modal from "react-bootstrap/Modal"; // For modals
import Button from "react-bootstrap/Button";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./LocationManager.css";
import LocationsTable from "./LocationsTable"; // Import LocationsTable component
import AddServiceForm from "./AddServiceForm"; // Import the AddServiceForm component
import PricingForm from "./PricingForm"; // Import the PricingForm component

const LocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filters, setFilters] = useState({
    servicename: [],
    category: [],
    subcategory: [],
    state: [],
    district: [],
    pincode: [],
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showActions, setShowActions] = useState(false); // Toggle state for Actions column

  // State for showing modals
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showAddLocationModal, setShowAddLocationModal] = useState(false);

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
      setFilteredLocations(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError("No Locations are available.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (selectedOptions, field) => {
    const updatedFilters = {
      ...filters,
      [field]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const applyFilters = (updatedFilters) => {
    let filtered = locations;

    if (updatedFilters.servicename.length > 0) {
      filtered = filtered.filter((loc) =>
        updatedFilters.servicename.includes(loc.servicename),
      );
    }
    if (updatedFilters.category.length > 0) {
      filtered = filtered.filter((loc) =>
        updatedFilters.category.includes(loc.category),
      );
    }
    if (updatedFilters.subcategory.length > 0) {
      filtered = filtered.filter((loc) =>
        updatedFilters.subcategory.includes(loc.subcategory),
      );
    }
    if (updatedFilters.state.length > 0) {
      filtered = filtered.filter((loc) =>
        updatedFilters.state.includes(loc.state),
      );
    }
    if (updatedFilters.district.length > 0) {
      filtered = filtered.filter((loc) =>
        updatedFilters.district.includes(loc.district),
      );
    }
    if (updatedFilters.pincode.length > 0) {
      filtered = filtered.filter((loc) =>
        updatedFilters.pincode.includes(loc.pincode?.toString()),
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
      setFile(null);
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
              applyFilters(filters);
            } catch (error) {
              console.error("Error deleting location:", error);
              setError("Failed to delete location.");
            }
          },
        },
        { label: "No" },
      ],
    });
  };

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
          onChange={(e) => setFile(e.target.files[0])}
          className="custom-file-input"
        />
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
        {file && (
          <button
            onClick={handleUpload}
            className="tiger-upload-btn"
            disabled={isUploading}
          >
            <FontAwesomeIcon icon={faUpload} />
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
      {/* Filter Section */}
      <div className="filter-section">
        <Select
          isMulti
          name="servicename"
          options={locations
            .map((loc) => loc.servicename)
            .filter((v, i, a) => a.indexOf(v) === i) // Unique values
            .map((value) => ({ value, label: value }))}
          className="filter-select"
          classNamePrefix="select"
          onChange={(selectedOptions) =>
            handleFilterChange(selectedOptions, "servicename")
          }
          placeholder="Filter by Service Name"
        />
        <Select
          isMulti
          name="category"
          options={locations
            .map((loc) => loc.category)
            .filter((v, i, a) => a.indexOf(v) === i) // Unique values
            .map((value) => ({ value, label: value }))}
          className="filter-select"
          classNamePrefix="select"
          onChange={(selectedOptions) =>
            handleFilterChange(selectedOptions, "category")
          }
          placeholder="Filter by Category"
        />
        <Select
          isMulti
          name="subcategory"
          options={locations
            .map((loc) => loc.subcategory)
            .filter((v, i, a) => a.indexOf(v) === i) // Unique values
            .map((value) => ({ value, label: value }))}
          className="filter-select"
          classNamePrefix="select"
          onChange={(selectedOptions) =>
            handleFilterChange(selectedOptions, "subcategory")
          }
          placeholder="Filter by Subcategory"
        />
        <Select
          isMulti
          name="state"
          options={locations
            .map((loc) => loc.state)
            .filter((v, i, a) => a.indexOf(v) === i) // Unique values
            .map((value) => ({ value, label: value }))}
          className="filter-select"
          classNamePrefix="select"
          onChange={(selectedOptions) =>
            handleFilterChange(selectedOptions, "state")
          }
          placeholder="Filter by State"
        />
        <Select
          isMulti
          name="district"
          options={locations
            .map((loc) => loc.district)
            .filter((v, i, a) => a.indexOf(v) === i) // Unique values
            .map((value) => ({ value, label: value }))}
          className="filter-select"
          classNamePrefix="select"
          onChange={(selectedOptions) =>
            handleFilterChange(selectedOptions, "district")
          }
          placeholder="Filter by District"
        />
        <Select
          isMulti
          name="pincode"
          options={locations
            .map((loc) => loc.pincode?.toString())
            .filter((v, i, a) => a.indexOf(v) === i) // Unique values
            .map((value) => ({ value, label: value }))}
          className="filter-select"
          classNamePrefix="select"
          onChange={(selectedOptions) =>
            handleFilterChange(selectedOptions, "pincode")
          }
          placeholder="Filter by Pincode"
        />
      </div>

      {/* Buttons for adding service and location */}
      <div className="tiger-actions-buttons">
        <Button
          className="tiger-add-service-btn"
          onClick={() => setShowAddServiceModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Service
        </Button>
        <Button
          className="tiger-add-location-btn"
          onClick={() => setShowAddLocationModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Location
        </Button>
      </div>

      {/* Toggle Switch for Actions Column */}
      <Form.Check
        type="switch"
        id="actions-toggle"
        label="Enable Edit"
        checked={showActions}
        onChange={(e) => setShowActions(e.target.checked)}
        className="actions-toggle"
      />

      {/* Pass Filtered Locations, Delete Handler, and ShowActions to LocationsTable */}
      <LocationsTable
        locations={filteredLocations}
        handleDelete={handleDelete}
        showActions={showActions} // Pass the toggle state to LocationsTable
      />

      {/* Add Service Modal */}
      <Modal
        show={showAddServiceModal}
        onHide={() => setShowAddServiceModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddServiceForm />
        </Modal.Body>
      </Modal>

      {/* Add Location Modal */}
      <Modal
        show={showAddLocationModal}
        onHide={() => setShowAddLocationModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PricingForm />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LocationManager;
