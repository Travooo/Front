import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapController({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 15, {
        duration: 1.5
      });
    }
  }, [center, zoom, map]);
  
  return null;
}

const FORTALEZA_CENTER = [-3.7319, -38.5267];

const MapDisplay = ({ selectedLocationId }) => {
  const [mapCenter, setMapCenter] = useState(FORTALEZA_CENTER);
  const [mapZoom, setMapZoom] = useState(13);

  useEffect(() => {
    if (selectedLocationId) {
      console.log("Local selecionado:", selectedLocationId);
    }
  }, [selectedLocationId]);

  return (
    <div className="w-full h-[633px] rounded-lg overflow-hidden shadow-[5px_4px_4px_rgba(0,0,0,0.25)]">
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Os marcadores foram removidos daqui */}
        
        <MapController center={mapCenter} zoom={mapZoom} />
      </MapContainer>
    </div>
  );
};

export default MapDisplay;