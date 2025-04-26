import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faLaptop, faCreditCard, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  constructor(private router: Router) {}
  searchQuery: string = '';

  categoryIcons: { [key: string]: any } = {
    'Technical Support': faLaptop,
    'Billing and Account': faCreditCard,
    'FAQ': faQuestionCircle,
  };

  categories: string[] = [
    'Technical Support',
    'Billing and Account',
    'FAQ',
  ];

  selectedCategory: string = '';

  categoryRoutes: { [key: string]: string } = {
    'Technical Support': '/support/technical',
    'Billing and Account': '/support/sub-pay',
    'FAQ': '/support/faq',
  };

  onSearch() {
    if (this.searchQuery) {
      console.log('Search for:', this.searchQuery);
      // Vous pouvez intégrer ceci avec un service pour gérer les résultats de recherche
    }
  }

  onCategorySelect(category: string) {
    this.selectedCategory = category;
    const route = this.categoryRoutes[category];
    if (route) {
      this.router.navigate([route]);
    }
  }

  getCategoryIcon(category: string): any {
    return this.categoryIcons[category];
  }
}
