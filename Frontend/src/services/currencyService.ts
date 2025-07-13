import apiClient from './apiClient';

export default {
    async getCurrencies() {
        try {
            const response = await apiClient.get('Currency/'); // adjust the endpoint as needed
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async getcurrencyById(id) {
        try {
            const response = await apiClient.get(`Currency/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting Currency:', error);
            throw error;
        }
    },

    async createcurrency(currencyData) {
        try {
            const response = await apiClient.post('Currency/', currencyData);
            return response.data;
        } catch (error) {
            console.error('Error creating currency:', error);
            throw error;
        }
    },

    async updatecurrency(id, updatedData) {
        try {
            const response = await apiClient.put(`Currency/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating currency:', error);
            throw error;
        }
    },

    async deletecurrency(id) {
        try {
            const response = await apiClient.delete(`Currency/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting currency:', error);
            throw error;
        }
    }
};
