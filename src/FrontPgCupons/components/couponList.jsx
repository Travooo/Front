const CouponList = ({ coupons, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Gerenciar Cupons</h2>
      <div className="flex flex-col gap-4">
        {coupons.map(coupon => (
          <div
            key={coupon.id}
            className={`p-4 rounded-md flex justify-between items-center ${
              (coupon.enabled ?? true) ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <div>
              <h3 className="font-semibold">{coupon.nome ?? "Cupom sem nome"}</h3>
              <p className="text-gray-600 text-sm">Expira em: {coupon.expiration}</p>
              <p className="text-gray-600 text-sm">Desconto: {coupon.descricao}%</p>
              <p className="text-gray-600 text-sm">Estabelecimento ID: {coupon.estabelecimento_id}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(coupon)}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(coupon.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponList;
