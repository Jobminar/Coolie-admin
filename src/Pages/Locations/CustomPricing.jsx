import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomPricing.css";

const API_BASE_URL = "https://api.coolieno1.in/v1.0/core";

const CustomPricing = ({ onLocationSelected }) => {
  const [locations, setLocations] = useState([]); // For storing all location data fetched from API
  const [uniqueRecords, setUniqueRecords] = useState([]); // For storing grouped locations
  const [selectedLocation, setSelectedLocation] = useState("");
  const [message, setMessage] = useState("");
  const [isValidLocation, setIsValidLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalServices, setTotalServices] = useState(0); // Count of all services available
  const [totalRegions, setTotalRegions] = useState(0); // Count of all regions available

  useEffect(() => {
    loadGoogleMapsScript();
    fetchLocationData();
  }, []);

  const loadGoogleMapsScript = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCJQHv3pYfnPd6F3ju1DXZ7jm46PJbncuk&libraries=places`;
    script.async = true;
    script.onload = () => initAutocomplete();
    document.body.appendChild(script);
  };

  const initAutocomplete = () => {
    const searchInput = document.getElementById("tig-search-input");
    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput,
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      processAddressSelection(place);
    });
  };

  const processAddressSelection = (place) => {
    const selectedLocation = place.formatted_address || "";
    setSelectedLocation(selectedLocation);
    validateAddress(selectedLocation);
  };

  const fetchLocationData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/locations`);
      const locationsData = response.data;

      // Update state with fetched locations and calculate services & regions
      setLocations(locationsData);
      setTotalRegions(locationsData.length); // Count of regions

      const groupedRecords = groupLocations(locationsData);
      setUniqueRecords(groupedRecords);

      // Calculate total services served
      const totalServiceCount = locationsData.reduce((sum, location) => {
        return sum + (location.services?.length || 0); // Sum up services for each location
      }, 0);
      setTotalServices(totalServiceCount);
    } catch (error) {
      console.error("Error fetching location data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Group locations by district, location, and pincode
  const groupLocations = (locations) => {
    const grouped = {};
    locations.forEach((location) => {
      const key = `${location.district}_${location.location}_${location.pincode}`;
      if (!grouped[key]) {
        grouped[key] = { ...location, count: 1 };
      } else {
        grouped[key].count += 1;
      }
    });
    return Object.values(grouped);
  };

  const validateAddress = (selectedLocation) => {
    console.log("Selected Location:", selectedLocation);

    // Normalize address and location fields, remove commas and extra spaces
    const addressTokens = selectedLocation
      .toLowerCase()
      .replace(/,/g, "")
      .split(" ")
      .filter((token) => token.trim().length > 0); // Split by space, filter empty tokens

    console.log("Address Tokens:", addressTokens);

    // Variable to track whether a match is found
    let isValid = false;

    // Loop through each record in the uniqueRecords and try to find matches
    uniqueRecords.forEach((record) => {
      const district = record.district?.toLowerCase() || "";
      const location = record.location?.toLowerCase() || "";
      const state = record.state?.toLowerCase() || "";
      const pincode = record.pincode?.toString() || "";

      // Log to see what tokens we're comparing against
      console.log("Comparing with record:", {
        district,
        location,
        state,
        pincode,
      });

      // Check if any part of the address matches any part of district, location, state, or pincode
      const districtMatch = addressTokens.some((token) =>
        district.includes(token),
      );
      const locationMatch = addressTokens.some((token) =>
        location.includes(token),
      );
      const stateMatch = addressTokens.some((token) => state.includes(token));
      const pincodeMatch = addressTokens.includes(pincode);

      if (districtMatch || locationMatch || stateMatch || pincodeMatch) {
        isValid = true;
      }
    });

    // Set the validation result
    setIsValidLocation(isValid);

    // Set the message based on whether the location was valid
    if (isValid) {
      setMessage(
        `Success: We are serving in this area! We currently offer services across ${totalRegions} locations.`,
      );
    } else {
      setMessage(
        `Sorry, this location is not in our service area. We currently offer ${totalServices} services across ${totalRegions} locations.`,
      );
    }

    // Send validated data to the parent component
    onLocationSelected({
      location: selectedLocation,
      isValid,
    });
  };

  return (
    <div className="tig-container mt-5">
      <div className="tig-header text-center">
        <h4 className="tig-title">Location Validator</h4>
        <p className="tig-subtitle">Check if we are serving in your area.</p>
      </div>

      {/* Total services and regions */}
      <div className="total-locations text-center mb-3">
        <p>
          <strong>Total no of service records:</strong> {totalRegions}
        </p>
      </div>

      <div className="tig-input-wrapper d-flex justify-content-center">
        <div className="tig-input-box">
          <input
            id="tig-search-input"
            type="text"
            placeholder="Search for your address"
            className="tig-input form-control form-control-lg"
          />

          {isLoading && (
            <div className="tig-spinner text-center mt-4">
              <div className="spinner-border text-warning" role="status"></div>
            </div>
          )}

          {!isLoading && message && (
            <div
              className={`tig-alert mt-4 ${
                isValidLocation ? "alert-success" : "alert-warning"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>

      {selectedLocation && (
        <div className="tig-location-info text-center mt-4">
          <p>
            <strong>Selected Location:</strong> {selectedLocation}
          </p>
        </div>
      )}

      <div className="tig-expand-btn-wrapper text-center mt-5">
        <button
          className="tig-expand-btn btn btn-lg"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide" : "Show"} Regions We Serve
        </button>
      </div>

      {isExpanded && (
        <div className="tig-table-container mt-4 fade-in">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>District</th>
                <th>Location</th>
                <th>Pincode</th>
              </tr>
            </thead>
            <tbody>
              {uniqueRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.district}</td>
                  <td>{record.location}</td>
                  <td>{record.pincode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomPricing;
