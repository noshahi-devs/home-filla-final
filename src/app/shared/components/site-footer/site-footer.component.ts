import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.css']
})
export class SiteFooterComponent {
  @Input() simplified: boolean = false;
  
  isFeedbackModalOpen = false;
  
  feedbackForm = {
    purpose: '',
    email: '',
    name: '',
    topic: '',
    subTopic: '',
    description: ''
  };
  
  subTopicOptions: string[] = [];
  
  topicSubTopics: { [key: string]: string[] } = {
    'Property': ['Incorrect info', 'Scam/Fraud', 'Photo issues', 'Map location', 'Agent review', 'Other'],
    'RentalProperty': ['Listing unavailable', 'Scam/Fraud', 'Application issue', 'Other'],
    'Experience': ['Website performance', 'Mobile app', 'Navigation', 'Other'],
    'Search': ['Filters not working', 'Search results', 'Saved search', 'Other'],
    'SellingaProperty': ['Listing my home', 'Offers', 'Closing', 'Other'],
    'FindaRealtor': ['Search results', 'Agent contact', 'Reviews', 'Other'],
    'MyAccount': ['Login issues', 'Profile update', 'Notifications', 'Other'],
    'MyHome': ['Property value', 'Market trends', 'Edit home facts', 'Other'],
    'CollaborationFeatures': ['Sharing', 'Comments', 'Notifications', 'Other'],
    'Mortgage': ['Calculator', 'Rates', 'Application', 'Other'],
    'NewsInsights': ['Article content', 'Comments', 'Newsletter', 'Other'],
    'NewFeature': ['Suggestion', 'Bug report', 'Other']
  };
  
  openFeedbackModal(): void {
    this.isFeedbackModalOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  closeFeedbackModal(): void {
    this.isFeedbackModalOpen = false;
    document.body.style.overflow = '';
    this.resetForm();
  }
  
  onTopicChange(): void {
    this.subTopicOptions = this.topicSubTopics[this.feedbackForm.topic] || [];
    this.feedbackForm.subTopic = '';
  }
  
  submitFeedback(): void {
    console.log('Feedback submitted:', this.feedbackForm);
    alert('Thank you for your feedback! We appreciate your input.');
    this.closeFeedbackModal();
  }
  
  private resetForm(): void {
    this.feedbackForm = {
      purpose: '',
      email: '',
      name: '',
      topic: '',
      subTopic: '',
      description: ''
    };
    this.subTopicOptions = [];
  }
}
