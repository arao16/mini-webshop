import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { BasketItem, Product } from '../types';
import { storageService } from '../services/storage';
import { apiService } from '../services/api';

interface BasketContextValue {
  items: BasketItem[];
  totalPrice: number;
  isSubmitting: boolean;
  statusMessage: string | null;
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: string) => void;
  clearBasket: () => void;
  submitPurchase: () => Promise<void>;
}

const BasketContext = createContext<BasketContextValue | undefined>(undefined);

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedBasket = storageService.getBasket();
    setItems(savedBasket.items);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      storageService.saveBasket({ items });
    }
  }, [items, isLoaded]);

  const addToBasket = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeFromBasket = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const clearBasket = () => {
    setItems([]);
  };

  const submitPurchase = async () => {
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const purchaseData = {
        items,
        totalPrice,
      };
      await apiService.submitPurchase(purchaseData);
      setStatusMessage('Purchase submitted successfully!');
      clearBasket();
    } catch (error) {
      setStatusMessage('Failed to submit purchase. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      totalPrice,
      isSubmitting,
      statusMessage,
      addToBasket,
      removeFromBasket,
      clearBasket,
      submitPurchase,
    }),
    [items, totalPrice, isSubmitting, statusMessage]
  );

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }

  return context;
};