import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { Review } from '../models/review';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Coupon} from "../models/coupon";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private readonly BASE_URL_ARTICLE = 'http://localhost:8080/api/articles';
  private readonly BASE_URL_REVIEW = 'http://localhost:8080/api/games/reviews';
  private readonly BASE_URL_COUPON = 'http://localhost:8080/api/coupons';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.BASE_URL_ARTICLE);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.BASE_URL_ARTICLE}/${id}`);
  }

  getArticleReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.BASE_URL_REVIEW}/${id}`);
  }

  addReview(review: Review, gameId: number): Observable<Review> {
    return this.http.post<Review>(`${this.BASE_URL_REVIEW}/${gameId}`, review);
  }

  updateReview(reviewId: number, updatedReview: Review): Observable<Review> {
    return this.http.put<Review>(`${this.BASE_URL_REVIEW}/${reviewId}`, updatedReview);
  }

  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL_REVIEW}/${reviewId}`);
  }

  checkAndUpdateCoupon(couponCode: string): Observable<Coupon | false> {
    const url = `${this.BASE_URL_COUPON}/check/${couponCode}`;
    return this.http.get<Coupon | false>(url);
  }

}
