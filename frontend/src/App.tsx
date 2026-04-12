import { ProductListing } from './components/ProductListing';
import { ShoppingBasket } from './components/ShoppingBasket';

function App() {
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
          <ProductListing />
          <ShoppingBasket />
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
