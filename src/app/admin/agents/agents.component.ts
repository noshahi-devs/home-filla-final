import { AgentService } from '../../shared/services/agent.service';
import { Component, OnInit } from '@angular/core';
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
  
  // Selection
  selectedAgents: Set<number> = new Set<number>();
  
  // Modal state
  isAddAgentModalOpen: boolean = false;

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

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.agentService.getAgents().subscribe(agents => {
      this.agents = agents;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let result = this.agents;
    
    // Status Filter
    if (this.statusFilter !== 'all') {
      result = result.filter(a => a.status === this.statusFilter);
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
  bulkApprove(): void {
    if (confirm(`Are you sure you want to approve ${this.selectedAgents.size} agents?`)) {
      // Mocking bulk approve for now
      this.selectedAgents.forEach(id => {
        this.agentService.updateAgentStatus(id, 'approved').subscribe();
      });
      setTimeout(() => {
        this.loadAgents();
        this.clearSelection();
      }, 500);
    }
  }

  bulkReject(): void {
    if (confirm(`Are you sure you want to reject ${this.selectedAgents.size} agents?`)) {
      this.selectedAgents.forEach(id => {
        this.agentService.updateAgentStatus(id, 'rejected').subscribe();
      });
      setTimeout(() => {
        this.loadAgents();
        this.clearSelection();
      }, 500);
    }
  }

  bulkDelete(): void {
    if (confirm(`Are you sure you want to delete ${this.selectedAgents.size} agents? This action cannot be undone.`)) {
      this.selectedAgents.forEach(id => {
        this.agentService.deleteAgent(id).subscribe();
      });
      setTimeout(() => {
        this.loadAgents();
        this.clearSelection();
      }, 500);
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
    this.agentService.updateAgentStatus(id, 'approved').subscribe(() => {
      this.loadAgents();
    });
  }

  rejectAgent(id: number): void {
    this.agentService.updateAgentStatus(id, 'rejected').subscribe(() => {
      this.loadAgents();
    });
  }

  editAgent(agent: DashboardAgent): void {
    console.log('Editing agent:', agent);
  }

  deleteAgent(id: number): void {
    if (confirm('Are you sure you want to delete this agent?')) {
      this.agentService.deleteAgent(id).subscribe(() => {
        this.loadAgents();
      });
    }
  }

  openAddAgentModal(): void {
    this.isAddAgentModalOpen = true;
  }

  closeAddAgentModal(): void {
    this.isAddAgentModalOpen = false;
  }

  onAddAgent(agentData: AgentData): void {
    this.agentService.addAgent(agentData).subscribe({
      next: () => {
        this.loadAgents();
        this.closeAddAgentModal();
      },
      error: (err) => {
        console.error('Error adding agent:', err);
        alert('Failed to add agent. Please check the console for details.');
      }
    });
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
