import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FooterLinks from "./footerLinks";

function RegisterForm() {
  const [backendErrors, setBackendErrors] = useState([]);
  const [formData, setFormData] = useState({
    nome_fantasia: "",
    telefone: "",
    email: "",
    senha: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [errorEmail, setErrorEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "email") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (isEmailValid(value)) {
        setErrorEmail("");
      } else {
        setErrorEmail("Email inválido.");
      }
    } else if (name === "telefone") {
      const telefoneFormatado = formatarTelefone(value);
      setFormData((prev) => ({
        ...prev,
        telefone: telefoneFormatado,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };  

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const formatarTelefone = (valor) => {
    const numero = valor.replace(/\D/g, "");
  
    if (numero.length <= 10) {
      return numero.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      return numero.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
  };  

  const handleSubmit = async (e) => {
    setBackendErrors([]);
    e.preventDefault();

    if (
      !formData.nome_fantasia ||
      !formData.telefone ||
      !formData.email ||
      !formData.senha ||
      !formData.confirmPassword
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    if (!isEmailValid(formData.email)) {
      setErrorEmail("Email inválido.");
      return;
    }
    setErrorEmail("");

    if (formData.senha !== formData.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    console.log("Dados validados:", formData);
    try {
      const response = await fetch("http://localhost:3000/rest/v1/usuariosOrg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_fantasia: formData.nome_fantasia,
          telefone: formData.telefone,
          email: formData.email,
          senha: formData.senha,
        }),
      });

      const dados = await response.json();
      console.log("Resposta do servidor:", dados);
      if (!response.ok) {
        if (dados.errors) {
          setBackendErrors(dados.errors);
        } else {
          setBackendErrors([dados.mensagem || "Erro ao registrar"]);
        }
        return;
      }

      alert("Usuário registrado com sucesso!");
      navigate("/loginUser");
    } catch (err) {
      alert(err.message);
    }
  };

  const inputStyle = "w-full px-3 pt-4 p-2 pb-1 text-base border border-white rounded bg-[#333] text-white peer focus:outline-none focus:ring-2 focus:ring-[#00dac1] focus:border-transparent";
  const inputLabelStyle = `absolute left-3 text-base text-gray-400 duration-150 transform origin-[0] pointer-events-none transition-all
    peer-placeholder-shown:top-1/2 
    peer-placeholder-shown:-translate-y-1/2 
    peer-placeholder-shown:scale-100
    peer-focus:top-0 
    peer-focus:translate-y-0 
    peer-focus:scale-75
    ${formData.nome_fantasia !== '' ? 'top-0 translate-y-0 scale-75' : ''}
  `;

  return (
    <div className="w-full max-w-[330px] h-auto text-center p-6 bg-[rgba(0,0,0,0.7)] rounded-[10px] shadow-[0_0_10px_rgba(233,233,233,0.621)] text-white">
      <div className="relative -mt-8 mb-1 w-28 h-20 mx-auto">
        <img src="/imagens/icone_travo.png" alt="Logo TRAVO" width={110} height={110} className="mx-auto" />
      </div>

      <h1 className="text-2xl font-semibold mb-6 text-white">Crie sua conta</h1>

      <FooterLinks />

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-3 relative">
          <label className="block text-left text-[15px] mb-0.5" htmlFor="nome_fantasia">Nome</label>
          <div className="relative">
            <input
              type="text"
              id="nome_fantasia"
              name="nome_fantasia"
              value={formData.nome_fantasia}
              onChange={handleChange}
              className={inputStyle}
              placeholder=" "
              required
            />
            <label 
            htmlFor="nome_fantasia" 
            className={inputLabelStyle}
            >
              Digite o nome da organização
            </label>
          </div>
        </div>

        <div className="mb-3 relative">
          <label className="block text-left text-[15px] mb-0.5" htmlFor="telefone">Telefone</label>
          <div className="relative">
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className={inputStyle}
              placeholder=" "
              required
            />
            <label
              htmlFor="telefone"
              className={`${inputLabelStyle} ${formData.telefone !== '' ? 'top-0 translate-y-0 scale-75' : ''}`}
            >
              Digite seu telefone
            </label>
          </div>
        </div>

        <div className="mb-3 relative">
          <label className="block text-left text-[15px] mb-0.5" htmlFor="email">Email</label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${inputStyle} ${errorEmail ? 'border-red-500' : ''}`}
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className={`${inputLabelStyle} ${formData.email !== '' ? 'top-0 translate-y-0 scale-75' : ''} ${errorEmail ? 'text-red-400' : ''}`}
            >
              {errorEmail || 'Digite seu melhor email'}
            </label>
          </div>
        </div>

        <div className="mb-3 relative">
          <label className="block text-left text-[15px] mb-0.5" htmlFor="senha">Senha</label>
          <div className="relative">
            <input
              type={showPassword ? "password" : "text"}
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className={inputStyle}
              placeholder=" "
              required
            />
            <label
              htmlFor="senha"
              className={inputLabelStyle}
            >
              Digite sua senha
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>

          <div className="mt-1 relative">
            <input
              type={showConfirmPassword ? "password" : "text"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputStyle}
              placeholder=""
              required
            />
            <label 
            htmlFor="confirmPassword" 
            className={inputLabelStyle}
            >
              Confirme sua senha
            </label>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
    {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        {backendErrors.length > 0 && (
          <div className="mb-4 text-left text-sm text-red-400">
            <ul className="list-disc list-inside">
              {backendErrors.map((erro, idx) => (
                <li key={idx}>{erro}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="w-full h-10 bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 rounded-md transition-colors"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}


export default RegisterForm;
