import apiClient from './apiClient';

export default {
    async getPaymentTerms() {
        try {
            const response = await apiClient.get('PaymentTerm/'); // adjust the endpoint as needed
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async getPaymentTermById(id) {
        try {
            const response = await apiClient.get(`PaymentTerm/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting PaymentTerm:', error);
            throw error;
        }
    },

    async createPaymentTerm(PaymentTermData) {
        try {
            const response = await apiClient.post('PaymentTerm/', PaymentTermData);
            return response.data;
        } catch (error) {
            console.error('Error creating PaymentTerm:', error);
            throw error;
        }
    },

    async updatePaymentTerm(id, updatedData) {
        try {
            const response = await apiClient.put(`PaymentTerm/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating PaymentTerm:', error);
            throw error;
        }
    },

    async deletePaymentTerm(id) {
        try {
            const response = await apiClient.delete(`PaymentTerm/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting PaymentTerm:', error);
            throw error;
        }
    }
};
