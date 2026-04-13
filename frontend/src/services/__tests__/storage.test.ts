import { storageService } from '../storage';

describe('storageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('saveBasket', () => {
    it('should save basket to localStorage', () => {
      const basket = {
        items: [
          {
            product: {
              id: '1',
              name: 'Product 1',
              price: 100,
              description: 'Test',
              imageUrl: 'http://example.com/image.jpg',
            },
            quantity: 2,
          },
        ],
      };

      storageService.saveBasket(basket);

      const saved = localStorage.getItem('webshop_basket');
      expect(saved).toBeTruthy();
      expect(JSON.parse(saved!)).toEqual(basket);
    });
  });

  describe('getBasket', () => {
    it('should retrieve basket from localStorage', () => {
      const basket = {
        items: [
          {
            product: {
              id: '1',
              name: 'Product 1',
              price: 100,
              description: 'Test',
              imageUrl: 'http://example.com/image.jpg',
            },
            quantity: 1,
          },
        ],
      };

      localStorage.setItem('webshop_basket', JSON.stringify(basket));

      const retrieved = storageService.getBasket();
      expect(retrieved).toEqual(basket);
    });

    it('should return empty basket when localStorage is empty', () => {
      const retrieved = storageService.getBasket();
      expect(retrieved).toEqual({ items: [] });
    });

    it('should return empty basket on parse error', () => {
      localStorage.setItem('webshop_basket', 'invalid json');

      const retrieved = storageService.getBasket();
      expect(retrieved).toEqual({ items: [] });
    });
  });

  describe('clearBasket', () => {
    it('should remove basket from localStorage', () => {
      const basket = { items: [] };
      localStorage.setItem('webshop_basket', JSON.stringify(basket));

      storageService.clearBasket();

      expect(localStorage.getItem('webshop_basket')).toBeNull();
    });
  });
});
