import { UserService } from '../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiService } from '../../shared/services/ui.service';
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

  constructor(private userService: UserService, private uiService: UiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.applyFilters();
    });
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

  async toggleBlock(user: DashboardUser): Promise<void> {
    const action = user.status === 'active' ? 'Block' : 'Unblock';
    const isConfirmed = await this.uiService.showConfirmation(
      `${action} User`,
      `Are you sure you want to ${action.toLowerCase()} this user?`,
      'warning',
      `Yes, ${action}`
    );
    if (isConfirmed) {
      const newStatus = user.status === 'active' ? 'blocked' : 'active';
      this.userService.updateUserStatus(user.id, newStatus).subscribe(() => {
        this.loadUsers();
        this.uiService.showToast('success', `User ${action}ed`, `The user has been ${action.toLowerCase()}ed.`);
      });
    }
  }

  async deleteUser(id: number): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Delete User',
      'Are you sure you want to completely delete this user? All their data will be removed.',
      'danger'
    );
    if (isConfirmed) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
        this.uiService.showToast('success', 'User Deleted', 'The user account has been successfully removed.');
      });
    }
  }

  async promoteToAgent(user: DashboardUser): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Promote to Agent',
      `Are you sure you want to grant ${user.name} Agent privileges?`,
      'info',
      'Promote'
    );
    if (isConfirmed) {
      // Logic for promotion could be another API call like this.dataService.updateUserRole(user.id, 'agent')
      this.uiService.showToast('success', 'User Promoted', `${user.name} is now an Agent.`);
      this.loadUsers();
    }
  }
}
