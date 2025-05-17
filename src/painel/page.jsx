import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import UserProfile from "./components/userProfile";
import EstablishmentList from "./components/establishmentList";
import ReviewChart from "./components/reviewChart";
import Notifications from "./components/notifications";

export default function Dashboard() {
  const token = localStorage.getItem('token'); //TOKEN DE ACESSO
  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-semibold text-center">Dashboard</h1>
        
        {/* Perfil do Usuário */}
        <UserProfile name="Maria Carvalho" image="/imagens/pessoa.jpg" />

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
