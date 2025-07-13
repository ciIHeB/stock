import apiClient from './apiClient';


export default {
    async getGeos() {
        try {
            const response = await apiClient.get('Geo/'); // adjust the endpoint as needed
            return response.data;
        } catch (error) {
            console.error('Error fetching Geo:', error);
            throw error;
        }
    },
    async getGeoById(id) {
        try {
            const response = await apiClient.get(`Geo/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching Geo:', error);
            throw error;
        }
    },

    async createGeo(createData) {
        try {
            const response = await apiClient.post('Geo/', createData);
            return response.data;
        } catch (error) {
            console.error('Error creating Geo:', error);
            throw error;
        }
    },

    async updateGeo(id, updatedData) {
        try {
            const response = await apiClient.put(`Geo/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating Geo:', error);
            throw error;
        }
    },

    async deleteGeo(id) {
        try {
            const response = await apiClient.delete(`Geo/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting Geo:', error);
            throw error;
        }
    }
};
