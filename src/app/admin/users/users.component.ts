import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../shared/services/mock-data.service';
import { DashboardUser } from '../../shared/models';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css' // We can reuse properties table styles or create specific
})
export class AdminUsersComponent implements OnInit {
  users: DashboardUser[] = [];
  filteredUsers: DashboardUser[] = [];
  roleFilter: string = 'all';
  searchTerm: string = '';

  constructor(private dataService: MockDataService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.dataService.getUsers();
    this.applyFilters();
  }

  applyFilters(): void {
    let result = this.users;
    if (this.roleFilter !== 'all') {
      result = result.filter(u => u.role === this.roleFilter);
    }
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(term) || 
        u.email.toLowerCase().includes(term)
      );
    }
    this.filteredUsers = result;
  }

  setFilter(role: string): void {
    this.roleFilter = role;
    this.applyFilters();
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  toggleBlock(user: DashboardUser): void {
    const newStatus = user.status === 'active' ? 'blocked' : 'active';
    this.dataService.updateUserStatus(user.id, newStatus);
    this.loadUsers();
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.dataService.deleteUser(id);
      this.loadUsers();
    }
  }

  promoteToAgent(user: DashboardUser): void {
    if (confirm(`Promote ${user.name} to Agent?`)) {
      // In a real app, update role and maybe create agent profile
      const u = this.users.find(x => x.id === user.id);
      if (u) {
        u.role = 'agent';
      }
      this.loadUsers();
    }
  }
}
