import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cartegory } from '../interfaces/fashion.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartegoryService {
  baseUrl = 'http://localhost:3000/cartegory/';
  getAuthorization(): HttpHeaders {
    const token = localStorage.getItem('token') as string;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }

  constructor(private http: HttpClient) { }

  createCartegory(cartegory: Cartegory): Observable<{ error?: string, message?: string }> {
    return this.http.post<{ error?: string, message?: string }>(`${this.baseUrl}create-cartegory`, cartegory, { headers: this.getAuthorization() });
  }

  updateCartegory(cartegory_id: string, cartegory: Cartegory): Observable<{ error?: string, message?: string }> {
    return this.http.put<{ error?: string, message?: string }>(`${this.baseUrl}update-cartegory/${cartegory_id}`, cartegory, { headers: this.getAuthorization() });
  }

  deleteCartegory(cartegory_id: string): Observable<{ error?: string, message?: string }> {
    return this.http.delete<{ error?: string, message?: string }>(`${this.baseUrl}delete-cartegory/${cartegory_id}`, { headers: this.getAuthorization() });
  }

  getAllCartegories(): Observable<{ error?: string, message?: string }> {
    return this.http.get<{ error?: string, message?: string }>(`${this.baseUrl}get-all-cartegories`, { headers: this.getAuthorization() });
  }
}
