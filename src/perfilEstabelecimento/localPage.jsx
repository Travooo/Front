import React, { useEffect, useState } from "react";
import Header from "../components/header";
import LocalInfo from "./components/localInfo";
import ReviewsSection from "./components/reviewsSection";
import CouponCards from "./components/couponCards";
import { useParams } from 'react-router-dom';

export default function LocalPage() {
  const token = localStorage.getItem('token');
  const { id } = useParams();

  const [servico, setServico] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setServico(null);
    setCoupons([]);
    setLoading(true);

    const fetchData = async () => {
      try {
        const resServico = await fetch(`http://localhost:3000/rest/v1/servicos/${id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        const servicoData = await resServico.json();
        setServico(servicoData);

        if (!servicoData) {
          console.warn("Nenhum serviço encontrado para esse ID.");
          return;
        }

        const resCupons = await fetch(`http://localhost:3000/rest/v1/cupons`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        const cuponsData = await resCupons.json();
        const cuponsDoEstabelecimento = cuponsData.filter(c => parseInt(c.estabelecimento_id) === parseInt(servicoData.id));
        setCoupons(cuponsDoEstabelecimento);

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);


  if (loading) return <div>Carregando...</div>;
  if (!servico) return <div>Nenhum serviço encontrado.</div>;

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="p-6 max-w-screen-xl w-full mx-auto space-y-10">
        <LocalInfo servico={servico} />
        <CouponCards coupons={coupons} />
        <ReviewsSection />
      </main>
    </div>
  );
}
