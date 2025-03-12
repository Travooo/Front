import React from "react";

const NavigationMenu = () => {
  return (
    <nav className="flex absolute z-0 gap-10 px-10 py-0.5 text-2xl tracking-tight text-center text-white rounded-none bottom-[26px] h-[26px] min-w-60 right-[321px] w-[435px] max-md:px-5 max-md:max-w-full">
      <a href="#map" className="hover:text-amber-500 transition-colors">
        Mapa
      </a>
      <a href="#locations" className="hover:text-amber-500 transition-colors">
        Locais
      </a>
      <a
        href="#subscription"
        className="hover:text-amber-500 transition-colors"
      >
        Assinatura
      </a>
    </nav>
  );
};

export default NavigationMenu;
