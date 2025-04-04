import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  articles: Article[] = [];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  private loadArticles(): void {
    this.shopService.getArticles().subscribe({
      next: (data: Article[]) => {
        this.articles = data;
      },
      error: (err) => {
        console.error('Error loading articles:', err);
      }
    });
  }
}