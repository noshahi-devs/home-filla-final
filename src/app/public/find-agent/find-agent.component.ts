import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface AgentProfile {
  name: string;
  city: string;
  coverage: string[];
  title: string;
  rating: number;
  deals: number;
  experience: number;
  languages: string[];
  specialties: string[];
  availability: string;
  imageUrl: string;
  tagline: string;
  phone: string;
}

@Component({
  selector: 'app-find-agent',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './find-agent.component.html',
  styleUrls: ['./find-agent.component.css']
})
export class FindAgentComponent {
  isMobileMenuOpen = false;
  searchLocation = '';
  selectedSpecialty = 'Any';
  selectedExperience = 'Any';
  selectedLanguage = 'Any';

  specialties = [
    'Any',
    'Buyer Representation',
    'Seller Representation',
    'Luxury Homes',
    'New Construction',
    'Investments'
  ];
  experienceOptions = ['Any', '5+', '10+', '15+', '20+'];
  languageOptions = ['Any', 'English', 'Spanish', 'Mandarin', 'French', 'Portuguese'];

  readonly experienceThresholdMap: Record<string, number> = {
    Any: 0,
    '5+': 5,
    '10+': 10,
    '15+': 15,
    '20+': 20
  };

  agents: AgentProfile[] = [
    {
      name: 'Gregg Klar',
      city: 'Denver, CO',
      coverage: ['Denver metro', 'Boulder', 'Colorado Springs'],
      title: 'Premier Listing Specialist',
      rating: 4.9,
      deals: 214,
      experience: 22,
      languages: ['English', 'Spanish'],
      specialties: ['Seller Representation', 'Luxury Homes'],
      availability: 'Weekdays',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      tagline: 'Gets homes under contract in 12 days or less.',
      phone: '(303) 555-0119'
    },
    {
      name: 'Bryan Swan',
      city: 'Austin, TX',
      coverage: ['Austin', 'Round Rock', 'Lake Travis'],
      title: 'Buyer Advocate & Investor Coach',
      rating: 4.8,
      deals: 178,
      experience: 16,
      languages: ['English'],
      specialties: ['Buyer Representation', 'Investments'],
      availability: 'Evenings',
      imageUrl: 'https://randomuser.me/api/portraits/men/44.jpg',
      tagline: 'Knows every new listing before it hits the market.',
      phone: '(512) 555-0244'
    },
    {
      name: 'Lila Harrington',
      city: 'San Francisco, CA',
      coverage: ['SF', 'Peninsula', 'East Bay'],
      title: 'New Construction & Design Partner',
      rating: 5.0,
      deals: 146,
      experience: 13,
      languages: ['English', 'Mandarin'],
      specialties: ['New Construction', 'Seller Representation'],
      availability: 'Weekdays + Saturday',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      tagline: 'Guides developers and modern buyers through complex builds.',
      phone: '(415) 555-0106'
    },
    {
      name: 'Kai Patel',
      city: 'Miami, FL',
      coverage: ['Greater Miami', 'Fort Lauderdale', 'Palm Beach'],
      title: 'Luxury Condominium Expert',
      rating: 4.7,
      deals: 132,
      experience: 12,
      languages: ['English', 'Spanish'],
      specialties: ['Luxury Homes', 'Seller Representation'],
      availability: 'Flexible',
      imageUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
      tagline: 'Connects high-net-worth buyers to waterfront penthouses.',
      phone: '(305) 555-0983'
    },
    {
      name: 'Mia Torres',
      city: 'Los Angeles, CA',
      coverage: ['LA County', 'Beverly Hills', 'Pasadena'],
      title: 'Metropolitan Buyer Coach',
      rating: 4.9,
      deals: 201,
      experience: 19,
      languages: ['English', 'Spanish'],
      specialties: ['Buyer Representation', 'Luxury Homes'],
      availability: 'Weekday afternoons',
      imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
      tagline: 'Turns bidding wars into confident offers with custom data.',
      phone: '(213) 555-0116'
    },
    {
      name: 'Marco Bertin',
      city: 'New York, NY',
      coverage: ['Manhattan', 'Brooklyn', 'Northern NJ'],
      title: 'Global Investor Specialist',
      rating: 4.8,
      deals: 164,
      experience: 18,
      languages: ['English', 'French', 'Portuguese'],
      specialties: ['Investments', 'New Construction'],
      availability: 'By request',
      imageUrl: 'https://randomuser.me/api/portraits/men/66.jpg',
      tagline: 'Helps cross-border investors buy and reposition assets.',
      phone: '(212) 555-0198'
    }
  ];

  get filteredAgents(): AgentProfile[] {
    const query = this.searchLocation.trim().toLowerCase();
    const minExperience = this.experienceThresholdMap[this.selectedExperience] ?? 0;

    return this.agents.filter(agent => {
      const matchesLocation =
        !query ||
        agent.city.toLowerCase().includes(query) ||
        agent.coverage.some(area => area.toLowerCase().includes(query));
      const matchesSpecialty =
        this.selectedSpecialty === 'Any' || agent.specialties.includes(this.selectedSpecialty);
      const matchesLanguage =
        this.selectedLanguage === 'Any' || agent.languages.includes(this.selectedLanguage);
      const matchesExperience = agent.experience >= minExperience;

      return matchesLocation && matchesSpecialty && matchesLanguage && matchesExperience;
    });
  }

  get averageRating(): string {
    const score = this.agents.reduce((total, agent) => total + agent.rating, 0) / this.agents.length;
    return score.toFixed(1);
  }

  get totalDeals(): number {
    return this.agents.reduce((total, agent) => total + agent.deals, 0);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  scrollToAgents() {
    document.getElementById('agent-hub')?.scrollIntoView({ behavior: 'smooth' });
  }

  resetFilters() {
    this.searchLocation = '';
    this.selectedSpecialty = 'Any';
    this.selectedExperience = 'Any';
    this.selectedLanguage = 'Any';
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMobileMenu();
  }
}
