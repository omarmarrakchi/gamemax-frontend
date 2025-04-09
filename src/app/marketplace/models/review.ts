export class Review {
  reviewId?: number;
  reviewText: string;
  rating: number;

  constructor(reviewText: string, rating: number, reviewId?: number) {
    this.reviewId = reviewId;
    this.reviewText = reviewText;
    this.rating = rating;
  }
}
