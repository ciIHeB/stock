import apiClient from './apiClient';

export default {
    async getSupervisors() {
        try {
            const response = await apiClient.get('Supervisor/'); 
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async createSupervisor(itemData) {
        try {
            const response = await apiClient.post('Supervisor/', itemData);
            return response.data;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    },
    async getSupersivorById(id) {
        try {
            const response = await apiClient.get(`Supervisor/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error get item:', error);
            throw error;
        }
    },
    async deleteSupervisor(id) {
        try {
            const response = await apiClient.delete(`Supervisor/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    },
    async updateSupervisor(id, updatedData) {
        try {
            const response = await apiClient.put(`Supervisor/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    },
};
