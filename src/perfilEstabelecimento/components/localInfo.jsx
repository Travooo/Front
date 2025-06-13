import React, { useState, useEffect } from "react";

const LocalInfo = () => {
  const [servico, setServico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const organizacaoId = parseInt(localStorage.getItem('organizacaoId'));

  useEffect(() => {
    const fetchServico = async () => {
      try {
        if (!organizacaoId) {
          throw new Error("Organização não encontrada");
        }

        const response = await fetch(`http://localhost:3000/rest/v1/servicos/organizacao/${organizacaoId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro ao buscar serviço");
        }

        const data = await response.json();

        if (data.length === 0) {
          setServico(null);
        } else {
          setServico(data[0]);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServico();
  }, [organizacaoId, token]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
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

      {/* <div className="w-full lg:w-96">
        <img src="/imagens/restaurante_ilha.jpg" alt="Foto do local" className="rounded-lg object-cover w-full h-64" />
      </div> */}
    </section>
  );
};

export default LocalInfo;
