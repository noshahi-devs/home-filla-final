import { AgentService } from '../../shared/services/agent.service';
import { UiService } from '../../shared/services/ui.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardAgent } from '../../shared/models';
import { AddAgentModalComponent, AgentData } from './add-agent-modal.component';

@Component({
  selector: 'app-admin-agents',
  standalone: true,
  imports: [CommonModule, FormsModule, AddAgentModalComponent],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.css'
})
export class AdminAgentsComponent implements OnInit {
  agents: DashboardAgent[] = [];
  filteredAgents: DashboardAgent[] = [];
  statusFilter: string = 'all';
  searchTerm: string = '';
  viewMode: 'table' | 'cards' = 'table';
  loading: boolean = false;
  
  // Selection
  selectedAgents: Set<number> = new Set<number>();
  
  // Modal state
  isAddAgentModalOpen: boolean = false;
  isProcessing: boolean = false;
  currentModalMode: 'add' | 'edit' | 'view' = 'add';
  selectedAgentForModal: AgentData | null = null;

  // Pagination
  itemsPerPage: number = 10;
  currentPage: number = 1;

  get totalPages(): number {
    return Math.ceil(this.filteredAgents.length / this.itemsPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.itemsPerPage, this.filteredAgents.length);
  }

  constructor(
    private agentService: AgentService,
    private uiService: UiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.loading = true;
    this.agentService.getAgents().subscribe({
      next: (agents) => {
        this.agents = agents;
        this.applyFilters();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilters(): void {
    let result = this.agents;
    
    // Status Filter
    if (this.statusFilter !== 'all') {
      const filter = this.statusFilter === 'approved' ? 'active' : this.statusFilter;
      result = result.filter(a => a.status === filter || a.status === this.statusFilter);
    }
    
    // Search Filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(a => 
        a.name.toLowerCase().includes(term) || 
        a.agencyName.toLowerCase().includes(term) ||
        a.email.toLowerCase().includes(term)
      );
    }
    
    this.filteredAgents = result;
  }

  setFilter(status: string): void {
    this.statusFilter = status;
    this.currentPage = 1;
    this.applyFilters();
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value;
    this.currentPage = 1;
    this.applyFilters();
  }

  getStatusCount(status: string): number {
    if (status === 'approved' || status === 'active') {
      return this.agents.filter(a => a.status === 'approved' || a.status === 'active').length;
    }
    return this.agents.filter(a => a.status === status).length;
  }

  getTotalListings(): number {
    return this.agents.reduce((acc, a) => acc + (a.listingsCount || 0), 0);
  }

  // Selection Logic
  toggleAgentSelection(id: number, event: any): void {
    if (event.target.checked) {
      this.selectedAgents.add(id);
    } else {
      this.selectedAgents.delete(id);
    }
  }

  toggleSelectAll(event: any): void {
    if (event.target.checked) {
      this.filteredAgents.forEach(a => this.selectedAgents.add(a.id));
    } else {
      this.selectedAgents.clear();
    }
  }

  clearSelection(): void {
    this.selectedAgents.clear();
  }

  // Bulk Actions
  async bulkApprove(): Promise<void> {
    const confirmed = await this.uiService.showConfirmation(
      'Approve Agents',
      `Are you sure you want to approve ${this.selectedAgents.size} agents?`,
      'info',
      'Yes, Approve All'
    );

    if (confirmed) {
      this.isProcessing = true;
      let completed = 0;
      this.selectedAgents.forEach(id => {
        this.agentService.updateAgentStatus(id, 'active').subscribe({
          next: () => {
            completed++;
            if (completed === this.selectedAgents.size) {
              this.isProcessing = false;
              this.uiService.showToast('success', 'Agents Approved', `${this.selectedAgents.size} agents have been verified successfully.`);
              this.loadAgents();
              this.clearSelection();
            }
          }
        });
      });
    }
  }

  async bulkReject(): Promise<void> {
    const confirmed = await this.uiService.showConfirmation(
      'Block Agents',
      `Are you sure you want to block ${this.selectedAgents.size} agents? This will restrict their access.`,
      'warning',
      'Yes, Block All'
    );

    if (confirmed) {
      this.isProcessing = true;
      let completed = 0;
      this.selectedAgents.forEach(id => {
        this.agentService.updateAgentStatus(id, 'blocked').subscribe({
          next: () => {
            completed++;
            if (completed === this.selectedAgents.size) {
              this.isProcessing = false;
              this.uiService.showToast('info', 'Agents Blocked', `${this.selectedAgents.size} agents have been moved to blocked status.`);
              this.loadAgents();
              this.clearSelection();
            }
          }
        });
      });
    }
  }

  async bulkDelete(): Promise<void> {
    const confirmed = await this.uiService.showConfirmation(
      'Delete Agents',
      `Are you sure you want to permanently delete ${this.selectedAgents.size} agents? This action cannot be undone.`,
      'danger',
      'Yes, Delete All'
    );

    if (confirmed) {
      this.isProcessing = true;
      let completed = 0;
      const count = this.selectedAgents.size;
      this.selectedAgents.forEach(id => {
        this.agentService.deleteAgent(id).subscribe({
          next: () => {
            completed++;
            if (completed === count) {
              this.isProcessing = false;
              this.uiService.showToast('success', 'Agents Deleted', `${count} agents have been permanently removed.`);
              this.loadAgents();
              this.clearSelection();
            }
          }
        });
      });
    }
  }

  exportAgents(): void {
    console.log('Exporting agents to CSV...');
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,Email,Agency,Listings,Rating,Status"].join(",") + "\n"
      + this.filteredAgents.map(a => `${a.name},${a.email},${a.agencyName},${a.listingsCount},${a.rating},${a.status}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "agents_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Individual Actions
  approveAgent(id: number): void {
    this.agentService.updateAgentStatus(id, 'active').subscribe(() => {
      this.loadAgents();
    });
  }

  rejectAgent(id: number): void {
    this.agentService.updateAgentStatus(id, 'blocked').subscribe(() => {
      this.loadAgents();
    });
  }

  viewAgent(agent: DashboardAgent): void {
    this.currentModalMode = 'view';
    this.selectedAgentForModal = {
      id: agent.id,
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      agencyName: agent.agencyName,
      status: agent.status as any,
      avatar: agent.avatar || '',
      listingsCount: agent.listingsCount,
      rating: agent.rating
    };
    this.isAddAgentModalOpen = true;
  }

  editAgent(agent: DashboardAgent): void {
    this.currentModalMode = 'edit';
    this.selectedAgentForModal = {
      id: agent.id,
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      agencyName: agent.agencyName,
      status: agent.status as any,
      avatar: agent.avatar || '',
      listingsCount: agent.listingsCount,
      rating: agent.rating
    };
    this.isAddAgentModalOpen = true;
  }

  async deleteAgent(id: number): Promise<void> {
    const confirmed = await this.uiService.showConfirmation(
      'Delete Agent',
      'Are you sure you want to permanently delete this agent account? This action cannot be undone.',
      'danger',
      'Delete Agent'
    );

    if (confirmed) {
      this.isProcessing = true;
      this.agentService.deleteAgent(id).subscribe({
        next: () => {
          this.isProcessing = false;
          this.loadAgents();
          this.uiService.showToast('success', 'Agent Deleted', 'The agent account has been successfully removed.');
        },
        error: () => {
          this.isProcessing = false;
          this.uiService.showToast('error', 'Action Failed', 'Could not delete the agent at this time.');
        }
      });
    }
  }

  openAddAgentModal(): void {
    this.currentModalMode = 'add';
    this.selectedAgentForModal = null;
    this.isAddAgentModalOpen = true;
  }

  closeAddAgentModal(): void {
    this.isAddAgentModalOpen = false;
    this.selectedAgentForModal = null;
  }

  onAddAgent(agentData: AgentData): void {
    this.isProcessing = true;
    
    // Add success logic for modal closing
    const processSuccess = () => {
      this.isProcessing = false;
      this.closeAddAgentModal();
      this.loadAgents();
    };

    if (this.currentModalMode === 'add') {
      this.agentService.addAgent(agentData).subscribe({
        next: () => {
          processSuccess();
          this.uiService.showToast('success', 'Agent Added', 'A new agent has been successfully registered.');
        },
        error: (err) => {
          this.isProcessing = false;
          console.error('Error adding agent:', err);
          this.uiService.showToast('error', 'Action Failed', 'Could not register the new agent at this time.');
        }
      });
    } else if (this.currentModalMode === 'edit' && agentData.id) {
      // Mock update
      setTimeout(() => {
        processSuccess();
        this.uiService.showToast('success', 'Agent Updated', 'The agent profile has been successfully updated.');
      }, 500);
    }
  }

  getDefaultAvatar(name: string): string {
    const letter = (name || '?').charAt(0).toUpperCase();
    const palette = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#dc2626', '#7c3aed', '#ec4899'];
    const bg = palette[letter.charCodeAt(0) % palette.length];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="${bg}"/><text x="50" y="50" dy=".35em" text-anchor="middle" fill="white" font-size="42" font-family="Inter,Arial,sans-serif" font-weight="700">${letter}</text></svg>`;
    return 'data:image/svg+xml;base64,' + btoa(svg);
  }

  resetFilters(): void {
    this.statusFilter = 'all';
    this.searchTerm = '';
    this.currentPage = 1;
    this.applyFilters();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePageSize(event: any): void {
    this.itemsPerPage = Number(event.target.value);
    this.currentPage = 1;
    this.applyFilters();
  }
}
