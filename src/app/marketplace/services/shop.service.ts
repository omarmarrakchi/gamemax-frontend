import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { Review } from '../models/review';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private readonly BASE_URL_ARTICLE = 'http://localhost:8080/api/articles';
  private readonly BASE_URL_REVIEW = 'http://localhost:8080/api/games/reviews';

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

}
