import apiClient from './apiClient';

export default {
    async getPaymentMethods() {
        try {
            const response = await apiClient.get('PaymentMethod/'); // adjust the endpoint as needed
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async getPaymentMethodById(id) {
        try {
            const response = await apiClient.get(`PaymentMethod/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting PaymentMethod:', error);
            throw error;
        }
    },

    async createPaymentMethod(PaymentMethodData) {
        try {
            const response = await apiClient.post('PaymentMethod/', PaymentMethodData);
            return response.data;
        } catch (error) {
            console.error('Error creating PaymentMethod:', error);
            throw error;
        }
    },

    async updatePaymentMethod(id, updatedData) {
        try {
            const response = await apiClient.put(`PaymentMethod/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating PaymentMethod:', error);
            throw error;
        }
    },

    async deletePaymentMethod(id) {
        try {
            const response = await apiClient.delete(`PaymentMethod/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting PaymentMethod:', error);
            throw error;
        }
    }
};
