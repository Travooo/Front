import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import { ArrowLeft, Save } from "lucide-react"

export default function EditarServico() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [endereco, setEndereco] = useState("")
  const [imagem, setImagem] = useState("/placeholder.svg")

  useEffect(() => {
    // Simulação de dados — no futuro você pode buscar isso de uma API
    const locais = [
      {
        id: "1",
        nome: "Illa Mare",
        endereco: "Av. Beira Mar, 3821 - Meireles, Fortaleza - CE, 60165-121",
        imagem: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "2",
        nome: "Restaurante Vista Mar",
        endereco: "Av. Beira Mar, 123 - Fortaleza - CE",
        imagem: "/placeholder.svg",
      },
      {
        id: "3",
        nome: "Churrascaria Boi na Brasa",
        endereco: "Rua do Fogo, 789 - Centro, Fortaleza - CE",
        imagem: "/placeholder.svg?height=80&width=80",
      },
    ]

    const local = locais.find((l) => l.id === id)
    if (local) {
      setNome(local.nome)
      setEndereco(local.endereco)
      setImagem(local.imagem)
    } else {
      console.warn("Local não encontrado com id:", id)
    }
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você poderia enviar os dados atualizados para uma API
    alert("Dados salvos com sucesso!")
    navigate("/meus-servicos")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-amber-500 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold">Editar Local</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow space-y-4"
        >
          <div>
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700">Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700">Imagem</label>
            <img
              src={imagem}
              alt={nome}
              className="w-32 h-32 object-cover rounded-md mt-2"
            />
          </div>

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded flex items-center gap-2 transition"
          >
            <Save className="h-5 w-5" />
            <span>Salvar</span>
          </button>
        </form>
      </main>
      <Footer />
    </div>
  )
}
