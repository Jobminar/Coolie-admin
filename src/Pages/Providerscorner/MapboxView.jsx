import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import logo from "../../assets/images/logo.png"; // Ensure you have the logo.png file in the correct path

// Add your Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiY29vbGllbm8xLWFkbWluIiwiYSI6ImNsdWZjZGR1ZzBtZHcybnJvaHBiYTd2NzMifQ.TQ6FrqUIUUWv7J7n75A3tQ";

const MapboxView = ({ providers }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          "https://api.coolieno1.in/v1.0/providers/cordinates",
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCoordinates(data);
      } catch (error) {
        console.error("Failed to fetch coordinates:", error);
      }
    };

    fetchCoordinates();
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [78.491684, 17.38714], // Default starting position [lng, lat]
        zoom: 10, // Default starting zoom
      });
    }

    const map = mapRef.current;

    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add markers to the map based on provider details and their coordinates
    if (providers && coordinates.length > 0) {
      providers.forEach((provider) => {
        const coord = coordinates.find(
          (coord) => coord.userId === provider.providerId,
        );

        if (coord) {
          const popupContent = `
            <div>
              <h3>${provider.providerName}</h3>
              <p><strong>Phone:</strong> ${provider.phone}</p>
              <p><strong>Location:</strong> ${provider.address}</p>
              <p><strong>Pincode:</strong> ${provider.pincode}</p>
              <p><strong>Radius:</strong> ${provider.radius}</p>
              <p><strong>Status:</strong> ${
                provider.isVerified ? "Verified" : "Not Verified"
              }</p>
            </div>
          `;

          // Create a custom marker element
          const el = document.createElement("div");
          el.className = "custom-marker";
          el.style.backgroundImage = `url(${logo})`;
          el.style.width = "32px";
          el.style.height = "32px";
          el.style.backgroundSize = "cover";

          const marker = new mapboxgl.Marker(el)
            .setLngLat([coord.longitude, coord.latitude])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent)) // Add popups with HTML content
            .addTo(map);

          markersRef.current.push(marker);
        }
      });
    }

    return () => {
      // Remove the map instance on cleanup
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [providers, coordinates]);

  return (
    <div
      className="mapContainer"
      ref={mapContainerRef}
      style={{ width: "100%", height: "600px" }}
    />
  );
};

export default MapboxView;
