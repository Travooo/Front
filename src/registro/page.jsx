import React from "react";
import RegisterForm from "./component/register-form"; 

const RegisterPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/imagens/fundo_login.jpg')" }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
