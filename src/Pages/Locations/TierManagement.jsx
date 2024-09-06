import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaArrowUp, FaSearch } from "react-icons/fa";
import "./TierManagement.css"; // Make sure you have the correct styles

const TierManagement = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [tierNames, setTierNames] = useState([]);
  const [selectedTier, setSelectedTier] = useState("All");
  const [pincodeFilter, setPincodeFilter] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const tableRef = useRef(null);

  // Fetch locations data from the API and filter out empty tier names
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://api.coolieno1.in/v1.0/core/locations",
        );
        const locationsData = response.data;

        // Extract unique tier names, excluding empty ones
        const uniqueTierNames = [
          ...new Set(locationsData.map((loc) => loc.tierName).filter(Boolean)),
        ];
        setTierNames(["All", ...uniqueTierNames]); // Add 'All' option to dropdown
        setLocations(locationsData);
        setFilteredLocations(locationsData); // Set initial filtered locations
      } catch (error) {
        toast.error("Failed to fetch locations data.");
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Handle filtering when the tier name or pincode is changed
  useEffect(() => {
    let filteredData = locations;

    if (selectedTier !== "All") {
      filteredData = filteredData.filter(
        (loc) => loc.tierName === selectedTier,
      );
    }

    if (pincodeFilter) {
      filteredData = filteredData.filter((loc) =>
        loc.pincode.includes(pincodeFilter),
      );
    }

    setFilteredLocations(filteredData);
  }, [selectedTier, pincodeFilter, locations]);

  // Handle scroll event for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current && tableRef.current.scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    if (tableRef.current) {
      tableRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (tableRef.current) {
        tableRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Handle scroll-to-top button click
  const handleScrollToTop = () => {
    if (tableRef.current) {
      tableRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="Tier-management-container">
      <h2>Tier Management</h2>

      {/* Filters Section */}
      <div className="Tier-filters-section">
        <div className="Tier-filter">
          <label htmlFor="tierName-select">Filter by Tier Name:</label>
          <select
            id="tierName-select"
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
          >
            {tierNames.map((tier, index) => (
              <option key={index} value={tier}>
                {tier}
              </option>
            ))}
          </select>
        </div>

        <div className="Tier-filter pincode-filter-wrapper">
          <label htmlFor="pincode">Search by Pincode:</label>
          <div className="pincode-input-container">
            <FaSearch className="pincode-search-icon" />
            <input
              id="pincode"
              type="text"
              value={pincodeFilter}
              onChange={(e) => setPincodeFilter(e.target.value)}
              placeholder="Enter Pincode"
            />
          </div>
        </div>
      </div>

      {/* Locations Table */}
      <div className="Tier-table-container" ref={tableRef}>
        <table className="Tier-locations-table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Pincode</th>
              <th>District</th>
              <th>State</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Service</th>
              <th>Price</th>
              <th>Min Units</th>
              <th>Max Units</th>
              <th>Credit Eligibility</th>
              <th>Tax %</th>
              <th>Misc Fee</th>
              <th>Platform Commission</th>
              <th>Cash Payment</th>
              <th>Group</th>
              <th>Tier Name</th>
              <th className="Tier-actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location, index) => (
                <tr key={index}>
                  <td>{location.location || "N/A"}</td>
                  <td>{location.pincode || "N/A"}</td>
                  <td>{location.district || "N/A"}</td>
                  <td>{location.state || "N/A"}</td>
                  <td>{location.category.join(", ") || "N/A"}</td>
                  <td>{location.subcategory.join(", ") || "N/A"}</td>
                  <td>{location.servicename.join(", ") || "N/A"}</td>
                  <td>
                    {location.price ? JSON.stringify(location.price) : "N/A"}
                  </td>
                  <td>{location.min || "N/A"}</td>
                  <td>{location.max || "N/A"}</td>
                  <td>{location.creditEligibility ? "Yes" : "No"}</td>
                  <td>{location.taxPercentage || "0"}%</td>
                  <td>{location.miscFee || "N/A"}</td>
                  <td>{location.platformCommission || "0"}%</td>
                  <td>{location.isCash ? "Yes" : "No"}</td>
                  <td>{location.group || "N/A"}</td>
                  <td>{location.tierName || "N/A"}</td>
                  <td className="Tier-actions-column">
                    <button className="Tier-know-more-btn">Know More</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="18">No locations found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="Tier-scroll-top-btn" onClick={handleScrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default TierManagement;
