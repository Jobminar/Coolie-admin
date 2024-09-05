import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./LocationList.css"; // Import icons for delete and edit

const LocationsList = ({ group, tierName }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]); // Track selected locations

  // Fetch locations from the API when the component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://api.coolieno1.in/v1.0/core/locations",
        );
        console.log("the response from api get locations", response.data);
        if (response.data && Array.isArray(response.data)) {
          // Filter the locations based on the passed group and tierName
          const filteredLocations = response.data.filter(
            (location) => location.group === group,
          );
          setLocations(filteredLocations);

          // Set all location IDs as selected by default
          const allLocationIds = filteredLocations.map(
            (location) => location._id,
          );
          setSelectedLocations(allLocationIds);
        } else {
          toast.error("Failed to load locations.");
        }
      } catch (error) {
        toast.error("Failed to fetch locations.");
      }
    };

    fetchLocations();
  }, [group]); // Re-fetch when group or tierName changes

  const handleDelete = (id) => {
    setLocations(locations.filter((location) => location._id !== id));
    toast.success("Location deleted successfully.");
  };

  const handleEdit = (id, field) => {
    toast.success(`Edit ${field} for location with ID: ${id}`);
  };

  const handleLocationSelect = (id) => {
    if (selectedLocations.includes(id)) {
      setSelectedLocations(
        selectedLocations.filter((locationId) => locationId !== id),
      );
    } else {
      setSelectedLocations([...selectedLocations, id]);
    }
  };

  const handleAddTier = async () => {
    if (!tierName) {
      toast.error("Please enter a tier name.");
      return;
    }
    if (selectedLocations.length === 0) {
      toast.error("Please select at least one location.");
      return;
    }

    const payload = {
      tierName,
      locationIds: selectedLocations,
    };

    try {
      await axios.post("https://api.coolieno1.in/v1.0/core/tier", payload);
      toast.success("Tier added successfully.");
      setSelectedLocations([]); // Reset selected locations after saving
    } catch (error) {
      console.error("Error adding tier:", error);
      toast.error("Failed to add tier.");
    }
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
    <div className="table-card">
      <div className="table-info">
        <div className="record-count">
          <h4>
            Total Records for {group} and {tierName}: {locations.length}
          </h4>
        </div>

        <div className="table-wrapper">
          <table className="locations-table">
            <thead>
              <tr>
                <th>Select</th> {/* Add select column */}
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(location._id)} // Checked by default
                      onChange={() => handleLocationSelect(location._id)}
                    />
                  </td>
                  <td>{location.location}</td>
                  <td>{location.pincode}</td>
                  <td>{location.district}</td>
                  <td>{location.state}</td>
                  <td>{location.category}</td>
                  <td>{location.subcategory}</td>
                  <td>{location.servicename}</td>
                  <td>{formatPrice(location.price)}</td>
                  <td>{location.min}</td>
                  <td>{location.max}</td>
                  <td>{location.creditEligibility ? "Yes" : "No"}</td>
                  <td>{location.taxPercentage}%</td>
                  <td>{location.miscFee}</td>
                  <td>{location.platformCommission}%</td>
                  <td>{location.isCash ? "Yes" : "No"}</td>
                  <td>{location.group}</td>
                  <td>{location.tierName}</td>
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

        {/* Add Tier Button */}
      </div>
      {selectedLocations.length > 0 && (
        <button className="add-tier-btn" onClick={handleAddTier}>
          Add Tier
        </button>
      )}
    </div>
  );
};

export default LocationsList;
