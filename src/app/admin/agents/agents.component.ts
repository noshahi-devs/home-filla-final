import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../shared/services/mock-data.service';
import { DashboardAgent } from '../../shared/models';

@Component({
  selector: 'app-admin-agents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.css'
})
export class AdminAgentsComponent implements OnInit {
  agents: DashboardAgent[] = [];
  filteredAgents: DashboardAgent[] = [];
  statusFilter: string = 'all';
  searchTerm: string = '';

  constructor(private dataService: MockDataService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.agents = this.dataService.getAgents();
    this.applyFilters();
  }

  applyFilters(): void {
    let result = this.agents;
    if (this.statusFilter !== 'all') {
      result = result.filter(a => a.status === this.statusFilter);
    }
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(a => 
        a.name.toLowerCase().includes(term) || 
        a.agencyName.toLowerCase().includes(term)
      );
    }
    this.filteredAgents = result;
  }

  setFilter(status: string): void {
    this.statusFilter = status;
    this.applyFilters();
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  approveAgent(id: number): void {
    this.dataService.updateAgentStatus(id, 'approved');
    this.loadAgents();
  }

  rejectAgent(id: number): void {
    this.dataService.updateAgentStatus(id, 'rejected');
    this.loadAgents();
  }
}
