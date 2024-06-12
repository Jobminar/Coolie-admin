import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

// Add your Mapbox access token
mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

const MapboxView = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-122.4194, 37.7749], // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    return () => map.remove();
  }, []);

  return <div className="mapContainer" ref={mapContainerRef} />;
};

export default MapboxView;
