import apiClient from './apiClient';

// Define the structure for a single item in the unload
interface UnloadItem { // Renamed from LoadItem
  ItemID: number;
  UnloadedQuantity: number; // Renamed from ReceivedQuantity
  ItemStatus?: number; // Optional
}

// Define the structure for the createUnload payload
interface CreateUnloadPayload { // Renamed from CreateLoadPayload
  StoreID: number;
  UserID: number;
  items: UnloadItem[]; // Uses UnloadItem
  UnloadStatusID?: string; // Optional, e.g., "U" for Unloaded. Renamed from LoadStatusID
  UnloadDocumentNumber?: string; // Optional. Renamed from LoadDocumentNumber
}

export default {
  async createStoreUnload(payload: CreateUnloadPayload) { // Renamed from createStoreLoad
    try {
      // The endpoint should be updated to whatever is defined in the backend for unloads
      // Assuming '/BoStoreUnload' based on previous naming conventions
      const response = await apiClient.post('/BoStoreUnload', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating store unload:', error); // Updated error message
      // It's good practice to throw the error so the calling component can handle it
      throw error;
    }
  }
};
