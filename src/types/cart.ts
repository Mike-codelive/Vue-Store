export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor: string;
}

export interface CartItemWithProduct extends CartItem {
  product: ProductCart | null;
  subtotal: number;
}

export interface ProductCart {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string | string[];
  category?: string;
}
