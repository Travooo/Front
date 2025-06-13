import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Eye, EyeOff } from "lucide-react";
import FooterLinks from "./components/footerLinks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/rainbow-border.css';


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const isFormDataValid = () => {
    return (
      email && isEmailValid(email) && senha && senha.length >= 6
    );
  };


  const getInputStyle = (error = null) => {
    const baseStyle = [
      "w-full",
      "px-3 pt-4 p-2 pb-1",
      "text-base",
      "border border-[#e8e7ac]",
      "rounded-lg",
      "bg-[#333]/60",
      "text-white",
      "peer",
      "focus:outline-none",
      "focus:ring-2 focus:ring-[#c2fcf3]",
      "focus:border-transparent"
    ];
    const borderColor = error ? "border-red-500" : "border-yellow-200";
    return [...baseStyle, borderColor].join(" ");
  };

  const getLabelStyle = (value, error = null) => {
    const baseStyle = [
      "absolute left-3 text-base italic",
      "duration-150 transform origin-[0]",
      "pointer-events-none transition-all",
      "peer-placeholder-shown:top-1/2",
      "peer-placeholder-shown:-translate-y-1/2",
      "peer-placeholder-shown:scale-100",
      "peer-focus:top-0",
      "peer-focus:translate-y-0",
      "peer-focus:scale-75"
    ];

    const isFilled = value !== "";
    const filledStyle = isFilled ? "top-0 translate-y-0 scale-75" : "";
    const errorStyle = error ? "text-red-400" : "text-gray-200";

    return [...baseStyle, filledStyle, errorStyle].join(" ");
  };


  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (value) {
        setEmailError(isEmailValid(value) ? "" : "Email inválido.");
      } else {
        setEmailError();
      }
    }

    if (name === "senha") {
      if (value) {
        setPasswordError(value.length < 6 ? "Senha deve possuir 6 caracteres." : "");
      } else {
        setPasswordError("");
      }
    }
  }

  const getUserIdFromToken = (token) => {
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.id;
    } catch (err) {
      console.error("Token inválido:", err);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const response = await fetch("http://localhost:3000/rest/v1/usuariosOrg/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email, 
          senha: senha,
         }),
      });
      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem('token', token);
        const organizacaoId = getUserIdFromToken(token);
        localStorage.setItem('organizacaoId', parseInt(organizacaoId));
        toast.success("Login bem-sucedido!", {
          onClose: () => navigate("/dashboard")
        });
      } else {
        const msg = data.mensagem?.toLowerCase() || "";
        if (msg.includes("email")) {
          setEmailError(data.mensagem);
        } else if (msg.includes("senha")) {
          setPasswordError(data.mensagem);
        } else {
          setLoginError(data.mensagem || "Erro desconhecido.");
        }
        setLoginError(data.mensagem || "Email ou senha incorretos!");
      }
    } catch (err) {
      setLoginError("Erro na requisição. Verifique sua conexão ou tente novamente.", err.message);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/imagens/fundo_login.jpg')" }}>
      
      <div className="w-[420px] px-12 py-10 border border-[#000000] rounded-3xl text-center bg-[rgba(0,0,0,0.9)] shadow-[0_0_10px_rgba(50,20,0,1)]">
        <div className="relative mt-[-40px] mb-2 w-28 h-20 mx-auto">
          <img src="/imagens/icone_travo.png" alt="Logo TRAVO" width={110} height={110} className="mx-auto" />
        </div>

        <h1 className="text-2xl font-bold mb-14 italic">Acesse sua conta</h1>

        <form onSubmit={handleLogin}>
          <label className="block text-left text-sm font-medium mb-0.35 ml-1" htmlFor="nome_fantasia">Email</label>
          <div className="mb-3 relative">
            <input
              id="email"
              name="email"
              type="email"
              maxLength={65}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              onBlur={handleBlur}
              className={getInputStyle(emailError)}

              placeholder=" "
              required
            />
            <label htmlFor="email" className={getLabelStyle(email, loginError)}>
              Email:
            </label>
          </div>

          <label className="block text-left text-sm font-medium mb-0.35 ml-1" htmlFor="nome_fantasia">Senha</label>
          <div className="mb-3 relative">
            <input
              id="senha"
              name="senha"
              type={showPassword ? "password" : "text"}
              value={senha}
              onChange={(e) => setPassword(e.target.value)}
              className={getInputStyle(loginError)}
              placeholder=" "
              required
            />
            <label htmlFor="senha" className={getLabelStyle(senha, passwordError)}>
              Senha:
            </label>
            <button
              type="button"
              disabled={!isFormDataValid()}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              aria-label="Mostrar ou ocultar senha"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-start gap-2 text-sm mb-4 ml-1">
            <input type="checkbox" id="remember" className="accent-yellow-400" />
            <label htmlFor="remember">Lembrar-me</label>
            {/*TODO: Implementar lembrar-me para navegador*/} 
          </div>

          {loginError && (
            <div className="mb-4 text-left text-sm text-red-400">
              {loginError}
            </div>
          )}

          <div className="w-[105%] mx-auto mb-4" style={{ transform: 'translateX(-2.5%)' }}>
            <div className={`${isFormDataValid() ? 'rainbow-border' : 'border border-yellow-900 bg-black/20'} rounded-[11px]`}>
              <div className="bg-black rounded-[10px] h-10 flex items-center justify-center">
                <button
                  disabled={!isFormDataValid()}
                  type="submit"
                  onMouseEnter={(e) => {
                    if (isFormDataValid()) e.target.style.textShadow = "0 0 5px #c2fcf3";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = "";
                  }}
                  className={`w-full h-full rounded-[10px] font-medium flex items-center justify-center transition-all duration-300 relative z-10 ${
                    isFormDataValid()
                      ? 'text-white hover:text-[#c2fcf3]'
                      : 'text-yellow-900 cursor-not-allowed'
                  }`}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>

        <FooterLinks />
        <ToastContainer 
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

      </div>
    </main>
  );
}
