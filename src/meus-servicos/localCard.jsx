import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LocalCard = ({ local, onExcluir }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex p-4">
        <img
          src={local.imagem || "/placeholder.svg?height=100&width=100"}
          alt={local.nome}
          className="w-16 h-16 object-cover rounded-md mr-4"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-gray-800">{local.nome}</h2>
            <div className="flex gap-3">
              <button
                className="text-gray-500 hover:text-amber-500 transition-colors p-1 rounded-full hover:bg-amber-50"
                aria-label="Editar"
                onClick={() => navigate(`/editar-servico/${local.id}`)}
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                onClick={() => onExcluir(local.id)}
                aria-label="Excluir"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">
            {local.cep?.replace(/^(\d{5})(\d{3})$/, '$1-$2')}<br />
            {local.endereco}
          </p>
          <button
            className="mt-4 text-amber-600 hover:text-amber-700 text-sm font-medium"
            onClick={() => navigate(`/perfil-estabelecimento/${local.id}`)}
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalCard;
