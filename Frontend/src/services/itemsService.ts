import apiClient from './apiClient';

// apiImage axios instance and uploadImage function removed

export default {
    async getItems() {
        try {
            const response = await apiClient.get('item/'); 
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async createItem(itemDataWithFile) {
        try {
            const formData = new FormData();
            // Append all fields from itemDataWithFile to formData
            // Assuming itemDataWithFile contains an 'ItemImage' field for the file
            for (const key in itemDataWithFile) {
                if (itemDataWithFile.hasOwnProperty(key)) {
                    if (key === 'ItemImage' && itemDataWithFile[key] instanceof File) {
                        formData.append('ItemImage', itemDataWithFile[key]);
                    } else {
                        formData.append(key, itemDataWithFile[key]);
                    }
                }
            }

            const response = await apiClient.post('item/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    },
    async getItemById(id) {
        try {
            const response = await apiClient.get(`item/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error get item:', error);
            throw error;
        }
    },
    async deleteItem(id) {
        try {
            const response = await apiClient.delete(`item/${id}`);
            return response.data;
            
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    },
    async updateItem(id, itemDataWithFile) {
        try {
            const formData = new FormData();
            for (const key in itemDataWithFile) {
                if (itemDataWithFile.hasOwnProperty(key)) {
                    if (key === 'ItemImage' && itemDataWithFile[key] instanceof File) {
                        formData.append('ItemImage', itemDataWithFile[key]);
                    } else if (key === 'ItemImage' && itemDataWithFile[key] === null) {
                        formData.append('ItemImage', ''); // Send empty string to signify removal if no new file
                    } else if (itemDataWithFile[key] !== undefined) { // Avoid appending undefined fields
                        formData.append(key, itemDataWithFile[key]);
                    }
                }
            }

            const response = await apiClient.put(`item/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    },
   // uploadImage function removed

    async getItemAvailableQuantity(storeId: number, itemId: number) {
        try {
            // Endpoint matches the backend route: /api/item/store/:storeId/item/:itemId/available-quantity
            const response = await apiClient.get(`item/store/${storeId}/item/${itemId}/available-quantity`);
            return response.data; // Assuming response.data is { availableQuantity: number }
        } catch (error) {
            console.error(`Error fetching available quantity for item ${itemId} in store ${storeId}:`, error);
            // It might be better to return a specific value like null or 0 on error,
            // or let the component handle the thrown error. For now, rethrowing.
            throw error;
        }
    }
};
