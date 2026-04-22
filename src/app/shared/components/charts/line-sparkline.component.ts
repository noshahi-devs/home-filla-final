import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface TimePoint {
  date: string | Date;
  count: number;
}

@Component({
  selector: 'app-line-sparkline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg class="spark" [attr.viewBox]="'0 0 ' + width + ' ' + height" preserveAspectRatio="none">
      <polyline class="line" [attr.points]="polylinePoints" />
      <circle
        *ngFor="let p of scaled; trackBy: trackByIndex"
        class="dot"
        [attr.cx]="p.x"
        [attr.cy]="p.y"
        [attr.r]="dotRadius"
      />
    </svg>
  `,
  styleUrl: './line-sparkline.component.css',
})
export class LineSparklineComponent {
  @Input({ required: true }) points: TimePoint[] = [];
  @Input() width = 640;
  @Input() height = 140;
  @Input() dotRadius = 2.2;

  get scaled(): Array<{ x: number; y: number }> {
    const pts = this.points ?? [];
    if (pts.length === 0) return [];
    if (pts.length === 1) return [{ x: 0, y: this.height / 2 }];

    const values = pts.map((p) => p.count ?? 0);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(1, max - min);

    return pts.map((p, i) => {
      const x = (i / (pts.length - 1)) * this.width;
      const y = this.height - ((p.count - min) / range) * this.height;
      return { x, y };
    });
  }

  get polylinePoints(): string {
    return this.scaled.map((p) => `${p.x},${p.y}`).join(' ');
  }

  trackByIndex(index: number) {
    return index;
  }
}

