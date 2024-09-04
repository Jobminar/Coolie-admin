import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import icons for delete and edit

const LocationsList = () => {
  const [locations, setLocations] = useState([]);

  // Fetch locations from the API when the component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://api.coolieno1.in/v1.0/core/locations",
        );
        console.log("Fetched locations:", response.data); // Log full response to see structure
        if (response.data && Array.isArray(response.data)) {
          setLocations(response.data); // Updated this line
        } else {
          console.error("Locations data is not an array or undefined");
          toast.error("Failed to load locations.");
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        toast.error("Failed to fetch locations.");
      }
    };

    fetchLocations();
  }, []);

  const handleDelete = (id) => {
    // Function to handle delete logic (you can integrate an API call here)
    setLocations(locations.filter((location) => location._id !== id));
    toast.success("Location deleted successfully.");
  };

  const handleEdit = (id, field) => {
    // Function to handle edit logic for each field (open a modal or input field for editing)
    toast.success(`Edit ${field} for location with ID: ${id}`);
  };

  if (!locations || locations.length === 0) {
    return <p>No locations available</p>;
  }

  return (
    <div className="locations-container">
      {" "}
      {/* Added border box container */}
      <h3>Locations List</h3>
      <div className="table-wrapper">
        <table className="locations-table">
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
              <th>Material</th>
              <th>Warranty</th>
              <th>Installation Time</th>
              <th>Min Units</th>
              <th>Max Units</th>
              <th>Credit Eligibility</th>
              <th>Tax %</th>
              <th>Misc Fee</th>
              <th>Platform Commission</th>
              <th>Cash Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location._id}>
                <td>
                  {location.location}
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEdit(location._id, "location")}
                  />
                </td>
                <td>
                  {location.pincode}
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEdit(location._id, "pincode")}
                  />
                </td>
                <td>
                  {location.district}
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEdit(location._id, "district")}
                  />
                </td>
                <td>
                  {location.state}
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEdit(location._id, "state")}
                  />
                </td>
                <td>{location.category}</td>
                <td>{location.subcategory}</td>
                <td>{location.servicename}</td>
                <td>{location.price}</td>
                <td>{location.variants?.material || "N/A"}</td>
                <td>{location.variants?.warranty || "N/A"}</td>
                <td>{location.variants?.installationTime || "N/A"}</td>
                <td>{location.min}</td>
                <td>{location.max}</td>
                <td>{location.creditEligibility ? "Yes" : "No"}</td>
                <td>{location.taxPercentage}%</td>
                <td>{location.miscFee}</td>
                <td>{location.platformCommission}%</td>
                <td>{location.isCash ? "Yes" : "No"}</td>
                <td>
                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleDelete(location._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationsList;
