import React, { useEffect, useRef } from "react";

const MapDisplay = ({ selectedLocationId, locations = [] }) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);

  // Load the Google Maps script
  const loadGoogleMapsScript = () => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve(window.google);
        return;
      }

      const existingScript = document.getElementById("googleMaps");
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(window.google));
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSykbGay7zmALzroNljcCsH5kCF-V2-Ek-9p`;
      script.id = "googleMaps";
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.google);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const initMap = () => {
      const centerFortaleza = { lat: -3.71722, lng: -38.54306 };
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: centerFortaleza,
        zoom: 13,
      });

      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      markersRef.current = locations.map((location) => {
        const position = {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lng),
        };
        const marker = new window.google.maps.Marker({
          position,
          map: googleMapRef.current,
          title: location.nome,
        });
        return marker;
      });
    };

    loadGoogleMapsScript()
      .then(() => initMap())
      .catch((err) => console.error("Failed to load Google Maps", err));
  }, [locations]);

  // Update on selected location change
  useEffect(() => {
    if (!googleMapRef.current || !selectedLocationId || locations.length === 0) return;

    const selectedLocation = locations.find((loc) => loc.id === selectedLocationId);
    if (!selectedLocation) return;

    const position = {
      lat: parseFloat(selectedLocation.lat),
      lng: parseFloat(selectedLocation.lng),
    };

    googleMapRef.current.panTo(position);
    googleMapRef.current.setZoom(15);

    const marker = markersRef.current.find(
      (marker) => marker.getTitle() === selectedLocation.nome
    );

    if (marker) {
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<strong>${selectedLocation.nome}</strong><br/>${selectedLocation.endereco || ""}`,
      });
      infoWindow.open(googleMapRef.current, marker);
    }
  }, [selectedLocationId, locations]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[633px] rounded-lg overflow-hidden shadow-[5px_4px_4px_rgba(0,0,0,0.25)]"
    ></div>
  );
};

export default MapDisplay;
