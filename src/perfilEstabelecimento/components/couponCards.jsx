import React from "react";

const coupons = [
  { id: 1, title: "10% OFF nos locais selecionados", validUntil: "20/12", highlighted: false },
  { id: 2, title: "R$20 na sua primeira compra", validUntil: "20/12", highlighted: true },
  { id: 3, title: "Desconto de 45% em compras com valor mínimo", validUntil: "20/12", highlighted: false },
];

const CouponCards = () => {
  return (
    <section>
      <h2 className="text-xl font-bold text-black mb-4">Cupons Cadastrados a esse local/serviço</h2>
      <div className="flex flex-wrap gap-4">
        {coupons.map((c) => (
          <div
            key={c.id}
            className={`rounded-lg p-4 w-full md:w-80 shadow-sm ${
              c.highlighted ? "bg-black text-white" : "bg-white border"
            }`}
          >
            <p className="font-semibold">{c.title}</p>
            <div className="flex justify-between items-center mt-4">
              <button className="text-sm underline">Ver regras</button>
              <span className="text-xs">Válido até {c.validUntil}</span>
            </div>
            <button
              className={`mt-4 w-full py-1 rounded font-semibold ${
                c.highlighted ? "bg-white text-black" : "bg-orange-500 text-white"
              }`}
            >
              Editar Cupom
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CouponCards;
