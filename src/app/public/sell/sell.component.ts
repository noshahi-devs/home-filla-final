import { Component, OnInit, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare global {
  interface Window {
    initHomeFillaPage?: () => void;
  }
}

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule]
})
export class SellComponent implements OnInit, AfterViewInit {
  isMobileMenuOpen = false;
  carouselIndex = 0;
  
  // Valuation Form State
  address = '';
  propertyType = 'Single Family';
  bedrooms = 3;
  bathrooms = 2;
  sqft = 2000;
  
  showValuation = false;
  estimatedValue = 0;
  lowEstimate = 0;
  highEstimate = 0;
  isCalculating = false;

  // Local Agents Data
  agents = [
    {
      name: 'Gregg Klar',
      brokerage: 'Gregg\'s Team, Keller Wi...#472276',
      soldLastYear: 78,
      experience: 27,
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Bryan Swan',
      brokerage: 'Keller Williams Realty#0666344',
      soldLastYear: 23,
      experience: 11,
      imageUrl: 'https://randomuser.me/api/portraits/men/44.jpg'
    },
    {
      name: 'Sam Lemelle',
      brokerage: 'Central Metro Realty',
      soldLastYear: 24,
      experience: 22,
      imageUrl: 'https://randomuser.me/api/portraits/men/55.jpg'
    },
    {
      name: 'Steven Nusinow',
      brokerage: 'Avenue Austin Realty... #556001',
      soldLastYear: 16,
      experience: 20,
      imageUrl: 'https://randomuser.me/api/portraits/men/66.jpg'
    },
    {
      name: 'Kent Redding',
      brokerage: 'Berkshire Hathaway Te... #514347',
      soldLastYear: 147,
      experience: 24,
      imageUrl: 'https://randomuser.me/api/portraits/men/77.jpg'
    }
  ];

  // Tracking Modal State
  isTrackingModalOpen = false;

  // Recently Sold Properties
  recentlySoldProperties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      soldDate: 'January 16, 2026',
      price: 499900,
      beds: 5,
      baths: 3,
      sqft: 3019,
      address: '9751 Vistas Park Dr',
      city: 'Peyton, CO 80831'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      soldDate: 'January 16, 2026',
      price: 464000,
      beds: 4,
      baths: 3,
      sqft: 2511,
      address: '5699 Vermillion Bluffs Dr',
      city: 'Colorado Springs, CO 80923'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      soldDate: 'December 31, 2025',
      price: 899000,
      beds: 4,
      baths: 3.5,
      sqft: 2018,
      address: '2363 S High St',
      city: 'Denver, CO 80210'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      soldDate: 'December 10, 2025',
      price: 664900,
      beds: 3,
      baths: '2.5+',
      sqft: 2120,
      address: '15523 W Washburn Dr',
      city: 'Lakewood, CO 80228'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      soldDate: 'November 22, 2025',
      price: 799900,
      beds: 3,
      baths: 2.5,
      sqft: 2400,
      address: '1332 S Yank St',
      city: 'Lakewood, CO 80228'
    }
  ];

  // FAQs Data
  faqs = [
    {
      question: 'What\'s the best way to sell your house quickly?',
      answer: 'The best way to sell quickly is to price your home competitively, make necessary repairs, de-clutter, and work with an experienced real estate agent who has a strong marketing strategy. We match you with top-performing local agents to ensure a quick sale.'
    },
    {
      question: 'How can I estimate my home\'s value?',
      answer: 'You can use an online home value estimator like ours to get a baseline idea, but the most accurate way is to get a Comparative Market Analysis (CMA) from an experienced local real estate agent who will factor in unique features, recent nearby sales, and current market conditions.'
    },
    {
      question: 'Who is best to sell your house with?',
      answer: 'It is best to sell with a licensed, experienced local agent who understands your neighborhood perfectly, has a proven track record, and can demonstrate a solid marketing plan. Home Filla matches you automatically with these top-tier professionals.'
    },
    {
      question: 'What is the #1 thing that determines the value of a home?',
      answer: 'Location is typically the most significant determinant of a home\'s value, including the quality of local schools, proximity to amenities and employment hubs, neighborhood desirability, and broader local economic trends.'
    }
  ];
  openFaqIndex = -1;

  constructor(private el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      window.initHomeFillaPage?.();
      this.initFaqParallax();
    }, 0);
  }

  initFaqParallax() {
    const section = this.el.nativeElement.querySelector('.faq-section') as HTMLElement;
    if (!section) return;
    section.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (e.clientX - rect.left - cx) / cx;
      const dy = (e.clientY - rect.top - cy) / cy;
      const shapes = section.querySelectorAll('.bg-shape, .bg-orb');
      shapes.forEach((el: Element, i: number) => {
        const factor = (i % 3 + 1) * 12;
        (el as HTMLElement).style.transform = `translate(${dx * factor}px, ${dy * factor}px) rotate(${dx * 5}deg)`;
      });
    });
    section.addEventListener('mouseleave', () => {
      const shapes = section.querySelectorAll('.bg-shape, .bg-orb');
      shapes.forEach((el: Element) => {
        (el as HTMLElement).style.transform = '';
      });
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape() { this.closeMobileMenu(); }

  calculateValuation() {
    if (!this.address) return;
    
    this.isCalculating = true;
    
    // Simulate a premium calculation delay
    setTimeout(() => {
      // Base value: $500k + random factor based on sqft and beds/baths
      const baseValue = 450000;
      const sqftValue = this.sqft * 250;
      const bedBathValue = (this.bedrooms * 25000) + (this.bathrooms * 15000);
      
      this.estimatedValue = baseValue + sqftValue + bedBathValue;
      this.lowEstimate = this.estimatedValue * 0.94;
      this.highEstimate = this.estimatedValue * 1.06;
      
      this.isCalculating = false;
      this.showValuation = true;
      
      // Scroll to result
      setTimeout(() => {
        document.getElementById('valuation-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1500);
  }

  resetForm() {
    this.showValuation = false;
    this.address = '';
  }

  // Modal logic
  openTrackingModal() {
    this.isTrackingModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeTrackingModal() {
    this.isTrackingModalOpen = false;
    document.body.style.overflow = '';
  }

  // FAQ logic
  toggleFaq(index: number) {
    if (this.openFaqIndex === index) {
      this.openFaqIndex = -1;
    } else {
      this.openFaqIndex = index;
    }
  }

  // Carousel logic
  prevSlide() {
    if (this.carouselIndex > 0) this.carouselIndex--;
  }

  nextSlide() {
    if (this.carouselIndex < this.recentlySoldProperties.length - 1) this.carouselIndex++;
  }

  goToSlide(index: number) {
    this.carouselIndex = index;
  }
}
