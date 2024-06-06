import React, { useState, useEffect } from "react"; // Import React and necessary hooks
import axios from "axios"; // Import Axios for making HTTP requests
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "./servicemanager.css"; // Import the CSS file for styling

const ServiceDetailCard = ({ service, category, subCategory, onClose }) => {
  // Define the functional component with props
  // Define state variables using the useState hook
  const [categoryName, setCategoryName] = useState(""); // State variable for the category name
  const [subCategoryName, setSubCategoryName] = useState(""); // State variable for the sub-category name
  const [serviceData, setServiceData] = useState({
    // State variable for service details
    name: "", // Service name
    type: "", // Service type
    price: "", // Service price
    time: "", // Total service time
    description: "", // Service description
    locations: "", // Service locations
    tax: "", // TAX percentage
    commission: "", // Provider commission
    mostBooked: false, // Flag for most booked service
    tag: false, // Flag for tagged service
    cashAfterService: false, // Flag for cash after service
  });

  // useEffect hook to fetch data when component mounts or props change
  useEffect(() => {
    // Function to fetch category name from API
    const fetchCategoryName = async () => {
      try {
        const response = await axios.get(
          `http://13.126.118.3:3000/v1.0/core/categories/${category}`,
        );
        setCategoryName(response.data.name); // Set the category name in state
      } catch (error) {
        console.error("Error fetching category name:", error);
      }
    };

    // Function to fetch sub-category name from API
    const fetchSubCategoryName = async () => {
      try {
        const response = await axios.get(
          `http://13.126.118.3:3000/v1.0/core/sub-categories/${subCategory}`,
        );
        setSubCategoryName(response.data.name); // Set the sub-category name in state
      } catch (error) {
        console.error("Error fetching sub-category name:", error);
      }
    };

    // Function to fetch service details from API
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          `http://13.126.118.3:3000/v1.0/core/services/${service._id}`,
        );
        setServiceData(response.data); // Set the service details in state
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    // Call the fetch functions
    fetchCategoryName();
    fetchSubCategoryName();
    fetchServiceDetails();
  }, [category, subCategory, service._id]); // Run useEffect when category, subCategory, or service ID changes

  // Render the component UI
  return (
    <div className="service-detail-card">
      {" "}
      {/* Container for the service detail card */}
      <div className="service-detail-header">
        {" "}
        {/* Header section */}
        {/* Display category name */}
        <h6>Category: {categoryName}</h6>
        {/* Display sub-category name */}
        <h6>Sub-Category: {subCategoryName}</h6>
        {/* Display service name */}
        <h6>Service: {serviceData.name}</h6>
      </div>
      <form className="add-service-form">
        {" "}
        {/* Form section */}
        <div className="form-group">
          {" "}
          {/* Service name input field */}
          <label>Service Name:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.name}
            readOnly
          />
        </div>
        {/* Similar form groups for other service details */}
        {/* Service Type */}
        <div className="form-group">
          <label>Service Type:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={
              serviceData.serviceVariants &&
              serviceData.serviceVariants.length > 0
                ? serviceData.serviceVariants[0].variantName
                : ""
            }
            readOnly
          />
        </div>
        {/* Service Price */}
        <div className="form-group">
          <label>Service Price:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={
              serviceData.serviceVariants &&
              serviceData.serviceVariants.length > 0
                ? serviceData.serviceVariants[0].price
                : ""
            }
            readOnly
          />
        </div>
        {/* Total Service Time */}
        <div className="form-group">
          <label>Total Service Time:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={
              serviceData.serviceVariants &&
              serviceData.serviceVariants.length > 0
                ? serviceData.serviceVariants[0].serviceTime
                : ""
            }
            readOnly
          />
        </div>
        {/* Description */}
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="textarea-input"
            value={serviceData.description}
            readOnly
          ></textarea>
        </div>
        {/* Locations */}
        <div className="form-group">
          <label>Locations:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={
              Array.isArray(serviceData.locations)
                ? serviceData.locations.join(", ")
                : ""
            }
            readOnly
          />
        </div>
        {/* TAX Percentage */}
        <div className="form-group">
          <label>TAX %:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.tax}
            readOnly
          />
        </div>
        {/* Provider Commission */}
        <div className="form-group">
          <label>Provider commission:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.commission}
            readOnly
          />
        </div>
        {/* Add to most booked service */}
        <div className="form-group toggle-group">
          <label>Add to most booked service</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isMostBooked}
            readOnly={!serviceData.isMostBooked}
          />
        </div>
        {/* TAG */}
        <div className="form-group toggle-group">
          <label>TAG</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.tag}
            readOnly={!serviceData.tag}
          />
        </div>
        {/* Cash After Service */}
        <div className="form-group toggle-group">
          <label>Cash After Service</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isCash}
            readOnly={!serviceData.isCash}
          />
        </div>
        {/* Active status */}
        <div className="form-group toggle-group">
          <label>Active</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isActive}
            readOnly
          />
        </div>
        {/* Deleted status */}
        <div className="form-group toggle-group">
          <label>Deleted</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isDeleted}
            readOnly
          />
        </div>
        {/* Close button */}
        <button type="button" className="submit-button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};

// PropTypes for type checking and prop validation
ServiceDetailCard.propTypes = {
  service: PropTypes.object.isRequired, // Required prop: service object
  category: PropTypes.string.isRequired, // Required prop: category ID
  subCategory: PropTypes.string.isRequired, // Required prop: sub-category ID
  onClose: PropTypes.func.isRequired, // Required prop: onClose function
};

export default ServiceDetailCard; // Export the component
