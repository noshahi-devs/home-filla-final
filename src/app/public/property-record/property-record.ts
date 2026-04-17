import { Component } from '@angular/core';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-record',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './property-record.html',
  styleUrl: './property-record.css',
})
export class PropertyRecord {
  zipCodes: string[] = [
    '94022', '94023', '94024', '94035', '94039', '94040', '94041', '94042', '94043', '94085',
    '94086', '94087', '94088', '94089', '94301', '94302', '94303', '94304', '94305', '94306',
    '95002', '95008', '95009', '95011', '95013', '95014', '95015', '95020', '95021', '95026'
  ];

  streets: string[] = [
    'Acalanes Dr', 'Acorn Ct', 'Admiralty Way', 'Aetna Way', 'Ahwanee Dr', 'Albatross Dr',
    'Alberta Ave', 'Alborada Dr', 'Alcade Dr', 'Alcatraz Dr', 'Alderbrook Ln', 'Alec Dr',
    'Alexander Way', 'Algonquin Dr', 'Alice Ave', 'Allendale Ave', 'Almanor Ave', 'Aloe Ct',
    'Altair Ave', 'Altos Oaks Dr', 'Alvarado Ave', 'Amador Ave', 'Amarillo Ave', 'Amazon Dr',
    'Amber Ct', 'Ambrose Ct', 'Ames Ave', 'Anaconda Ct', 'Anchorage Ct', 'Anetra Cir'
  ];
}
