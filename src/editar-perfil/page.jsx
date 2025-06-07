import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function PgEditLoginAdm() {
  const token = localStorage.getItem("token");
  const usuarioOrgId = localStorage.getItem("organizacaoId"); // ID salvo no login
  const [formData, setFormData] = useState({
    cnpj: "",
    nome_fantasia: "",
    email: "",
    razao_social: "",
    senha: "",
    image: "/imagens/pessoa.jpg",
  });

  useEffect(() => {
    const fetchUsuarioOrg = async () => {
      if (!usuarioOrgId || !token) return;

      try {
        const response = await fetch(`http://localhost:3000/rest/v1/usuariosOrg/${usuarioOrgId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Erro ao buscar dados do usuário.");
          return;
        }

        const data = await response.json();
        if (data) {
          setFormData(prev => ({
            ...prev,
            ...data,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchUsuarioOrg();
  }, [usuarioOrgId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioOrgId || !token) {
      alert("ID ou token não encontrado.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/rest/v1/usuariosOrg/${usuarioOrgId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          cnpj: formData.cnpj,
          nome_fantasia: formData.nome_fantasia,
          email: formData.email,
          razao_social: formData.razao_social,
          senha: formData.senha,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Erro ao atualizar:", error);
        alert("Erro ao salvar alterações.");
        return;
      }

      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar PATCH:", error);
      alert("Erro ao salvar perfil.");
    }
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
                type="text"
                name="nome_fantasia"
                value={formData.nome_fantasia}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Razão Social</label>
              <input
                id="razao_social"
                type="text"
                name="razao_social"
                value={formData.razao_social}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/*<div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>*/}
          </div>

          {/* Botões */}
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
