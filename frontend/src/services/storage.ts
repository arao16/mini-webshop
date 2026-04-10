import { Basket } from '../types';

const BASKET_STORAGE_KEY = 'webshop_basket';

export const storageService = {
  saveBasket(basket: Basket): void {
    try {
      localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basket));
      console.log('Basket saved to localStorage:', basket);
    } catch (error) {
      console.error('Error saving basket to localStorage:', error);
    }
  },

  getBasket(): Basket {
    try {
      const basketData = localStorage.getItem(BASKET_STORAGE_KEY);
      const basket = basketData ? JSON.parse(basketData) : { items: [] };
      console.log('Basket loaded from localStorage:', basket);
      return basket;
    } catch (error) {
      console.error('Error retrieving basket from localStorage:', error);
      return { items: [] };
    }
  },

  clearBasket(): void {
    try {
      localStorage.removeItem(BASKET_STORAGE_KEY);
      console.log('Basket cleared from localStorage');
    } catch (error) {
      console.error('Error clearing basket from localStorage:', error);
    }
  },
};
