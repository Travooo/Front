// Configuração global do Axios para incluir o token JWT em todas as requisições
import axios from 'axios';

// URL base da API - ajuste conforme necessário
const API_URL = 'http://localhost:3000';

// Criar uma instância do Axios com configurações personalizadas
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar um interceptor para incluir o token JWT em todas as requisições
api.interceptors.request.use(
  (config) => {
    // Verificar se estamos no ambiente do navegador
    if (typeof window !== 'undefined') {
      // Obter o token do localStorage
      const token = localStorage.getItem('token');
      
      // Se o token existir, adicioná-lo ao cabeçalho Authorization
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adicionar um interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se o erro for 401 (Não Autorizado), o token pode ter expirado
    if (error.response && error.response.status === 401) {
      // Limpar o token e redirecionar para a página de login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

