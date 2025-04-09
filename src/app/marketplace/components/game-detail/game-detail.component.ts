import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Article} from "../../models/article";
import {Review} from "../../models/review";
import {ShopService} from "../../services/shop.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  article: Article | null = null;
  reviews: Review[] = [];
  newReview: Review = new Review('', 0);
  reviewForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required]],
      reviewText: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  ngOnInit(): void {
    this.loadArticle();
    this.loadReviews();
  }

  private loadArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('idArticle'));
    if (id) {
      this.shopService.getArticleById(id).subscribe({
        next: (data: Article) => {
          console.log('Article récupéré :', data);
          this.article = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l\'article :', err);
        }
      });
    } else {
      console.error('ID invalide ou manquant dans l\'URL.');
    }
  }

  private loadReviews(): void {
    const id = Number(this.route.snapshot.paramMap.get('idGame'));
    if (id) {
      this.shopService.getArticleReviews(id).subscribe({
        next: (data: Review[]) => {
          this.reviews = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des reviews :', err);
        }
      });
    } else {
      console.error('ID invalide ou manquant dans l\'URL.');
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }


  onSubmitReview(): void {
    if (this.reviewForm.valid) {
      const rating = this.reviewForm.get('rating')?.value; // Récupère la valeur sélectionnée
      console.log('Rating sélectionné :', rating);

      const gameId = this.article?.gameId;
      if (gameId) {
        this.shopService.addReview(this.reviewForm.value, gameId).subscribe({
          next: (review: Review) => {
            this.reviews.push(review);
            this.reviewForm.reset();
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout du review :', err);
          }
        });
      } else {
        console.error('Impossible d\'ajouter un review : gameId manquant.');
      }
    } else {
      this.markFormGroupTouched(this.reviewForm); // Marque tous les champs comme touchés
      console.error('Formulaire invalide.');
    }
  }
}
