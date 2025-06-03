'use client'
import React, { useState } from "react";
import Header from "../components/header";
import { useEffect } from "react";
import CouponForm from "./components/couponForm";
import CouponList from "./components/couponList";


const CuponsPage = () => {
  const token = localStorage.getItem('token'); //TOKEN DE ACESSO
  const organizacaoId = parseInt(localStorage.getItem('organizacaoId')); //ID ORGANIZAÇÃO
  const [coupons, setCoupons] = useState([]);
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
        setCoupons(coupons.map(c => (c.id === newCoupon.id ? updatedCupom : c)));

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
        setCoupons([...coupons, { ...savedCupom, enabled: true }]);


        console.log("Cupom salvo no backend:", savedCupom);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
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

    fetchCupons();
  }, []);

  const handleEditCoupon = (coupon) => {
    // Quando seleciona um cupom para edição, normaliza os dados para o formulário
    setEditingCoupon({
      id: coupon.id,
      nome: coupon.nome,
      descricao: coupon.descricao,
      expiration: coupon.expiration,
      // a API retorna "estabelecimento_id", mas o formulário espera
      // o campo "estabelecimento"
      estabelecimento: coupon.estabelecimento_id,
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

  const [editingCoupon, setEditingCoupon] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="flex flex-col md:flex-row p-6 gap-6">
        {/* Formulário de Cupom */}
        <div className="w-full md:w-1/2">
          <CouponForm
            onSave={handleSaveCoupon}
            editingCoupon={editingCoupon}
            setEditingCoupon={setEditingCoupon}
          />
        </div>

        {/* Lista de Cupons */}
        <div className="w-full md:w-1/2">
          <CouponList
            coupons={coupons}
            onEdit={handleEditCoupon}
            onToggle={handleToggleCoupon}
            onDelete={handleDeleteCoupon}
          />
        </div>
      </main>
    </div>
  );
};

export default CuponsPage;
