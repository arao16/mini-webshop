import { useState, useEffect } from 'react';
import { Product, BasketItem } from './types';
import { storageService } from './services/storage';
import { ProductListing } from './components/ProductListing';
import { ShoppingBasket } from './components/ShoppingBasket';

function App() {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedBasket = storageService.getBasket();
    setBasketItems(savedBasket.items);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      storageService.saveBasket({ items: basketItems });
    }
  }, [basketItems, isLoaded]);

  const handleAddToBasket = (product: Product) => {
    setBasketItems((prevItems) => {
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

  const handleRemoveFromBasket = (productId: string) => {
    setBasketItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const handleClearBasket = () => {
    setBasketItems([]);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="app-title">Mini Webshop</h1>
          <p className="app-subtitle">Your favorite tech products.</p>
        </div>
      </header>

      <main className="app-main">
        <div className="app-layout">
          <ProductListing onAddToBasket={handleAddToBasket} />
          <ShoppingBasket
            items={basketItems}
            onRemoveItem={handleRemoveFromBasket}
            onClearBasket={handleClearBasket}
          />
        </div>
      </main>

      <footer className="app-footer">
        <div className="app-footer-inner">
          &copy; 2024 Mini Webshop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
