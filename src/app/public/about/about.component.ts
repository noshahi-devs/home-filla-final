import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink, SiteHeaderComponent, SiteFooterComponent],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit, OnDestroy {
  words: string[] = ['Bliss.', 'Warmth.', 'Freedom.', 'Joy.', 'Harmony.'];
  currentWordIndex: number = 0;
  currentWord: string = this.words[0];
  private intervalId: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
      this.currentWord = this.words[this.currentWordIndex];
    }, 3000);
  }
}
