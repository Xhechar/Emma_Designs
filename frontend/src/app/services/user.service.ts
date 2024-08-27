import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logins, Name, User } from '../interfaces/fashion.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3000/users/';
  getAuthorisation(): HttpHeaders {
    const token = localStorage.getItem('token') as string;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<{ error?: string, message?: string }> {
    return this.http.post<{ error?: string, message?: string }>(`${this.baseUrl}create-user`, user);
  }

  loginUser(logins: Logins): Observable<{ error?: string, message?: string, role?: string, token?: string }> {
    return this.http.post<{ error?: string, message?: string, role?: string, token?: string }>('http://localhost:3000/auth/login', logins);
  }

  updateUser(user: User): Observable<{ error?: string, message?: string }> {
    return this.http.post<{ error?: string, message?: string }>(`${this.baseUrl}update-user`, user, {headers: this.getAuthorisation()});
  }

  getAllUsers(): Observable<{ error?: string, message?: string, users: User[] }> {
    return this.http.get<{ error?: string, message?: string, users: User[] }>(`${this.baseUrl}update-user`, {headers: this.getAuthorisation()});
  }

  deleteUser(user_id: string): Observable<{ error?: string, message?: string }> {
    return this.http.delete<{ error?: string, message?: string }>(`${this.baseUrl}delete-user/${user_id}`, { headers: this.getAuthorisation() });
  }

  softDeleteUser(user_id: string): Observable<{ error?: string, message?: string }> {
    return this.http.put<{ error?: string, message?: string }>(`${this.baseUrl}soft-delete-user/${user_id}`, { headers: this.getAuthorisation() });
  }

  getAllSoftDeletedUsers(): Observable<{ error?: string, message?: string, users?: User[] }>{
    return this.http.get<{ error?: string, message?: string, users?: User[] }>(`${this.baseUrl}get-all-soft-deleted-users`, { headers: this.getAuthorisation() });
  }

  getUserById(): Observable<{ error?: string, message?: string, user?: User }>{
    return this.http.get<{ error?: string, message?: string, user?: User }>(`${this.baseUrl}get-single-user`, { headers: this.getAuthorisation() });
  }

  retrieveDeletedUser(user_id: string): Observable<{ error?: string, message?: string }>{
    return this.http.put<{ error?: string, message?: string }>(`${this.baseUrl}retrieve-deleted-user/${user_id}`, {}, { headers: this.getAuthorisation() });
  }

  retrieveDeletedUsers(): Observable<{ error?: string, message?: string }>{
    return this.http.put<{ error?: string, message?: string }>(`${this.baseUrl}retrieve-deleted-users`, {}, { headers: this.getAuthorisation() });
  }
}
