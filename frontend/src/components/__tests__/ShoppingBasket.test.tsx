import { render, screen, fireEvent } from '@testing-library/react';
import { ShoppingBasket } from '../ShoppingBasket';

describe('ShoppingBasket', () => {
  const mockProduct = {
    id: '1',
    name: 'Sony Headphones',
    price: 279.99,
    description: 'Industry-leading noise cancelling',
    imageUrl: 'http://example.com/image1.jpg',
    category: 'Audio',
  };

  const mockBasketItems = [
    {
      product: mockProduct,
      quantity: 2,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display empty basket message when no items', () => {
    const mockOnRemoveItem = jest.fn();
    const mockOnClearBasket = jest.fn();

    render(
      <ShoppingBasket
        items={[]}
        onRemoveItem={mockOnRemoveItem}
        onClearBasket={mockOnClearBasket}
      />
    );

    expect(screen.getByText('Your basket is empty')).toBeTruthy();
  });

  it('should display items in basket', () => {
    const mockOnRemoveItem = jest.fn();
    const mockOnClearBasket = jest.fn();

    render(
      <ShoppingBasket
        items={mockBasketItems}
        onRemoveItem={mockOnRemoveItem}
        onClearBasket={mockOnClearBasket}
      />
    );

    expect(screen.getByText('Sony Headphones')).toBeTruthy();
    expect(screen.getByText('Qty: 2')).toBeTruthy();
    expect(screen.getAllByText('$559.98')).toHaveLength(2);
  });

  it('should show correct basket item count', () => {
    const mockOnRemoveItem = jest.fn();
    const mockOnClearBasket = jest.fn();

    render(
      <ShoppingBasket
        items={mockBasketItems}
        onRemoveItem={mockOnRemoveItem}
        onClearBasket={mockOnClearBasket}
      />
    );

    expect(screen.getByText('1 item')).toBeTruthy();
  });

  it('should call onRemoveItem when remove button is clicked', () => {
    const mockOnRemoveItem = jest.fn();
    const mockOnClearBasket = jest.fn();

    render(
      <ShoppingBasket
        items={mockBasketItems}
        onRemoveItem={mockOnRemoveItem}
        onClearBasket={mockOnClearBasket}
      />
    );

    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    expect(mockOnRemoveItem).toHaveBeenCalledWith('1');
  });

  it('should call onClearBasket when clear button is clicked', () => {
    const mockOnRemoveItem = jest.fn();
    const mockOnClearBasket = jest.fn();

    render(
      <ShoppingBasket
        items={mockBasketItems}
        onRemoveItem={mockOnRemoveItem}
        onClearBasket={mockOnClearBasket}
      />
    );

    const clearButton = screen.getByRole('button', { name: /clear basket/i });
    fireEvent.click(clearButton);

    expect(mockOnClearBasket).toHaveBeenCalled();
  });

  it('should calculate and display total price', () => {
    const mockOnRemoveItem = jest.fn();
    const mockOnClearBasket = jest.fn();

    const multipleItems = [
      {
        product: mockProduct,
        quantity: 1,
      },
      {
        product: {
          ...mockProduct,
          id: '2',
          name: 'Mouse',
          price: 99.99,
        },
        quantity: 2,
      },
    ];

    render(
      <ShoppingBasket
        items={multipleItems}
        onRemoveItem={mockOnRemoveItem}
        onClearBasket={mockOnClearBasket}
      />
    );

    expect(screen.getByText('$479.97')).toBeTruthy();
  });
});
