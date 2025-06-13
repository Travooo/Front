import React from "react";
import { useNavigate } from "react-router-dom";

const CouponCards = ({ coupons }) => {
  const navigate = useNavigate();

  return (
    <section>
      <h2 className="text-xl font-bold text-black mb-4">Cupons Cadastrados a esse local/serviço</h2>
      <div className="flex flex-wrap gap-4">
        {coupons.map((c) => (
          <div
            key={c.id}
            className={`rounded-lg p-4 w-full md:w-80 shadow-sm ${c.highlighted ? "bg-black text-white" : "bg-white border"}`}
          >
            <p className="font-semibold">{c.nome}</p>
            <div className="flex justify-between items-center mt-4">
              {/* <button className="text-sm underline">Ver regras</button> */}
              <span className="text-xs">Válido até {c.expiration}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              {/* <button className="text-sm underline">Ver regras</button> */}
              <span className="text-xs">Desconto de {c.descricao}%</span>
            </div>
            <button
              onClick={() => navigate('/meus-cupons')}
              className={`mt-4 w-full py-1 rounded font-semibold ${c.highlighted ? "bg-white text-black" : "bg-orange-500 text-white"}`}>
              Editar Cupom
            </button>

          </div>
        ))}
      </div>
    </section>
  );
};

export default CouponCards;
