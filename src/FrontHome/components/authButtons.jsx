import React from "react";
import { useNavigate } from "react-router-dom";

const AuthButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-3 items-center text-base leading-none w-full justify-end">
      <button 
      onClick={() => navigate("/loginUser")}
      className="flex-1 p-2 bg-amber-500 rounded-lg border border-solid border-neutral-500 text-stone-900 hover:bg-amber-600 transition-colors">
        Logar
      </button>
      <button onClick={() => navigate("/registro")} 
      className="flex-1 p-2 bg-zinc-800 rounded-lg border border-solid border-zinc-800 text-neutral-100 hover:bg-zinc-700 transition-colors">
        Cadastrar
      </button>
    </div>
  );
};

export default AuthButtons;
