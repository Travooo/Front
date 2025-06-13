import React, { useEffect, useState } from "react";
import Header from "../components/header";
import LocalInfo from "./components/localInfo";
import ReviewsSection from "./components/reviewsSection";
import CouponCards from "./components/couponCards";
// import FooterLinks from "./components/footerLinks";
// import ServicosSection from "./components/servicosSection";

export default function LocalPage() {
  const token = localStorage.getItem('token');
  const organizacaoId = parseInt(localStorage.getItem('organizacaoId'));

  const [servico, setServico] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resServico = await fetch(`http://localhost:3000/rest/v1/servicos/organizacao/${organizacaoId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        const servicosData = await resServico.json();
        const servicoEncontrado = servicosData[0];
        setServico(servicoEncontrado);

        if (!servicoEncontrado) {
          console.warn("Nenhum serviço encontrado para essa organização.");
          return;
        }
        const resCupons = await fetch(`http://localhost:3000/rest/v1/cupons`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        const cuponsData = await resCupons.json();

        const cuponsDoEstabelecimento = cuponsData.filter(c => c.estabelecimento_id === servicoEncontrado.id);
        setCoupons(cuponsDoEstabelecimento);

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [organizacaoId, token]);

  if (loading) return <div>Carregando...</div>;
  if (!servico) return <div>Nenhum serviço encontrado.</div>;

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="p-6 max-w-screen-xl w-full mx-auto space-y-10">
        <LocalInfo servico={servico} />
        {/* <ServicosSection /> */}
        <CouponCards coupons={coupons} />
        <ReviewsSection />
        {/* <FooterLinks /> */}
      </main>
    </div>
  );
}
