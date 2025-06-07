import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import UserProfile from "./components/userProfile";
import EstablishmentList from "./components/establishmentList";
import ReviewChart from "./components/reviewChart";
import Notifications from "./components/notifications";
import UserService from "./userService";

export default function Dashboard() {
  const [userData, setUserData] = useState({
    name: "Carregando...", // Alterado de name_fantasia para name para consistência
    image: "/imagens/pessoa.jpg"
  });
  
  useEffect(() => {
    // Função para buscar os dados do usuário
    const fetchUserData = async () => {
      try {
        
        // Verificar se o token existe
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado");
          // Se não houver token, defina o nome como "Usuário" e retorne
          setUserData({
            name: "Usuário",
            image: "/imagens/pessoa.jpg"
          });
          return;
        }
        
        // Buscar os dados do usuário logado
        const user = await UserService.getCurrentUser();
        console.log("Objeto user retornado pelo UserService:", user); // Adicionado para depuração
        
        // Atualizar o estado com os dados do usuário
        setUserData({
          name: user.nome || "Usuário",
          image: "/imagens/pessoa.jpg" // Mantém a imagem padrão
        });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        // Em caso de erro, mantém os dados padrão
        setUserData({
          name: "Usuário",
          image: "/imagens/pessoa.jpg"
        });
      }
    };
    
    // Chamar a função para buscar os dados
    fetchUserData();
  }, []); // Array vazio para executar apenas uma vez na montagem do componente

  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-semibold text-center">Dashboard</h1>
        
        {/* Perfil do Usuário - Agora usando os dados dinâmicos */}
        <UserProfile name={userData.name} image={userData.image} />

        {/* Notificações */}
        <Notifications notifications={["Nova avaliação recebida!", "Seu amigo visitou um local!"]} />

        {/* Lista de Estabelecimentos */}
        <EstablishmentList establishments={[
          { name: "Restaurante A", address: "Rua X, 123", image: "/imagens/estabelecimento.jpg", rating: 4.5 },
          { name: "Restaurante B", address: "Rua Y, 456", image: "/imagens/estabelecimento1.jpg", rating: 4.2 },
          { name: "Restaurante C", address: "Rua Y, 456", image: "/imagens/estabelecimento3.jpg", rating: 4.2 }
        ]} />

        {/* Gráfico de Avaliações */}
        <ReviewChart data={[
          { name: "Restaurante A", rating: 4.5 },
          { name: "Restaurante B", rating: 4.2 },
          { name: "Restaurante C", rating: 4.0 },
          { name: "Restaurante D", rating: 3.8 },
          { name: "Restaurante E", rating: 4.7 }
        ]} />
      </main>
      <Footer />
    </div>
  );
}
