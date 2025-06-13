import { Link } from "react-router-dom";
import React from "react";

const FooterLinks = () => {
  return (
    <section className="space-y-2 text-base font-medium">
      <p>
        Você está procurando:{" "}
        <Link 
          to="/registerUser" 
          className="text-[#c4fcf0] transition duration-300 hover:text-[#00dac1]"
          onMouseEnter={(e) => {
            e.target.style.textShadow = "0 0 5px #00dac1";
          }}
          onMouseLeave={(e) => {
            e.target.style.textShadow = "0 0 0px #00dac1";
          }}
        >
          Registrar?
        </Link>
      </p>
    
    </section>
  );
};


export default FooterLinks;
