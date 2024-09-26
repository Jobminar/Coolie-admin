import React, { useState, useEffect, useRef } from "react";
import { FaTrashAlt, FaArrowUp } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import FilteredLocationsTable from "./FilteredLocationsTable"; // Import the table component
import "./LocationList.css";
import { deleteLocation } from "./api/Locations-api"; // Import the deleteLocation function

const LocationList = ({ group, tierName, reload, searchPincode }) => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]); // Track filtered locations based on pincode
  const [groupedLocations, setGroupedLocations] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null); // Track selected location
  const [showScrollTop, setShowScrollTop] = useState(false);
  const stripCardsRef = useRef(null);

  // Fetch locations from the API using the group as a query param
  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core/locations",
        {
          params: { group: group }, // Send group as a query param
        },
      );

      if (response.data && Array.isArray(response.data)) {
        const filteredLocations = response.data.filter(
          (location) => location.group === group && location.tierName === "",
        );
        setLocations(filteredLocations);
        setFilteredLocations(filteredLocations); // Initialize filtered locations
        groupLocationsByLocation(filteredLocations);
      } else {
        toast.error("Failed to load locations.");
      }
    } catch (error) {
      toast.error("Failed to fetch locations.");
      console.error("Error fetching locations:", error);
    }
  };

  // Filter locations by pincode whenever `searchPincode` changes
  useEffect(() => {
    if (searchPincode) {
      const filtered = locations.filter((location) =>
        location.pincode.includes(searchPincode),
      );
      setFilteredLocations(filtered); // Update filtered locations based on search
      groupLocationsByLocation(filtered); // Update grouping with filtered locations
    } else {
      setFilteredLocations(locations); // If no search term, show all locations
      groupLocationsByLocation(locations); // Update grouping with all locations
    }
  }, [searchPincode, locations]);

  // Refetch locations when group changes or reload prop changes
  useEffect(() => {
    fetchLocations();
  }, [group, reload]); // Trigger re-fetch when group or reload changes

  // Group locations by the `location` property
  const groupLocationsByLocation = (locations) => {
    const grouped = locations.reduce((acc, location) => {
      if (!acc[location.location]) {
        acc[location.location] = [];
      }
      acc[location.location].push(location);
      return acc;
    }, {});
    setGroupedLocations(grouped);
  };

  // Handle location click
  const handleSelectLocation = (locationName) => {
    setSelectedLocation(groupedLocations[locationName]); // Set the selected location
  };

  // Handle delete location
  const handleDeleteLocation = async (locationId, locationName) => {
    try {
      await deleteLocation(locationId); // Call the API to delete the location from backend
      const updatedLocations = locations.filter(
        (location) => location._id !== locationId,
      );
      setLocations(updatedLocations);
      setFilteredLocations(updatedLocations); // Update filtered locations after deletion
      groupLocationsByLocation(updatedLocations); // Update grouping
      toast.success(`Location "${locationName}" removed successfully.`);
    } catch (error) {
      toast.error(`Failed to delete location: ${error.message}`);
    }
  };

  // Handle scroll event for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (stripCardsRef.current && stripCardsRef.current.scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    if (stripCardsRef.current) {
      stripCardsRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (stripCardsRef.current) {
        stripCardsRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Handle adding the tier
  const handleAddTier = async () => {
    if (!tierName) {
      toast.error("Please enter a Tier Name before adding.");
      return;
    }

    const locationIds = filteredLocations.map((location) => location._id); // Use filtered locations

    if (locationIds.length === 0) {
      toast.error("No locations available to update.");
      return;
    }

    try {
      await axios.put(
        "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/core/locations/update-tiername",
        {
          ids: locationIds,
          newTierName: tierName,
        },
      );
      toast.success("Tier name updated successfully!");

      // Refetch the locations after successful update
      await fetchLocations();
    } catch (error) {
      toast.error("Failed to update tier name.");
      console.error("Error:", error);
    }
  };

  // Scroll to top functionality
  const handleScrollToTop = () => {
    if (stripCardsRef.current) {
      stripCardsRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="location-list-container">
      {!selectedLocation ? (
        <>
          <div className="locations-list-api">
            <h3>Available Locations in {group} Group</h3>
            <div className="strip-cards-scrollable" ref={stripCardsRef}>
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location, index) => (
                  <div
                    className="location-strip-card"
                    key={index}
                    onClick={() => handleSelectLocation(location.location)}
                  >
                    <span>{`${location.location} (${location.pincode})`}</span>
                    <FaTrashAlt
                      className="strip-delete-icon"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering click on the location card
                        handleDeleteLocation(location._id, location.location);
                      }}
                    />
                  </div>
                ))
              ) : (
                <p>No locations available</p>
              )}
            </div>
          </div>

          <div className="sticky-footer">
            <button className="add-tier-btn" onClick={handleAddTier}>
              Add Tier
            </button>
            {showScrollTop && (
              <button
                className={`scroll-top-btn ${showScrollTop ? "active" : ""}`}
                onClick={handleScrollToTop}
              >
                <FaArrowUp />
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <FilteredLocationsTable locationFilter={selectedLocation} />
          <button
            onClick={() => setSelectedLocation(null)}
            className="back-to-loc"
          >
            Back to Location List
          </button>
        </>
      )}
    </div>
  );
};

export default LocationList;
