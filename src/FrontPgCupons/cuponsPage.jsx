'use client'
import React, { useState, useEffect } from "react";
import Header from "../components/header";
import CouponForm from "./components/couponForm";
import CouponList from "./components/couponList";

const CuponsPage = () => {
  const token = localStorage.getItem('token'); //TOKEN DE ACESSO
  const organizacaoId = parseInt(localStorage.getItem('organizacaoId')); //ID ORGANIZAÇÃO

  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);

  // NOVOS STATES PARA VALIDAÇÃO
  const [codigoCupom, setCodigoCupom] = useState("");
  const [validacaoResultado, setValidacaoResultado] = useState(null);
  const [validacaoErro, setValidacaoErro] = useState(null);

  const handleSaveCoupon = async (newCoupon) => {
    console.log(organizacaoId)
    if (!organizacaoId) {
      console.error("Usuário não autenticado.");
      return;
    }
    try {
      if (newCoupon.id) {
        const response = await fetch(`http://localhost:3000/rest/v1/cupons/${newCoupon.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            nome: newCoupon.nome,
            estabelecimento_id: newCoupon.estabelecimento,
            descricao: newCoupon.descricao,
            expiration: newCoupon.expiration,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erro ao editar cupom:", errorData);
          return;
        }

        const updatedCupom = await response.json();
        await fetchCupons();
        setEditingCoupon(null);
        console.log("Cupom editado no backend:", updatedCupom);

      } else {
        const response = await fetch("http://localhost:3000/rest/v1/cupons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            nome: newCoupon.nome,
            estabelecimento_id: newCoupon.estabelecimento,
            descricao: newCoupon.descricao,
            expiration: newCoupon.expiration,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erro ao salvar cupom:", errorData);
          return;
        }

        const savedCupom = await response.json();
        console.log("Cupom salvo:", savedCupom);
        await fetchCupons();
        setEditingCoupon(null);
        console.log("Cupom salvo no backend:", savedCupom);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const fetchCupons = async () => {
    try {
      const response = await fetch("http://localhost:3000/rest/v1/cupons", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao buscar cupons:", errorData);
        return;
      }

      const data = await response.json();
      const cuponsComEnabled = data.map(c => ({ ...c, enabled: true })); // para garantir renderização
      setCoupons(cuponsComEnabled);
    } catch (error) {
      console.error("Erro na requisição GET:", error);
    }
  };

  useEffect(() => {
    fetchCupons();
  }, []);

  const handleEditCoupon = (coupon) => {
    setEditingCoupon({
      id: coupon.id,
      nome: coupon.nome,
      descricao: coupon.descricao,
      expiration: coupon.expiration,
      estabelecimento_id: coupon.estabelecimento_id,
    });
  };

  const handleDeleteCoupon = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/rest/v1/cupons/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao deletar cupom:", errorData);
        return;
      }

      setCoupons(coupons.filter(c => c.id !== id));
      console.log("Cupom deletado com sucesso.");
    } catch (error) {
      console.error("Erro na requisição de deleção:", error);
    }
  }

  const handleToggleCoupon = (id) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
  };

  const handleValidateCoupon = async () => {
    setValidacaoResultado(null);
    setValidacaoErro(null);

    if (!codigoCupom) {
      setValidacaoErro("Digite um código para validar.");
      return;
    }

    if (!token) {
      setValidacaoErro("Usuário não autenticado. Faça login novamente.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/rest/v1/cupons/validar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ codigo: codigoCupom.trim() })
      });

      const data = await response.json();

      if (!response.ok || !data.valido) {
        setValidacaoErro(data.mensagem || "Cupom inválido ou já utilizado.");
        return;
      }

      setValidacaoResultado(data);

    } catch (error) {
      console.error("Erro ao validar cupom:", error);
      setValidacaoErro("Erro na requisição. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="flex flex-col md:flex-row p-6 gap-6">

        <div className="w-full md:w-1/2">
          <CouponForm
            onSave={handleSaveCoupon}
            editingCoupon={editingCoupon}
            setEditingCoupon={setEditingCoupon}
            token={token}
            organizacaoId={organizacaoId}
          />
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <CouponList
            coupons={coupons}
            onEdit={handleEditCoupon}
            onToggle={handleToggleCoupon}
            onDelete={handleDeleteCoupon}
          />

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Validar cupom</h2>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código do cupom
            </label>
            <input
              type="text"
              value={codigoCupom}
              onChange={(e) => setCodigoCupom(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Digite o código informado pelo cliente"
            />

            <button
              onClick={handleValidateCoupon}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
            >
              Validar cupom
            </button>

            {validacaoErro && (
              <p className="mt-3 text-sm text-red-600">
                {validacaoErro}
              </p>
            )}

            {validacaoResultado && (
              <div className="mt-4 border-t pt-3">
                <p className="text-sm text-green-700 font-semibold">
                  {validacaoResultado.mensagem || "Cupom aplicado com sucesso!"}
                </p>

                {validacaoResultado.cupom && (
                  <div className="mt-2 text-sm text-gray-800">
                    <p><strong>Nome:</strong> {validacaoResultado.cupom.nome}</p>
                    {validacaoResultado.cupom.descricao && (
                      <p><strong>Descrição:</strong> {validacaoResultado.cupom.descricao}</p>
                    )}
                    {validacaoResultado.cupom.expiration && (
                      <p><strong>Válido até:</strong> {validacaoResultado.cupom.expiration}</p>
                    )}
                  </div>
                )}

                {validacaoResultado.uso && (
                  <div className="mt-2 text-xs text-gray-600">
                    <p>
                      <strong>Resgatado em:</strong>{" "}
                      {validacaoResultado.uso.resgatadoEm || validacaoResultado.uso.resgatado}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CuponsPage;
