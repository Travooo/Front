import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando o hook de navegação
import FooterLinks from "./components/footerLinks"

export default function LoginForm() {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Criando a função de navegação
  const handleLogin = async (event) => {
    setLoginError("");
    event.preventDefault();
    setError("");

    function getUserIdFromToken(token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = atob(payloadBase64); // Decodifica Base64
        const payload = JSON.parse(payloadJson);
        return payload.id;
      } catch (err) {
        console.error("Token inválido:", err);
        return null;
      }
    }
    try {
      const response = await fetch("http://localhost:3000/rest/v1/usuariosOrg/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        const token  = data.token;
        localStorage.setItem('token', token);
        const organizacaoId = getUserIdFromToken(token)
        localStorage.setItem('organizacaoId', organizacaoId);
        alert("Login bem-sucedido!");
        navigate("/painel");
      } else {
        setLoginError(data.mensagem || "Email ou senha incorretos!");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setLoginError(data.mensagem || "Email ou senha incorretos!");
    }
  };


  return (
    <main className="flex justify-center items-center h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/imagens/fundo_login.jpg')" }}>
      <div className="w-full max-w-xs p-5 bg-gray-700 bg-opacity-80 rounded-lg shadow-lg text-center">
        <img src="/imagens/icone_travo.png" width="110" height="110" className="mb-4 mx-auto" alt="Logo Travo" />
        <form onSubmit={handleLogin}>
          {error && (
            <div className="mb-4 p-2 bg-red-500 text-white rounded">
              {error}
            </div>
          )}
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
              value={senha}
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
          {loginError && (
            <div className="mb-3 text-sm text-red-400 text-left">
              {loginError}
            </div>
          )}
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded">
            Login
          </button>
        </form>
        <FooterLinks />
      </div>
    </main>
  );
}
