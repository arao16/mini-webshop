import { useEffect, useState } from 'react';
import { Product } from '../types';
import { apiService } from '../services/api';
import { ProductCard } from './ProductCard';

interface ProductListingProps {
  onAddToBasket: (product: Product) => void;
}

export const ProductListing = ({ onAddToBasket }: ProductListingProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts();
        setProducts(data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading-state">Loading products...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  return (
    <section className="product-listing">
      <h2 className="section-title">Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToBasket={onAddToBasket}
          />
        ))}
      </div>
    </section>
  );
};
