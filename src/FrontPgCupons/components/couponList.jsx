import React from "react";

const CouponList = ({ coupons, onEdit, onToggle }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Gerenciar Cupons</h2>
      <div className="flex flex-col gap-4">
        {coupons.map(coupon => (
          <div
            key={coupon.id}
            className={`p-4 rounded-md flex justify-between items-center ${
              coupon.enabled ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <div>
              <h3 className="font-semibold">{coupon.name}</h3>
              <p className="text-gray-600 text-sm">Expira em: {coupon.expiration}</p>
              <p className="text-gray-600 text-sm">Desconto: {coupon.discount}%</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(coupon)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Editar
              </button>
              <button
                onClick={() => onToggle(coupon.id)}
                className={`border-2 px-4 py-1 rounded ${
                  coupon.enabled ? "border-green-600 text-green-600" : "border-red-600 text-red-600"
                }`}
              >
                {coupon.enabled ? "Desativar" : "Ativar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponList;
