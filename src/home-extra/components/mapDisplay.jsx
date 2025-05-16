import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapDisplay = () => {
  return (
    <MapContainer
      center={[-23.5505, -46.6333]} // São Paulo
      zoom={12}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=y8L2wYZ09E05loY33U7m"
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors'
      />
    </MapContainer>
  );
};

export default MapDisplay;

