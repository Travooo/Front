import axios from 'axios';
import React, { useEffect, useState } from "react";
import Header from "../home/components/header";
import Footer from "../components/footer";

import LocationSidebar from "./components/locationSideBar";
import MapDisplay from "./components/mapDisplay";
import HeroSection from "./components/heroSection";
import SearchBar from "./components/searchBar";

const Page = () => {
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [allLocations, setAllLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  //TODO: Implementar Local Storage JWT Token
/*   const token = localStorage.getItem('token');
  const handleLocationSelect = (locationId) => {
    setSelectedLocationId(locationId);
  };  */
  const usuario_organizacao_id = 27;

  const fetchLocations = async (url) => {
    try {
      
      const { data: servicos } = await axios.get(url, {
        headers: { 
          "Content-Type": "application/json", 
          //! "Authorization": `Bearer ${token}` 
        },
      });

      const servicosComImagem = await Promise.all(
        servicos.map(async (servico) => {
          try {
            const { data: anexo } = await axios.get(`http://localhost:3000/rest/v1/anexos/perfil/servicos/${servico.id}`, {
              headers: { 
                "Content-Type": "application/json", 
                //! "Authorization": `Bearer ${token}` 
              },
            });
            return {
              ...servico,
              url_publica: anexo.url_publica || null,
            };
          } catch {
            return { ...servico, url_publica: null };
          }
        })
      );
      return servicosComImagem;
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      return [];
    }
  };

  // useEffect inicial - carrega todo
  useEffect(() => {
    const loadAll = async () => {
      const todos = await fetchLocations(
        `http://localhost:3000/rest/v1/servicos/organizacao/${usuario_organizacao_id}`
      );
      setAllLocations(todos);
      setFilteredLocations(todos);
    };
    loadAll();
  }, []);

  const handleLocationSelect = (locationId) => {
    setSelectedLocationId(locationId);
  };

  const handleFilter = async (tipo) => {
    if (tipo === "all") {
      setFilteredLocations(allLocations);
    } else {
      try {
        const filtrados = await fetchLocations(
          `http://localhost:3000/rest/v1/servicos/tipo/${tipo}/organizacao/${usuario_organizacao_id}`
        );
        setFilteredLocations(filtrados);
      } catch (error) {
        console.error("Erro ao filtrar locais:", error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100">
      <Header />
      <div className="w-full bg-neutral-100 px-4 py-4">
      <div className="max-w-screen-xl mx-auto flex justify-center">
        <SearchBar />
      </div>
    </div>
      <div className="w-full bg-neutral-100 py-4 flex-grow mt-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-[34%] max-md:w-full">
              <LocationSidebar
                onLocationSelect={handleLocationSelect}
                locations={filteredLocations}
                onFilter={handleFilter}
              />            </div>
            <div className="w-[66%] max-md:w-full">
              <MapDisplay
                selectedLocationId={selectedLocationId}
                locations={filteredLocations}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-neutral-100 py-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <HeroSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;