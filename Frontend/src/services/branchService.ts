import apiClient from './apiClient';
export default {
    async getbranches() {
        try {
            const response = await apiClient.get('branch/'); 
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async createBranch(branchData) {
        try {
            const response = await apiClient.post('branch/', branchData);
            return response.data;
        } catch (error) {
            console.error('Error creating branch:', error);
            throw error;
        }
    },
    async getBranchById(id) {
        try {
            const response = await apiClient.get(`branch/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error get branch:', error);
            throw error;
        }
    },
    async deleteBranch(id) {
        try {
            const response = await apiClient.delete(`branch/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting branch:', error);
            throw error;
        }
    },
    async updateBranch(id, updatedData) {
        try {
            const response = await apiClient.put(`branch/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating branch:', error);
            throw error;
        }
    },
};
