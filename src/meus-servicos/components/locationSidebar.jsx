import React, { useState, useMemo } from "react";
import EstablishmentList from "./establishmentList";
import Pagination from "./pagination";
import "./custom-scrollbar.css";

const FILTERS = [
  { key: "all", label: "Todos" },
  { key: "restaurant", label: "Restaurantes" },
  { key: "shopping", label: "Compras" },
  { key: "park", label: "Parques" },
];

const LocationSidebar = ({ locations = [], selectedLocationId, onSelect, onFilter, excluirLocal, activeFilter, setActiveFilter}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const filteredLocations = useMemo(() => {
    if (!Array.isArray(locations)) return [];
    return activeFilter === "all"
      ? locations
      : locations.filter((loc) => loc.tipo === activeFilter);
  }, [locations, activeFilter]);

  const totalPages = Math.ceil(filteredLocations.length / ITEMS_PER_PAGE);
  const paginatedLocations = filteredLocations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleLocationClick = (id) => {
    onSelect?.(id);
  };

  const handleFilterChange = (tipo) => {
    setActiveFilter(tipo);
    setCurrentPage(1);
    onFilter?.(tipo);
  };

  return (
    <aside className="flex flex-col w-full h-full max-h-[633px] rounded-lg bg-[#413626] px-2 pt-2 pb-4 overflow-y: auto shadow-lg">
      
      <header className="flex justify-between items-center p-4 border-b border-black text-white">
        <h1 className="text-3xl text-[#e8e7ac] font-semibold">Meus Serviços</h1>
        {/* Filtro */}
        <div className="flex flex-wrap gap-1">
          <select
            value={activeFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="p-2 w-20 h-10 text-base italic text-center border border-[#b57f3f] bg-white text-black hover:bg-amber-100 hover:border-[#ffd477] transition-colors"
          >
            {FILTERS.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto p custom-scrollbar">
        {paginatedLocations.length > 0 ? (
          <EstablishmentList
          establishments={paginatedLocations}
          selectedId={selectedLocationId} // corrigido aqui
          onSelect={handleLocationClick}
          excluirLocal={excluirLocal}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">Nenhum encontrado</div>
        )}
      </div>

      <div className="px-4 pt-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </aside>
  );
};

export default LocationSidebar;
