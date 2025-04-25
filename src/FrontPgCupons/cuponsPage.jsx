'use client'
import React, { useState } from "react";
import Header from "../components/header";
import CouponForm from "./components/couponForm";
import CouponList from "./components/couponList";


const CuponsPage = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, name: "Promoção Verão", discount: 10, expiration: "2024-07-31", enabled: true },
    { id: 2, name: "Desconto Natal", discount: 20, expiration: "2024-12-25", enabled: false },
  ]);

  const handleSaveCoupon = (newCoupon) => {
    if (newCoupon.id) {
      // Editar cupom existente
      setCoupons(coupons.map(c => (c.id === newCoupon.id ? newCoupon : c)));
    } else {
      // Adicionar novo cupom
      const id = coupons.length ? Math.max(...coupons.map(c => c.id)) + 1 : 1;
      setCoupons([...coupons, { ...newCoupon, id }]);
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
