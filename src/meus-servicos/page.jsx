"use client"

import { useState } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import { Pencil, Trash2, Search, Plus } from "lucide-react"
import React from "react"
import { useNavigate } from 'react-router-dom';

const locaisIniciais = [
  {
    id: 1,
    nome: "Illa Mare",
    endereco: "Av. Beira Mar, 3821 - Meireles, Fortaleza - CE, 60165-121",
    imagem: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    nome: "Illa Mare",
    endereco: "Av. Beira Mar, 3821 - Meireles, Fortaleza - CE, 60165-121",
  },
  {
    id: 3,
    nome: "Illa Mare",
    endereco: "Av. Beira Mar, 3821 - Meireles, Fortaleza - CE, 60165-121",
    imagem: "/placeholder.svg?height=80&width=80",
  },
]

const Servicos = () => {
  const [locais, setLocais] = useState(locaisIniciais)
  const [termoBusca, setTermoBusca] = useState("")
  const navigate = useNavigate();

  const locaisFiltrados = locais.filter(
    (local) =>
      local.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      local.endereco.toLowerCase().includes(termoBusca.toLowerCase()),
  )

  const excluirLocal = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este local?")) {
      setLocais(locais.filter((local) => local.id !== id))
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Locais</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar locais..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
          <button
            onClick={() => navigate('/cadastrar-local')}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Local</span>
          </button>
          
            <button className="border border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 rounded-md transition-colors">
              Filtros
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locaisFiltrados.map((local) => (
            <div key={local.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
                        onClick={() => excluirLocal(local.id)}
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
          ))}
        </div>
        {locaisFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum local encontrado.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Servicos;

