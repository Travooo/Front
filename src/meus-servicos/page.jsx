"use client"

import { useState } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import { Pencil, Trash2, Search, Plus, Filter } from "lucide-react"
import { useNavigate } from "react-router-dom"

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
  const token = localStorage.getItem("token") //TOKEN DE ACESSO
  const [locais, setLocais] = useState(locaisIniciais)
  const [termoBusca, setTermoBusca] = useState("")
  const navigate = useNavigate()

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
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-12 mb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Locais</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar locais..."
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/cadastrar-local")}
              className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-md flex items-center gap-2 transition-colors font-medium"
            >
              <Plus className="h-5 w-5" />
              <span>Add Local</span>
            </button>

            <button className="border border-gray-300 bg-white hover:bg-gray-50 px-5 py-3 rounded-md transition-colors flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span>Filtros</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          {locaisFiltrados.map((local) => (
            <div
              key={local.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
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
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                        onClick={() => excluirLocal(local.id)}
                        aria-label="Excluir"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{local.endereco}</p>
                  <button
                    className="mt-4 text-amber-600 hover:text-amber-700 text-sm font-medium"
                    onClick={() => navigate(`/local/${local.id}`)}
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {locaisFiltrados.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm my-8">
            <p className="text-gray-500 text-lg">Nenhum local encontrado.</p>
            <button onClick={() => setTermoBusca("")} className="mt-4 text-amber-600 hover:text-amber-700">
              Limpar busca
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Servicos
