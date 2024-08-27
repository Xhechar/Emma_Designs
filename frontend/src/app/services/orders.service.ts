import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderIds } from '../interfaces/fashion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = 'http://localhost:3000/order/';
  getAuthorization(): HttpHeaders {
    const token = localStorage.getItem('token') as string;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }

  constructor(private http: HttpClient) { }

  createOrder(): Observable<{ error?: string, message?: string }> {
    return this.http.post<{ error?: string, message?: string }>(`${this.baseUrl}create-order`, {}, { headers: this.getAuthorization() });
  }

  updateDeliveryStatus(order_id: string): Observable<{ error?: string, message?: string }> {
    return this.http.put<{ error?: string, message?: string }>(`${this.baseUrl}update-delivery-status/${order_id}`, {}, { headers: this.getAuthorization() });
  }

  updateMultipleDeliveryStatus(order_ids: OrderIds): Observable<{ error?: string, message?: string }> {
    return this.http.put<{ error?: string, message?: string }>(`${this.baseUrl}update-multiple-delivery-status`, order_ids, { headers: this.getAuthorization() });
  }

  updateAllDeliveryStatus(): Observable<{ error?: string, message?: string }> {
    return this.http.put<{ error?: string, message?: string }>(`${this.baseUrl}update-all-delivery-status`, {}, { headers: this.getAuthorization() });
  }

  resetAllDeliveryStatus(): Observable<{ error?: string, message?: string }> {
    return this.http.put<{ error?: string, message?: string }>(`${this.baseUrl}reset-all-delivery-status`, {}, { headers: this.getAuthorization() });
  }

  softDeleteOrder(order_id: string): Observable<{ error?: string, message?: string }> {
    return this.http.put<{ error?: string, message?: string }>(`${this.baseUrl}soft-delete-order/${order_id}`, {}, { headers: this.getAuthorization() });
  }

  softDeleteAllOrders(): Observable<{ error?: string, message?: string }> {
    return this.http.put<{ error?: string, message?: string }>(`${this.baseUrl}soft-delete-all-orders`, {}, { headers: this.getAuthorization() });
  }

  restoreSingleOrder(order_id: string): Observable<{ error?: string, message?: string }> {
    return this.http.put<{ error?: string, message?: string }>(`${this.baseUrl}restore-single-order/${order_id}`, {}, { headers: this.getAuthorization() });
  }

  restoreAllOrders(): Observable<{ error?: string, message?: string }> {
    return this.http.put<{ error?: string, message?: string }>(`${this.baseUrl}restore-all-orders`, {}, { headers: this.getAuthorization() });
  }

  getAllSoftDeletedOrders(): Observable<{ error?: string, message?: string, orders?: Order[] }> {
    return this.http.get<{ error?: string, message?: string, orders?: Order[] }>(`${this.baseUrl}get-all-soft-deleted-orders`, { headers: this.getAuthorization() });
  }

  getAllOrders(): Observable<{ error?: string, message?: string, orders?: Order[] }> {
    return this.http.get<{ error?: string, message?: string, orders?: Order[] }>(`${this.baseUrl}get-all-orders`, { headers: this.getAuthorization() });
  }

  getAllDeliveredOrders(): Observable<{ error?: string, message?: string, orders?: Order[] }> {
    return this.http.get<{ error?: string, message?: string, orders?: Order[] }>(`${this.baseUrl}get-all-delivered-orders`, { headers: this.getAuthorization() });
  }

  getAllPendingOrders(): Observable<{ error?: string, message?: string, orders?: Order[] }> {
    return this.http.get<{ error?: string, message?: string, orders?: Order[] }>(`${this.baseUrl}get-all-pending-orders`, { headers: this.getAuthorization() });
  }

  getAllOrdersByUserId(): Observable<{ error?: string, message?: string, orders?: Order[] }> {
    return this.http.get<{ error?: string, message?: string, orders?: Order[] }>(`${this.baseUrl}get-all-orders-by-user-id`, { headers: this.getAuthorization() });
  }

  deleteOrder(order_id: string): Observable<{ error?: string, message?: string, orders?: Order[] }> {
    return this.http.delete<{ error?: string, message?: string, orders?: Order[] }>(`${this.baseUrl}delete-order/${order_id}`, { headers: this.getAuthorization() });
  }
}
