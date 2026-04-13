import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    price: 279.99,
    description: 'Industry-leading noise cancelling with Auto NC Optimizer.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    category: 'Audio',
  };

  it('should render product card with product information', () => {
    const mockOnAddToBasket = jest.fn();

    render(
      <ProductCard product={mockProduct} onAddToBasket={mockOnAddToBasket} />
    );

    expect(screen.getByText(mockProduct.name)).toBeTruthy();
    expect(screen.getByText(mockProduct.description)).toBeTruthy();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeTruthy();
  });

  it('should display product image with correct alt text', () => {
    const mockOnAddToBasket = jest.fn();

    render(
      <ProductCard product={mockProduct} onAddToBasket={mockOnAddToBasket} />
    );

    const image = screen.getByAltText(mockProduct.name) as HTMLImageElement;
    expect(image).toBeTruthy();
    expect(image.src).toContain(mockProduct.imageUrl);
  });

  it('should call onAddToBasket when button is clicked', () => {
    const mockOnAddToBasket = jest.fn();

    render(
      <ProductCard product={mockProduct} onAddToBasket={mockOnAddToBasket} />
    );

    const button = screen.getByRole('button', { name: /add to basket/i });
    fireEvent.click(button);

    expect(mockOnAddToBasket).toHaveBeenCalledWith(mockProduct);
    expect(mockOnAddToBasket).toHaveBeenCalledTimes(1);
  });

  it('should have correct button text', () => {
    const mockOnAddToBasket = jest.fn();

    render(
      <ProductCard product={mockProduct} onAddToBasket={mockOnAddToBasket} />
    );

    expect(screen.getByRole('button', { name: /add to basket/i })).toBeTruthy();
  });
});
