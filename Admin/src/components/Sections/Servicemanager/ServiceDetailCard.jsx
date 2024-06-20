import React, { useState, useEffect } from "react"; // Import React and necessary hooks
import axios from "axios"; // Import Axios for making HTTP requests
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "./servicemanager.css"; // Import the CSS file for styling

const ServiceDetailCard = ({ service, category, subCategory, onClose }) => {
  // Define the functional component with props
  // Define state variables using the useState hook
  const [categoryName, setCategoryName] = useState(""); // State variable for the category name
  const [subCategoryName, setSubCategoryName] = useState(""); // State variable for the sub-category name
  const [userPackages, setUserPackages] = useState([]); // State variable for user packages
  const [providerPackages, setProviderPackages] = useState([]); // State variable for provider packages
  const [serviceData, setServiceData] = useState({
    // State variable for service details
    name: "", // Service name
    serviceType: "", // Service type
    price: "", // Service price
    serviceTime: "", // Total service time
    description: "", // Service description
    locations: [], // Service locations
    taxPercentage: "", // TAX percentage
    isMostBooked: false, // Flag for most booked service
    tag: false, // Flag for tagged service
    isCash: false, // Flag for cash after service
    serviceVariant: "", // Service variant
    creditEligibility: false, // Credit eligibility
    selectedUserPackage: "", // Selected user package
    selectedProviderPackage: "", // Selected provider package
    platformCommission: "", // Platform commission
    isActive: false, // Service active status
    isDeleted: false, // Service deleted status
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
        const serviceData = response.data;
        setServiceData({
          name: serviceData.name,
          serviceType: serviceData.serviceVariants[0]?.variantName || "",
          price: serviceData.serviceVariants[0]?.price || "",
          serviceTime: serviceData.serviceVariants[0]?.serviceTime || "",
          description: serviceData.description,
          locations: serviceData.locations,
          taxPercentage: serviceData.taxPercentage,
          isMostBooked: serviceData.isMostBooked,
          tag: serviceData.tag,
          isCash: serviceData.isCash,
          serviceVariant: serviceData.serviceVariants[0]?.variantName || "",
          creditEligibility: serviceData.creditEligibility,
          selectedUserPackage: serviceData.selectedUserPackage,
          selectedProviderPackage: serviceData.selectedProviderPackage,
          platformCommission: serviceData.platformCommission,
          isActive: serviceData.isActive,
          isDeleted: serviceData.isDeleted,
        });
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    // Function to fetch user and provider packages from APIs
    const fetchPackages = async () => {
      try {
        const userPackagesResponse = await axios.get(
          "http://13.126.118.3:3000/v1.0/core/user-packages",
        );
        const providerPackagesResponse = await axios.get(
          "http://13.126.118.3:3000/v1.0/core/provider-packages",
        );
        setUserPackages(userPackagesResponse.data.packages);
        setProviderPackages(providerPackagesResponse.data.packages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    // Call the fetch functions
    fetchCategoryName();
    fetchSubCategoryName();
    fetchServiceDetails();
    fetchPackages();
  }, [category, subCategory, service._id]); // Run useEffect when category, subCategory, or service ID changes

  // Find the selected package names
  const selectedUserPackageName =
    userPackages.find((pkg) => pkg._id === serviceData.selectedUserPackage)
      ?.name || "";
  const selectedProviderPackageName =
    providerPackages.find(
      (pkg) => pkg._id === serviceData.selectedProviderPackage,
    )?.name || "";

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
        {/* Service Type */}
        <div className="form-group">
          <label>Service Type:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.serviceType}
            readOnly
          />
        </div>
        {/* Service Price */}
        <div className="form-group">
          <label>Service Price:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.price}
            readOnly
          />
        </div>
        {/* Total Service Time */}
        <div className="form-group">
          <label>Total Service Time:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.serviceTime}
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
            value={serviceData.locations.join(", ")}
            readOnly
          />
        </div>
        {/* TAX Percentage */}
        <div className="form-group">
          <label>Tax Percentage:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.taxPercentage}
            readOnly
          />
        </div>
        {/* User Packages */}
        <div className="form-group">
          <label>User Package:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={selectedUserPackageName}
            readOnly
          />
        </div>
        {/* Provider Packages */}
        <div className="form-group">
          <label>Provider Package:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={selectedProviderPackageName}
            readOnly
          />
        </div>
        {/* Platform Commission */}
        <div className="form-group">
          <label>Platform Commission:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.platformCommission}
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
            readOnly
          />
        </div>
        {/* TAG */}
        <div className="form-group toggle-group">
          <label>TAG</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.tag}
            readOnly
          />
        </div>
        {/* Cash After Service */}
        <div className="form-group toggle-group">
          <label>Cash After Service</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isCash}
            readOnly
          />
        </div>
        {/* Credit Eligibility */}
        <div className="form-group toggle-group">
          <label>Credit Eligibility</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.creditEligibility}
            readOnly
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
        <button type="button" className="submissionbutton" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};

// PropTypes for type checking and prop validation
ServiceDetailCard.propTypes = {
  service: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    serviceVariants: PropTypes.arrayOf(
      PropTypes.shape({
        variantName: PropTypes.string,
        price: PropTypes.string,
        serviceTime: PropTypes.string,
      }),
    ),
    description: PropTypes.string,
    locations: PropTypes.array,
    taxPercentage: PropTypes.string,
    isMostBooked: PropTypes.bool,
    tag: PropTypes.bool,
    isCash: PropTypes.bool,
    creditEligibility: PropTypes.bool,
    selectedUserPackage: PropTypes.string,
    selectedProviderPackage: PropTypes.string,
    platformCommission: PropTypes.string,
    isActive: PropTypes.bool,
    isDeleted: PropTypes.bool,
  }).isRequired, // Required prop: service object
  category: PropTypes.string.isRequired, // Required prop: category ID
  subCategory: PropTypes.string.isRequired, // Required prop: sub-category ID
  onClose: PropTypes.func.isRequired, // Required prop: onClose function
};

export default ServiceDetailCard; // Export the component
