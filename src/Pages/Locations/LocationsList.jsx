import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import icons for delete and edit

const LocationsList = ({ group }) => {
  // Accept group as a prop
  const [locations, setLocations] = useState([]);

  // Fetch locations from the API when the component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://api.coolieno1.in/v1.0/core/locations",
        );
        console.log("the response from api get locations", response.data);
        if (response.data && Array.isArray(response.data)) {
          // Filter the locations based on the passed group value
          const filteredLocations = response.data.filter(
            (location) => location.group === group,
          );
          setLocations(filteredLocations);
        } else {
          toast.error("Failed to load locations.");
        }
      } catch (error) {
        toast.error("Failed to fetch locations.");
      }
    };

    fetchLocations();
  }, [group]); // Re-fetch when group changes

  const handleDelete = (id) => {
    setLocations(locations.filter((location) => location._id !== id));
    toast.success("Location deleted successfully.");
  };

  const handleEdit = (id, field) => {
    toast.success(`Edit ${field} for location with ID: ${id}`);
  };

  if (!locations || locations.length === 0) {
    return <p>No locations available</p>;
  }

  const formatPrice = (price) => {
    if (typeof price === "string") {
      try {
        const parsedPrice = JSON.parse(price);
        if (typeof parsedPrice === "object") {
          return Object.entries(parsedPrice)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ");
        }
        return price;
      } catch (error) {
        return price; // If parsing fails, return as-is
      }
    } else if (typeof price === "object") {
      return Object.entries(price)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
    }
    return price;
  };

  return (
    <div className="table-info">
      {/* Display the number of records */}
      <div className="record-count">
        <h4>
          Total Records for {group}: {locations.length}
        </h4>
      </div>

      {/* Table with records */}
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
              <th>Min Units</th>
              <th>Max Units</th>
              <th>Credit Eligibility</th>
              <th>Tax %</th>
              <th>Misc Fee</th>
              <th>Platform Commission</th>
              <th>Cash Payment</th>
              <th>Group</th> {/* Add Group column */}
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
                <td>{formatPrice(location.price)}</td> {/* Format the price */}
                <td>{location.min}</td>
                <td>{location.max}</td>
                <td>{location.creditEligibility ? "Yes" : "No"}</td>
                <td>{location.taxPercentage}%</td>
                <td>{location.miscFee}</td>
                <td>{location.platformCommission}%</td>
                <td>{location.isCash ? "Yes" : "No"}</td>
                <td>{location.group}</td> {/* Display the group value */}
                <td>
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEdit(location._id, "location")}
                  />
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
