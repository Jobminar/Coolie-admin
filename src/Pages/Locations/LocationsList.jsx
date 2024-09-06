import React, { useState, useEffect, useRef } from "react";
import { FaTrashAlt, FaArrowUp } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./LocationList.css";

const LocationList = ({ group, tierName }) => {
  const [locations, setLocations] = useState([]);
  const [groupedLocations, setGroupedLocations] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const stripCardsRef = useRef(null);

  // Fetch locations from the API using the group as a query param
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://api.coolieno1.in/v1.0/core/locations",
          {
            params: { group: group }, // Send group as a query param
          },
        );

        // Log the response data from the API
        console.log("API Response Data:", response.data);

        if (response.data && Array.isArray(response.data)) {
          // Filter locations based on the active group and exclude those with a non-empty tierName
          const filteredLocations = response.data.filter(
            (location) => location.group === group && location.tierName === "",
          );

          // Log the filtered locations
          console.log("Filtered Locations:", filteredLocations);

          // Group locations by `location`
          setLocations(filteredLocations);
          groupLocationsByLocation(filteredLocations);
        } else {
          toast.error("Failed to load locations.");
        }
      } catch (error) {
        toast.error("Failed to fetch locations.");
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [group]);

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

  const handleDeleteLocation = (locationName) => {
    const updatedLocations = locations.filter(
      (location) => location.location !== locationName,
    );
    setLocations(updatedLocations);
    groupLocationsByLocation(updatedLocations);
    toast.success(`All locations named "${locationName}" removed.`);
  };

  const handleAddTier = async () => {
    // Check if a tier name is provided
    if (!tierName) {
      toast.error("Please enter a Tier Name before adding.");
      return;
    }

    // Collect all the location IDs with an empty `tierName`
    const locationIds = locations.map((location) => location._id);

    if (locationIds.length === 0) {
      toast.error("No locations available to update.");
      return;
    }

    try {
      // Make PUT request to update the tier name for all displayed locations
      const response = await axios.put(
        "https://api.coolieno1.in/v1.0/core/locations/update-tiername",
        {
          ids: locationIds, // Array of location IDs
          newTierName: tierName, // The new tier name
        },
      );

      // Log full response in success case
      console.log("Response:", response);
      console.log("Response Data:", response.data);

      toast.success("Tier name updated successfully!");
      // Optionally, refetch locations to reflect the updated tier names
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          locationIds.includes(location._id)
            ? { ...location, tierName }
            : location,
        ),
      );
    } catch (error) {
      // Log error response in case of failure
      if (error.response) {
        console.error("Error Response:", error.response);
        console.error("Error Data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }

      toast.error("Failed to update tier name.");
    }
  };

  const handleScrollToTop = () => {
    if (stripCardsRef.current) {
      stripCardsRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="location-list-container">
      {/* Display the strips of available locations */}
      <div className="locations-list-api">
        <h3>Available Locations in {group} Group</h3>
        <div className="strip-cards-scrollable" ref={stripCardsRef}>
          {Object.keys(groupedLocations).length > 0 ? (
            Object.keys(groupedLocations).map((locationName, index) => (
              <div className="location-strip-card" key={index}>
                <span>{`${locationName} (${groupedLocations[locationName].length} locations)`}</span>
                <FaTrashAlt
                  className="strip-delete-icon"
                  onClick={() => handleDeleteLocation(locationName)}
                />
              </div>
            ))
          ) : (
            <p>No locations available</p>
          )}
        </div>
      </div>

      {/* Sticky footer with Add Tier button and Scroll to Top button */}
      <div className="sticky-footer">
        <button className="add-tier-btn" onClick={handleAddTier}>
          Add Tier
        </button>
        <button
          className={`scroll-top-btn ${showScrollTop ? "active" : ""}`}
          onClick={handleScrollToTop}
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default LocationList;
