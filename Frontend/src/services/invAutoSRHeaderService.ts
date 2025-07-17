import apiClient from './apiClient';


export default {
    async getItems() {
        try {
            const response = await apiClient.get('AutoLoad/'); 
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async getloadItems() {
        try {
            const response = await apiClient.get('AutoLoad/getAutoLoadsRequests'); 
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async getloadItemsDetails(SRNumber) {
        try {
            const response = await apiClient.get(`AutoLoad/details/${SRNumber}`); 
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },

    async createItem(itemData) {
        try {
            const response = await apiClient.post('AutoLoad/', itemData);
            return response.data;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    },
    async getItemById(id) {
        try {
            const response = await apiClient.get(`AutoLoad/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error get item:', error);
            throw error;
        }
    },
    async deleteItem(id) {
        try {
            const response = await apiClient.delete(`AutoLoad/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    },
    async updateItem(SRNumber, updatedData) {
        try {
            const response = await apiClient.put(`AutoLoad/${SRNumber}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    },
};