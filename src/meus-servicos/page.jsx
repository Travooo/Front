"use client";

import axios from "axios";
import { Plus, Search } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/header";
import Footer from "../components/footer";
import LocationSidebar from "./components/locationSidebar";
import MapDisplay from "./components/mapDisplay";


const Servicos = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const organizacaoId = parseInt(localStorage.getItem('organizacaoId'));
  const [termoBusca, setTermoBusca] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [locais, setLocais] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSelectedLocationId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const locaisFiltrados = locais.filter((local) => {
    const matchTipo = activeFilter === "all" || local.tipo === activeFilter;
    const matchTermo =
      termoBusca.trim() === "" ||
      local.nome.toLowerCase().includes(termoBusca.toLowerCase());
    return matchTipo && matchTermo;
  });

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSelectLocation = (id) => {
    setSelectedLocationId(id);
  };

  const fetchLocations = useCallback(async (tipo = "") => {
    try {
      const url = tipo
        ? `http://localhost:3000/rest/v1/servicos/tipo/${tipo}/organizacao/${organizacaoId}`
        : `http://localhost:3000/rest/v1/servicos/organizacao/${organizacaoId}`;

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Serviços recebidos:", data);
      const servicosComImagem = await Promise.all(
        data.map(async (servico) => {
          try {
            const { data: anexo } = await axios.get(
              `http://localhost:3000/rest/v1/anexos/perfil/servicos/${servico.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );

            return { ...servico, url_publica: anexo?.url_publica || null };
          } catch {
            return { ...servico, url_publica: null };
          }
        })
      );
      const locaisFormatados = servicosComImagem.map((servico) => ({
        ...servico,
        lat: servico.lat,
        lng: servico.lng,
      }));
      setLocais(locaisFormatados);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  }, [token, organizacaoId]);

  useEffect(() => {
    fetchLocations(tipoFiltro);
  }, [tipoFiltro, fetchLocations]);

  const excluirLocal = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este local?")) {
      try {
        await axios.delete(`http://localhost:3000/rest/v1/servicos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLocais((prev) => prev.filter((local) => local.id !== id));
      } catch (error) {
        alert("Erro ao excluir o local. Tente novamente.");
        console(error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-12">

        {/* Section: Busca, filtros e cadastro */}
        <section id="search-controls" className="flex flex-col sm:flex-row gap-4 mb-6 -mt-8">
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
              Criar Novo Serviço
            </button>
            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="border border-gray-300 bg-white px-5 py-3 rounded-md transition-colors"
            >
              <option value="">Todos os tipos</option>
              <option value="restaurant">Restaurantes</option>
              <option value="park">Parques</option>
              <option value="shopping">Shoppings</option>
            </select>
          </div>
        </section>

        {/* Section: Explorador de locais */}
        <section id="explorer" className="flex gap-6 mt-4 max-md:flex-col">
          <section id="sidebar" className="w-[35%] max-md:w-full">
            <LocationSidebar
              locations={locaisFiltrados}
              selectedLocationId={selectedLocationId}
              onSelect={handleSelectLocation}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              onFilter={handleFilterChange}
              excluirLocal={excluirLocal}
            />
          </section>

          <section id="map" className="w-[60%] max-md:w-full min-h-[400px]">
            <MapDisplay
              locations={locaisFiltrados}
              selectedLocationId={selectedLocationId}
            />
          </section>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Servicos;
