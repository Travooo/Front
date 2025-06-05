import React, { useState, useMemo } from "react";
import LocationItem from "./locationItem";
import Pagination from "./pagination";

const LocationSidebar = ({ onLocationSelect, locations = [], onFilter }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");

  const ITEMS_PER_PAGE = 5;

  const filteredLocations = useMemo(() => {
    if (!Array.isArray(locations)) return [];
    if (activeFilter === "all") return locations;
    return locations.filter((loc) => loc.tipo === activeFilter);
  }, [locations, activeFilter]);

  const totalPages = Math.ceil(filteredLocations.length / ITEMS_PER_PAGE);
  const paginatedLocations = filteredLocations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleLocationClick = (locationId) => {
    setSelectedLocation(locationId);
    onLocationSelect?.(locationId);
  };

  const handleFilterChange = (tipo) => {
    setActiveFilter(tipo);
    setCurrentPage(1);
    onFilter?.(tipo);
  };

  // Função para retornar o ícone correto com base no tipo
  const getIconByType = (tipo) => {
    switch (tipo) {
      case "restaurant":
        return "/icons/restaurant.svg";
      case "shopping":
        return "/icons/shopping.svg";
      case "park":
        return "/icons/park.svg";
      case "store":
        return "/icons/store.svg"; //TODO: Atualizar ícones / verificar se tipos estão permitidos no back 
      default:
        return null;
    }
  };


  return (
    <aside className="flex flex-col w-full h-[633px] shadow-[6px_4px_4px_rgba(0,0,0,0.25)] max-md:mt-9 max-md:max-w-full">
      <div className="flex flex-col rounded-lg bg-[#FFD69C] h-full w-full px-2 pt-2 pb-4 overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        
        <header className="px-4 pt-2 pb-1 text-3xl border-b border-black text-black">
          Fortaleza
        </header>

        <div className="flex justify-center px-4 py-2">
          <div className="flex space-x-2 mb-2">
            {[
              { key: "all", label: "Todos" },
              { key: "restaurant", label: "Restaurantes" },
              { key: "shopping", label: "Compras" },
              { key: "park", label: "Parques" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleFilterChange(key)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  activeFilter === key
                    ? "bg-amber-500 text-white"
                    : "bg-white text-black hover:bg-amber-100"
                }`}
              >
                {label}
              </button>
            ))}
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
                  nome={location.nome}
                  endereco={location.endereco}
                  url_publica={location.url_publica}
                  highlighted={selectedLocation === location.id}
                  icone={getIconByType(location.tipo)}
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
