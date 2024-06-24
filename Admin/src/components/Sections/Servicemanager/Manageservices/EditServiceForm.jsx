import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./serviceform.css"; // Ensure the CSS file is correctly linked

const EditServiceForm = ({
  service,
  category,
  subCategory,
  onSave,
  onClose,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [userPackages, setUserPackages] = useState([]);
  const [providerPackages, setProviderPackages] = useState([]);
  const [serviceData, setServiceData] = useState({
    name: "",
    serviceType: "",
    price: "",
    serviceTime: "",
    metric: "",
    min: 1,
    max: 1,
    description: "",
    locations: [],
    taxPercentage: "",
    isMostBooked: false,
    tag: false,
    isCash: false,
    creditEligibility: false,
    selectedUserPackage: "",
    selectedProviderPackage: "",
    platformCommission: "",
    isActive: false,
    isDeleted: false,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await axios.get(
          `http://13.126.118.3:3000/v1.0/core/categories/${category}`,
        );
        setCategoryName(response.data.name);
      } catch (error) {
        console.error("Error fetching category name:", error);
      }
    };

    const fetchSubCategoryName = async () => {
      try {
        const response = await axios.get(
          `http://13.126.118.3:3000/v1.0/core/sub-categories/${subCategory}`,
        );
        setSubCategoryName(response.data.name);
      } catch (error) {
        console.error("Error fetching sub-category name:", error);
      }
    };

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
          metric: serviceData.serviceVariants[0]?.metric || "",
          min: serviceData.serviceVariants[0]?.min || 1,
          max: serviceData.serviceVariants[0]?.max || 1,
          description: serviceData.description,
          locations: serviceData.locations,
          taxPercentage: serviceData.taxPercentage,
          isMostBooked: serviceData.isMostBooked,
          tag: serviceData.tag,
          isCash: serviceData.isCash,
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

    const fetchPackages = async () => {
      try {
        const userPackagesResponse = await axios.get(
          "http://13.126.118.3:3000/v1.0/admin/user-package",
        );
        const providerPackagesResponse = await axios.get(
          "http://13.126.118.3:3000/v1.0/admin/provider-package",
        );
        setUserPackages(userPackagesResponse.data.packages);
        setProviderPackages(providerPackagesResponse.data.packages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchCategoryName();
    fetchSubCategoryName();
    fetchServiceDetails();
    fetchPackages();
  }, [category, subCategory, service._id]);

  const handleSave = () => {
    if (!window.confirm("Are you sure you want to update this service?")) {
      return;
    }

    setLoading(true);
    axios
      .put(
        `http://13.126.118.3:3000/v1.0/core/services/${service._id}`,
        serviceData,
      )
      .then((response) => {
        setSuccessMessage("Service updated successfully.");
        setErrorMessage("");
        onSave(response.data);
      })
      .catch((error) => {
        const errorResponse = error.response
          ? error.response.data
          : "Network error";
        setErrorMessage(`Failed to update service: ${errorResponse}`);
        setSuccessMessage("");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="service-detail-card">
      <div className="service-detail-header">
        <h6>Category: {categoryName}</h6>
        <h6>Sub-Category: {subCategoryName}</h6>
        <h6>Service: {serviceData.name}</h6>
      </div>
      <form className="add-service-form">
        {successMessage && (
          <div className="successMessage">{successMessage}</div>
        )}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        <div className="form-group">
          <label>Service Name:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.name}
            onChange={(e) =>
              setServiceData({ ...serviceData, name: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Service Type:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.serviceType}
            onChange={(e) =>
              setServiceData({ ...serviceData, serviceType: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Service Price:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.price}
            onChange={(e) =>
              setServiceData({ ...serviceData, price: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Total Service Time:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.serviceTime}
            onChange={(e) =>
              setServiceData({ ...serviceData, serviceTime: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Metric:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.metric}
            onChange={(e) =>
              setServiceData({ ...serviceData, metric: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Min:</label>
          <input
            type="number"
            className="bottom-borders-input"
            value={serviceData.min}
            onChange={(e) =>
              setServiceData({ ...serviceData, min: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Max:</label>
          <input
            type="number"
            className="bottom-borders-input"
            value={serviceData.max}
            onChange={(e) =>
              setServiceData({ ...serviceData, max: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="textarea-input"
            value={serviceData.description}
            onChange={(e) =>
              setServiceData({ ...serviceData, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="form-group">
          <label>Locations:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.locations.join(", ")}
            onChange={(e) =>
              setServiceData({
                ...serviceData,
                locations: e.target.value.split(", "),
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Tax Percentage:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.taxPercentage}
            onChange={(e) =>
              setServiceData({ ...serviceData, taxPercentage: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>User Package:</label>
          <select
            className="bottom-borders-input"
            value={serviceData.selectedUserPackage}
            onChange={(e) =>
              setServiceData({
                ...serviceData,
                selectedUserPackage: e.target.value,
              })
            }
          >
            {userPackages &&
              userPackages.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.packageName}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label>Provider Package:</label>
          <select
            className="bottom-borders-input"
            value={serviceData.selectedProviderPackage}
            onChange={(e) =>
              setServiceData({
                ...serviceData,
                selectedProviderPackage: e.target.value,
              })
            }
          >
            {providerPackages &&
              providerPackages.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.packageName}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label>Platform Commission:</label>
          <input
            type="text"
            className="bottom-borders-input"
            value={serviceData.platformCommission}
            onChange={(e) =>
              setServiceData({
                ...serviceData,
                platformCommission: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group toggle-group">
          <label>Add to most booked service</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isMostBooked}
            onChange={(e) =>
              setServiceData({ ...serviceData, isMostBooked: e.target.checked })
            }
          />
        </div>
        <div className="form-group toggle-group">
          <label>TAG</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.tag}
            onChange={(e) =>
              setServiceData({ ...serviceData, tag: e.target.checked })
            }
          />
        </div>
        <div className="form-group toggle-group">
          <label>Cash After Service</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isCash}
            onChange={(e) =>
              setServiceData({ ...serviceData, isCash: e.target.checked })
            }
          />
        </div>
        <div className="form-group toggle-group">
          <label>Credit Eligibility</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.creditEligibility}
            onChange={(e) =>
              setServiceData({
                ...serviceData,
                creditEligibility: e.target.checked,
              })
            }
          />
        </div>
        <div className="form-group toggle-group">
          <label>Active</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isActive}
            onChange={(e) =>
              setServiceData({ ...serviceData, isActive: e.target.checked })
            }
          />
        </div>
        <div className="form-group toggle-group">
          <label>Deleted</label>
          <input
            type="checkbox"
            className="toggle-input"
            checked={serviceData.isDeleted}
            onChange={(e) =>
              setServiceData({ ...serviceData, isDeleted: e.target.checked })
            }
          />
        </div>
        <button
          type="button"
          className="submissionbutton"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <button
          type="button"
          className="submissionbutton"
          onClick={() => {
            if (window.confirm("Are you sure you want to cancel the edit?")) {
              onClose();
            }
          }}
        >
          Close
        </button>
      </form>
    </div>
  );
};

EditServiceForm.propTypes = {
  service: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    serviceVariants: PropTypes.arrayOf(
      PropTypes.shape({
        variantName: PropTypes.string,
        price: PropTypes.string,
        serviceTime: PropTypes.string,
        metric: PropTypes.string,
        min: PropTypes.number,
        max: PropTypes.number,
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
  }).isRequired,
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditServiceForm;
