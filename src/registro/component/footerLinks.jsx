import { Link } from "react-router-dom";
import React from "react";

const FooterLinks = () => {
  return (
    <section className="space-y-2 text-base text-white-700 font-semibold mt-10">
      <p><Link to="/loginUser" className="text-white-600">Logar?</Link></p>
    
    </section>
  );
};

export default FooterLinks;
