export interface Order {
  _id: string;
  cartItems: {
    product: string;
    quantity: number;
    price: number;
    _id: string;
  }[];
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaidAndDelivered: boolean;
  paidAndDeliveredAt?: string;
}
