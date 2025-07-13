import apiClient from './apiClient';

export default {
    async getItems() {
        try {
            const response = await apiClient.get('UserMob/'); 
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async createItem(itemData) {
        try {
            const response = await apiClient.post('UserMob/', itemData);
            return response.data;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    },
    async getUserById(id) {
        try {
            const response = await apiClient.get(`UserMob/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error get item:', error);
            throw error;
        }
    },
    async deleteItem(id) {
        try {
            const response = await apiClient.delete(`UserMob/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    },
    async updateItem(id, updatedData) {
        try {
            const response = await apiClient.put(`UserMob/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    },
};
