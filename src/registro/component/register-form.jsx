import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"



function RegisterForm() {
  const [formData, setFormData] = useState({
    nome_completo: "",
    nome_usuario: "",
    data_nascimento: "",
    email: "",
    senha: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorDataNascimento, setErrorDataNascimento] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.nome_completo || formData.nome_usuario || formData.data_nascimento || !formData.email || !formData.senha || !formData.confirmPassword) {
      alert("Preencha todos os campos.")
      return
    }

    if (!isDateValid(formData.data_nascimento)) {
      setErrorDataNascimento("A data deve ser válida e do passado, com ao menos 6 anos.");
      return;
    }
    setErrorDataNascimento("");

    if (formData.senha !== formData.confirmPassword) {
      alert("As senhas não coincidem.")
      return
    }

    console.log("Dados validados:", formData);
    try {
      const response = await fetch("http://localhost:3000/rest/v1/cadastro", {
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
        }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        console.log("Status:", errorData.status)
        console.log("Resposta do servidor:", errorData)
        throw new Error(errorData.message || "Erro ao registrar")
      }
      alert("Usuário registrado com sucesso!")
      setFormData({
        nome_completo: "",
        email: "",
        senha: "",
        confirmPassword: "",
      })
    } catch (err) {
      alert(err.message)
    }
  }

  const inputStyle = "w-full px-3 pt-4 p-3 pb-1 text-base border border-white rounded bg-[#333] text-white peer focus:outline-none focus:ring-2 focus:ring-[#00dac1] focus:border-transparent";
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
    <div className="w-full max-w-[330px] mx-auto text-center p-4 bg-[rgba(0,0,0,0.7)] rounded-[10px] shadow-[0_0_10px_rgba(233,233,233,0.621)] text-white">
      <div className="relative w-28 h-28 mx-auto mb-4">
        <img src="/imagens/icone_travo.png" alt="Logo TRAVO" width={110} height={110} className="mx-auto" />
      </div>

      <h1 className="text-2xl font-semibold mb-6 text-white">Crie sua conta</h1>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4 relative">
          <label className="block text-left mb-1">Nome</label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="nome_completo"
              value={formData.nome_completo}
              onChange={handleChange}
              className= { inputStyle }
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className={inputLabelStyle}
            >
            Digite seu nome completo
            </label>
          </div>
        </div>

        <div className="mb-4 relative">
          <label className="block text-left mb-1">Nome de usuário</label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="nome_usuario"
              value={formData.nome_usuario}
              onChange={handleChange}
              className= { inputStyle }
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className={inputLabelStyle}
            >
              Digite seu nome público
            </label>
          </div>
        </div>

        <div className="mb-4 relative">
          <label className="block text-left mb-1">Email</label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange} 
              className= { inputStyle }
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className={inputLabelStyle}
            >
              Digite seu melhor email
            </label>
          </div>
        </div>

        <div className="mb-4 relative">
          <label className="block text-left mb-1">Senha</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className= { inputStyle }
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
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
          <div className="mt-2 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className= { inputStyle }
              placeholder=" "
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
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-md transition-colors"
        >
          Registrar
        </button>
      </form> 
    </div>
  )
}

export default RegisterForm
