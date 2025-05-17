import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap,  Marker, Popup } from "react-leaflet";
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

const FORTALEZA_CENTER = [-3.7319, -38.5267]; //definem posição inicial do mapa 
/*
const locais = [
  {
    id: 1,
    nome: "Praia de Iracema",
    coordenadas: [-3.7169, -38.5000],
  },
  {
    id: 2,
    nome: "Dragão do Mar",
    coordenadas: [-3.7223, -38.5215],
  },
];
*/


const MapDisplay = ({ selectedLocationId }) => {
  const [mapCenter, setMapCenter] = useState(FORTALEZA_CENTER);
  const [mapZoom, setMapZoom] = useState(13);

  useEffect(() => { //mostra no console se o local selecionado mudar
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
        {/* 
        {locais.map((local) => (
        <Marker key={local.id} position={local.coordenadas}>
          <Popup>{local.nome}</Popup>
        </Marker>
      ))}
        */}

        
        <MapController center={mapCenter} zoom={mapZoom} />
      </MapContainer>
    </div>
  );
};

export default MapDisplay;