import React from "react";
import RegisterForm from "./component/register-form"; 
import FooterLinks from "./component/footerLinks";

const RegisterPage = () => {
  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center "
      style={{ backgroundImage: "url('/imagens/fundo_login.jpg')" }}
    >
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
