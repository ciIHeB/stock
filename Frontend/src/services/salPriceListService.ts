import apiClient from './apiClient';

export default {
    async getPriceLists() {
        try {
            const response = await apiClient.get('price/'); // adjust the endpoint as needed
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async getPriceListById(id) {
        try {
            const response = await apiClient.get(`price/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching prices:', error);
            throw error;
        }
    },

    async createPriceList(createdData) {
        try {
            const response = await apiClient.post('price/', createdData);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    async updatePriceList(id, updatedData) {
        try {
            const response = await apiClient.put(`price/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    async deletePriceList(id) {
        try {
            const response = await apiClient.delete(`price/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting price:', error);
            throw error;
        }
    }
};
