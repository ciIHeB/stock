import apiClient from './apiClient';

export default {
  async getRoutes() {
    try {
      const response = await apiClient.get('/Route');
      return response.data;
    } catch (error) {
      console.error('Error fetching routes:', error);
      throw error;
    }
  },

  async getRouteById(id) {
    try {
      const response = await apiClient.get(`/Route/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching route by ID:', error);
      throw error;
    }
  },

  async createRoute(routeData) {
    try {
      const response = await apiClient.post('/Route', routeData);
      return response.data;
    } catch (error) {
      console.error('Error creating route:', error);
      throw error;
    }
  },

  async updateRoute(id, updatedData) {
    try {
      const response = await apiClient.put(`/Route/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating route:', error);
      throw error;
    }
  },

  async deleteRoute(id) {
    try {
      const response = await apiClient.delete(`/Route/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting route:', error);
      throw error;
    }
  },

  async linkCustomersToRoute(routeId, customerIds) {
    try {
      const response = await apiClient.post(`/Route/${routeId}/customers`, { customerIds });
      return response.data;
    } catch (error) {
      console.error('Error linking customers to route:', error);
      throw error;
    }
  }
};
