import React, { useState } from "react";
import CustomPricing from "./CustomPricing";
import PricingForm from "./PricingForm";

const Pricing = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [isValid, setIsValid] = useState(false); // To track the validity
  const [isFormVisible, setIsFormVisible] = useState(false); // To control the form visibility

  // Callback function to handle location selection
  const handleLocationSelected = ({ location, district, pincode, isValid }) => {
    console.log(
      "Location:",
      location,
      "District:",
      district,
      "Pincode:",
      pincode,
    );
    setSelectedLocation(location);
    setSelectedDistrict(district);
    setSelectedPincode(pincode);
    setIsValid(isValid);
    setIsFormVisible(true);
  };

  // Function to toggle form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState); // Toggle the form's visibility
  };

  return (
    <div>
      <h2>Custom Pricing</h2>

      {/* Pass the callback to the CustomPricing component */}
      <CustomPricing onLocationSelected={handleLocationSelected} />

      <hr />

      {/* Show the form toggle button if an address is selected */}
      {selectedLocation && selectedDistrict && selectedPincode && (
        <div className="text-center mt-4">
          <button className="btn btn-info" onClick={toggleFormVisibility}>
            {isFormVisible ? "Hide Pricing Form" : "Show Pricing Form"}
          </button>
        </div>
      )}

      <hr />

      {/* Conditionally render PricingForm if the form is visible */}
      {isFormVisible && (
        <PricingForm
          location={selectedLocation}
          district={selectedDistrict}
          pincode={selectedPincode}
          isValid={isValid} // Passing validity status for user information
        />
      )}
    </div>
  );
};

export default Pricing;
