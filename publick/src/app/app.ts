import { AfterViewInit, Component } from '@angular/core';

declare global {
  interface Window {
    initHomeFillaPage?: () => void;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  ngAfterViewInit() {
    window.initHomeFillaPage?.();
  }
}
