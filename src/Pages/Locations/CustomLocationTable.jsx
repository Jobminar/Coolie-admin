import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomLocationTable.css"; // Updated Swiggy-styled CSS
import { FaTrash, FaSort, FaSpinner } from "react-icons/fa"; // Icons for sorting and loading

const API_URL = "https://api.coolieno1.in/v1.0/core/locations/custom-locations";

const CustomLocationTable = () => {
  const [customLocations, setCustomLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    fetchCustomLocations();
  }, []);

  const fetchCustomLocations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setCustomLocations(response.data);
    } catch (error) {
      console.error("Error fetching custom locations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedLocations = React.useMemo(() => {
    let sortableLocations = [...customLocations];
    if (sortConfig.key !== null) {
      sortableLocations.sort((a, b) => {
        const aValue = a[sortConfig.key] || ""; // Handle null or undefined values
        const bValue = b[sortConfig.key] || "";
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableLocations;
  }, [customLocations, sortConfig]);

  // Delete handler
  const handleDelete = async (locationId) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      try {
        await axios.delete(`${API_URL}/${locationId}`);
        setCustomLocations((prevLocations) =>
          prevLocations.filter((location) => location._id !== locationId),
        );
      } catch (error) {
        console.error("Error deleting location:", error);
      }
    }
  };

  const renderPriceMap = (priceMap) => {
    if (priceMap && typeof priceMap === "object") {
      return Object.entries(priceMap)
        .map(([serviceType, priceValue]) => `${serviceType}: ₹${priceValue}`)
        .join(", ");
    }
    return "N/A";
  };

  return (
    <div className="swiggy-custom-location-table-container">
      <h3 className="swiggy-table-title">Custom Location Pricing</h3>
      {isLoading ? (
        <div className="swiggy-loading">
          <FaSpinner className="swiggy-spinner" /> Loading custom pricing
          data...
        </div>
      ) : (
        <div className="swiggy-table-wrapper">
          <table className="swiggy-custom-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("district")}>
                  District <FaSort />
                </th>
                <th onClick={() => handleSort("location")}>
                  Location <FaSort />
                </th>
                <th onClick={() => handleSort("pincode")}>
                  Pincode <FaSort />
                </th>
                <th onClick={() => handleSort("state")}>State</th>
                <th onClick={() => handleSort("category")}>Category</th>
                <th onClick={() => handleSort("subcategory")}>Subcategory</th>
                <th onClick={() => handleSort("servicename")}>Service Name</th>
                <th>Price</th>
                <th>Min</th>
                <th>Max</th>
                <th>Metric</th>
                <th>Credit Eligibility</th>
                <th>Tax Percentage</th>
                <th>Misc Fee</th>
                <th>Platform Commission</th>
                <th>Is Cash</th>
                <th>Is Custom</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedLocations.length > 0 ? (
                sortedLocations.map((location, index) => (
                  <tr key={index} className="swiggy-custom-table-row">
                    <td>{location.district}</td>
                    <td>{location.location || "N/A"}</td>
                    <td>{location.pincode || "N/A"}</td>
                    <td>{location.state || "N/A"}</td>
                    <td>{location.category || "N/A"}</td>
                    <td>{location.subcategory || "N/A"}</td>
                    <td>{location.servicename || "N/A"}</td>
                    <td>{renderPriceMap(location.price)}</td>
                    <td>{location.min || "N/A"}</td>
                    <td>{location.max || "N/A"}</td>
                    <td>{location.metric || "N/A"}</td>
                    <td>{location.creditEligibility ? "Yes" : "No"}</td>
                    <td>{location.taxPercentage || "N/A"}</td>
                    <td>{location.miscFee || "N/A"}</td>
                    <td>{location.platformCommission || "N/A"}</td>
                    <td>{location.isCash ? "Yes" : "No"}</td>
                    <td>{location.isCustom ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="swiggy-delete-btn"
                        onClick={() => handleDelete(location._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="18">No custom locations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomLocationTable;
