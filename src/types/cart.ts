export type CartItem = {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock: number;
};

export type Cart = {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
};
