import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cartegory, Product } from '../interfaces/fashion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = 'http://localhost:3000/product/';
  getAuthorisation(): HttpHeaders {
    const token = localStorage.getItem('token') as string;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }

  constructor(private http: HttpClient) { }

  createProduct(product: Product): Observable<{ error?: string, message?: string }>{
    return this.http.post<{ error?: string, message?: string }>(`${this.baseUrl}create-product`, product, { headers: this.getAuthorisation() });
  }

  updateProduct(product_id: string, product: Product): Observable<{ error?: string, message?: string }>{
    return this.http.post<{ error?: string, message?: string }>(`${this.baseUrl}update-product/${product_id}`, product, { headers: this.getAuthorisation() });
  }

  getProductByProductId(product_id: string): Observable<{ error?: string, message?: string, product: Product }>{
    return this.http.get<{ error?: string, message?: string, product: Product }>(`${this.baseUrl}get-product-by-id/${product_id}`, { headers: this.getAuthorisation() });
  }

  getAllProduct(): Observable<{ error?: string, message?: string, products: Product [] }>{
    return this.http.get<{ error?: string, message?: string, products: Product [] }>(`${this.baseUrl}get-all-products`, { headers: this.getAuthorisation() });
  }

  getFlushProducts(): Observable<{ error?: string, message?: string, products: Product [] }>{
    return this.http.get<{ error?: string, message?: string, products: Product [] }>(`${this.baseUrl}get-flush-products`, { headers: this.getAuthorisation() });
  }

  getOfferredProducts(): Observable<{ error?: string, message?: string, products: Product [] }>{
    return this.http.get<{ error?: string, message?: string, products: Product [] }>(`${this.baseUrl}get-offered-products`, { headers: this.getAuthorisation() });
  }

  setOffer(product_id: string): Observable<{ error?: string, message?: string}>{
    return this.http.put<{ error?: string, message?: string}>(`${this.baseUrl}set-offer-to-product/${product_id}`, {}, { headers: this.getAuthorisation() });
  }

  removeFromOffers(product_id: string): Observable<{ error?: string, message?: string}>{
    return this.http.put<{ error?: string, message?: string}>(`${this.baseUrl}remove-offer/${product_id}`, {}, { headers: this.getAuthorisation() });
  }

  setFlushProducts(product_id: string): Observable<{ error?: string, message?: string}>{
    return this.http.put<{ error?: string, message?: string}>(`${this.baseUrl}set-flush-product/${product_id}`, {}, { headers: this.getAuthorisation() });
  }

  resetFlushProducts(product_id: string): Observable<{ error?: string, message?: string}>{
    return this.http.put<{ error?: string, message?: string}>(`${this.baseUrl}reset-flush-product/${product_id}`, {}, { headers: this.getAuthorisation() });
  }

  deleteProduct(product_id: string): Observable<{ error?: string, message?: string}>{
    return this.http.delete<{ error?: string, message?: string}>(`${this.baseUrl}delete-product/${product_id}`, { headers: this.getAuthorisation() });
  }
}
