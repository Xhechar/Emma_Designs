import dotenv from 'dotenv';

dotenv.config();

export interface User {
  user_id: string,
  fullname: string,
  email: string,
  phone_number: string,
  gender: string,
  country: string,
  county: string,
  address: string,
  profile_image: string,
  password: string,
  role: string,
  createdAt: string,
}

export interface Logins {
  email: string,
  password: string
}

export interface Product {
  product_id: string,
  name: string,
  images : string[],
  short_desc: string,
  long_desc: string,
  price: number,
  stock_quantity: number,
  cartegory: string,
  createdAt: string,
  type: string,
  review?: Review
}

export interface Cart {
  cart_id: string,
  product_id: string,
  user_id: string,
  isPaid: boolean,
  itemsCount: number,
  product?: Product                                         
}

export interface Review {
  review_id: string,
  user_id: string,
  product_id: string,
  rating: number,
  review: string,
  createdAt: string,
  updatedAt: string,
  product?: Product
}

export interface Order {
  order_id: string,
  user_id: string,
  product_id: string,
  createdAt: Date,
  delivery: string,
  itemsCount: number,
  pricePaid: number,
  user?: User,
  product?: Product
}

export interface Cartegory {
  cartegory_id: string,
  name: string
}

export interface PurchasedProduct {
  product_id: string,
  item_count: number
}

export interface MailConfigurations {
  service: string,
  host: string,
  port: number,
  secureTLS: boolean,
  auth: {
    user: string,
    pass: string
  }
}

export interface MessageOptions {
  from: string,
  to: string,
  subject: string,
  html: string
}

export interface TokenInfo {
  user_id: string,
  fullname: string,
  email: string,
  phone_number: string,
  gender: string,
  country: string,
  county: string,
  address: string,
  profile_image: string,
  password: string,
  role: string,
  createdAt: string,
}

export interface Name {
  name: string
}

export interface Cartegorie {
  cartegory: string
}