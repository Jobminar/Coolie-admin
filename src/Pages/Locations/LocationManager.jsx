import React, { useState } from "react";
import { FaPlus, FaSearch, FaUpload, FaTrashAlt } from "react-icons/fa";
import { saveLocations } from "./api/Locations-api"; // Import the API function to save locations
import axios from "axios";
import { toast } from "react-hot-toast"; // For showing toast messages
import "./LocationManager.css"; // Import CSS for styling
import LocationsList from "./LocationsList"; // Component to display the locations list

const LocationManager = () => {
  const [group, setGroup] = useState("default"); // State to track the selected group (default or custom)
  const [pincode, setPincode] = useState(""); // State to track the entered pincode
  const [csvFile, setCsvFile] = useState(null); // State to track the uploaded CSV file
  const [tierName, setTierName] = useState(""); // State to track the entered tier name
  const [locations, setLocations] = useState([]); // State to track the manually added locations
  const [reloadLocations, setReloadLocations] = useState(false); // State to trigger reload of the LocationsList component
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track if the modal is open or not

  // Handle group toggle between 'default' and 'custom'
  const handleGroupToggle = (groupType) => {
    setGroup(groupType); // Set the group based on the clicked button
  };

  // Function to add a pincode using the Mapbox API
  const handlePincodeAdd = async () => {
    if (!pincode) return; // If no pincode is entered, do nothing

    try {
      const mapboxToken =
        "pk.eyJ1IjoiY29vbGllbm8xLWFkbWluIiwiYSI6ImNsdWZjZGR1ZzBtZHcybnJvaHBiYTd2NzMifQ.TQ6FrqUIUUWv7J7n75A3tQ"; // Mapbox API token
      const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pincode}.json?access_token=${mapboxToken}`; // API endpoint to get location data

      // Make the request to Mapbox API
      const response = await axios.get(mapboxUrl);
      const place = response.data.features[0];
      const newLocation = {
        pincode,
        location: place.place_name || "N/A", // Set location or fallback to 'N/A'
      };

      // Add the new location to the list of manually added locations
      setLocations((prevLocations) => [...prevLocations, newLocation]);
      setPincode(""); // Reset the pincode field

      // Show the modal after successfully adding a location
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error adding location:", error);
      toast.error("Failed to add the location.");
    }
  };

  // Handle deletion of a manually added location by index
  // const handleDeleteLocation = (index) => {
  //   const updatedLocations = locations.filter((_, i) => i !== index); // Remove the location at the specified index
  //   setLocations(updatedLocations); // Update the state with the remaining locations
  //   toast.success("Location removed."); // Show success message
  // };

  // Handle CSV file upload
  const handleCsvUpload = async (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (!file) return;

    setCsvFile(file); // Update the state with the selected file

    const formData = new FormData();
    formData.append("file", file); // Append the file to FormData
    formData.append("group", group); // Append the selected group to FormData

    try {
      // Send the CSV file to the API
      await axios.post(
        "https://api.coolieno1.in/v1.0/core/locations/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("CSV file has been uploaded successfully."); // Show success message
      setReloadLocations((prev) => !prev); // Trigger reload of the LocationsList component
    } catch (error) {
      console.error("Error uploading CSV:", error);
      toast.error("Failed to upload CSV file."); // Show error message
    }
  };

  // Format the manually added locations to send to the API
  const formatLocationsForApi = (locations) => {
    return locations.map((location) => {
      const fullLocation = location.location || "N/A";
      const splitLocation = fullLocation.split(",").map((part) => part.trim());

      // Extract pincode, city, and state from the split location data
      const pincode = location.pincode || "N/A";
      const city = splitLocation[1] || "N/A"; // Second part of the split is expected to be the city
      const state = splitLocation[2] || "Andhra Pradesh"; // Third part is expected to be the state

      // Return formatted location object
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
      const formattedLocations = formatLocationsForApi(locations); // Format locations
      await saveLocations(formattedLocations); // Send formatted locations to the API

      toast.success("Locations saved successfully."); // Show success message
      setReloadLocations((prev) => !prev); // Trigger reload of the LocationsList component
      setLocations([]); // Clear the manually added locations after saving
      setIsModalOpen(false); // Close the modal after saving
    } catch (error) {
      console.error("Error saving locations:", error);
      toast.error("Failed to save locations."); // Show error message
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
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
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
                      {/* <FaTrashAlt
                        className="modal-strip-delete-icon"
                        onClick={() => handleDeleteLocation(index)}
                      /> */}
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
              <button
                className="modal-cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
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
