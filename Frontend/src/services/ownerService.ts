import apiClient from './apiClient';


export default {
    async getOwners() {
        try {
            const response = await apiClient.get('Owner/'); // adjust the endpoint as needed
            return response.data;
        } catch (error) {
            console.error('Error fetching owner:', error);
            throw error;
        }
    },
    async getOwnerById(id) {
        try {
            const response = await apiClient.get(`Owner/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching owner:', error);
            throw error;
        }
    },

    async createOwner(createData) {
        try {
            const response = await apiClient.post('Owner/', createData);
            return response.data;
        } catch (error) {
            console.error('Error creating owner:', error);
            throw error;
        }
    },

    async updateOwner(id, updatedData) {
        try {
            const response = await apiClient.put(`Owner/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating owner:', error);
            throw error;
        }
    },

    async deleteOwner(id) {
        try {
            const response = await apiClient.delete(`Owner/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting owner:', error);
            throw error;
        }
    }
};
