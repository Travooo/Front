  "use client"

  import { useState, useEffect } from "react"
  import axios from "axios";
  import Header from "../components/header"
  import Footer from "../components/footer"
  import LocalCard from "./localCard.jsx";

  import { Search, Plus } from "lucide-react"
  //import { jwtDecode } from "jwt-decode"; 
  import { useNavigate } from "react-router-dom"


  const Servicos = () => {
    //const token = localStorage.getItem("token")
    const [locais, setLocais] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState("");
    const [termoBusca, setTermoBusca] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const fetchLocaisComImagem = async () => {
        try {
          // 1) Busca todos os serviços da organição, ou filtrados por tipo:
          const urlServicos = tipoFiltro
            ? `http://localhost:3000/rest/v1/servicos/tipo/${tipoFiltro}/organizacao/${27}`
            : `http://localhost:3000/rest/v1/servicos/organizacao/${27}`;

          const response = await axios.get(urlServicos, {
            headers: { "Content-Type": "application/json" },
          });
          const data = response.data;
          // 2) Busca a foto de perfil de cada serviço:
          const servicos = await Promise.all(
            data.map(async (item) => {
            try {
              const { data: anexo } = await axios.get(`http://localhost:3000/rest/v1/anexos/perfil/servicos/${item.id}`, {
                headers: { "Content-Type": "application/json" },
              });
              console.log("Anexo recebido:", anexo);
              return { 
                ...item, 
                url_publica: anexo.url_publica,
              };
            } catch {
              return item;
            }})
          );
          setLocais(servicos);
        } catch (error) {
          console.error("Erro ao buscar serviços com imagem:", error);
        }
      };
      fetchLocaisComImagem();
    }, [tipoFiltro/*, token*/ ]);

    // Filtra locais por termo de busca (nome ou endereço):
    const locaisFiltrados = locais.filter(
      (local) =>
        local.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
        (local.endereco || "")
        .toLowerCase()
        .includes(termoBusca.toLowerCase())
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

              <select
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                className="border border-gray-300 bg-white hover:bg-gray-50 px-5 py-3 rounded-md transition-colors"
              >
                <option value="">Todos os tipos</option>
                <option value="restaurant">Restaurantes</option>
                <option value="park">Parques</option>
                <option value="shopping">Shoppings</option>

                {/* 
                <button className="border border-gray-300 bg-white hover:bg-gray-50 px-5 py-3 rounded-md transition-colors flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span>Filtros</span> 
                */}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
            {locaisFiltrados.map((local) => (
               <LocalCard key={local.id} local={local} onExcluir={excluirLocal} />
            ))}
            {locaisFiltrados.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm my-8">
              <p className="text-gray-500 text-lg">Nenhum local encontrado.</p>
              <button 
                onClick={() => setTermoBusca("")} 
                className="mt-4 text-amber-600 hover:text-amber-700">
                Limpar busca
              </button>
            </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  export default Servicos
