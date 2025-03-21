import React from "react";

const locations = [
  { name: "Barneys Burger", address: "Rua Monsenhor Otávio de Castro, 901" },
  { name: "Shopping Iguatemi", address: "Av. Washington Soares, 85" },
  { name: "Bulls", address: "R. Cel. Jucá, 700" },
  { name: "Parque do Cocó", address: "Padre Antônio Tomás" },
  { name: "The Ribs", address: "Av. Barão de Studart, 2023 A" },
  { name: "Mc Donald's", address: "Av. Treze de Maio, 1060" },
  { name: "Burger King", address: "Av. Santos Dumont, 1859" }
];

const LocationSidebar = () => {
  return (
    <div className="bg-orange-100 p-4 rounded-md shadow-lg w-1/3">
      <h2 className="font-bold text-2xl mb-4">Fortaleza</h2>
      <ul>
        {locations.map((location, index) => (
          <li key={index} className="mb-2 p-2 bg-white shadow rounded-md">
            <strong>{location.name}</strong>
            <p className="text-sm text-gray-600">{location.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSidebar;
