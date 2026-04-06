import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService, Category } from '../../shared/services/category.service';
import { UiService } from '../../shared/services/ui.service';

// Common FontAwesome icons to choose from in the picker
const ICON_OPTIONS = [
  'fa-home', 'fa-building', 'fa-city', 'fa-warehouse', 'fa-store',
  'fa-hotel', 'fa-landmark', 'fa-university', 'fa-hospital', 'fa-industry',
  'fa-tree', 'fa-leaf', 'fa-mountain', 'fa-water', 'fa-sun',
  'fa-bed', 'fa-bath', 'fa-couch', 'fa-chair', 'fa-tv',
  'fa-car', 'fa-road', 'fa-map-marker-alt', 'fa-globe', 'fa-flag',
  'fa-tag', 'fa-tags', 'fa-star', 'fa-heart', 'fa-gem'
];

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchQuery = '';
  loading = true;

  // Modal state
  showModal = false;
  showIconPicker = false;
  editMode = false;

  currentCategory: Partial<Category> = { name: '', icon: 'fa-home', sortOrder: 0 };
  iconOptions = ICON_OPTIONS;

  constructor(private categoryService: CategoryService, private uiService: UiService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.filterCategories();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.uiService.showToast('error', 'Failed to load', 'Could not fetch categories from the server.');
      }
    });
  }

  filterCategories(): void {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredCategories = this.categories.filter(c => c.name.toLowerCase().includes(q));
  }

  openAdd(): void {
    this.editMode = false;
    this.currentCategory = { name: '', icon: 'fa-home', sortOrder: this.categories.length };
    this.showModal = true;
    this.showIconPicker = false;
  }

  openEdit(cat: Category): void {
    this.editMode = true;
    this.currentCategory = { ...cat };
    this.showModal = true;
    this.showIconPicker = false;
  }

  selectIcon(icon: string): void {
    this.currentCategory.icon = icon;
    this.showIconPicker = false;
  }

  save(): void {
    if (!this.currentCategory.name?.trim()) {
      this.uiService.showToast('error', 'Incomplete', 'Please provide a category name.');
      return;
    }

    const input = {
      name: this.currentCategory.name,
      icon: this.currentCategory.icon || 'fa-tag',
      sortOrder: this.currentCategory.sortOrder ?? 0
    };

    if (this.editMode && this.currentCategory.id) {
      this.categoryService.updateCategory(this.currentCategory.id, input).subscribe(() => {
        this.uiService.showToast('success', 'Updated', 'Category has been updated successfully.');
        this.showModal = false;
        this.loadCategories();
      });
    } else {
      this.categoryService.createCategory(input).subscribe(() => {
        this.uiService.showToast('success', 'Created', 'New category added successfully.');
        this.showModal = false;
        this.loadCategories();
      });
    }
  }

  async delete(cat: Category): Promise<void> {
    const confirmed = await this.uiService.showConfirmation(
      'Delete Category',
      `Are you sure you want to delete "${cat.name}"? This action cannot be undone.`,
      'danger'
    );
    if (confirmed) {
      this.categoryService.deleteCategory(cat.id).subscribe(() => {
        this.uiService.showToast('success', 'Deleted', `"${cat.name}" has been removed.`);
        this.loadCategories();
      });
    }
  }
}
