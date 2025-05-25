import React, { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import { useUser } from "../../context/UserContext";

const LocalInfo = () => {
  const [servico, setServico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useUser();

  useEffect(() => {
    const fetchServico = async () => {
      try {
        if (!userId) {
          throw new Error("Usuário não está logado");
        }

        // Buscar o serviço associado ao usuário
        const { data, error } = await supabase
          .from('servicos')
          .select('*')
          .eq('usuario_organizacao_id', userId)
          .single();

        if (error) throw error;
        
        setServico(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServico();
  }, [userId]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!servico) return <div>Nenhum serviço encontrado</div>;

  return (
    <section className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">{servico.nome}</h1>
        <p className="text-red-600 font-semibold">Informações</p>

        <p><strong>Localização:</strong> {servico.cep}</p>

        <p><strong>Descrição:</strong> {servico.sobre}</p>

        <p className="text-sm text-gray-700">
          <strong>Horário de Funcionamento:</strong> {servico.horarios}
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
