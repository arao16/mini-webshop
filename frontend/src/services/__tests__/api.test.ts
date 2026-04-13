import { apiService } from '../api';

describe('apiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should fetch products successfully', async () => {
      const mockProducts = [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          description: 'Test product 1',
          imageUrl: 'http://example.com/image1.jpg',
          category: 'Electronics',
        },
      ];

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        } as Response)
      ) as unknown as typeof fetch;

      const result = await apiService.getProducts();
      expect(result).toEqual(mockProducts);
      expect(fetch).toHaveBeenCalledWith('/api/products');
    });

    it('should throw error when fetch fails', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          statusText: 'Not Found',
        } as Response)
      ) as unknown as typeof fetch;

      await expect(apiService.getProducts()).rejects.toThrow(
        'Failed to fetch products: Not Found'
      );
    });
  });

  describe('submitPurchase', () => {
    it('should submit purchase successfully', async () => {
      const purchaseData = {
        items: [],
        totalPrice: 100,
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
        } as Response)
      ) as unknown as typeof fetch;

      await apiService.submitPurchase(purchaseData);
      expect(fetch).toHaveBeenCalledWith('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      });
    });

    it('should throw error when purchase submission fails', async () => {
      const purchaseData = {
        items: [],
        totalPrice: 100,
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          statusText: 'Internal Server Error',
        } as Response)
      ) as unknown as typeof fetch;

      await expect(apiService.submitPurchase(purchaseData)).rejects.toThrow(
        'Failed to submit purchase: Internal Server Error'
      );
    });
  });
});
