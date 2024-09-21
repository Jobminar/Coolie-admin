import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const LocationsTable = ({ locations, handleDelete }) => {
  return (
    <div className="district-records-table">
      <table className="tiger-locations-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Pincode</th>
            <th>District</th>
            <th>State</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Service Name</th>
            <th>Price</th>
            <th>Offer Price</th>
            <th>Min</th>
            <th>Max</th>
            <th>Metric</th>
            <th>Credit Eligibility</th>
            <th>Tax Percentage</th>
            <th>Misc Fee</th>
            <th>Platform Commission</th>
            <th>Is Cash Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location._id}>
              <td>{location.location}</td>
              <td>{location.pincode}</td>
              <td>{location.district}</td>
              <td>{location.state}</td>
              <td>{location.category}</td>
              <td>{location.subcategory}</td>
              <td>{location.servicename}</td>
              <td>{JSON.stringify(location.price)}</td>
              <td>{JSON.stringify(location.offerPrice)}</td>
              <td>{location.min || "N/A"}</td>
              <td>{location.max || "N/A"}</td>
              <td>{location.metric || "N/A"}</td>
              <td>{location.creditEligibility ? "Yes" : "No"}</td>
              <td>{location.taxPercentage || "N/A"}</td>
              <td>{location.miscFee || "N/A"}</td>
              <td>{location.platformCommission || "N/A"}</td>
              <td>{location.isCash ? "Yes" : "No"}</td>
              <td>
                <button className="tiger-edit-btn">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="tiger-delete-btn"
                  onClick={() => handleDelete(location._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Prop validation
LocationsTable.propTypes = {
  locations: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default LocationsTable;
