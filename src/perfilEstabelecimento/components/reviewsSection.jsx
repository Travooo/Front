import React from "react";

const reviews = [
  { name: "Marcos", rating: 5, comment: "Ótima experiência", extra: "Atendimento perfeito", avatar: "/imagens/pessoa1.jpg" },
  { name: "João", rating: 3, comment: "Mediocre", extra: "Comida sem tempero", avatar: "/imagens/pessoa2.jpg" },
  { name: "Jeovan", rating: 4, comment: "Muito bom", extra: "Gostei muito", avatar: "/imagens/pessoa3.jpg" },
];

const ReviewsSection = () => {
  return (
    <section>
      <h2 className="text-xl font-bold text-red-600 mb-4">Avaliações e comentários</h2>
      <div className="flex flex-wrap gap-4">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white border rounded-lg p-4 shadow-md w-full md:w-64">
            <div className="flex items-center mb-2">
              <span>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
            </div>
            <h3 className="font-semibold">{r.comment}</h3>
            <p className="text-gray-600 text-sm mb-2">{r.extra}</p>
            <div className="flex items-center gap-2">
              <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full" />
              <span>{r.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
