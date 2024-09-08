import React, { useState } from "react";
import { FaPlus, FaSearch, FaUpload } from "react-icons/fa";
import {
  saveLocations,
  fetchPincodeLocation,
  uploadCsvFile,
} from "./api/Locations-api"; // Import API functions
import { toast } from "react-hot-toast";
import "./LocationManager.css";
import LocationsList from "./LocationsList";

const LocationManager = () => {
  const [group, setGroup] = useState("default");
  const [pincode, setPincode] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [tierName, setTierName] = useState("");
  const [locations, setLocations] = useState([]);
  const [reloadLocations, setReloadLocations] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchPincode, setSearchPincode] = useState(""); // Search pincode for filtering locations

  // Handle group toggle between 'default' and 'custom'
  const handleGroupToggle = (groupType) => {
    setGroup(groupType);
  };

  // Function to add a pincode using the Mapbox API
  const handlePincodeAdd = async () => {
    if (!pincode) {
      toast.error("Please enter a pincode.");
      return;
    }

    try {
      const place = await fetchPincodeLocation(pincode); // Fetch location data using API function
      const newLocation = {
        pincode,
        location: place.place_name || "Unknown location",
      };

      setLocations((prevLocations) => [...prevLocations, newLocation]);
      setPincode(""); // Reset the pincode input field
      setIsModalOpen(true); // Show the modal after adding the location
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle CSV file upload
  const handleCsvUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setCsvFile(file);

    try {
      await uploadCsvFile(file, group); // Upload CSV using API function
      toast.success("CSV file has been uploaded successfully.");
      setReloadLocations((prev) => !prev);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle searching locations by pincode
  const handleSearchChange = (e) => {
    setSearchPincode(e.target.value); // Update searchPincode state on input change
  };

  // Format the manually added locations to send to the API
  const formatLocationsForApi = (locations) => {
    return locations.map((location) => {
      const fullLocation = location.location || "Unknown location";
      const splitLocation = fullLocation.split(",").map((part) => part.trim());

      const pincode = location.pincode || "N/A";
      const city = splitLocation[1] || "N/A"; // Assume city is the second part
      const state = splitLocation[2] || "Andhra Pradesh"; // Assume state is the third part

      return {
        location: city,
        pincode: pincode,
        district: location.district || "N/A",
        state: state,
        category: location.category || "N/A",
        subcategory: location.subcategory || "N/A",
        servicename: location.servicename || "N/A",
        price: location.price || {},
        min: location.min || 0,
        max: location.max || 0,
        metric: location.metric || 0,
        creditEligibility: location.creditEligibility || false,
        taxPercentage: location.taxPercentage || 0,
        miscFee: location.miscFee || 0,
        platformCommission: location.platformCommission || 0,
        isCash: location.isCash || false,
        group: group || "default",
        tierName: location.tierName || "",
      };
    });
  };

  // Handle saving manually added locations
  const handleSaveLocations = async () => {
    try {
      const formattedLocations = formatLocationsForApi(locations);
      await saveLocations(formattedLocations); // Save locations using API function

      toast.success("Locations saved successfully.");
      setReloadLocations((prev) => !prev);
      setLocations([]); // Clear the manually added locations after saving
      setIsModalOpen(false); // Close the modal after saving
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setLocations([]); // Clear locations when modal is closed
    setIsModalOpen(false); // Close the modal
  };

  // Handle deletion of a location
  const handleDeleteLocation = async (locationId) => {
    try {
      await deleteLocationById(locationId); // Call the delete API
      setLocations((prevLocations) =>
        prevLocations.filter((location) => location.id !== locationId),
      ); // Remove location from state after successful deletion
      toast.success("Location deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete location.");
    }
  };

  return (
    <div className="location-manager-container">
      {/* Tier input */}
      <div className="tier-section">
        <label htmlFor="tier-name" className="tier-label">
          Tier Name
        </label>
        <input
          id="tier-name"
          type="text"
          value={tierName}
          onChange={(e) => setTierName(e.target.value)}
          placeholder="Enter Tier Name"
          className="tier-input"
        />
      </div>

      {/* Group toggle */}
      <div className="location-container">
        <div className="group-toggle">
          <button
            className={`group-btn ${group === "default" ? "active" : ""}`}
            onClick={() => handleGroupToggle("default")}
          >
            Default
          </button>
          <button
            className={`group-btn ${group === "custom" ? "active" : ""}`}
            onClick={() => handleGroupToggle("custom")}
          >
            Custom
          </button>
        </div>

        {/* Location actions: Pincode input, CSV upload, and search */}
        <div className="location-actions">
          <div className="location-inputs">
            <div className="input-with-icon">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Add a Pincode"
                className="pincode-input"
              />
              <button className="icon-button" onClick={handlePincodeAdd}>
                <FaPlus />
              </button>
            </div>

            <div className="input-with-icon file-upload-container">
              <label htmlFor="csv-upload" className="csv-upload-label">
                Choose File
              </label>
              <input
                type="file"
                id="csv-upload"
                className="csv-upload-input"
                onChange={handleCsvUpload}
              />
              <button className="icon-button">
                <FaUpload />
              </button>
            </div>

            <div className="input-with-icon">
              <input
                type="text"
                value={searchPincode}
                onChange={handleSearchChange} // Track search input changes
                placeholder="Search a Pincode"
                className="search-input"
              />
              <button className="icon-button">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        {/* Show selected file if uploaded */}
        {csvFile && (
          <div className="file-upload-name">
            <strong>Selected File:</strong> {csvFile.name}
          </div>
        )}

        {/* Locations list */}
        <div className="locations-list-api">
          <LocationsList
            group={group}
            tierName={tierName}
            reload={reloadLocations}
            searchPincode={searchPincode} // Pass search pincode to LocationsList
          />
        </div>

        {/* Modal Popup */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Manually Added Locations</h3>
              <div className="modal-locations-scrollable">
                {locations.length > 0 ? (
                  locations.map((location, index) => (
                    <div className="modal-location-strip-card" key={index}>
                      <span>{`${location.pincode} / ${location.location}`}</span>
                    </div>
                  ))
                ) : (
                  <p>No locations added manually</p>
                )}
              </div>

              <button
                className="modal-save-locations-btn"
                onClick={handleSaveLocations}
              >
                Save Locations
              </button>
              <button className="modal-cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationManager;
