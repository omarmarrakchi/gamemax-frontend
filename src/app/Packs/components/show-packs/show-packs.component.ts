import { Component, OnInit } from '@angular/core';
import { PacksService } from '../../services/packs.service';
import { Pack } from '../../models/pack'; // Ensure the import path is correct

@Component({
  selector: 'app-show-packs',
  templateUrl: './show-packs.component.html',
  styleUrls: ['./show-packs.component.css']
})
export class ShowPacksComponent implements OnInit {
  packs: any[] = []; // Use the Pack type for the array
  categories: string[] = [];
  filteredPacks: any[] = [];
  selectedCategory: string = 'All';

  constructor(private packService: PacksService) {}

  ngOnInit(): void {
    this.getCategoriesFromPacks();

    this.packService.getAllPacks().subscribe({
      next: (response: any[]) => {
        console.log('Received response:', response);
        this.packs = response; // Directly assign the response to the packs array
      },
      error: (err) => {
        console.error('Error fetching packs:', err);
      },
    });
    this.filterPacks('All');
  }

  getCategoriesFromPacks() {
    console.log(this.packs+"");
    const allCategories = this.packs.map(p => p.categorie?.nom?.trim().replace(/"/g, '') || 'Uncategorized');
    this.categories = ['All', ...Array.from(new Set(allCategories))];
  }

  filterPacks(category: string) {
    console.log(category);
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredPacks = this.packs;
    } else {
      this.filteredPacks = this.packs.filter(p => p.categorie?.nom?.trim().replace(/"/g, '') === category);
    }
  }
}
