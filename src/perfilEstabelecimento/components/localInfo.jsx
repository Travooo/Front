import React from "react";

const LocalInfo = ({ servico }) => {
  if (!servico) return <div>Nenhum serviço encontrado</div>;

  return (
    <section className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">{servico.nome}</h1>
        <p className="text-red-600 font-semibold">Informações</p>

        <p><strong>ID do estabelecimento:</strong> {servico.id}</p>

        <p><strong>Localização:</strong> {servico.cep}</p>

        <p><strong>Descrição:</strong> {servico.sobre}</p>

        <p className="text-sm text-gray-700">
          <strong>Horário de Funcionamento:</strong> {servico.horarios}
        </p>

        <p className="text-sm text-gray-700">
          <strong>Cardápio:</strong> Acesse o cardápio completo <a href="#" className="text-red-600 underline">aqui</a>.
        </p>
      </div>
    </section>
  );
};

export default LocalInfo;
