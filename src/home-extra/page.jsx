import Header from "../components/header";
import Footer from "../components/footer";
import SearchBar from "./components/searchBar";
import LocationSidebar from "./components/locationSidebar";
import MapDisplay from "./components/mapDisplay";
import RestaurantCard from "./components/restaurantCard"; // Componente dos restaurantes
import FriendCard from "./components/friendCard"; // Componente dos amigos
import { restaurants } from "./data/restaurants"; // Dados dos restaurantes
import { friends } from "./data/friends"; // Dados dos amigos

export default function Teste() {
  return (
    <div>
      <Header />
      <SearchBar />
      <main className="p-4">
        <h1 className="text-2xl font-semibold text-center">Bem-vinda, Maria Carvalho!</h1>
        <h4 className="text-md text-center text-gray-700">Aproveite para encontrar os melhores lugares para conhecer!</h4>

        {/* Seção principal com a lista e o mapa */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <LocationSidebar />
          <MapDisplay />
        </div>

        {/* Seção dos Restaurantes com Scroll Horizontal */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            <a href="#restaurantes" className="text-blue-500 hover:underline">🍽 Restaurantes para Visitar</a>
          </h2>

          {/* Container para os restaurantes com scroll horizontal */}
          <div className="flex space-x-6 overflow-x-auto pb-4 scroll-smooth">
            {restaurants.map((restaurant, index) => (
              <RestaurantCard key={index} {...restaurant} />
            ))}
          </div>
        </section>

        {/* Seção de Amigos - Explore o Perfil de Amigos */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            <a href="#amigos" className="text-blue-500 hover:underline">👫 Explore o Perfil de Amigos</a>
          </h2>

          {/* Container para os amigos com scroll horizontal */}
          <div className="flex space-x-6 overflow-x-auto pb-4 scroll-smooth">
            {friends.map((friend, index) => (
              <FriendCard key={index} {...friend} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
