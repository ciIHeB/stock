import apiClient from './apiClient';


export default {
    async getItems() {
        try {
            const response = await apiClient.get('CustomerClass/'); 
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async createItem(itemData) {
        try {
            const response = await apiClient.post('CustomerClass/', itemData);
            return response.data;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    },
    async getItemById(id) {
        try {
            const response = await apiClient.get(`CustomerClass/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error get item:', error);
            throw error;
        }
    },
    async deleteItem(id) {
        try {
            const response = await apiClient.delete(`CustomerClass/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    },
    async updateItem(id, updatedData) {
        try {
            const response = await apiClient.put(`CustomerClass/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    },
};
