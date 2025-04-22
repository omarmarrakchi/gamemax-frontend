import {Component, OnInit} from '@angular/core';
import {Article} from "../../models/article";
import {ActivatedRoute} from "@angular/router";
import {ShopService} from "../../services/shop.service";
import {Coupon} from "../../models/coupon";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  article: Article = new Article(0, new Date(), 0, 0, 0, {
    gameId: 0,
    gameName: '',
    gameType: '',
    gameDescription: '',
    publisher: '',
    releaseDate: new Date(),
    platform: '',
    imageUrls: []
  });
  couponResult: Coupon | false = false;
  couponCode: string = '';
  isCouponChecked: boolean = false;
  oldPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
  ){}

  ngOnInit(): void {
    console.log(this.couponResult);
    this.loadArticle();
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

  applyCoupon(): void {
    this.shopService.checkAndUpdateCoupon(this.couponCode).subscribe({
      next: (result: Coupon | false) => {
        this.couponResult = result;
        this.isCouponChecked = true;
        if (result && typeof result === 'object') {
          this.oldPrice = this.article.price;
          this.article.price = this.article.price - (this.article.price * (result.discount / 100));
        }
      },
      error: (err) => {
        console.error('Erreur lors de l\'application du coupon :', err);
      }
    });
  }



}
