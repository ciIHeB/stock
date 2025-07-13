import apiClient from './apiClient';

export default {
    async getItemsStatus() {
        try {
            const response = await apiClient.get('ItemStatus/'); // adjust the endpoint as needed
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async getItemStatusById(id) {
        try {
            const response = await apiClient.get(`ItemStatus/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting Item Status:', error);
            throw error;
        }
    },
    

    async createItemStatus(currencyData) {
        try {
            const response = await apiClient.post('ItemStatus/', currencyData);
            return response.data;
        } catch (error) {
            console.error('Error creating Item Status:', error);
            throw error;
        }
    },

    async updateItemStatus(id, updatedData) {
        try {
            const response = await apiClient.put(`ItemStatus/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating Item Status:', error);
            throw error;
        }
    },

    async deleteItemStatus(id) {
        try {
            const response = await apiClient.delete(`ItemStatus/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting Item Status:', error);
            throw error;
        }
    }
};
