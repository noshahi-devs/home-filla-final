import { UserService } from '../../shared/services/user.service';
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiService } from '../../shared/services/ui.service';
import { DashboardUser } from '../../shared/models';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';
import { AddUserModalComponent, UserData } from './add-user-modal.component';
import { finalize } from 'rxjs/operators';

// Extend DashboardUser interface to include lastSeen
interface ExtendedDashboardUser extends DashboardUser {
  lastSeen?: string | Date;
}

export interface UserStats {
  total: number;
  active: number;
  agents: number;
  blocked: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startItem: number;
  endItem: number;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, TimeAgoPipe, AddUserModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class AdminUsersComponent implements OnInit {
  users: ExtendedDashboardUser[] = [];
  filteredUsers: ExtendedDashboardUser[] = [];
  displayUsers: ExtendedDashboardUser[] = [];

  // Filters
  roleFilter: string = 'all';
  searchTerm: string = '';
  sortBy: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  @ViewChild('searchInput') searchInput!: ElementRef;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.searchInput.nativeElement.focus();
    }
  }

  // View modes
  viewMode: string = 'table';

  // Selection
  selectedUsers: Set<number> = new Set();
  isAllSelected: boolean = false;

  // Pagination
  pagination: PaginationInfo = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    startItem: 0,
    endItem: 0
  };

  // Stats
  stats: UserStats = {
    total: 0,
    active: 0,
    agents: 0,
    blocked: 0
  };

  // UI state
  isLoading: boolean = false;
  showTableSettings: boolean = false;

  // Modal state
  isAddUserModalOpen: boolean = false;
  isProcessing: boolean = false;
  currentModalMode: 'add' | 'edit' | 'view' = 'add';
  selectedUserForModal: UserData | null = null;

  constructor(private userService: UserService, private uiService: UiService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe((users: ExtendedDashboardUser[]) => {
      this.users = users;
      this.calculateStats();
      this.applyFilters();
      this.isLoading = false;
    });
  }

  calculateStats(): void {
    this.stats = {
      total: this.users.length,
      active: this.users.filter(u => u.status === 'active').length,
      agents: this.users.filter(u => u.role === 'agent').length,
      blocked: this.users.filter(u => u.status === 'blocked').length
    };
  }

  applyFilters(): void {
    let result = [...this.users];

    // Role filter
    if (this.roleFilter !== 'all') {
      result = result.filter(u => u.role === this.roleFilter);
    }

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(u =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.phone?.toLowerCase().includes(term)
      );
    }

    // Sort
    this.sortUsers(result);

    // Update filtered and apply pagination
    this.filteredUsers = result;
    this.updatePagination();
  }

  sortUsers(users: ExtendedDashboardUser[]): void {
    users.sort((a, b) => {
      let aValue: any = a[this.sortBy as keyof ExtendedDashboardUser];
      let bValue: any = b[this.sortBy as keyof ExtendedDashboardUser];

      // Handle string comparison
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  updatePagination(): void {
    this.pagination.totalItems = this.filteredUsers.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);

    if (this.pagination.currentPage > this.pagination.totalPages) {
      this.pagination.currentPage = 1;
    }

    const startIndex = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    const endIndex = startIndex + this.pagination.itemsPerPage;

    this.pagination.startItem = startIndex + 1;
    this.pagination.endItem = Math.min(endIndex, this.pagination.totalItems);

    this.displayUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  setFilter(role: string): void {
    this.roleFilter = role;
    this.pagination.currentPage = 1;
    this.applyFilters();
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value;
    this.pagination.currentPage = 1;
    this.applyFilters();
  }

  onSort(column: string): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.pagination.currentPage = page;
    this.updatePagination();
  }

  onPageSizeChange(size: number): void {
    this.pagination.itemsPerPage = size;
    this.pagination.currentPage = 1;
    this.updatePagination();
  }

  // Selection methods
  toggleUserSelection(userId: number, event?: any): void {
    if (event) {
      if (event.target.checked) {
        this.selectedUsers.add(userId);
      } else {
        this.selectedUsers.delete(userId);
      }
    } else {
      if (this.selectedUsers.has(userId)) {
        this.selectedUsers.delete(userId);
      } else {
        this.selectedUsers.add(userId);
      }
    }
    this.updateSelectAllState();
  }

  toggleSelectAll(event?: any): void {
    if (event) {
      this.isAllSelected = event.target.checked;
    }

    if (this.isAllSelected) {
      this.displayUsers.forEach(user => this.selectedUsers.add(user.id));
    } else {
      this.selectedUsers.clear();
    }
  }

  updateSelectAllState(): void {
    this.isAllSelected = this.displayUsers.length > 0 &&
      this.displayUsers.every(user => this.selectedUsers.has(user.id));
  }

  clearSelection(): void {
    this.selectedUsers.clear();
    this.isAllSelected = false;
  }

  // Bulk actions
  async bulkApprove(): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Approve Users',
      `Are you sure you want to approve ${this.selectedUsers.size} users?`,
      'warning',
      'Approve'
    );
    if (isConfirmed) {
      // Implement bulk approve logic
      this.uiService.showToast('success', 'Users Approved', `${this.selectedUsers.size} users have been approved.`);
      this.clearSelection();
      this.loadUsers();
    }
  }

  async bulkReject(): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Reject Users',
      `Are you sure you want to reject ${this.selectedUsers.size} users?`,
      'warning',
      'Reject'
    );
    if (isConfirmed) {
      // Implement bulk reject logic
      this.uiService.showToast('success', 'Users Rejected', `${this.selectedUsers.size} users have been rejected.`);
      this.clearSelection();
      this.loadUsers();
    }
  }

  async bulkDelete(): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Delete Users',
      `Are you sure you want to delete ${this.selectedUsers.size} users? This action cannot be undone.`,
      'danger',
      'Delete'
    );
    if (isConfirmed) {
      // Implement bulk delete logic
      this.uiService.showToast('success', 'Users Deleted', `${this.selectedUsers.size} users have been deleted.`);
      this.clearSelection();
      this.loadUsers();
    }
  }

  // Export functionality
  exportUsers(): void {
    // Implement CSV/Excel export logic
    this.uiService.showToast('info', 'Export Started', 'User data export is being prepared...');
  }

  // View mode toggle
  setViewMode(mode: 'table' | 'grid'): void {
    this.viewMode = mode;
    this.uiService.showToast('info', 'View Changed', `Switched to ${mode} layout`);
  }

  isViewMode(mode: string): boolean {
    return this.viewMode === mode;
  }

  // Clear filters
  clearFilters(): void {
    this.roleFilter = 'all';
    this.searchTerm = '';
    this.pagination.currentPage = 1;
    this.applyFilters();
  }

  // Helper methods
  getRoleIcon(role: string): string {
    const icons = {
      admin: 'fa-crown',
      seller: 'fa-store',
      buyer: 'fa-user',
      agent: 'fa-user-tie'
    };
    return icons[role as keyof typeof icons] || 'fa-user';
  }

  getDefaultAvatar(name: string): string {
    const letter = (name || '?').charAt(0).toUpperCase();
    const palette = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#dc2626', '#7c3aed', '#ec4899'];
    const bg = palette[letter.charCodeAt(0) % palette.length];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="${bg}"/><text x="50" y="50" dy=".35em" text-anchor="middle" fill="white" font-size="42" font-family="Inter,Arial,sans-serif" font-weight="700">${letter}</text></svg>`;
    return 'data:image/svg+xml;base64,' + btoa(svg);
  }

  onTableAvatarError(event: any, name: string): void {
    event.target.src = this.getDefaultAvatar(name);
  }

  viewUserDetails(user: ExtendedDashboardUser): void {
    this.currentModalMode = 'view';
    this.selectedUserForModal = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role as any,
      status: user.status as any,
      avatar: user.avatar || ''
    };
    this.isAddUserModalOpen = true;
  }

  editUser(user: ExtendedDashboardUser): void {
    this.currentModalMode = 'edit';
    this.selectedUserForModal = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role as any,
      status: user.status as any,
      avatar: user.avatar || ''
    };
    this.isAddUserModalOpen = true;
  }

  // Pagination methods
  goToPage(page: number): void {
    this.pagination.currentPage = page;
    this.updatePagination();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.pagination.currentPage - 2);
    const end = Math.min(this.pagination.totalPages, this.pagination.currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  changePageSize(event: any): void {
    this.pagination.itemsPerPage = parseInt(event.target.value);
    this.pagination.currentPage = 1;
    this.updatePagination();
  }

  // Modal methods
  openAddUserModal(): void {
    this.currentModalMode = 'add';
    this.selectedUserForModal = null;
    this.isAddUserModalOpen = true;
  }

  closeAddUserModal(): void {
    this.isAddUserModalOpen = false;
    this.selectedUserForModal = null;
    this.currentModalMode = 'add';
  }

  onAddUser(userData: UserData): void {
    // Just hide the modal immediately to show the processing popup
    this.isAddUserModalOpen = false;

    try {
      if (this.currentModalMode === 'add') {
        this.isProcessing = true;

        // Safety timer to auto-close processing popup after 3 seconds if it hangs
        setTimeout(() => {
          if (this.isProcessing) {
            this.isProcessing = false;
            this.closeAddUserModal();
          }
        }, 3000);

        const payload = {
          name: userData.name,
          email: userData.email,
          password: userData.password!,
          phone: userData.phone,
          avatar: userData.avatar,
          role: userData.role
        };

        this.userService.createUser(payload).pipe(
          finalize(() => {
            this.isProcessing = false;
            this.closeAddUserModal();
          })
        ).subscribe({
          next: () => {
            this.uiService.showToast('success', 'User Added', `Successfully added ${userData.name} as a ${userData.role}`);
            this.loadUsers();
          },
          error: (err) => {
            console.error('Error creating user:', err);
            const msg = err.error?.message || 'Failed to create user. Please try again.';
            this.uiService.showToast('error', 'Error', msg);
          }
        });
      } else if (this.currentModalMode === 'edit' && userData.id) {
        this.isProcessing = true;

        // Safety timer to auto-close processing popup after 3 seconds if it hangs
        setTimeout(() => {
          if (this.isProcessing) {
            this.isProcessing = false;
            this.closeAddUserModal();
          }
        }, 3000);

        const payload = {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          avatar: userData.avatar,
          role: userData.role
        };

        this.userService.updateUser(userData.id, payload).pipe(
          finalize(() => {
            this.isProcessing = false;
            this.closeAddUserModal();
          })
        ).subscribe({
          next: () => {
            this.uiService.showToast('success', 'User Updated', `Successfully updated details for ${userData.name}`);
            this.loadUsers();
          },
          error: (err) => {
            console.error('Error updating user:', err);
            this.uiService.showToast('error', 'Error', 'Failed to update user. Please try again.');
          }
        });
      } else {
        this.closeAddUserModal();
      }
    } catch (e) {
      console.error('Sync error in onAddUser:', e);
      this.isProcessing = false;
      this.closeAddUserModal();
    }
  }

  openTableSettings(): void {
    this.showTableSettings = !this.showTableSettings;
  }

  // Additional bulk actions
  async bulkActivate(): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Activate Users',
      `Are you sure you want to activate ${this.selectedUsers.size} users?`,
      'warning',
      'Activate'
    );
    if (isConfirmed) {
      // Implement bulk activate logic
      this.uiService.showToast('success', 'Users Activated', `${this.selectedUsers.size} users have been activated.`);
      this.clearSelection();
      this.loadUsers();
    }
  }

  async bulkBlock(): Promise<void> {
    const isConfirmed = await this.uiService.showConfirmation(
      'Block Users',
      `Are you sure you want to block ${this.selectedUsers.size} users?`,
      'warning',
      'Block'
    );
    if (isConfirmed) {
      // Implement bulk block logic
      this.uiService.showToast('success', 'Users Blocked', `${this.selectedUsers.size} users have been blocked.`);
      this.clearSelection();
      this.loadUsers();
    }
  }

  async toggleBlock(user: ExtendedDashboardUser): Promise<void> {
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

  async promoteToAgent(user: ExtendedDashboardUser): Promise<void> {
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
