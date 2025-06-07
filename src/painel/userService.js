// Serviço para buscar informações do usuário logado
import api from './axiosConfig';

class UserService {
  // Método para buscar os dados do usuário organização pelo ID
  static async getUserOrgById(id) {
    try {
      const response = await api.get(`rest/v1/usuariosOrg/${id}`);
      console.log('Dados recebidos da API (getUserOrgById):', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      throw error;
    }
  }

  // Método para obter o ID do usuário logado do localStorage
  static getUserIdFromLocalStorage() {
    if (typeof window !== 'undefined') {
      // Extrair o ID do token JWT
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Decodificar o token JWT para obter o payload
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.id;
        } catch (error) {
          console.error('Erro ao decodificar token:', error);
          return null;
        }
      }
    }
    return null;
  }

  // Método para buscar os dados do usuário logado
  static async getCurrentUser() {
    const userId = this.getUserIdFromLocalStorage();
    if (!userId) {
      throw new Error('Usuário não está logado');
    }
    
    return this.getUserOrgById(userId);
  }
}

export default UserService;

