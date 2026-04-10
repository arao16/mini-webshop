import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToBasket: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToBasket }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-description">{product.description}</p>
        <div className="product-card-footer">
          <span className="product-card-price">${product.price}</span>
          <button className="product-card-button" onClick={() => onAddToBasket(product)}>
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
};
