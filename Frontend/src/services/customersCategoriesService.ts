import apiClient from './apiClient';


export default {
    async getCustomersCategories() {
        try {
            const response = await apiClient.get('CustomerCategory/'); 
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async createItem(itemData) {
        try {
            const response = await apiClient.post('CustomerCategory/', itemData);
            return response.data;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    },
    async getCustomerHCategoryById(id) {
        try {
            const response = await apiClient.get(`CustomerCategory/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error get item:', error);
            throw error;
        }
    },
    async deleteItem(id) {
        try {
            const response = await apiClient.delete(`CustomerCategory/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    },
    async updateItem(id, updatedData) {
        try {
            const response = await apiClient.put(`CustomerCategory/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    },
};
