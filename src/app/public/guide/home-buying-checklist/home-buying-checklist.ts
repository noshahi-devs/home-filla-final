import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../../shared/components/site-footer/site-footer.component';

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  link?: string;
  linkText?: string;
  completed: boolean;
}

interface ChecklistSection {
  title: string;
  icon: string;
  isOpen: boolean;
  items: ChecklistItem[];
}

@Component({
  selector: 'app-home-buying-checklist',
  standalone: true,
  imports: [CommonModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './home-buying-checklist.html',
  styleUrl: './home-buying-checklist.css',
})
export class HomeBuyingChecklist implements AfterViewInit {
  sections: ChecklistSection[] = [
    {
      title: 'House Hunting',
      icon: 'magnifying-glass',
      isOpen: true,
      items: [
        {
          id: 'understand_finances',
          label: 'Understand your finances',
          description: "While you're searching, get an idea of what you can afford.",
          link: 'https://www.realtor.com/mortgage/tools/affordability-calculator/',
          linkText: 'Home Affordability Calculator',
          completed: false
        },
        {
          id: 'preapprove',
          label: 'Get pre-approved with a lender',
          description: "Lenders help you determine what you can afford. A mortgage pre-approval is a lender's commitment to financing up to a certain amount.",
          link: 'https://www.realtor.com/advice/finance/get-a-mortgage-preapproval/',
          linkText: 'What Does Mortgage Pre-Approval Mean?',
          completed: false
        },
        {
          id: 'research_market',
          label: 'Research market conditions',
          description: 'Understanding the cost of homes near you will help you determine how much to offer on a home.',
          completed: false
        },
        {
          id: 'prepare_offer',
          label: "Understand what happens when you're ready to make an offer",
          description: "Once you've found a house you like, you'll work with your agent to make an offer.",
          link: 'https://www.realtor.com/advice/buy/the-basics-of-making-an-offer-on-a-house/',
          linkText: 'The Basics of Making an Offer',
          completed: false
        }
      ]
    },
    {
      title: 'Made an Offer',
      icon: 'cash-reward',
      isOpen: false,
      items: [
        {
          id: 'offer_accepted',
          label: 'Negotiate and get your offer accepted',
          description: 'Your agent will communicate with the seller to reach an agreement.',
          completed: false
        },
        {
          id: 'earnest_money',
          label: 'Submit earnest money deposit',
          description: 'A deposit that shows the seller you are a serious buyer.',
          completed: false
        }
      ]
    },
    {
      title: 'Under Contract',
      icon: 'pending',
      isOpen: false,
      items: [
        {
          id: 'inspection',
          label: 'Schedule a home inspection',
          description: 'A professional inspection to identify any issues with the property.',
          completed: false
        },
        {
          id: 'appraisal',
          label: 'Order a home appraisal',
          description: 'Your lender will require an appraisal to ensure the home is worth the loan amount.',
          completed: false
        },
        {
          id: 'loan_approval',
          label: 'Finalize your mortgage',
          description: 'Wait for the final approval from your lender.',
          completed: false
        }
      ]
    },
    {
      title: 'Closing',
      icon: 'status-sold',
      isOpen: false,
      items: [
        {
          id: 'final_walkthrough',
          label: 'Perform the final walkthrough',
          description: 'Ensure the property is in the agreed-upon condition before signing.',
          completed: false
        },
        {
          id: 'closing_docs',
          label: 'Sign closing documents',
          description: 'The final step to becoming a homeowner.',
          completed: false
        }
      ]
    },
    {
      title: 'After Closing',
      icon: 'home',
      isOpen: false,
      items: [
        {
          id: 'move_in',
          label: 'Plan your move',
          description: 'Coordinate movers or rent a truck for your transition.',
          completed: false
        },
        {
          id: 'utilities',
          label: 'Set up utilities',
          description: 'Transfer water, electricity, and gas services to your name.',
          completed: false
        }
      ]
    }
  ];

  get totalItems(): number {
    return this.sections.reduce((acc, section) => acc + section.items.length, 0);
  }

  get completedItems(): number {
    return this.sections.reduce((acc, section) => 
      acc + section.items.filter(item => item.completed).length, 0);
  }

  get progressPercentage(): number {
    return (this.completedItems / this.totalItems) * 100;
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  toggleSection(section: ChecklistSection) {
    section.isOpen = !section.isOpen;
  }

  toggleItem(item: ChecklistItem) {
    item.completed = !item.completed;
  }
}
