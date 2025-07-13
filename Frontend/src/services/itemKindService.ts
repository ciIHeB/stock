import apiClient from './apiClient';

export default {
    async getItemsKinds() {
        try {
            const response = await apiClient.get('ItemKind/'); // adjust the endpoint as needed
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async getItemKindById(id) {
        try {
            const response = await apiClient.get(`ItemKind/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting ItemKind:', error);
            throw error;
        }
    },

    async createItemKind(ItemKindData) {
        try {
            const response = await apiClient.post('ItemKind/', ItemKindData);
            return response.data;
        } catch (error) {
            console.error('Error creating ItemKind:', error);
            throw error;
        }
    },

    async updateItemKind(id, updatedData) {
        try {
            const response = await apiClient.put(`ItemKind/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating ItemKind:', error);
            throw error;
        }
    },

    async deleteItemKind(id) {
        try {
            const response = await apiClient.delete(`ItemKind/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting ItemKind:', error);
            throw error;
        }
    }
};
