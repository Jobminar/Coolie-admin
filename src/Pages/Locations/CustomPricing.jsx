import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomPricing.css";

const API_BASE_URL = "https://api.coolieno1.in/v1.0/core";

const CustomPricing = ({ onLocationSelected }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [message, setMessage] = useState("");
  const [isValidLocation, setIsValidLocation] = useState(null);
  const [uniqueDistricts, setUniqueDistricts] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [uniquePincodes, setUniquePincodes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    autocomplete.addListener("place_changed", async () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        processAddressSelection(place);
      }
    });
  };

  const processAddressSelection = (place) => {
    const addressComponents = place.address_components;

    const districtComponent = addressComponents.find((component) =>
      component.types.includes("administrative_area_level_2"),
    );
    const locationComponent = addressComponents.find((component) =>
      component.types.includes("locality"),
    );
    const pincodeComponent = addressComponents.find((component) =>
      component.types.includes("postal_code"),
    );

    const selectedLocation = locationComponent?.long_name || "";
    const selectedDistrict = districtComponent?.long_name || "";
    const selectedPincode = pincodeComponent?.long_name || "";

    setSelectedLocation(selectedLocation);
    setSelectedDistrict(selectedDistrict);
    setSelectedPincode(selectedPincode);

    setIsLoading(true);
    setTimeout(() => {
      validateAddress({
        location: selectedLocation,
        district: selectedDistrict,
        pincode: selectedPincode,
        fullAddress: place.formatted_address,
      });
      setIsLoading(false);
    }, 1500);
  };

  const fetchLocationData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/locations`);
      const locations = response.data;

      setUniqueDistricts([
        ...new Set(
          locations.map((location) => location.district.toLowerCase()),
        ),
      ]);
      setUniqueLocations([
        ...new Set(
          locations.map((location) => location.location.toLowerCase()),
        ),
      ]);
      setUniquePincodes([
        ...new Set(locations.map((location) => location.pincode.toLowerCase())),
      ]);
    } catch (error) {
      console.error("Error fetching location data", error);
    }
  };

  const validateAddress = ({ location, district, pincode, fullAddress }) => {
    // Normalize all values for consistent comparison
    const normalizedDistrict = district.toLowerCase().trim();
    const normalizedLocation = location.toLowerCase().trim();
    const normalizedPincode = pincode.toLowerCase().trim();

    // Normalize unique districts, locations, pincodes for comparison
    const normalizedUniqueDistricts = uniqueDistricts.map((d) =>
      d.trim().toLowerCase(),
    );
    const normalizedUniqueLocations = uniqueLocations.map((l) =>
      l.trim().toLowerCase(),
    );
    const normalizedUniquePincodes = uniquePincodes.map((p) =>
      p.trim().toLowerCase(),
    );

    // Break down the fullAddress into smaller parts for comparison
    const addressParts = fullAddress
      .split(/[,\s]+/)
      .map((part) => part.toLowerCase().trim());

    // Helper function to match each address part with unique values
    const containsMatch = (value, uniqueValues) => {
      return uniqueValues.some(
        (uniqueValue) =>
          uniqueValue.includes(value) || value.includes(uniqueValue),
      );
    };

    // Check for exact or partial matches
    const isDistrictValid = containsMatch(
      normalizedDistrict,
      normalizedUniqueDistricts,
    );
    const isLocationValid = containsMatch(
      normalizedLocation,
      normalizedUniqueLocations,
    );
    const isPincodeValid = containsMatch(
      normalizedPincode,
      normalizedUniquePincodes,
    );

    // Determine if the address is valid if any of the parts match
    const isValid = isDistrictValid || isLocationValid || isPincodeValid;

    setIsValidLocation(isValid);

    // Display success or warning messages
    if (isValid) {
      setMessage(
        `Success: The address is valid! (District: ${district}, Location: ${location}, Pincode: ${pincode})`,
      );
    } else {
      setMessage(
        "Warning: The selected address is not within the service area.",
      );
    }

    // Send the validated location data back to the parent component
    onLocationSelected({
      location,
      district,
      pincode,
      isValid,
    });
  };

  return (
    <div className="tig-container mt-5">
      <div className="tig-header text-center">
        <h4 className="tig-title">Location Validator</h4>
        <p className="tig-subtitle">
          Validate your address to see if it matches our service areas!
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

      {selectedLocation && selectedDistrict && selectedPincode && (
        <div className="tig-location-info text-center mt-4">
          <p>
            <strong>Location:</strong> {selectedLocation}
            <br />
            <strong>District:</strong> {selectedDistrict}
            <br />
            <strong>Pincode:</strong> {selectedPincode}
          </p>
        </div>
      )}

      <div className="tig-expand-btn-wrapper text-center mt-5">
        <button
          className="tig-expand-btn btn btn-lg"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide" : "Expand"} Districts, Locations, and Pincodes
        </button>
      </div>

      {isExpanded && (
        <div className="tig-table-container mt-4">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>District</th>
                <th>Location</th>
                <th>Pincode</th>
              </tr>
            </thead>
            <tbody>
              {uniqueDistricts.map((district, index) => (
                <tr key={index}>
                  <td>{district}</td>
                  <td>{uniqueLocations[index] || "N/A"}</td>
                  <td>{uniquePincodes[index] || "N/A"}</td>
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
