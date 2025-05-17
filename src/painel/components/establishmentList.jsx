import React from "react";
import EstablishmentCard from "./establishmentCard";

const EstablishmentList = ({ establishments }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4"> {/* Aumenta o número de colunas */}
      {establishments.map((est, index) => (
        <EstablishmentCard key={index} {...est} />
      ))}
      <a href="/lugares-cadastrados" className="text-blue-500 text-right block mt-2">Ver todos</a>
    </div>
  );
};

export default EstablishmentList;
