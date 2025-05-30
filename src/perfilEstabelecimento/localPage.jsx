import React from "react";
import Header from "../components/header";
import LocalInfo from "./components/localInfo";
import ReviewsSection from "./components/reviewsSection";
import CouponCards from "./components/couponCards";
import FooterLinks from "./components/footerLinks";
import ServicosSection from "./components/servicosSection";

export default function LocalPage() {
  const token = localStorage.getItem('token'); //TOKEN DE ACESSO
  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="p-6 max-w-screen-xl w-full mx-auto space-y-10">
        <LocalInfo />
        <ServicosSection />
        <ReviewsSection />
        <CouponCards />
        <FooterLinks />
      </main>
    </div>
  );
}
