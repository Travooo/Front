"use client"

import { useState } from "react"
import { Clock, MapPin, Upload, Ticket, Save, ArrowLeft, X, Plus } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

export default function CadastrarLocal() {
  const token = localStorage.getItem("token") //TOKEN DE ACESSO
  const userId = localStorage.getItem("organizacaoId") //ID ORGANIZAÇÃO
  const [imagemPreview, setImagemPreview] = useState(null)
  const [menuPreview, setMenuPreview] = useState(null)
  const [cupomAtivo, setCupomAtivo] = useState(false)
  const [horarios, setHorarios] = useState('');

  const handleImagemChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagemPreview(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMenuChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setMenuPreview(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.target
    const nome = form.nome.value
    const endereco = form.endereco.value
    const horarios = form.horarios.value
    const sobre = form.sobre.value
    const cep = form.cep.value
    const numero = form.numero.value
    const tipo = form.tipo.value

    console.log("Dados a serem enviados:", {
      nome,
      sobre,
      userId,
      cep,
      numero,
      tipo,
      endereco,
      horarios
    });

    try {
      const response = await fetch("http://localhost:3000/rest/v1/servicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          endereco,
          horarios,
          sobre,
          cep,
          numero,
          tipo,
          usuario_organizacao_id: userId, // Associa o serviço à organização logada
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao cadastrar serviço")
      }

      const data = await response.json()
      console.log("Serviço cadastrado com sucesso:", data)
    } catch (error) {
      console.error("Erro:", error)
    }
  }

  const handleCupomClick = () => {
    if (cupomAtivo) {
      alert("Redirecionando para página de cupons...")
    } else {
      setCupomAtivo(true)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="text-gray-500 hover:text-amber-500 transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold">Cadastrar Novo Local</h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="titulo" className="block text-base font-medium text-gray-700">
                  Nome do Local
                </label>
                <input
                  id="titulo"
                  name="nome"
                  type="text"
                  placeholder="Ex: Restaurante Vista Mar"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="localizacao"
                    className="block text-base font-medium text-gray-700 flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4" /> Localização
                  </label>
                  <input
                    id="localizacao"
                    name="endereco"
                    type="text"
                    placeholder="Endereço completo"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
                        CEP
                      </label>
                      <input
                        id="cep"
                        name="cep"
                        type="text"
                        placeholder="00000-000"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
                        Número
                      </label>
                      <input
                        id="numero"
                        name="numero"
                        type="text"
                        placeholder="123"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="horarios"
                    className="block text-base font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" /> Horário de Funcionamento
                  </label>
                  <select
                    id="horarios"
                    name="horarios"
                    value={horarios}
                    onChange={(e) => setHorarios(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">Selecione o horário</option>
                    <option value="manha">Manhã (8h às 12h)</option>
                    <option value="tarde">Tarde (12h às 18h)</option>
                    <option value="noite">Noite (18h às 23h)</option>
                    <option value="integral">Dia todo (8h às 23h)</option>
                    <option value="personalizado">Personalizado</option>
                  </select>
                </div>
                <div>
                <label htmlFor="categoria" className="block text-base font-medium text-gray-700">
                  Categoria
                </label>
                  <select
                    id="tipo"
                    name="tipo"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">Selecione a categoria</option>
                    <option value="parques">Parques</option>
                    <option value="restaurantes">Restaurantes</option>
                    <option value="shoppings">Shoppings</option>
                    <option value="todos">Todos os tipos</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="descricao" className="block text-base font-medium text-gray-700">
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  name="sobre"
                  placeholder="Descreva o local, suas atrações e diferenciais..."
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[120px]"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="imagem" className="block text-base font-medium text-gray-700 flex items-center gap-2">
                    <Upload className="h-4 w-4" /> Imagem do Local
                  </label>
                  <div className="mt-2 flex flex-col items-center">
                    {imagemPreview ? (
                      <div className="relative w-full">
                        <img
                          src={imagemPreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                          onClick={() => setImagemPreview(null)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full">
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Clique para selecionar ou arraste a imagem</p>
                          <input
                            id="imagem"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImagemChange}
                          />
                          <button
                            type="button"
                            className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
                            onClick={() => document.getElementById("imagem")?.click()}
                          >
                            <Plus className="h-4 w-4" />
                            Selecionar Imagem
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="menu" className="block text-base font-medium text-gray-700 flex items-center gap-2">
                    <Upload className="h-4 w-4" /> Anexar Cardápio (PDF)
                  </label>
                  <div className="mt-2 flex flex-col items-center">
                    {menuPreview ? (
                      <div className="relative w-full">
                        <div className="w-full h-48 bg-gray-100 rounded-md border flex items-center justify-center">
                          <p className="text-sm text-gray-700">Arquivo selecionado</p>
                        </div>
                        <button
                          type="button"
                          className="absolute top-2 right-2 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                          onClick={() => setMenuPreview(null)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full">
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Clique para selecionar ou arraste o cardápio (PDF)</p>
                          <input id="menu" type="file" accept=".pdf" className="hidden" onChange={handleMenuChange} />
                          <button
                            type="button"
                            className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
                            onClick={() => document.getElementById("menu")?.click()}
                          >
                            <Plus className="h-4 w-4" />
                            Selecionar Cardápio
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <div className="flex-1">
                  <label htmlFor="cupom" className="block text-base font-medium text-gray-700 flex items-center gap-2">
                    <Ticket className="h-4 w-4" /> Atribuir Cupom
                  </label>
                  <div className="flex items-center mt-1">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        id="cupom"
                        checked={cupomAtivo}
                        onChange={() => setCupomAtivo(!cupomAtivo)}
                        className="opacity-0 absolute h-0 w-0"
                      />
                      <div className="bg-gray-200 rounded-full h-6 w-11 cursor-pointer flex items-center">
                        <div
                          className={`transform duration-200 ease-in-out h-5 w-5 rounded-full shadow-md ${
                            cupomAtivo ? "translate-x-6 bg-amber-500" : "translate-x-1 bg-white"
                          }`}
                        ></div>
                      </div>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{cupomAtivo ? "Cupom ativo" : "Sem cupom"}</span>
                    {cupomAtivo && (
                      <button
                        type="button"
                        className="ml-4 px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        onClick={handleCupomClick}
                      >
                        Configurar Cupom
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-md transition-colors text-sm font-medium"
                onClick={() => window.history.back()}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors text-sm font-medium"
              >
                <Save className="h-4 w-4" /> Salvar Local
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
