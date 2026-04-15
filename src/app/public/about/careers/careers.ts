import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterLink, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './careers.html',
  styleUrl: './careers.css',
  encapsulation: ViewEncapsulation.None
})
export class CareersComponent {
  slides = [
    {
      title: 'Build a way home for everyone',
      description: 'With her team behind her, Cynthia R. is up for any challenge.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
    },
    {
      title: 'Shape the future of real estate',
      description: 'Join our engineering team to construct seamless digital experiences.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
    },
    {
      title: 'Unlock a better way home',
      description: 'Terrance M.’s insight is the key to unlocking a better way home.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
    }
  ];
  currentSlideIndex = 0;

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }
}
