import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../interfaces/fashion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  baseUrl = 'http://localhost:3000/reviews/';
  getAuthorisation(): HttpHeaders {
    const token = localStorage.getItem('token') as string;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }
  constructor(private http: HttpClient) { } 

  createReview(product_id: string, review: Review): Observable<{ error?: string, message?: string }> {
    return this.http.post<{ error?: string, message?: string }>(`${this.baseUrl}create-review/${product_id}`, review, { headers: this.getAuthorisation() });
  }

  updateReview(review_id: string, review: Review): Observable<{ error?: string, message?: string }> {
    return this.http.post<{ error?: string, message?: string }>(`${this.baseUrl}update-review/${review_id}`, review, { headers: this.getAuthorisation() });
  }

  deleteReview(review_id: string): Observable<{ error?: string, message?: string }> {
    return this.http.delete<{ error?: string, message?: string }>(`${this.baseUrl}delete-review/${review_id}`, { headers: this.getAuthorisation() });
  }

  getReviewsByUserId(): Observable<{ error?: string, message?: string, reviews: Review[] }> {
    return this.http.get<{ error?: string, message?: string, reviews: Review[] }>(`${this.baseUrl}get-reviews-by-user-id`, { headers: this.getAuthorisation() });
  }

  getReviewsByProductId(product_id: string): Observable<{ error?: string, message?: string, reviews: Review[], avgRating: number }> {
    return this.http.get<{ error?: string, message?: string, reviews: Review[], avgRating: number }>(`${this.baseUrl}get-reviews-by-product-id/${product_id}`, { headers: this.getAuthorisation() });
  }

  getReviewsByRating(rating: string): Observable<{ error?: string, message?: string, reviews: Review[] }> {
    return this.http.get<{ error?: string, message?: string, reviews: Review[] }>(`${this.baseUrl}get-reviews-by-rating/${rating}`, { headers: this.getAuthorisation() });
  }

  getAllReviews(): Observable<{ error?: string, message?: string, reviews: Review[] }> {
    return this.http.get<{ error?: string, message?: string, reviews: Review[] }>(`${this.baseUrl}get-all-reviews`, { headers: this.getAuthorisation() });
  }
}
