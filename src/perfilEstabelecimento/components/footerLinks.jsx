import { Link } from "react-router-dom";
import React from "react";

const FooterLinks = () => {
  return (
    <section className="space-y-2 text-base text-red-700 font-semibold mt-10">
      <p>Histórico de Cupons: <Link to="/meus-cupons" className="text-red-600 underline">Promoções aplicadas anteriormente</Link></p>
    
    </section>
  );
};

export default FooterLinks;
