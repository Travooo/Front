"use client"
import { Pencil, Trash2 } from "lucide-react"
import React from "react"

const LocalCard = ({ local, onExcluir }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex p-4">
        <img
          src={local.imagem || "/placeholder.svg"}
          alt={local.nome}
          className="w-20 h-20 object-cover rounded-md mr-4"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">{local.nome}</h2>
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-amber-500 transition-colors" aria-label="Editar">
                <Pencil className="h-5 w-5" />
              </button>
              <button
                className="text-gray-500 hover:text-red-500 transition-colors"
                onClick={() => onExcluir(local.id)}
                aria-label="Excluir"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-1">{local.endereco}</p>
        </div>
      </div>
    </div>
  )
}

export default LocalCard

