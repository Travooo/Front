import React from "react";

const LocationItem = ({ nome, endereco, url_publica, highlighted, icone }) => {
  const bgColor = highlighted ? "bg-amber-200" : "bg-white";

  return (
    <article
      className={`w-full rounded-lg shadow-[0px_3px_4px_rgba(0,0,0,0.25)] overflow-hidden ${bgColor} hover:bg-amber-100 transition-colors duration-200`}
    >
      {/* Imagem com altura fixa de 70% da largura do card */}
      <div className="relative w-full" style={{ aspectRatio: "1 / 0.7", overflow: "hidden" }}>
        <img
          src={url_publica}
          alt={`${nome} imagem`}
          className="absolute top-1/2 left-1/2 w-full h-auto min-h-full transform -translate-x-1/2 -translate-y-1/2 object-cover"
        />
      </div>

      {/* Conteúdo */}
      <div className="px-4 py-3 bg-yellow-50 flex items-center space-x-3">
        {icone && (
          <img src={icone} alt="Ícone tipo" className="w-6 h-6 flex-shrink-0" />
        )}
        <div>
          <h3 className="text-base font-semibold text-stone-900">{nome}</h3>
          <p className="text-sm text-neutral-500 mt-1">{endereco}</p>
        </div>
      </div>
    </article>
  );
};

export default LocationItem;
