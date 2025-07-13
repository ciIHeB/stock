import apiClient from './apiClient';


export default {
    async getBanks() {
        try {
            const response = await apiClient.get('bank/'); // adjust the endpoint as needed
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async getBankById(id) {
        try {
            const response = await apiClient.get(`bank/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting bank:', error);
            throw error;
        }
    },

    async createBank(bankData) {
        try {
            const response = await apiClient.post('bank/', bankData);
            return response.data;
        } catch (error) {
            console.error('Error creating bank:', error);
            throw error;
        }
    },

    async updateBank(id, updatedData) {
        try {
            const response = await apiClient.put(`bank/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating bank:', error);
            throw error;
        }
    },

    async deleteBank(id) {
        try {
            const response = await apiClient.delete(`bank/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting bank:', error);
            throw error;
        }
    }
};
