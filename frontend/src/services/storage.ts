import { Basket } from '../types';

const BASKET_STORAGE_KEY = 'webshop_basket';

export const storageService = {
  saveBasket(basket: Basket): void {
    try {
      localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basket));
    } catch (error) {
      console.error('Error saving basket to localStorage:', error);
    }
  },

  getBasket(): Basket {
    try {
      const basketData = localStorage.getItem(BASKET_STORAGE_KEY);
      return basketData ? JSON.parse(basketData) : { items: [] };
    } catch(error) {
      console.error('Error retrieving basket from localStorage:', error);
      return { items: [] };
    }
  },

  clearBasket(): void {
    try {
      localStorage.removeItem(BASKET_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing basket from localStorage:', error);
    }
  },
};
