
import apiClient from './apiClient';

export default {
  async  getStock(storeId: number, itemId: number) {
        return apiClient.get(`/stock/${storeId}/${itemId}`);
    },
};

