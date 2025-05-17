import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";



export default function PgEditLoginAdm() {
  const [cnpj] = useState("");
  const [nome_fantasia, setNome_fantasia] = useState("");
  const [email, setEmail] = useState("");
  const [razao_social, setRazao_social] = useState("");
  const [senha, setSenha] = useState("");
  
  const [formData, setFormData] = useState({
    
    cnpj: cnpj,
    nome_fantasia: nome_fantasia,
    email: email,
    razao_social: razao_social,
    senha: senha,
    image: "/imagens/pessoa.jpg"
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar as alterações
    console.log("Dados atualizados:", formData);
  };

  return (
    <div>
      <Header />
      <main className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-8">Editar Perfil</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Foto de Perfil */}
          <div className="flex flex-col items-center space-y-4">
            <img 
              src={formData.image} 
              alt="Foto de perfil" 
              className="w-32 h-32 rounded-full object-cover"
            />
            <button 
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Alterar Foto
            </button>
          </div>

          {/* Campos do Formulário */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">CNPJ</label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="nome_fantasia"
                name="nome_fantasia"
                onChange={(e) => setNome_fantasia(e.target.value)}
                value={formData.nome_fantasia}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Razão Social</label>
              <input
                type="text"
                name="razao_social"
                value={formData.razao_social}
                onChange={(e) => setRazao_social(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={(e) => setSenha(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
} 