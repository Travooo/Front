import React from "react";

const LocalInfo = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">Illa Mare</h1>
        <p className="text-red-600 font-semibold">Informações</p>

        <p><strong>Localização:</strong> Av. Beira Mar, 3821 – Meireles, Fortaleza - CE, 60165-121</p>

        <p><strong>Descrição :</strong> Com 13 anos no mercado, o Barney’s manteve-se como a preferência dos clientes e conquistou a reputação de ser a hamburgueria mais popular de Fortaleza...</p>

        <p className="text-sm text-gray-700">
          <strong>Horário de Funcionamento:</strong> 18h às 23h
        </p>

        <p className="text-sm text-gray-700">
          <strong>Cardápio:</strong> Acesse o cardápio completo <a href="#" className="text-red-600 underline">aqui</a>.
        </p>
      </div>

      <div className="w-full lg:w-96">
        <img src="/imagens/restaurante_ilha.jpg" alt="Foto do local" className="rounded-lg object-cover w-full h-64" />
      </div>
    </section>
  );
};

export default LocalInfo;
