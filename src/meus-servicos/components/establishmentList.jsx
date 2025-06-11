import React from "react";
import EstablishmentCard from "./establishmentCard";

const EstablishmentList = ({ establishments = [], excluirLocal, onSelect }) => {
  if (!establishments.length) {
    return (
      <div className="col-span-full text-center py-16 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500 text-lg">Nenhum local encontrado.</p>
        <button
          onClick={() => onSelect?.("")}
          className="mt-4 text-amber-600 hover:text-amber-700"
        >
          Limpar busca
        </button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 px-2">
      {establishments.map((local) => (
        <EstablishmentCard
          onSelect={onSelect}
          excluirLocal={excluirLocal}
          name={local.nome} 
          address={local.endereco} 
          image={local.url_publica}
          id={local.id}
          rating={4} //TODO: Incluir lógica de receber média ae avaliações por serviço_id (back/front) 
        />
      ))}
    </div>
  );
};

export default EstablishmentList;
