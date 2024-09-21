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
    }
  }, [selectedRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.patch(
        `https://api.coolieno1.in/v1.0/core/locations/${selectedRecord._id}`,
        formData,
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

              <div className="districtpop-form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="districtpop-form-control"
                  value={JSON.stringify(formData.price)}
                  onChange={handleChange}
                  required
                />
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
