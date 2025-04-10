export class Review {
  reviewId?: number;
  reviewText: string;
  rating: number;
  reviewDate: Date;

  constructor(reviewText: string, rating: number, reviewId?: number) {
    this.reviewId = reviewId;
    this.reviewText = reviewText;
    this.rating = rating;
    this.reviewDate = new Date();
  }
}
