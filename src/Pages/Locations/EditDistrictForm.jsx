import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import "./EditDistrictForm.css"; // Custom styles for the popup

const EditDistrictForm = ({
  isOpen,
  onClose,
  selectedRecord,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState({
    location: "",
    pincode: "",
    state: "",
    category: "",
    subcategory: "",
    servicename: "",
    price: {},
    min: "",
    max: "",
  });
  const [priceFields, setPriceFields] = useState([]); // State for managing price inputs
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Pre-fill the form with the selected record data when the modal is opened
    if (selectedRecord) {
      setFormData({
        location: selectedRecord.location || "",
        pincode: selectedRecord.pincode || "",
        state: selectedRecord.state || "",
        category: selectedRecord.category || "",
        subcategory: selectedRecord.subcategory || "",
        servicename: selectedRecord.servicename || "",
        price: selectedRecord.price || {},
        min: selectedRecord.min || "",
        max: selectedRecord.max || "",
      });

      // Convert the price object into an array of key-value pairs for inputs
      setPriceFields(Object.entries(selectedRecord.price || {}));
    }
  }, [selectedRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle dynamic price inputs change
  const handlePriceChange = (index, key, value) => {
    const updatedPriceFields = [...priceFields];
    updatedPriceFields[index] = [key, value]; // Update the specific price variant
    setPriceFields(updatedPriceFields);
  };

  // Add a new price variant
  const addPriceVariant = () => {
    setPriceFields([...priceFields, ["", ""]]); // Add an empty key-value pair
  };

  // Remove a price variant
  const removePriceVariant = (index) => {
    const updatedPriceFields = [...priceFields];
    updatedPriceFields.splice(index, 1); // Remove the specific key-value pair
    setPriceFields(updatedPriceFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Convert priceFields (array of key-value pairs) back into an object
    const updatedPrice = priceFields.reduce((acc, [key, value]) => {
      if (key.trim() !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      const response = await axios.patch(
        `https://api.coolieno1.in/v1.0/core/locations/${selectedRecord._id}`,
        {
          ...formData,
          price: updatedPrice, // Set the reconstructed price object
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.status === 200) {
        toast.success("Record updated successfully!");
        onUpdateSuccess(); // Refresh data on parent component
        onClose(); // Close modal
      }
    } catch (error) {
      setErrorMessage("Failed to update record.");
      console.error("Error updating record:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="districtpop-modal-overlay">
          <div className="districtpop-modal-content">
            <div className="districtpop-modal-header">
              <h2 className="districtpop-modal-title">Edit District Record</h2>
              <button className="districtpop-close-button" onClick={onClose}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="districtpop-modal-body">
              <div className="districtpop-form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="districtpop-form-control"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="districtpop-form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="districtpop-form-control"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="districtpop-form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="districtpop-form-control"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="districtpop-form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="districtpop-form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="districtpop-form-group">
                <label htmlFor="subcategory">Subcategory</label>
                <input
                  type="text"
                  id="subcategory"
                  name="subcategory"
                  className="districtpop-form-control"
                  value={formData.subcategory}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="districtpop-form-group">
                <label htmlFor="servicename">Service Name</label>
                <input
                  type="text"
                  id="servicename"
                  name="servicename"
                  className="districtpop-form-control"
                  value={formData.servicename}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Dynamic Price Fields */}
              <div className="districtpop-form-group">
                <label>Price Variants</label>
                {priceFields.map(([key, value], index) => (
                  <div key={index} className="districtpop-price-field">
                    <input
                      type="text"
                      placeholder="Variant Name"
                      value={key}
                      onChange={(e) =>
                        handlePriceChange(index, e.target.value, value)
                      }
                      className="districtpop-form-control"
                    />
                    <input
                      type="number"
                      placeholder="Variant Price"
                      value={value}
                      onChange={(e) =>
                        handlePriceChange(index, key, e.target.value)
                      }
                      className="districtpop-form-control"
                    />
                    <button
                      type="button"
                      onClick={() => removePriceVariant(index)}
                      className="districtpop-remove-variant-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {/* Button to Add New Variant */}
                <button
                  type="button"
                  onClick={addPriceVariant}
                  className="districtpop-add-variant-btn"
                >
                  Add New Variant
                </button>
              </div>

              <div className="districtpop-form-group">
                <label htmlFor="min">Min Quantity</label>
                <input
                  type="number"
                  id="min"
                  name="min"
                  className="districtpop-form-control"
                  value={formData.min}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="districtpop-form-group">
                <label htmlFor="max">Max Quantity</label>
                <input
                  type="number"
                  id="max"
                  name="max"
                  className="districtpop-form-control"
                  value={formData.max}
                  onChange={handleChange}
                  required
                />
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <div className="districtpop-btn-group">
                <button
                  type="submit"
                  className="districtpop-btn-submit"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="districtpop-btn-cancel"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDistrictForm;
