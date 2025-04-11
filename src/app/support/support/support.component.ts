import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  constructor(private router: Router) {}
  searchQuery: string = '';    
  categoryImageUrl: string = 'images/support/';  // Path for the images

  // Mapping categories to their image files
  categoryImages: { [key: string]: string } = {
    'Technical Support': 'tech-support.png',  // Add your actual image paths here
    'Billing and Account': 'billing.png',
    'FAQ': 'faq.png',
  };

  categories: string[] = [
    'Technical Support',
    'Billing and Account',
    'FAQ',
  ];
  
  selectedCategory: string = '';

  categoryRoutes: { [key: string]: string } = {
    'Technical Support': '/support/technical',
    'Billing and Account': '/support/billing',
    'FAQ': '/support/faq',
  };
  
  onSearch() {
    if (this.searchQuery) {
      console.log('Search for:', this.searchQuery);
      // You can integrate this with a service to handle search results
    }
  }

  onCategorySelect(category: string) {
    this.selectedCategory = category;
    const route = this.categoryRoutes[category];
    if (route) {
      this.router.navigate([route]);
    }
  }

  getCategoryImage(category: string): string {
    return this.categoryImages[category] ? this.categoryImageUrl + this.categoryImages[category] : '';
  }
}
