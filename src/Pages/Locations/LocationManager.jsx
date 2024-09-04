import React, { useState } from "react";
import { FaPlus, FaSearch, FaUpload, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./LocationManager.css";
import LocationsList from "./LocationsList"; // Import the LocationsList component

const LocationManager = () => {
  const [group, setGroup] = useState("default");
  const [pincode, setPincode] = useState("");
  const [csvFile, setCsvFile] = useState(null); // Track the chosen CSV file
  const [tierName, setTierName] = useState("");
  const [locations, setLocations] = useState([]); // Store manually added locations

  // Handle group toggle
  const handleGroupToggle = (groupType) => {
    setGroup(groupType);
  };

  // Handle manual pincode addition with Mapbox API
  const handlePincodeAdd = async () => {
    if (!pincode) return;

    try {
      const mapboxToken =
        "pk.eyJ1IjoiY29vbGllbm8xLWFkbWluIiwiYSI6ImNsdWZjZGR1ZzBtZHcybnJvaHBiYTd2NzMifQ.TQ6FrqUIUUWv7J7n75A3tQ";
      const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pincode}.json?access_token=${mapboxToken}`;

      const response = await axios.get(mapboxUrl);
      const place = response.data.features[0];
      const newLocation = {
        pincode,
        location: place.place_name || "N/A",
        district: "Some District",
        state: "Some State",
        category: "Some Category",
        subcategory: "Some Subcategory",
        servicename: "Some Service",
        price: {
          base: "100",
          premium: "150",
        },
        group: group,
        tierName: tierName,
      };

      setLocations([...locations, newLocation]);
      setPincode(""); // Reset pincode field
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  // Handle deletion of a manually added location
  const handleDeleteLocation = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
    toast.success("Location removed.");
  };

  // Handle CSV file upload
  const handleCsvUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setCsvFile(file); // Update the state with the chosen file

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "https://api.coolieno1.in/v1.0/core/locations/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("CSV file has been uploaded successfully.");
    } catch (error) {
      console.error("Error uploading CSV:", error);
      toast.error("Failed to upload CSV file.");
    }
  };

  return (
    <div className="location-manager">
      {/* Tier Name Input */}
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
      {/* Bordered Container */}
      <div className="location-container">
        {/* Group Toggle */}
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

        {/* Location Inputs */}
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

        {/* Display chosen file name separately */}
        {csvFile && (
          <div className="file-upload-name">
            <strong>Selected File:</strong> {csvFile.name}
          </div>
        )}
      </div>
      {/* Display Manually Added Location Cards */}
      <div className="locations-list">
        {locations.length > 0 ? (
          locations.map((location, index) => (
            <div className="location-card" key={index}>
              <span>{`${location.pincode} / ${location.location} - ${
                location.tierName || "N/A"
              }`}</span>
              <FaTrashAlt
                className="delete-icon"
                onClick={() => handleDeleteLocation(index)}
              />
            </div>
          ))
        ) : (
          <p>No locations added manually</p>
        )}
      </div>
      {/* LocationsList Component for displaying locations from API */}
      <LocationsList /> {/* Added the LocationsList component here */}
    </div>
  );
};

export default LocationManager;
