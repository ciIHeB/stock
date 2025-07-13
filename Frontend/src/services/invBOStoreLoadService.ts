import apiClient from './apiClient';

// Define the structure for a single item in the load
interface LoadItem {
  ItemID: number;
  ReceivedQuantity: number;
  ItemStatus?: number; // Optional
}

// Define the structure for the createLoad payload
interface CreateLoadPayload {
  StoreID: number;
  UserID: number;
  items: LoadItem[];
  LoadStatusID?: string; // Optional, e.g., "L" for Loaded
  LoadDocumentNumber?: string; // Optional
}

export default {
  async createStoreLoad(payload: CreateLoadPayload) {
    try {
      const response = await apiClient.post('/BoStoreLoad', payload); // Endpoint confirmed from Backend/index.js
      return response.data;
    } catch (error) {
      console.error('Error creating store load:', error);
      // It's good practice to throw the error so the calling component can handle it
      throw error;
    }
  }
};
