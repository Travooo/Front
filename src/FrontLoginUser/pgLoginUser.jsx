import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando o hook de navegação

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Criando a função de navegação

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/pg_inicial_login/teste_map"); // Melhor forma de navegar (navega paa a página escificada)
  };

  return (
    <main className="flex justify-center items-center h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/imagens/fundo_login.jpg')" }}>
      <div className="w-full max-w-xs p-5 bg-gray-700 bg-opacity-80 rounded-lg shadow-lg text-center">
        <img src="/imagens/icone_travo.png" width="110" height="110" className="mb-4 mx-auto" alt="Logo Travo" />
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="block text-left mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded bg-gray-200 text-gray-900"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-left mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded bg-gray-200 text-gray-900"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <div className="flex items-center mb-3">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember">Lembrar-me</label>
          </div>
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
