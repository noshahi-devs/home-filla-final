import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TimePoint } from './line-sparkline.component';

@Component({
  selector: 'app-bar-mini',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bars">
      <div *ngFor="let p of normalized; trackBy: trackByIndex" class="bar" [style.height.%]="p.h">
        <div class="fill"></div>
      </div>
    </div>
  `,
  styleUrl: './bar-mini.component.css',
})
export class BarMiniComponent {
  @Input({ required: true }) points: TimePoint[] = [];

  get normalized(): Array<{ h: number }> {
    const pts = this.points ?? [];
    if (pts.length === 0) return [];
    const max = Math.max(...pts.map((p) => p.count ?? 0), 1);
    return pts.map((p) => ({ h: ((p.count ?? 0) / max) * 100 }));
  }

  trackByIndex(index: number) {
    return index;
  }
}

