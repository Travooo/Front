import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FooterLinks from "./footerLinks";
import './rainbow-border.css';

function RegisterForm() {
  const [backendErrors, setBackendErrors] = useState([]);
  const [formData, setFormData] = useState({
    nome_fantasia: "",
    telefone: "",
    email: "",
    senha: "",
    confirmPassword: "",
  });

  const [nomeError, setNomeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const navigate = useNavigate();

  const getInputStyle = (fieldName, error = null) => {
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

  const getLabelStyle = (fieldName, error = null) => {
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

    const isFilled = formData[fieldName] !== "";
    const filledStyle = isFilled ? "top-0 translate-y-0 scale-75" : "";
    const errorStyle = error ? "text-red-400" : "text-gray-200";

    return [...baseStyle, filledStyle, errorStyle].join(" ");
  };

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const formatarTelefone = (valor) => {
    const numero = valor.replace(/\D/g, "").slice(0, 11);

    if (numero.length <= 10) {
      return numero.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, a, b, c) =>
        [a && `(${a}`, b && `) ${b}`, c && `-${c}`].filter(Boolean).join("")
    )}

    return numero.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (_, a, b, c) =>
      [a && `(${a}`, b && `) ${b}`, c && `-${c}`].filter(Boolean).join("")
  )};

  const isFormDataValid = () => {
    const phoneDigits = formData.telefone.replace(/\D/g, "");
    return (
      formData.nome_fantasia &&
      formData.email &&
      isEmailValid(formData.email) &&
      formData.telefone &&
      phoneDigits.length >= 10 && 
      phoneDigits.length <= 11 &&
      formData.senha &&
      formData.senha.length >= 6 &&
      formData.confirmPassword &&
      formData.confirmPassword === formData.senha
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendErrors([]);
    if (!isFormDataValid()) {
      alert("Preencha todos os campos corretamente.");
      return;
    }
    //console.log("Dados validados:", formData);

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
      //console.log("Resposta do servidor:", dados);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "telefone") {
      const telefoneFormatado = formatarTelefone(value);
      setFormData((prev) => ({
        ...prev,
        telefone: telefoneFormatado
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "nome_fantasia") {
      if (!value) {
        setNomeError("Nome inválido.");
      } else {
        setNomeError("");
      }
    }

    if (name === "email") {
      if (!value) {
        setEmailError("Email inválido.");
      } else {
        setEmailError(isEmailValid(value) ? "" : "Email inválido.");
      }
    }

    if (name === "telefone") {
      const digits = value.replace(/\D/g, "").length;
      if (!value) {
        setPhoneError("Telefone inválido.");
      } else {
        setPhoneError(digits >= 10 && digits <= 11 ? "" : "Telefone inválido.");
      }
    }

    if (name === "senha") {
      if (!value) {
        setPasswordError("Senha inválida.");
      } else {
        setPasswordError(value.length < 6 ? "Senha deve possuir 6 caracteres." : "");
      }
      if (formData.confirmPassword) {
        setConfirmPasswordError(value === formData.confirmPassword ? "" : "Senhas não coincidem.");
      }
    }

    if (name === "confirmPassword") {
      if (!value) {
        setConfirmPasswordError("Senha inválida.");
      } else if (value.length < 6) {
        setConfirmPasswordError("Senha deve possuir 6 caracteres.");
      } else if (formData.senha !== value) {
        setConfirmPasswordError("Senhas não coincidem.");
      } else {
        setConfirmPasswordError("");
      }
    }
  };
  
  return (
    <div className="w-[420px] h-[660px] px-12 py-10 border border-[#000000] rounded-3xl text-center bg-[rgba(0,0,0,0.9)] shadow-[0_0_10px_rgba(50,20,0,1)] text-white">
      <div className="relative mt-[-40px] mb-2 w-28 h-20 mx-auto">
        <img src="/imagens/icone_travo.png" alt="Logo TRAVO" width={110} height={110} className="mx-auto" />
      </div>

      <h1 className="text-2xl font-bold mb-12 italic">Crie sua conta</h1>

      <form>
        <div onSubmit={handleSubmit} className="w-full">
          <div className="mb-3 relative">
            <label className="block text-left text-sm text-font-medium mb-0.35 ml-1" htmlFor="nome_fantasia">Nome</label>
            <div className="relative">
              <input
                id="nome_fantasia"
                type="text"
                name="nome_fantasia"
                maxLength={65}
                value={formData.nome_fantasia}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputStyle("nome_fantasia", nomeError)}
                placeholder=" "
                required
              />
              <label htmlFor="nome_fantasia" className={getLabelStyle("nome_fantasia", nomeError)}>
                {nomeError || "Digite o nome da organização:"}
              </label>
            </div>
          </div>

          <div className="mb-3 relative">
            <label className="block text-left text-sm font-medium mb-0.35 ml-1" htmlFor="telefone">Telefone</label>
            <div className="relative">
              <input
                id="telefone"
                type="tel"
                name="telefone"
                inputMode="numeric"
                maxLength={15}
                value={formData.telefone}
                onFocus={(e) => {
                  if (!formData.telefone) {
                    e.target.placeholder = "(  ) _____-____";
                  }
                }}
                onBlur={(e) => {
                  e.target.placeholder = " ";
                  handleBlur(e);
                }}
                onChange={handleChange}
                placeholder=" "
                className={getInputStyle("telefone", phoneError)}
                required
              />
              <label htmlFor="telefone" className={getLabelStyle("telefone", phoneError)}>
                {phoneError || "Digite seu telefone:"}
              </label>
            </div>
          </div>

          <div className="mb-3 relative">
            <label className="block text-left text-sm font-medium mb-0.35 ml-1" htmlFor="email">Email</label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                maxLength={65}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputStyle("email", emailError)}
                placeholder=" "
                required
              />
              <label htmlFor="email" className={getLabelStyle("email", emailError)}>
                {emailError || 'Digite seu email:'}
              </label>
            </div>
          </div>

          <div className="mb-7 relative">
            <label className="block text-left text-sm font-medium mb-0.35 ml-1" htmlFor="senha">Senha</label>
            <div className="relative">
              <input
                id="senha"
                name="senha"
                type={showPassword ? "password" : "text"}
                value={formData.senha}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputStyle("senha", passwordError)}
                placeholder=""
                required
              />
              <label htmlFor="senha" className={getLabelStyle("senha", passwordError)}>
                {passwordError || "Digite sua senha:"}
              </label>
              <button
                type="button"
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
            <div className="mt-2 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "password" : "text"}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputStyle("confirmPassword", confirmPasswordError)}
                placeholder=""
                required
              />
              <label htmlFor="confirmPassword" className={getLabelStyle("confirmPassword", confirmPasswordError)}>
                {confirmPasswordError || "Confirme sua senha:"}
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                aria-label="Mostrar ou ocultar senha"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {backendErrors.length > 0 && (
                <div className="mb-4 text-left text-sm text-red-400">
                  <ul className="list-disc list-inside">
                    {backendErrors.map((erro, idx) => (
                      <li key={idx}>{erro}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="w-[105%] mx-auto mb-2" style={{ transform: 'translateX(-2.5%)' }}>
            <div className={`${isFormDataValid() ? 'rainbow-border' : 'border border-yellow-900 bg-black/20'} rounded-[11px]`}>
              <div className="bg-black rounded-[10px] h-10 flex items-center justify-center">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    if (isFormDataValid()) {
                      handleSubmit(e);
                    } else {
                      alert("Preencha todos os campos corretamente.");
                      handleBlur({ target: { name: "nome_fantasia", value: formData.nome_fantasia } });
                      handleBlur({ target: { name: "email", value: formData.email } });
                      handleBlur({ target: { name: "telefone", value: formData.telefone } });
                      handleBlur({ target: { name: "senha", value: formData.senha } });
                      handleBlur({ target: { name: "confirmPassword", value: formData.confirmPassword } });
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (isFormDataValid()) e.target.style.textShadow = "0 0 5px #c2fcf3";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textShadow = "";
                  }}
                  className={`w-full h-full rounded-[10px] font-medium flex items-center justify-center transition-all duration-300 relative z-10 ${
                    isFormDataValid()
                      ? 'text-white hover:text-[#c2fcf3]'
                      : 'text-yellow-900'
                  }`}
                >
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <FooterLinks />

    </div>
  );
}

export default RegisterForm;
