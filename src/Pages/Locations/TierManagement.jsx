import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaArrowUp, FaSearch } from "react-icons/fa";
import { toast } from "react-hot-toast";
import "./TierManagement.css"; // Ensure your CSS is updated

const TierManagement = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [tierNames, setTierNames] = useState([]);
  const [selectedTier, setSelectedTier] = useState("All");
  const [pincodeFilter, setPincodeFilter] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const tableRef = useRef(null);

  // Fetch locations data from the API
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

  const handleViewMore = (locationId) => {
    // Logic for handling "View More" action, such as displaying details in a modal or navigating to a detailed page
    toast.success(`Viewing more details for location ID: ${locationId}`);
  };

  return (
    <div className="Tier-management-container">
      <h2>Tier Management</h2>

      {/* Filters Section */}
      <div className="Tier-filters-section">
        <div className="Tier-filter">
          <label htmlFor="tierName">Filter by Tier Name:</label>
          <select
            id="tierName"
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

      {/* Location Cards */}
      <div className="strip-cards-container" ref={tableRef}>
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <div className="location-strip-card" key={location._id}>
              <div className="location-info">
                <p>{`${location.pincode} / ${location.location}, ${location.state}, ${location.pincode}`}</p>
              </div>
              <button
                className="Tier-view-more-btn"
                onClick={() => handleViewMore(location._id)}
              >
                View More
              </button>
            </div>
          ))
        ) : (
          <p>No locations found</p>
        )}
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
