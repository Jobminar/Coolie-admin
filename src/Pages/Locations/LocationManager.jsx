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
    console.log(`Group toggled to: ${groupType}`);
  };

  // Handle manual pincode addition with Mapbox API
  const handlePincodeAdd = async () => {
    if (!pincode) {
      toast.error("Please enter a valid pincode.");
      return;
    }

    console.log(`Adding pincode: ${pincode} for group: ${group}`);

    try {
      const mapboxToken =
        "pk.eyJ1IjoiY29vbGllbm8xLWFkbWluIiwiYSI6ImNsdWZjZGR1ZzBtZHcybnJvaHBiYTd2NzMifQ.TQ6FrqUIUUWv7J7n75A3tQ"; // Replace with your Mapbox token
      const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pincode}.json?access_token=${mapboxToken}`;

      const response = await axios.get(mapboxUrl);
      if (
        response.data &&
        response.data.features &&
        response.data.features.length > 0
      ) {
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
          group: group, // Set group to either "default" or "custom"
          tierName: tierName,
        };

        console.log("New location added:", newLocation);
        setLocations([...locations, newLocation]);
        setPincode(""); // Reset pincode field
        toast.success("Location added successfully.");
      } else {
        toast.error("No location found for this pincode.");
      }
    } catch (error) {
      console.error("Error adding location:", error);
      toast.error("Error fetching location from Mapbox.");
    }
  };

  // Handle CSV file selection
  const handleCsvSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setCsvFile(file); // Update the state with the chosen file
    console.log("CSV file selected:", file.name);
  };

  // Handle CSV file upload with group value
  const handleCsvUpload = async () => {
    if (!csvFile) {
      toast.error("Please choose a CSV file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile); // Attach CSV file
    formData.append("group", group); // Append group value (default or custom)

    console.log("Uploading CSV with group:", group);

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
      console.log("CSV file uploaded successfully.");
    } catch (error) {
      console.error("Error uploading CSV:", error);
      toast.error("Failed to upload CSV file.");
    }
  };

  // Handle deletion of a manually added location
  const handleDeleteLocation = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
    toast.success("Location removed.");
  };

  return (
    <div className="location-manager-container">
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
      <div className="location-wrapper">
        <div className="location-actions">
          <div className="location-inputs">
            {/* Pincode Input */}
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

            {/* CSV Upload Input */}
            <div className="input-with-icon file-upload-container">
              <label htmlFor="csv-upload" className="csv-upload-label">
                Choose File
              </label>
              <input
                type="file"
                id="csv-upload"
                className="csv-upload-input"
                onChange={handleCsvSelect} // Handle CSV selection
              />
              <button className="icon-button" onClick={handleCsvUpload}>
                <FaUpload />
              </button>
            </div>

            {/* Pincode Search Input */}
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

        {/* Manually Added Locations */}
        <div className="manually-added-locations">
          <h3>Manually Added Locations</h3>
          <div className="locations-scrollable">
            {locations.length > 0 ? (
              locations.map((location, index) => (
                <div className="location-card" key={index}>
                  <span>
                    <strong>{location.pincode}</strong> / {location.location}
                  </span>
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
        </div>

        {/* Scrollable Section for LocationsList from API */}
        <div className="locations-list-api">
          <LocationsList group={group} /> {/* Pass group as prop */}
        </div>
      </div>
    </div>
  );
};

export default LocationManager;
