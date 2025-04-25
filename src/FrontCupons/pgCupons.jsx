import React from 'react';
import Header from '../FrontHome/components/header';

function PgCupons() {
  const cupons = [
    {
      id: '1',
      title: '10% OFF nos locais selecionados',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" stroke="#FF8800" strokeWidth="2"/>
        </svg>
      ),
      dark: false
    },
    {
      id: '2',
      title: 'R$20 na sua primeira compra',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#FF8800" strokeWidth="2"/>
        </svg>
      ),
      dark: true
    },
    {
      id: '3',
      title: 'Desconto de 45% em compras com valor mínimo',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#FF8800" strokeWidth="2"/>
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#FF8800" strokeWidth="2"/>
        </svg>
      ),
      dark: false
    }
  ];

  return (
    <div>
      <Header />

      {/* Conteúdo dos Cupons */}
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cupons.map((cupom) => (
            <div key={cupom.id} className="relative">
              {/* Marcador de Favorito */}
              <div className="absolute top-2 right-2">
              <div className={`w-6 h-8 ${cupom.dark ? 'bg-[#FF8800]' : 'bg-black'}`}></div>
              </div>

              {/* Card */}
              <div className={`rounded-lg p-6 shadow-md ${cupom.dark ? 'bg-[#1E1E1E] text-white' : 'bg-white text-black'}`}>
                {/* Cabeçalho do Card */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-shrink-0">
                    {cupom.icon}
                  </div>
                  <h3 className="font-bold text-lg leading-tight">
                    {cupom.title}
                  </h3>
                </div>

                {/* Botões e Informações */}
                <div className="space-y-3">
                  <button className="w-full bg-[#FF8800] text-white py-2 rounded-md font-medium hover:bg-[#E67A00] transition-colors">
                    Ver lojas
                  </button>
                  
                  <div className="flex justify-between items-center text-sm">
                    <button className="text-gray-500 hover:underline">
                      Ver regras
                    </button>
                    <span className="text-gray-500">
                      Válido até 20/12
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PgCupons;
