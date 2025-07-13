import apiClient from './apiClient';

export default {
    async getUsers() {
        try {
            const response = await apiClient.get('user/'); // adjust the endpoint as needed
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async getUserById(id) {
        try {
            const response = await apiClient.get(`user/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },

    async createUser(createdData) {
        try {
            const response = await apiClient.post('user/', createdData);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    async updateUser(id, updatedData) {
        try {
            const response = await apiClient.put(`user/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    async deleteUser(id) {
        try {
            const response = await apiClient.delete(`user/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
};
