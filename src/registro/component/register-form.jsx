import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom";

import FooterLinks from "./footerLinks";


function RegisterForm() {
  const [formData, setFormData] = useState({
    nome_completo: "",
    nome_usuario: "",
    data_nascimento: "",
    email: "",
    senha: "",
    confirmPassword: "",
    //tipo: "usuario"
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorDataNascimento, setErrorDataNascimento] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const navigate = useNavigate();
  //const tipos = [
    //{ label: 'Usuário', value: 'usuario' },
    //{ label: 'Estabelecimento', value: 'servico' }
  //];

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "data_nascimento") {
      let onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length > 8) {
        onlyNumbers = onlyNumbers.slice(0, 8);
      }
      let masked = onlyNumbers;
      if (onlyNumbers.length >= 5) {
        masked = `${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(2, 4)}/${onlyNumbers.slice(4)}`;
      } else if (onlyNumbers.length >= 3) {
        masked = `${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(2)}`;
      }
      setFormData((prev) => ({
        ...prev,
        [name]: masked,
      }));
      // Verifique a validade da data após a mudança
      if (isDateValid(masked)) {
        setErrorDataNascimento(""); // Se válido, limpe o erro
      } else {
        setErrorDataNascimento("Data inválida. OBS: Mínimo 6 anos.");
      }
    } else if (name === "email") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (isEmailValid(value)) {
        setErrorEmail("");
      } else {
        setErrorEmail("Email inválido.");
      }
    //} else if (name === "tipo") {
      //setFormData((prev) => ({
        //...prev,
        //tipo: value
      //}));
      //return;
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const isDateValid = (data) => {
    const [dia, mes, ano] = data.split("/").map(Number);
    const nascimento = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    const diffAnos = hoje.getFullYear() - nascimento.getFullYear();
    const isValid = diffAnos > 6 ||
      (diffAnos === 6 &&
        (hoje.getMonth() > nascimento.getMonth() ||
          (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() >= nascimento.getDate())));
    return (
      data.length === 10 &&
      !isNaN(nascimento.getTime()) &&
      isValid
    );
  };

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.nome_completo || !formData.nome_usuario || !formData.data_nascimento || !formData.email || !formData.senha || !formData.confirmPassword /* || !formData.tipo */) {
      alert("Preencha todos os campos.")
      return
    }

    if (!isDateValid(formData.data_nascimento)) {
      setErrorDataNascimento("A data deve ser válida e do passado, com ao menos 6 anos.");
      return;
    }
    setErrorDataNascimento("");

    if (!isEmailValid(formData.email)) {
      setErrorEmail("Email inválido.");
      return;
    }
    setErrorEmail("");

    if (formData.senha !== formData.confirmPassword) {
      alert("As senhas não coincidem.")
      return
    }

    console.log("Dados validados:", formData);
    try {
      const response = await fetch("http://localhost:3000/rest/v1/usuarios", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          nome_completo: formData.nome_completo,
          nome_usuario: formData.nome_usuario,
          data_nascimento: formData.data_nascimento,
          email: formData.email,
          senha: formData.senha,
          //tipo: formData.tipo,
        }),
      })
      const dados = await response.json()
      console.log("Status:", dados.status)
      console.log("Resposta do servidor:", dados)
      if (!response.ok) {
        throw new Error(dados.message || "Erro ao registrar")
      }
      alert("Usuário registrado com sucesso!")
      const token = response.token;
      localStorage.setItem('token', token);
      navigate("/painel");
    } catch (err) {
      alert(err.message)
    }
  }

  const inputStyle = "w-full px-3 pt-4 p-2 pb-1 text-base border border-white rounded bg-[#333] text-white peer focus:outline-none focus:ring-2 focus:ring-[#00dac1] focus:border-transparent";
  const inputLabelStyle = `absolute left-3 text-base text-gray-400 duration-150 transform origin-[0] pointer-events-none transition-all
    peer-placeholder-shown:top-1/2 
    peer-placeholder-shown:-translate-y-1/2 
    peer-placeholder-shown:scale-100
    peer-focus:top-0 
    peer-focus:translate-y-0 
    peer-focus:scale-75
    ${formData.nome_usuario !== '' ? 'top-0 translate-y-0 scale-75' : ''}
  `;



  return (
    <div className="w-full max-w-[330px] h-auto max-h-[97] overflow-auto text-center p-6 bg-[rgba(0,0,0,0.7)] rounded-[10px] shadow-[0_0_10px_rgba(233,233,233,0.621)] text-white">
      <div className="relative -mt-8 mb-1 w-28 h-20 mx-auto">
        <img src="/imagens/icone_travo.png" alt="Logo TRAVO" width={110} height={110} className="mx-auto" />
      </div>

      <h1 className="text-2xl font-semibold mb-6 text-white">Crie sua conta</h1>

      <FooterLinks/>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-3 relative">
          <label className="block text-left text-[15px] mb-0.5" htmlFor="nome_completo">Nome</label>
          <div className="relative">
            <input
              type="text"
              id="nome_completo"
              name="nome_completo"
              value={formData.nome_completo}
              onChange={handleChange}
              className= { inputStyle }
              placeholder=" "
              required
            />
            <label
              htmlFor="nome_completo"
              className={inputLabelStyle}
            >
            Digite seu nome completo
            </label>
          </div>
        </div>

        <div className="mb-3 relative">
          <label className="block text-left text-[15px] mb-0.5" htmlFor="nome_usuario">Nome de usuário</label>
          <div className="relative">
            <input
              type="text"
              id="nome_usuario"
              name="nome_usuario"
              value={formData.nome_usuario}
              onChange={handleChange}
              className= { inputStyle }
              placeholder=" "
              required
            />
            <label
              htmlFor="nome_usuario"
              className={inputLabelStyle}
            >
              Digite seu nome público
            </label>
          </div>
        </div>

        <div className="mb-3 relative">
          <label className="block text-left text-[15px] mb-0.5" htmlFor="data_nascimento">Data de nascimento</label>
          <div className="relative">
            <input
              type="text"
              id="data_nascimento"
              name="data_nascimento"
              value={formData.data_nascimento}
              onChange={handleChange}
              className= { `${inputStyle} ${errorDataNascimento ? 'border-red-500' : ''}` }
              maxLength={10}
              placeholder=" "
              required

            />
            <label
              htmlFor="data_nascimento"
              className={`${inputLabelStyle} ${formData.data_nascimento !== '' ? 'top-0 translate-y-0 scale-75' : ''} ${errorDataNascimento ? 'text-red-400' : ''}`}
            >
              {errorDataNascimento || 'Digite sua data de nascimento'}
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
              className= {`${inputStyle} ${errorEmail ? 'border-red-500' : ''}`}
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
              type={showPassword ? "text" : "senha"}
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className= { inputStyle }
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

          <div className="mt-1 relative" htmlFor="confirmPassword">
            <input
              type={showConfirmPassword ? "text" : "confirmPassword"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className= { inputStyle }
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

        <button
          type="submit"
          className="w-full h-10 bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 rounded-md transition-colors"
        >
          Registrar
        </button>
      </form> 
    </div>
  )
}


export default RegisterForm
