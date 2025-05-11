import React, { useState, useEffect } from "react";

const CouponForm = ({ onSave, editingCoupon, setEditingCoupon }) => {
  const [nome, setName] = useState("");
  const [descricao, setDiscount] = useState("");
  const [expiration, setExpiration] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (editingCoupon) {
      setName(editingCoupon.nome);
      setDiscount(editingCoupon.descricao);
      setExpiration(editingCoupon.expiration);
      setEnabled(editingCoupon.enabled);
    }
  }, [editingCoupon]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: editingCoupon?.id, nome, descricao, expiration, enabled });
    setName("");
    setDiscount("");
    setExpiration("");
    setEnabled(false);
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

        <input
          type="date"
          placeholder="Data de validade"
          className="border p-2 rounded"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
          required
        />

        <div className="flex items-center gap-2">
          <label>Ativar Cupom</label>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="w-5 h-5"
          />
        </div>

        <button type="submit" className="bg-red-500 text-white py-2 rounded hover:bg-red-600">
          {editingCoupon ? "Salvar Alterações" : "Salvar Cupom"}
        </button>
      </form>
    </div>
  );
};

export default CouponForm;
