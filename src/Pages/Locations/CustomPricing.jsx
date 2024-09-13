import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomPricing.css";

const API_BASE_URL = "https://api.coolieno1.in/v1.0/core";

const CustomPricing = ({ onLocationSelected }) => {
  const [locations, setLocations] = useState([]);
  const [uniqueRecords, setUniqueRecords] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [message, setMessage] = useState("");
  const [isValidLocation, setIsValidLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalServices, setTotalServices] = useState(0);
  const [totalRegions, setTotalRegions] = useState(0);

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
    console.log("Selected location:", selectedLocation);
    validateAddress(selectedLocation); // Call the validation function
  };

  const fetchLocationData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/locations`);
      const locationsData = response.data;
      setLocations(locationsData);
      setTotalRegions(locationsData.length);

      const groupedRecords = groupLocations(locationsData);
      setUniqueRecords(groupedRecords);

      const totalServiceCount = locationsData.reduce((sum, location) => {
        return sum + (location.services?.length || 0);
      }, 0);
      setTotalServices(totalServiceCount);
    } catch (error) {
      console.error("Error fetching location data", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    // Tokenize the input address into words, remove commas, and filter out empty tokens
    const addressTokens = selectedLocation
      .toLowerCase()
      .replace(/,/g, "")
      .split(" ")
      .filter((token) => token.trim().length > 0);

    console.log("Address tokens for validation:", addressTokens);

    let isValid = false;

    uniqueRecords.forEach((record) => {
      const districtTokens = record.district?.toLowerCase().split(" ") || [];
      const locationTokens = record.location?.toLowerCase().split(" ") || [];
      const stateTokens = record.state?.toLowerCase().split(" ") || [];
      const pincode = record.pincode?.toString() || "";

      const allTokens = [
        ...districtTokens,
        ...locationTokens,
        ...stateTokens,
        pincode,
      ];

      console.log("Record tokens for comparison:", allTokens);

      // Check if any token from the input address matches any of the record tokens
      const hasMatch = addressTokens.some((token) =>
        allTokens.some((recordToken) => recordToken.includes(token)),
      );

      if (hasMatch) {
        isValid = true;
        console.log(`Match found for record:`, record);
      }
    });

    setIsValidLocation(isValid);

    if (isValid) {
      setMessage(
        `Success: We are serving in this area! We currently offer services across ${totalRegions} locations.`,
      );
    } else {
      setMessage(
        `Sorry, this location is not in our service area. We currently offer ${totalServices} services across ${totalRegions} locations.`,
      );
    }

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
