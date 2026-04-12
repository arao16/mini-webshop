import { useEffect, useMemo, useState } from 'react';
import { apiService } from '../services/api';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { useBasket } from '../context/BasketContext';

export const ProductListing = () => {
  const { addToBasket } = useBasket();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((product) => product.category)
        )
      ),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTermLowerCase) ||
        product.description.toLowerCase().includes(searchTermLowerCase);
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  if (loading) {
    return <div className="loading-state">Loading products...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  return (
    <section className="product-listing">
      <div className="product-listing-header">
        <div>
          <h2 className="section-title">Products</h2>
          <p className="section-description">Search or filter products by name, description, or category.</p>
        </div>
        <div className="listing-controls">
          <div className="control-group">
            <label className="control-label">
              Search
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name or description"
                className="control-input"
              />
            </label>
          </div>

          <div className="control-group">
            <label className="control-label">
              Category
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="control-input"
              >
                <option value="all">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="loading-state">No products match your search or filter.</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToBasket={addToBasket}
            />
          ))}
        </div>
      )}
    </section>
  );
};
