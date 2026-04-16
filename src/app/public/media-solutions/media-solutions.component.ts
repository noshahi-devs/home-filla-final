import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';

@Component({
  selector: 'app-media-solutions',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteFooterComponent, SiteHeaderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './media-solutions.component.html',
  styleUrls: ['./media-solutions.component.css']
})
export class MediaSolutionsComponent implements OnInit {
  inquiryForm!: FormGroup;
  isSubmitted = false;
  isChatOpen = false;
  newMessage = '';

  stats = [
    { label: 'Unique visitors', value: '73M', description: 'Reach a massive audience of motivated movers.', icon: 'chart-line' },
    { label: 'US monthly adults reached', value: '31%', description: 'Unmatched scale across the digital real estate landscape.', icon: 'users' },
    { label: 'Listings updated', value: '15 min.', description: 'Real-time data synchronization every quarter hour.', icon: 'sync' }
  ];

  behavioralStats = [
    { value: '2.8x', label: 'Home improvement spenders', icon: 'tools' },
    { value: '3.9x', label: 'Buyers of baby products', icon: 'baby' },
    { value: '3.1x', label: 'Recent auto owners', icon: 'car' },
    { value: '3.3x', label: 'Seekers of new trends', icon: 'bolt' }
  ];

  partners = [
    { name: 'The Wall Street Journal', logo: 'https://b2cdata.marketing.moveaws.com/mediasolutions/images/logo-wsj.svg' },
    { name: 'New York Post', logo: 'https://b2cdata.marketing.moveaws.com/mediasolutions/images/logo-nyp.svg' },
    { name: 'Barron\'s', logo: 'https://b2cdata.marketing.moveaws.com/mediasolutions/images/logo-barrons.png' }
  ];

  chatMessages = [
    { text: 'Welcome to Home Filla Media Solutions! Looking to amplify your brand across our 73M unique monthly visitors? I\'m here to help.', type: 'bot', time: 'Just now' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();

    // Auto-open chat after delay
    setTimeout(() => {
      this.isChatOpen = true;
    }, 5000);
  }

  initForm() {
    this.inquiryForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required],
      company: [''],
      city: ['', Validators.required],
      stateCode: ['', Validators.required],
      zip: ['', Validators.required],
      countryCode: ['US', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      iam: ['', Validators.required],
      iwant: ['', Validators.required],
      goals: ['', [Validators.maxLength(2000)]]
    });
  }

  onSubmit() {
    if (this.inquiryForm.valid) {
      this.isSubmitted = true;
      setTimeout(() => {
        this.isSubmitted = false;
        this.inquiryForm.reset({ countryCode: 'US' });
        alert('Thank you! Your Media Solutions inquiry has been sent.');
      }, 2000);
    } else {
      Object.keys(this.inquiryForm.controls).forEach(key => {
        const control = this.inquiryForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.chatMessages.push({
      text: this.newMessage,
      type: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    const userText = this.newMessage.toLowerCase();
    this.newMessage = '';

    let botResponse = 'That\'s interesting! Our partnership team specializes in creating bespoke campaigns. Shall I have someone contact you with our latest audience data?';

    if (userText.includes('price') || userText.includes('cost')) {
      botResponse = 'Campaign costs vary by targeting and scale. We offer everything from local expert branding to national high-impact takeovers.';
    } else if (userText.includes('specs')) {
      botResponse = 'Our technical ad specifications are available for download in the "Partnership" section of this page.';
    }

    setTimeout(() => {
      this.chatMessages.push({
        text: botResponse,
        type: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 1000);
  }
}
