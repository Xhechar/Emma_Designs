import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, PurchasedProduct } from '../interfaces/fashion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = 'http://localhost:3000/cartegory/';
  getAuthorization(): HttpHeaders {
    const token = localStorage.getItem('token') as string;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }

  constructor(private http: HttpClient) { }

  createCart(purchased_product: PurchasedProduct): Observable<{ error?: string, message?: string }> {
    return this.http.post<{ error?: string, message?: string }>(`${this.baseUrl}create-cart`, purchased_product, { headers: this.getAuthorization() });
  }

  updateCartItem(cart_id: string, purchased_product: PurchasedProduct): Observable<{ error?: string, message?: string }> {
    return this.http.put<{ error?: string, message?: string }>(`${this.baseUrl}update-cart/${cart_id}`, purchased_product, { headers: this.getAuthorization() });
  }

  removeItemFromCart(cart_id: string): Observable<{ error?: string, message?: string }> {
    return this.http.delete<{ error?: string, message?: string }>(`${this.baseUrl}delete_item/${cart_id}`, { headers: this.getAuthorization() });
  }

  clearCart(): Observable<{ error?: string, message?: string }> {
    return this.http.delete<{ error?: string, message?: string }>(`${this.baseUrl}clear-cart`, { headers: this.getAuthorization() });
  }

  getCartItemsByUser(): Observable<{ error?: string, message?: string, cart: Cart[] }> {
    return this.http.get<{ error?: string, message?: string, cart: Cart[] }>(`${this.baseUrl}get-cart-items`, { headers: this.getAuthorization() });
  }
}
