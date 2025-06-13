import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EstablishmentCard({ image, name, address, rating, id, excluirLocal }) {
  const navigate = useNavigate();

  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");

  useEffect(() => {
    if (address) {
      const partes = address.split("-");
      setRua(partes[0]?.trim() || "");
      setBairro(partes[1]?.trim() || "");
    }
  }, [address]);

  return (
    <div 
      className="bg-yellow-100 border-2 border-[#b57f3f] hover:border-[#ffd477] shadow-xl rounded-lg overflow-hidden w-48 transition-colors"
      onClick={() => navigate(`/perfil-estabelecimento/${id}`)} 
    >
      <img src={image} alt={name} className="w-full h-32 object-cover" />
      <div className="p-2">
        <h3 className="text-center text-base font-semibold mb-2">{name}</h3>

        <div className="flex justify-left items-center mb-2">
          <FaMapMarkerAlt className="mr-2 text-sm flex-shrink-0" />
          <div className="text-xs text-gray-900 text-left leading-tight">
            <div>{rua}</div>
            <div className="font-semibold">{bairro}</div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="bg-yellow-400 text-white text-xs px-1 py-1 rounded flex items-center gap-1">
            <FaStar /> {rating}
          </span>
          <button
            className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
            onClick={(e) => { e.stopPropagation(); excluirLocal(id); }}
            aria-label="Excluir"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <button
            className="text-gray-500 hover:text-amber-500 transition-colors p-1 rounded-full hover:bg-amber-50"
            aria-label="Editar"
            onClick={(e) => { e.stopPropagation(); navigate(`/editar-servico/${id}`); }}
          >
            <Pencil className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EstablishmentCard;
