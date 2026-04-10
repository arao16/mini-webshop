import { Product, PurchaseRequest } from '../types';

const API_BASE_URL = '/api';

export const apiService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProduct(id: string): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  async submitPurchase(purchaseData: PurchaseRequest): Promise<void> {
    try {
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
    } catch (error) {
      console.error('Error submitting purchase:', error);
      throw error;
    }
  },
};
