import { Product, PurchaseRequest } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

export const apiService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return await response.json();
  },

  async submitPurchase(purchaseData: PurchaseRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData),
    });
    if (!response.ok) {
      throw new Error(`Failed to submit purchase: ${response.statusText}`);
    }
  },
};
