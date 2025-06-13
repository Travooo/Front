import React, { useEffect, useRef } from "react";

const MapDisplay = ({ selectedLocationId, locations = [] }) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef({});
  const infoWindowRef = useRef(null);

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
      script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSy5Ug2IAPE8-1-C4-dCC2SJapT1UqGnVy7g`;
      script.id = "googleMaps";
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.google);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  // Cria o mapa uma vez
  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        if (!mapRef.current) return;

        const centerFortaleza = { lat: -3.71722, lng: -38.54306 };

        googleMapRef.current = new window.google.maps.Map(mapRef.current, {
          center: centerFortaleza,
          zoom: 13,
        });

        infoWindowRef.current = new window.google.maps.InfoWindow();
      })
      .catch((err) => console.error("Failed to load Google Maps", err));
  }, []);

  // Atualiza os marcadores sempre que locations mudam
  useEffect(() => {
    if (!googleMapRef.current) return;

    // Remove marcadores antigos
    Object.values(markersRef.current).forEach((marker) => marker.setMap(null));
    markersRef.current = {};

    locations.forEach((location) => {
      const position = {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng),
      };

      const marker = new window.google.maps.Marker({
        position,
        map: googleMapRef.current,
        title: location.nome,
      });

      markersRef.current[location.id] = marker;

      // Opcional: clique no marcador para abrir info window
      marker.addListener("click", () => {
        if (!infoWindowRef.current) return;
        infoWindowRef.current.setContent(`
          <strong>${location.nome}</strong><br/>
          ${location.sobre || ""}<br/>
          <em>${location.endereco || ""}</em>
        `);
        infoWindowRef.current.open(googleMapRef.current, marker);
      });
    });
  }, [locations]);

  // Centraliza e abre info window no marcador selecionado
  useEffect(() => {
    if (
      !googleMapRef.current ||
      !selectedLocationId ||
      !markersRef.current[selectedLocationId]
    )
    return;

    const marker = markersRef.current[selectedLocationId];
    const selectedLocation = locations.find(
      (loc) => loc.id === selectedLocationId
    );
    if (!selectedLocation) return;

    const position = {
      lat: parseFloat(selectedLocation.lat),
      lng: parseFloat(selectedLocation.lng),
    };

    googleMapRef.current.panTo(position);
    googleMapRef.current.setZoom(15);

    if (infoWindowRef.current) {
      const imageTag = selectedLocation.imagem
        ? `<img src="${selectedLocation.imagem}" alt="Imagem" style="width: 100%; max-height: 60px; object-fit: cover; border-radius: 8px;" />`
        : "";
      const contentHTML = `
        <div style="max-width: 250px; font-family: Arial, sans-serif;">
          <div style="font-weight: bold; margin-bottom: 5px;">${selectedLocation.nome}</div>
          ${imageTag}
          <span>${selectedLocation.sobre || ""}</span><br/><br/>
          <em>${selectedLocation.endereco || ""}</em>
        </div>
      `;

      infoWindowRef.current.setContent(contentHTML);
      infoWindowRef.current.open(googleMapRef.current, marker);
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
