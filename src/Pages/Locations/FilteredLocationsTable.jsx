import React from "react";
import "./LocationList.css"; // Assuming this contains styles for the table

const FilteredLocationsTable = ({ locationFilter }) => {
  // locationFilter will now be an array of locations
  const filteredLocations = locationFilter || [];

  return (
    <div className="filtered-table-card">
      <div className="filtered-table-info">
        <div className="filtered-record-count">
          <h4>
            Total Records for {filteredLocations[0]?.location || "N/A"}:{" "}
            {filteredLocations.length}
          </h4>
        </div>

        <div className="filtered-table-wrapper">
          <table className="filtered-locations-table">
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
              </tr>
            </thead>
            <tbody>
              {filteredLocations.map((location, index) => (
                <tr key={index}>
                  <td>{location.location || "N/A"}</td>
                  <td>{location.pincode || "N/A"}</td>
                  <td>{location.district || "N/A"}</td>
                  <td>{location.state || "N/A"}</td>
                  <td>{location.category || "N/A"}</td>
                  <td>{location.subcategory || "N/A"}</td>
                  <td>{location.servicename || "N/A"}</td>
                  <td>{location.price ? location.price.toString() : "N/A"}</td>
                  <td>{location.min || "N/A"}</td>
                  <td>{location.max || "N/A"}</td>
                  <td>{location.creditEligibility ? "Yes" : "No"}</td>
                  <td>
                    {location.taxPercentage
                      ? `${location.taxPercentage}%`
                      : "N/A"}
                  </td>
                  <td>{location.miscFee || "N/A"}</td>
                  <td>
                    {location.platformCommission
                      ? `${location.platformCommission}%`
                      : "N/A"}
                  </td>
                  <td>{location.isCash ? "Yes" : "No"}</td>
                  <td>{location.group || "N/A"}</td>
                  <td>{location.tierName || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FilteredLocationsTable;
