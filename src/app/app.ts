import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GlobalUiComponent } from './shared/components/global-ui/global-ui.component';
import { MortgageBannerComponent } from './shared/components/mortgage-banner/mortgage-banner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalUiComponent, MortgageBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
