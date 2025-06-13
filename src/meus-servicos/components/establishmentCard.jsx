import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EstablishmentCard({ image, name, address, rating, id, excluirLocal, onSelect, isSelected }) {
  const navigate = useNavigate();
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");

  useEffect(() => {
    if (address) {
      const partes = address.split("-").map((p) => p.trim());
      setRua(partes[0] || "");
      setBairro(partes[1] || "");
    }
  }, [address]);

  const handleExcluirClick = (e) => {
    e.stopPropagation();
    excluirLocal(id);
  };

  const handleEditarClick = (e) => {
    e.stopPropagation();
    navigate(`/editar-servico/${id}`);
  };

  return (
    <div
      className={
        "border-[4px] border-[#e8e7ac] hover:border-[#ffc445] flex flex-col bg-gray-200 shadow-xl rounded-lg overflow-hidden w-48 transition-colors cursor-pointer"
      }
      onClick={() => onSelect?.(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect?.(id);
        }
      }}
      aria-pressed={isSelected}
    >

      <img src={image} alt={name} className="w-full h-32 object-cover" />
      {/* Título */}
      <h3
        className="text-base font-semibold text-center mt-1" 
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/perfil-estabelecimento/${id}`)}
        }
      >
        {name}
      </h3>
      {/* Endereço */}
      <div className="flex items-center justify-center p-1">
        <FaMapMarkerAlt className="mr-2 text-sm flex-shrink-0" />
        <div className="text-xs text-gray-900 text-left leading-tight">
          <div>{rua}</div>
          <div className="font-semibold">{bairro}</div>
        </div>
      </div>
      {/* Avaliação, Excluir, Editar */}
      <div className="flex items-center justify-between p-1">
        <div className="flex items-center gap-2">
          <span className="flex items-center bg-yellow-400 text-white text-xs px-1 py-1 rounded gap-1">
            <FaStar />
            <span>{rating}</span>
          </span>
          <span className="text-sm text-gray-700 font-semibold">{`#${id}`}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
            onClick={handleExcluirClick}
            aria-label="Excluir"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <button
            className="text-gray-500 hover:text-amber-500 transition-colors p-1 rounded-full hover:bg-amber-50"
            aria-label="Editar"
            onClick={handleEditarClick}
          >
            <Pencil className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EstablishmentCard;
