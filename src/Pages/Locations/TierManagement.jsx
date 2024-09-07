import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaArrowUp } from "react-icons/fa";
import "./TierManagement.css"; // Ensure this CSS file is correctly linked

const TierManagement = ({ showTierDetails }) => {
  const [locations, setLocations] = useState([]);
  const [groupedTiers, setGroupedTiers] = useState([]);
  const [loading, setLoading] = useState(true); // State to show the loader
  const [showScrollTop, setShowScrollTop] = useState(false); // State to manage scroll-to-top button
  const tableRef = useRef(null); // To manage scrolling within the table

  // Fetch locations data from the API and group them by tier name
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true); // Start loader before API call
        const response = await axios.get(
          "https://api.coolieno1.in/v1.0/core/locations",
        );
        const locationsData = response.data;

        // Grouping records by tier name
        const grouped = groupByTierName(locationsData);
        setGroupedTiers(grouped); // Set grouped tier data
        setLoading(false); // End loader after successful API call
      } catch (error) {
        toast.error("Failed to fetch locations data."); // Show error message on failure
        console.error("Error fetching locations:", error);
        setLoading(false); // End loader on error
      }
    };

    fetchLocations();
  }, []); // Empty dependency array to ensure it only runs once on component mount

  // Function to group data by tier name and count unique pincodes
  const groupByTierName = (locationsData) => {
    const tierMap = {};

    locationsData.forEach((location) => {
      const {
        tierName,
        location: locName,
        state,
        district,
        pincode,
        group,
        _id, // Capture location's unique ID
      } = location;

      // Initialize each tier entry in the map if it doesn't exist
      if (!tierMap[tierName]) {
        tierMap[tierName] = {
          tierName: tierName || "N/A", // Handle missing tier names
          locations: [], // List of locations for the tier
          uniquePincodes: new Set(), // Ensure unique pincodes
          defaultGroupPincodes: new Set(), // Set for default group pincodes
          customGroupPincodes: new Set(), // Set for custom group pincodes
          state: state || "N/A", // Assume all records in the same tier have the same state and district
          district: district || "N/A",
          locationIds: [], // Store unique location record IDs
        };
      }

      // Add location details to the array of locations under the tier
      tierMap[tierName].locations.push(locName);
      tierMap[tierName].locationIds.push(_id); // Store location IDs for each tier

      // Add pincodes to unique, default, or custom group based on `group`
      tierMap[tierName].uniquePincodes.add(pincode);
      if (group === "default") {
        tierMap[tierName].defaultGroupPincodes.add(pincode);
      } else if (group === "custom") {
        tierMap[tierName].customGroupPincodes.add(pincode);
      }
    });

    // Convert sets back to arrays and calculate total pincodes
    return Object.values(tierMap).map((tier) => ({
      ...tier,
      locations: Array.from(new Set(tier.locations)), // Ensure unique locations
      defaultGroupPincodes: Array.from(tier.defaultGroupPincodes), // Convert Set to Array for default pincodes
      customGroupPincodes: Array.from(tier.customGroupPincodes), // Convert Set to Array for custom pincodes
      totalPincodes: tier.uniquePincodes.size, // Count the number of unique pincodes
    }));
  };

  // Handle scroll-to-top button click
  const handleScrollToTop = () => {
    if (tableRef.current) {
      tableRef.current.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
    }
  };

  return (
    <div className="tier-management-container">
      <h2>Tier Management</h2>

      {/* Show loading animation while data is being fetched */}
      {loading ? (
        <div className="loading-container">
          {/* Bootstrap progress bar for loading */}
          <div className="progress" style={{ height: "30px" }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: "100%" }}
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              Arranging all your data, please hold on, this won't take long!
            </div>
          </div>
        </div>
      ) : (
        <div className="tier-table-container" ref={tableRef}>
          <table className="tier-locations-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Tier Name</th>
                <th>State</th>
                <th>District</th>
                <th>Total No. of Pincodes</th>
                <th>Locations</th>
                <th>Default Pincodes</th>
                <th>Custom Pincodes</th>
                <th className="tier-actions-column">Know More</th>
              </tr>
            </thead>
            <tbody>
              {groupedTiers.length > 0 ? (
                groupedTiers.map((tier, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{tier.tierName || "N/A"}</td>
                    <td>{tier.state}</td>
                    <td>{tier.district}</td>
                    <td>{tier.totalPincodes}</td>
                    <td>{tier.locations.join(", ") || "N/A"}</td>
                    <td>
                      {tier.defaultGroupPincodes.length > 0
                        ? tier.defaultGroupPincodes.join(", ")
                        : "N/A"}
                    </td>
                    <td>
                      {tier.customGroupPincodes.length > 0
                        ? tier.customGroupPincodes.join(", ")
                        : "N/A"}
                    </td>
                    <td className="tier-actions-column">
                      {/* When clicked, pass the tier data to the parent component */}
                      <button
                        className="tier-know-more-btn"
                        onClick={() => showTierDetails(tier)}
                      >
                        Click here
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No data available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Scroll to Top Button */}
          {showScrollTop && (
            <button className="tier-scroll-top-btn" onClick={handleScrollToTop}>
              <FaArrowUp />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TierManagement;
