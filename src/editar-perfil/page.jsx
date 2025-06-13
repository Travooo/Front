import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

export default function PgEditLoginAdm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const usuarioOrgId = Number(localStorage.getItem("organizacaoId"));
  console.log('ID usado para buscar usuarioOrg:', usuarioOrgId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    cnpj: "",
    nome_fantasia: "",
    email: "",
    razao_social: "",
    senha: "",
    telefone: "",
    image: "/imagens/pessoa.jpg",
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchUsuarioOrg = async () => {
      if (!usuarioOrgId || !token) {
        navigate("/loginUser");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/rest/v1/usuariosOrg/${usuarioOrgId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do usuário organização.");
        }

        const data = await response.json();
        if (data) {
          setFormData(prev => ({
            ...prev,
            ...data,
          }));
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarioOrg();
  }, [usuarioOrgId, token, navigate]);

  const validateForm = () => {
    const errors = {};

    if (!formData.nome_fantasia || !formData.nome_fantasia.trim()) {
      errors.nome_fantasia = "Nome fantasia é obrigatório";
    }

    if (!formData.email || !formData.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email inválido";
    }

    if (!formData.razao_social || !formData.razao_social.trim()) {
      errors.razao_social = "Razão social é obrigatória";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Por favor, selecione uma imagem válida");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 5MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('usuarioOrgId', usuarioOrgId);

      const response = await fetch('http://localhost:3000/rest/v1/anexos/perfil', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload da imagem');
      }

      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        image: data.url_publica || "/imagens/pessoa.jpg",
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    if (!usuarioOrgId || !token) {
      setError("ID ou token não encontrado.");
      return;
    }

    setLoading(true);
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
          telefone: formData.telefone,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Erro ao atualizar:", error);
        setError(error.message || JSON.stringify(error) || "Erro ao salvar alterações.");
        return;
      }

      alert("Perfil atualizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main className="p-4 max-w-2xl mx-auto">
          <div className="text-center">Carregando...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-8">Editar Perfil</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Foto de Perfil */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src={formData.image}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full object-cover"
            />
            <label className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
              Alterar Foto
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
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
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  validationErrors.cnpj ? 'border-red-500' : ''
                }`}
              />
              {validationErrors.cnpj && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.cnpj}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nome Fantasia</label>
              <input
                type="text"
                name="nome_fantasia"
                value={formData.nome_fantasia}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  validationErrors.nome_fantasia ? 'border-red-500' : ''
                }`}
              />
              {validationErrors.nome_fantasia && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.nome_fantasia}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  validationErrors.email ? 'border-red-500' : ''
                }`}
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Razão Social</label>
              <input
                type="text"
                name="razao_social"
                value={formData.razao_social}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  validationErrors.razao_social ? 'border-red-500' : ''
                }`}
              />
              {validationErrors.razao_social && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.razao_social}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Telefone</label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
