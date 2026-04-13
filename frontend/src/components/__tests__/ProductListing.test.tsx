import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductListing } from '../ProductListing';

describe('ProductListing', () => {
  const mockProducts = [
    {
      id: '1',
      name: 'Sony Headphones',
      price: 279.99,
      description: 'Industry-leading noise cancelling',
      imageUrl: 'http://example.com/image1.jpg',
      category: 'Audio',
    },
    {
      id: '2',
      name: 'Apple MacBook',
      price: 1299.0,
      description: 'Supercharged by M3',
      imageUrl: 'http://example.com/image2.jpg',
      category: 'Laptops',
    },
    {
      id: '3',
      name: 'Logitech Mouse',
      price: 99.99,
      description: '8K DPI sensor',
      imageUrl: 'http://example.com/image3.jpg',
      category: 'Peripherals',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render loading state while fetching products', () => {
    // Mock fetch to never resolve
    global.fetch = jest.fn(() => new Promise(() => {})) as unknown as typeof fetch;

    render(<ProductListing onAddToBasket={jest.fn()} />);

    expect(screen.getByText('Loading products...')).toBeTruthy();
  });

  it('should display products after successful fetch', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      } as Response)
    ) as unknown as typeof fetch;

    render(<ProductListing onAddToBasket={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText('Sony Headphones')).toBeTruthy();
      expect(screen.getByText('Apple MacBook')).toBeTruthy();
    });
  });

  it('should display error message on fetch failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as unknown as typeof fetch;

    render(<ProductListing onAddToBasket={jest.fn()} />);

    await waitFor(() => {
      expect(
        screen.getByText('Failed to load products. Please try again later.')
      ).toBeTruthy();
    });
  });

  it('should filter products by search term', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      } as Response)
    ) as unknown as typeof fetch;

    render(<ProductListing onAddToBasket={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText('Sony Headphones')).toBeTruthy();
    });

    const searchInput = screen.getByPlaceholderText(
      'Search by name or description'
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'Sony' } });

    await waitFor(() => {
      expect(screen.getByText('Sony Headphones')).toBeTruthy();
      expect(screen.queryByText('Apple MacBook')).toBeNull();
    });
  });

  it('should call onAddToBasket when product button is clicked', async () => {
    const mockOnAddToBasket = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockProducts[0]]),
      } as Response)
    ) as unknown as typeof fetch;

    render(<ProductListing onAddToBasket={mockOnAddToBasket} />);

    await waitFor(() => {
      expect(screen.getByText('Sony Headphones')).toBeTruthy();
    });

    const button = screen.getByRole('button', { name: /add to basket/i });
    fireEvent.click(button);

    expect(mockOnAddToBasket).toHaveBeenCalledWith(mockProducts[0]);
  });
});
