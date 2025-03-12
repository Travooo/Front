import React, { useState, } from "react";
import LocationItem from "./locationItem";
import Pagination from "./pagination";

const locations = [
  {
    id: 1,
    name: "Barneys Burger",
    address: "Rua Monsenhor Otávio de Castro, 901",
    icon: "/icons/restaurant.svg",
    type: "restaurant"
  },
  {
    id: 2,
    name: "Shopping Iguatemi",
    address: "Av. Washington Soares, 85",
    icon: "/icons/shopping.svg",
    type: "shopping"
  },
  {
    id: 3,
    name: "Bulls",
    address: "R. Cel. Jucá, 700",
    icon: "/icons/restaurant.svg",
    type: "restaurant"
  },
  {
    id: 4,
    name: "Parque do Cocó",
    address: "Av. Padre Antônio Tomás",
    icon: "/icons/park.svg",
    type: "park"
  },
  {
    id: 5,
    name: "The Ribs",
    address: "Av. Barão de Studart, 2023 A",
    icon: "/icons/restaurant.svg",
    type: "restaurant"
  },
  {
    id: 6,
    name: "Mc Donalds",
    address: "Av. Treze de Maio, 1060",
    icon: "/icons/restaurant.svg",
    type: "restaurant"
  },
  {
    id: 7,
    name: "Burger King",
    address: "Av. Santos Dumont, 1859",
    icon: "/icons/restaurant.svg",
    type: "restaurant"
  },
];

const ITEMS_PER_PAGE = 5;

const LocationSidebar = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [activeFilter, setActiveFilter] = useState("all");


  const totalPages = Math.ceil(filteredLocations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLocations = filteredLocations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleLocationClick = (locationId) => {
    setSelectedLocation(locationId);
    if (onLocationSelect) {
      onLocationSelect(locationId);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filterLocations = (type) => {
    setActiveFilter(type);
    if (type === "all") {
      setFilteredLocations(locations);
    } else {
      setFilteredLocations(locations.filter(location => location.type === type));
    }
    setCurrentPage(1);
  };

  return (
    <aside className="flex flex-col w-full h-[633px] shadow-[6px_4px_4px_rgba(0,0,0,0.25)] max-md:mt-9 max-md:max-w-full">
      <div className="flex flex-col rounded-lg bg-[#FFD69C] relative h-full w-full px-2 pt-2 pb-4 overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:max-w-full">
        <header className="overflow-hidden z-0 px-4 pt-2 pb-1 w-full text-3xl tracking-normal leading-none text-black whitespace-nowrap border-b border-black border-solid">
          Fortaleza
        </header>

        <div className="flex z-0 justify-center px-4 py-2 w-full">
          <div className="flex space-x-2 mb-2">
            <button 
              onClick={() => filterLocations("all")}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${activeFilter === "all" ? "bg-amber-500 text-white" : "bg-white text-black hover:bg-amber-100"}`}
            >
              Todos
            </button>
            <button 
              onClick={() => filterLocations("restaurant")}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${activeFilter === "restaurant" ? "bg-amber-500 text-white" : "bg-white text-black hover:bg-amber-100"}`}
            >
              Restaurantes
            </button>
            <button 
              onClick={() => filterLocations("shopping")}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${activeFilter === "shopping" ? "bg-amber-500 text-white" : "bg-white text-black hover:bg-amber-100"}`}
            >
              Compras
            </button>
            <button 
              onClick={() => filterLocations("park")}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${activeFilter === "park" ? "bg-amber-500 text-white" : "bg-white text-black hover:bg-amber-100"}`}
            >
              Parques
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
          {paginatedLocations.length > 0 ? (
            paginatedLocations.map((location) => (
              <div 
                key={location.id} 
                onClick={() => handleLocationClick(location.id)}
                className="cursor-pointer"
              >
                <LocationItem
                  name={location.name}
                  address={location.address}
                  icon={location.icon}
                  highlighted={selectedLocation === location.id}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Nenhum local encontrado
            </div>
          )}
        </div>

        <div className="px-4 pt-2">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      </div>
    </aside>
  );
};

export default LocationSidebar;