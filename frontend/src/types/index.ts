export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category?: string;
}

export interface BasketItem {
  product: Product;
  quantity: number;
}

export interface Basket {
  items: BasketItem[];
}

export interface PurchaseRequest {
  items: BasketItem[];
  totalPrice: number;
}
