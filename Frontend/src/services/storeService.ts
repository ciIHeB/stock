import apiClient from './apiClient';


export default {
    async getStores() {
        try {
            const response = await apiClient.get('Store/'); // adjust the endpoint as needed
            return response.data;
        } catch (error) {
            console.error('Error fetching Stores:', error);
            throw error;
        }
    },
    async getStoreById(id) {
        try {
            const response = await apiClient.get(`Store/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching Store:', error);
            throw error;
        }
    },

    async createStore(createData) {
        try {
            const response = await apiClient.post('Store/', createData);
            return response.data;
        } catch (error) {
            console.error('Error creating Store:', error);
            throw error;
        }
    },

    async updateStore(id, updatedData) {
        try {
            const response = await apiClient.put(`Store/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating store:', error);
            throw error;
        }
    },

    async deleteStore(id) {
        try {
            const response = await apiClient.delete(`Store/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting store:', error);
            throw error;
        }
    }
};
