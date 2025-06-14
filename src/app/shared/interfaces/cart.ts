export interface cart {
  status: string
  numOfCartItems: number
  data: Data
}

export interface Data {
  _id: string
  cartItems: CartItem[]
  user: string
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
  totalPriceAfterDiscount: number
}

export interface CartItem {
  product: Product
  quantity: number
  price: number
  _id: string
}

export interface Product {
  _id: string
  name: string
  desc: string
  quantity: number
  price: number
  discount: number
  productImage: string
  category: string
  user: string
  createdAt: string
  updatedAt: string
  priceAfterDiscount: number
  __v: number
}
