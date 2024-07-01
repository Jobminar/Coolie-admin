import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import logo from "../../assets/images/logo.png.png"; // Ensure you have the logo.png file in the correct path

// Add your Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiY29vbGllbm8xLWFkbWluIiwiYSI6ImNsdWZjZGR1ZzBtZHcybnJvaHBiYTd2NzMifQ.TQ6FrqUIUUWv7J7n75A3tQ";

const MapboxView = ({ providers, selectedCategory }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [78.491684, 17.38714], // starting position [lng, lat] for Hyderabad
        zoom: 10, // starting zoom
      });
    }

    const map = mapRef.current;

    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add markers to the map
    if (providers && selectedCategory) {
      providers.forEach((provider) => {
        if (
          provider.workDetails.some(
            (work) => work.category === selectedCategory,
          )
        ) {
          const popupContent = `
            <div>
              <h3>${provider.name}</h3>
              <p><strong>Email:</strong> ${provider.email}</p>
              <p><strong>Phone:</strong> ${provider.phone}</p>
              <p><strong>Location:</strong> ${provider.location.address}</p>
              <p><strong>Join Date:</strong> ${provider.joinDate}</p>
              <p><strong>Package:</strong> ${provider.package}</p>
              <p><strong>Category:</strong> ${selectedCategory}</p>
              <p><strong>Status:</strong> ${provider.status}</p>
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
            .setLngLat([
              provider.location.longitude,
              provider.location.latitude,
            ])
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
  }, [providers, selectedCategory]);

  return (
    <div
      className="mapContainer"
      ref={mapContainerRef}
      style={{ width: "100%", height: "600px" }}
    />
  );
};

export default MapboxView;
