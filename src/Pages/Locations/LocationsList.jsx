import React, { useState, useEffect, useRef } from "react";
import { FaTrashAlt, FaArrowUp } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import FilteredLocationsTable from "./FilteredLocationsTable"; // Import the table component
import "./LocationList.css";

const LocationList = ({ group, tierName, reload }) => {
  const [locations, setLocations] = useState([]);
  const [groupedLocations, setGroupedLocations] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null); // Track selected location
  const [showScrollTop, setShowScrollTop] = useState(false);
  const stripCardsRef = useRef(null);

  // Fetch locations from the API using the group as a query param
  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "https://api.coolieno1.in/v1.0/core/locations",
        {
          params: { group: group }, // Send group as a query param
        },
      );

      if (response.data && Array.isArray(response.data)) {
        const filteredLocations = response.data.filter(
          (location) => location.group === group && location.tierName === "",
        );
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
    if (!tierName) {
      toast.error("Please enter a Tier Name before adding.");
      return;
    }

    const locationIds = locations.map((location) => location._id);

    if (locationIds.length === 0) {
      toast.error("No locations available to update.");
      return;
    }

    try {
      await axios.put(
        "https://api.coolieno1.in/v1.0/core/locations/update-tiername",
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
              {Object.keys(groupedLocations).length > 0 ? (
                Object.keys(groupedLocations).map((locationName, index) => (
                  <div
                    className="location-strip-card"
                    key={index}
                    onClick={() => handleSelectLocation(locationName)}
                  >
                    <span>{`${locationName} (${groupedLocations[locationName].length} locations)`}</span>
                    <FaTrashAlt
                      className="strip-delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteLocation(locationName);
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
