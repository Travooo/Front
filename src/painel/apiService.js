// Serviço para fazer requisições à API
import api from './axiosConfig';

class ApiService {
  // Métodos genéricos para fazer requisições à API
  
  // GET - Buscar dados
  static async get(endpoint) {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Erro ao fazer GET para ${endpoint}:`, error);
      throw error;
    }
  }
  
  // POST - Criar dados
  static async post(endpoint, data) {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao fazer POST para ${endpoint}:`, error);
      throw error;
    }
  }
  
  // PUT - Atualizar dados
  static async put(endpoint, data) {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao fazer PUT para ${endpoint}:`, error);
      throw error;
    }
  }
  
  // DELETE - Remover dados
  static async delete(endpoint) {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Erro ao fazer DELETE para ${endpoint}:`, error);
      throw error;
    }
  }
}

export default ApiService;

