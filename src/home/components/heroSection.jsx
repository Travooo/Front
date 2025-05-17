import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full py-12">
      <h2 className="text-6xl font-bold tracking-tight leading-tight text-stone-900 mb-8">
        Viajando ou não, aproveite o presente!
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mb-12">
        Descubra os melhores lugares e eventos com apenas um clique: o mundo espera por você no Travo!
      </p>
      
      {/* Cards de recursos - opcional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-amber-100 rounded-lg p-8 shadow-md">
          <div className="bg-amber-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Explore Locais</h3>
          <p className="text-lg text-gray-600">Descubra os melhores lugares para visitar, comer e se divertir em qualquer cidade.</p>
        </div>
        
        <div className="bg-amber-100 rounded-lg p-8 shadow-md">
          <div className="bg-amber-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Economize Tempo</h3>
          <p className="text-lg text-gray-600">Planeje suas visitas com eficiência e aproveite ao máximo seu tempo em cada destino.</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;