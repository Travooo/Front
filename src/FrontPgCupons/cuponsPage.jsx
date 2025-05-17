'use client'
import React, { useState } from "react";
import Header from "../components/header";
import CouponForm from "./components/couponForm";
import CouponList from "./components/couponList";


const CuponsPage = () => {
  const token = localStorage.getItem('token'); //TOKEN DE ACESSO
  const [coupons, setCoupons] = useState([
    { id: 1, name: "Promoção Verão", discount: 10, expiration: "2024-07-31", enabled: true },
    { id: 2, name: "Desconto Natal", discount: 20, expiration: "2024-12-25", enabled: false },
  ]);
  const handleSaveCoupon = async (newCoupon) => {
    try {
      if (newCoupon.id) {
        const response = await fetch(`http://localhost:3000/rest/v1/cupons/${newCoupon.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estabelecimento_id: newCoupon.estabelecimento_id,
            usuario_id: newCoupon.usuario_id,
            descricao: newCoupon.discount,
            expiration: newCoupon.expiration,
            created_at: newCoupon.created_at || new Date().toISOString()
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
          },
          body: JSON.stringify({
            estabelecimento_id: newCoupon.estabelecimento_id,
            usuario_id: newCoupon.usuario_id,
            descricao: newCoupon.discount,
            expiration: newCoupon.expiration,
            created_at: new Date().toISOString()
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erro ao salvar cupom:", errorData);
          return;
        }
  
        const savedCupom = await response.json();
        setCoupons([...coupons, savedCupom]);
  
        console.log("Cupom salvo no backend:", savedCupom);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  
  

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
  };

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
          />
        </div> 
      </main>
    </div>
  );
};

export default CuponsPage;
