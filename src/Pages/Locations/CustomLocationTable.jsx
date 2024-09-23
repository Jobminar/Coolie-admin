import React, { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import { FaTrash, FaSort, FaSpinner, FaUpload } from "react-icons/fa";
import Select from "react-select";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader"; // Spinner
import "./CustomLocationTable.css"; // Updated CSS
import "./LocationManager.css"; // Reuse common styles from LocationManager
import { ConstructionOutlined } from "@mui/icons-material";

const API_URL = "https://api.coolieno1.in/v1.0/core/locations/custom-locations";

const CustomLocationTable = () => {
  const [customLocations, setCustomLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [file, setFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false); // Track if a file is selected
  const [filters, setFilters] = useState({
    servicename: [],
    category: [],
    subcategory: [],
    state: [],
    district: [],
    pincode: [],
  });
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    fetchCustomLocations();
  }, []);

  const fetchCustomLocations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setCustomLocations(response.data);
      setFilteredLocations(response.data); // Initialize with full data
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
    let sortableLocations = [...filteredLocations];
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
  }, [filteredLocations, sortConfig]);

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

  // Handle file input
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsFileSelected(true); // Enable upload button when file is selected
  };

  // Simple upload function
  const handleUpload = () => {
    if (!file) {
      alert("Please select a CSV file first.");
      return;
    }

    // Here, we'll assume the CSV file is already correct and just upload it
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const parsedData = results.data;
        try {
          setIsUploading(true);
          // Upload the processed data to the server
          await axios.post(`${API_URL}/upload`, parsedData);
          alert("File uploaded successfully.");
          fetchCustomLocations(); // Refresh the data in the table
          setFile(null); // Clear the file input after successful upload
          setIsFileSelected(false); // Reset file selection state
        } catch (error) {
          toast.error("Error uploading file,please add isCustom true:");
          console.error("the error from file upload", error);
        } finally {
          setIsUploading(false);
        }
      },
    });
  };

  // Apply filters
  const handleFilterChange = (selectedOptions, field) => {
    const updatedFilters = {
      ...filters,
      [field]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    };
    setFilters(updatedFilters);

    let filtered = customLocations;

    Object.keys(updatedFilters).forEach((filterKey) => {
      if (updatedFilters[filterKey].length > 0) {
        filtered = filtered.filter((loc) =>
          updatedFilters[filterKey].includes(loc[filterKey]),
        );
      }
    });

    setFilteredLocations(filtered);
  };

  return (
    <div className="swiggy-custom-location-table-container">
      <h3 className="swiggy-table-title">Custom Location Pricing</h3>

      {/* File upload section */}
      <div className="swiggy-file-upload-section">
        <label className="custom-file-label" htmlFor="file-upload">
          <FaUpload /> Choose CSV File
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="custom-file-input"
          id="file-upload"
        />
        {file && (
          <div>
            <p>Selected File: {file.name}</p>
            <button
              onClick={handleUpload}
              disabled={!isFileSelected || isUploading} // Disable until CSV is selected
              className="upload-btn"
            >
              {isUploading ? <ClipLoader size={20} /> : "Upload CSV"}
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="swiggy-loading">
          <FaSpinner className="swiggy-spinner" /> Loading custom pricing
          data...
        </div>
      ) : (
        <>
          {/* Filter Section */}
          <div className="custom-filter-section">
            <Select
              isMulti
              name="servicename"
              options={customLocations
                .map((loc) => loc.servicename)
                .filter((v, i, a) => a.indexOf(v) === i)
                .map((value) => ({ value, label: value }))}
              className="custom-filter-select"
              classNamePrefix="select"
              onChange={(selectedOptions) =>
                handleFilterChange(selectedOptions, "servicename")
              }
              placeholder="Filter by Service Name"
            />
            <Select
              isMulti
              name="category"
              options={customLocations
                .map((loc) => loc.category)
                .filter((v, i, a) => a.indexOf(v) === i)
                .map((value) => ({ value, label: value }))}
              className="custom-filter-select"
              classNamePrefix="select"
              onChange={(selectedOptions) =>
                handleFilterChange(selectedOptions, "category")
              }
              placeholder="Filter by Category"
            />
            <Select
              isMulti
              name="subcategory"
              options={customLocations
                .map((loc) => loc.subcategory)
                .filter((v, i, a) => a.indexOf(v) === i)
                .map((value) => ({ value, label: value }))}
              className="custom-filter-select"
              classNamePrefix="select"
              onChange={(selectedOptions) =>
                handleFilterChange(selectedOptions, "subcategory")
              }
              placeholder="Filter by Subcategory"
            />
            <Select
              isMulti
              name="state"
              options={customLocations
                .map((loc) => loc.state)
                .filter((v, i, a) => a.indexOf(v) === i)
                .map((value) => ({ value, label: value }))}
              className="custom-filter-select"
              classNamePrefix="select"
              onChange={(selectedOptions) =>
                handleFilterChange(selectedOptions, "state")
              }
              placeholder="Filter by State"
            />
            <Select
              isMulti
              name="district"
              options={customLocations
                .map((loc) => loc.district)
                .filter((v, i, a) => a.indexOf(v) === i)
                .map((value) => ({ value, label: value }))}
              className="custom-filter-select"
              classNamePrefix="select"
              onChange={(selectedOptions) =>
                handleFilterChange(selectedOptions, "district")
              }
              placeholder="Filter by District"
            />
            <Select
              isMulti
              name="pincode"
              options={customLocations
                .map((loc) => loc.pincode?.toString())
                .filter((v, i, a) => a.indexOf(v) === i)
                .map((value) => ({ value, label: value }))}
              className="custom-filter-select"
              classNamePrefix="select"
              onChange={(selectedOptions) =>
                handleFilterChange(selectedOptions, "pincode")
              }
              placeholder="Filter by Pincode"
            />
          </div>

          {/* Table Section */}
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
                  <th onClick={() => handleSort("servicename")}>
                    Service Name
                  </th>
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
        </>
      )}
    </div>
  );
};

export default CustomLocationTable;
