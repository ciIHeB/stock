import apiClient from './apiClient';


export default {
    async getStoresTypes() {
        try {
            const response = await apiClient.get('StoreType/'); // adjust the endpoint as needed
            return response.data;
        } catch (error) {
            console.error('Error fetching Stores:', error);
            throw error;
        }
    },
    async getStoreTypeById(id) {
        try {
            const response = await apiClient.get(`StoreType/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching Store:', error);
            throw error;
        }
    },

    async createStoreType(createData) {
        try {
            const response = await apiClient.post('StoreType/', createData);
            return response.data;
        } catch (error) {
            console.error('Error creating currency:', error);
            throw error;
        }
    },

    async updateStoreType(id, updatedData) {
        try {
            const response = await apiClient.put(`StoreType/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating store:', error);
            throw error;
        }
    },

    async deleteStoreType(id) {
        try {
            const response = await apiClient.delete(`StoreType/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting store:', error);
            throw error;
        }
    }
};
