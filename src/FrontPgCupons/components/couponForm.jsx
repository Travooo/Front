import React, { useState, useEffect } from "react";
import axios from "axios"; // Vamos supor que você usa axios

const CouponForm = ({ onSave, editingCoupon, setEditingCoupon, token, organizacaoId }) => {
  const [nome, setName] = useState("");
  const [descricao, setDiscount] = useState("");
  const [expiration, setExpiration] = useState("");
  const [estabelecimento_id, setEstabelecimentoID] = useState("");
  const [estabelecimentos, setEstabelecimentos] = useState([]);

  useEffect(() => {
    if (editingCoupon) {
      setName(editingCoupon.nome);
      setDiscount(editingCoupon.descricao);
      setExpiration(editingCoupon.expiration);
      setEstabelecimentoID(editingCoupon.estabelecimento_id);
    }
  }, [editingCoupon]);

  useEffect(() => {
  const fetchEstabelecimentos = async () => {
    try {
      const response = await fetch(`http://localhost:3000/rest/v1/servicos/organizacao/${organizacaoId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setEstabelecimentos(data);
    } catch (error) {
      console.error("Erro ao buscar estabelecimentos:", error);
    }
  };
  fetchEstabelecimentos();
}, [token, organizacaoId]);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: editingCoupon?.id,
      nome,
      descricao,
      expiration,
      estabelecimento: parseInt(estabelecimento_id),
      enabled: true
    });
    setName("");
    setDiscount("");
    setExpiration("");
    setEstabelecimentoID("");
    setEditingCoupon(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">{editingCoupon ? "Editar Cupom" : "Criar Cupom"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome do cupom"
          className="border p-2 rounded"
          value={nome}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Taxa de desconto (%)"
          className="border p-2 rounded"
          value={descricao}
          onChange={(e) => setDiscount(e.target.value)}
          required
          min="0"
          max="100"
        />
        <select
          className="border p-2 rounded"
          value={estabelecimento_id}
          onChange={(e) => setEstabelecimentoID(e.target.value)}
          required
        >
          <option value="">Selecione o estabelecimento</option>
          {estabelecimentos.map((est) => (
            <option key={est.id} value={est.id}>
              {est.nome}
            </option>
          ))}
        </select>

        <input
          type="date"
          placeholder="Data de validade"
          className="border p-2 rounded"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
          required
        />

        <button type="submit" className="bg-red-500 text-white py-2 rounded hover:bg-red-600">
          {editingCoupon ? "Salvar Alterações" : "Salvar Cupom"}
        </button>
      </form>
    </div>
  );
};

export default CouponForm;
