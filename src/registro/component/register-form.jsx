"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode adicionar validação e lógica para enviar os dados
    console.log("Dados do formulário:", formData)
    // Implementar redirectToConfirmation() aqui
  }

  return (
    <div className="w-full max-w-[330px] mx-auto text-center p-4 bg-[rgba(110,110,110,0.637)] rounded-[10px] shadow-[0_0_10px_rgba(233,233,233,0.621)] text-white">
      <div className="relative w-28 h-28 mx-auto mb-4">
        <img src="/imagens/icone_travo.png" alt="Logo TRAVO" width={110} height={110} className="mx-auto" />
      </div>

      <h1 className="text-2xl font-semibold mb-6 text-white">Crie sua conta</h1>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4 relative">
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-4 border border-[#aeaeae] rounded-md peer pt-6 bg-[#e3e3e6] text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-700 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Nome
            </label>
          </div>
        </div>

        <div className="mb-4 relative">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-4 border border-[#aeaeae] rounded-md peer pt-6 bg-[#e3e3e6] text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-700 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Email
            </label>
          </div>
        </div>

        <div className="mb-4 relative">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-4 border border-[#aeaeae] rounded-md peer pt-6 bg-[#e3e3e6] text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-700 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Senha
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
        </div>

        <div className="mb-4 relative">
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-4 border border-[#aeaeae] rounded-md peer pt-6 bg-[#e3e3e6] text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder=" "
              required
            />
            <label
              htmlFor="confirmPassword"
              className="absolute text-sm text-gray-700 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
            >
              Confirmar Senha
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
