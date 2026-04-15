import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-advertise',
  standalone: true,
  imports: [CommonModule, RouterModule, SiteFooterComponent, FormsModule],
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css']
})
export class AdvertiseComponent implements OnInit {
  ngOnInit() {
    // Automatically open chatbot after a short delay for engagement
    setTimeout(() => {
      this.isChatOpen = true;
    }, 3000);
  }
  productsMenu = [
    {
      label: 'Real Estate Lead Generation',
      links: ['Connections Plus', 'ReadyConnect Concierge', 'Market VIP']
    },
    {
      label: 'Real Estate Marketing',
      links: ['Market Reach', 'Local Expert', 'The Essentials Toolkit']
    },
    {
      label: 'Listing Solutions',
      links: ['Listing Toolkit', 'Listing Manager', 'Spotlight Listings']
    },
    {
      label: 'Lender Solutions',
      links: ['ClientSelect Mortgage Advertising']
    },
    {
      label: 'Specialty Solutions',
      links: ['Home Builder Solutions', 'Property Manager Solutions', 'Brand Advertiser Solutions', 'Online Store']
    }
  ];

  resourcesMenu = [
    'Blog',
    'PRO Campaign Hub',
    'Success Stories',
    '#ThrivePastFive',
    'Home Filla Pro App',
    'Referral Manager App',
    'State Resources'
  ];

  campaignTestimonials = [
    {
      quote: "We found that Home Filla has provided the most consistent and quality leads for the greatest ROI and predictable conversion rates. That predictability is how we operate our business.",
      author: 'Lucas Mudrey & Tony Hanson',
      company: 'Better Homes',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
    },
    {
      quote: "We can spend more time with actual clients and use the technology to get to those leads, support those leads, and find information and intel.",
      author: 'Gary Ashton',
      company: 'CEO and Owner, The Ashton Real Estate Group',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
    }
  ];

  industrySolutions = [
    { title: 'Builders', icon: 'fa-tools' },
    { title: 'Property Managers', icon: 'fa-building' },
    { title: 'Brand Advertisers', icon: 'fa-ad' }
  ];

  solutions = [
    {
      icon: 'fa-map-marker',
      title: 'Premier Agent',
      description: 'Own your local market by becoming the exclusive featured agent in your targeted zip codes. Capture high-intent buyer leads instantly.'
    },
    {
      icon: 'fa-bullhorn',
      title: 'Promoted Listings',
      description: 'Give your sellers the ultimate advantage. Boost your listings to the top of home search results and drive 400% more tours.'
    },
    {
      icon: 'fa-building',
      title: 'Brokerage Solutions',
      description: 'Enterprise-grade lead routing, custom CRM integrations, and brand-level exposure designed for entire teams and brokerages.'
    }
  ];

  testimonials = [
    {
      quote: "Since upgrading to Premier Agent, my team closed an additional 24 transactions last year purely from Home Filla leads. The ROI is unmatched.",
      author: 'Marcus J., Principal Broker',
      location: 'Austin, TX'
    },
    {
      quote: "Promoting my listings guarantees visibility. Sellers are impressed by the traffic reports, and homes are selling 15 days faster on average.",
      author: 'Sarah L., Top Producer',
      location: 'Denver, CO'
    }
  ];

  activeTestimonial = 0;

  setTestimonial(index: number) {
    this.activeTestimonial = index;
  }

  isChatOpen = false;
  newMessage = '';
  chatMessages = [
    { text: 'Hello! How can we help you grow your real estate business today?', type: 'bot', time: 'Just now' }
  ];

  // Comprehensive Knowledge Base
  private knowledgeBase: { [key: string]: string } = {
    // Selling Category
    'sell': 'To sell your home, start by determining its market value. We recommend a professional appraisal or using our Home Value tool. Staging and minor repairs can also significantly boost your sale price.',
    'selling': 'Selling your house involves 5 key steps: 1. Valuation, 2. Staging, 3. Listing, 4. Negotiating, and 5. Closing. Our PRO agents handle everything from marketing to paperwork.',
    'how to sell': 'Selling is easy with Home Filla! List your home with a PRO agent to get 40% more visibility. We handle the photography, listings, and tours.',
    'home value': 'Your home value depends on local market trends, property condition, and recent sales in your area. Contact a PRO agent for a free Comparative Market Analysis (CMA).',
    'listing': 'Listing your home on Home Filla gives you access to 31M unique monthly visitors. Use our Spotlight Listings to stay at the top of search results.',
    'price': 'Pricing your home correctly is crucial. Overpricing can lead to long wait times, while underpricing loses you equity. Let our data-driven tools help you find the sweet spot.',

    // Buying Category
    'buy': 'Buying a home starts with pre-approval. This shows sellers you are serious. Once approved, browse our listings and schedule tours directly through the app.',
    'buying': 'The home buying process usually takes 30-60 days from offer to closing. We recommend working with a buyer specialist to navigate the paperwork.',
    'how to buy': 'Ready to buy? 1. Get pre-approved for a mortgage. 2. Define your neighborhood and must-haves. 3. Start touring homes with a Home Filla PRO agent.',
    'mortgage': 'We partner with top lenders to provide competitive rates. You can start your pre-approval process in the "Lender Solutions" section of our site.',
    'loan': 'Home loans come in various types: Fixed-rate, ARM, FHA, and VA. Our lender partners can help you decide which is best for your financial situation.',
    'interest rate': 'Interest rates fluctuate daily based on the market. Locking in a rate during your pre-approval can save you thousands over the life of your loan.',

    // Agent/Career Category
    'agent': 'Want to become a Home Filla PRO agent? You first need a real estate license in your state. Once licensed, you can join our network for exclusive lead access.',
    'become an agent': 'To become an agent: 1. Complete your state-required education. 2. Pass the licensing exam. 3. Join a brokerage. 4. Sign up for Home Filla PRO!',
    'career': 'A career in real estate offers flexibility and high earning potential. With Home Filla PRO tools, you can scale your business faster than ever.',
    'license': 'Real estate licenses are state-specific. Check your local Real Estate Commission website for specific hourly requirements and exam schedules.',
    'training': 'Home Filla offers exclusive training webinars, success stories, and our #ThrivePastFive program to help new agents survive and thrive in their first 5 years.',
    'join': 'Join the PRO network today to access high-intent leads and professional branding tools. Click "Get Started" in the header to talk to our recruitment team.',

    // Marketing/Platform Category
    'marketing': 'Our marketing suite includes Local Expert ads, Social Media reach, and Spotlight Listings. We help you stay top-of-mind with local buyers and sellers.',
    'leads': 'We offer two lead models: Connections Plus (predictable upfront volume) and ReadyConnect Concierge (per-closing performance model).',
    'zip leads': 'Claim your exclusive territory! Buy zip codes to become the featured agent. Leads are delivered instantly to your phone.',
    'local expert': 'Local Expert branding puts your face and name on every search result in your targeted area. It is the ultimate way to build local authority.',
    'roi': 'Our analytics dashboard tracks your lead-to-close ratio, cost-per-lead, and overall return on investment in real-time.',
    'ads': 'We run targeted Google and Facebook ads for your listings and profile, ensuring you reach buyers even when they are not on our site.',
    'crm': 'Our platform integrates with all major CRMs like Top Producer, Follow Up Boss, and LionDesk to ensure your leads never go cold.',

    // Default/Generic
    'hello': 'Hi there! I am the Home Filla PRO assistant. Ask me about buying, selling, marketing, or starting a real estate career.',
    'help': 'I can help with questions about: \n- Selling your home\n- Buying a property\n- Becoming a PRO agent\n- Marketing your services\nWhat are you interested in?',

    // Finance & Mortgage Suite
    'down payment': 'While 20% is traditional, many buyers qualify for FHA loans with as little as 3.5% down, or VA loans with 0% down for veterans.',
    'credit score': 'A higher credit score usually leads to better interest rates. Most conventional loans require a minimum score of 620, while FHA loans can go lower.',
    'closing costs': 'Closing costs typically range from 2% to 5% of the purchase price. They include loan origination fees, title insurance, and government taxes.',
    'escrow': 'Escrow is a neutral third party that holds funds and documents during a real estate transaction until all conditions of the sale are met.',
    'pre-approval': 'A pre-approval letter is a document from a lender stating they are willing to lend you a specific amount. It is essential for making serious offers.',
    'fha': 'FHA loans are government-backed loans that allow for lower down payments and lower credit scores, making them great for first-time buyers.',
    'va loan': 'VA loans are available to veterans and current service members. they often require no down payment and have no private mortgage insurance (PMI).',
    'pmi': 'Private Mortgage Insurance (PMI) is usually required if your down payment is less than 20%. It protects the lender if you default on your loan.',

    // Property Types
    'condo': 'Condominiums offer a lower-maintenance lifestyle. Keep in mind they usually have monthly HOA fees that cover common area upkeep.',
    'multi-family': 'Investing in multi-family properties (like duplexes) is a great way to build wealth. You can often live in one unit and rent out the others.',
    'land': 'Buying raw land requires different financing than a home. You will need to consider zoning, utilities, and road access before purchasing.',
    'new construction': 'New homes offer modern features and warranties. We recommend having your own agent present during builder meetings to protect your interests.',
    'townhome': 'Townhomes offer a middle ground between houses and condos, often including a small yard but maintaining some shared wall responsibilities.',

    // Legal & Process
    'disclosure': 'Sellers are legally required to disclose known material defects about their property in most states. This ensures transparency for the buyer.',
    'inspection': 'A home inspection is a professional evaluation of the property condition. It is a critical step to identify potential structural or system issues.',
    'appraisal': 'An appraisal is an unbiased estimate of a property value. Lenders require this to ensure the loan amount is supported by the home true worth.',
    'title insurance': 'Title insurance protects you and your lender from any future claims or legal disputes over the ownership of your property.',
    'earnest money': 'Earnest money is a "good faith" deposit made by the buyer when signing a contract to show they are serious about the purchase.',
    'contract': 'A real estate contract is a legally binding agreement. Our PRO agents ensure all contingencies are met before you sign.',

    // Platform & Support
    'support': 'For technical support, you can reach our team at support@homefilla.com or click the Help link in the PRO dashboard.',
    'app': 'Download the Home Filla PRO app from the App Store or Google Play to manage your leads and listings on the go.',
    'referral': 'Our Referral Manager app allows you to track outgoing referrals and ensure you get paid your split on every closing.',
    'success': 'Check out our "Success Stories" section to see how agents are doubling their business using Home Filla PRO tools.',
    'blog': 'The Home Filla Blog features daily updates on market trends, marketing tips, and technology reviews for real estate PROs.',

    // Market Dynamics
    'inventory': 'Low inventory means a "Sellers Market," where homes sell faster and often at a premium. High inventory creates a "Buyers Market" with more negotiation leverage.',
    'inflation': 'Inflation can lead to higher mortgage rates, which may cool home search activity. However, real estate is also a classic hedge against inflation over the long term.',
    'seasonality': 'Spring is traditionally the peak home-buying season, while winter often sees less competition but more motivated sellers.',
    'zoning': 'Zoning laws dictate how a property can be used (residential, commercial, mixed-use). Always check local ordinances before planned renovations.',
    'appreciation': 'Appreciation is the increase in a property value over time. While not guaranteed, real estate has historically appreciated at 3.5% to 5% annually.',

    // Investment Suite
    'investment': 'Successful real estate investing focuses on cash flow and long-term appreciation. Many investors start with "house hacking" or small multi-family units.',
    'cap rate': 'The Capitalization Rate (Cap Rate) is used to estimate the potential return on an investment property. It is calculated by dividing Net Operating Income by the purchase price.',
    'flipping': 'House flipping involves buying distressed properties, renovating them, and selling quickly for a profit. It requires significant capital and market timing.',
    'cash flow': 'Cash flow is the net income from an investment property after all expenses and mortgage payments are made. Positive cash flow is the goal of most landlords.',
    'brrrr': 'The BRRRR method stands for Buy, Rehab, Rent, Refinance, Repeat. It is a popular strategy for scaling a rental portfolio with limited capital.',
    'rental': 'Rental properties provide passive income and tax benefits. Consider using a PRO Property Manager to handle tenant relations and maintenance.',

    // Specific Scenarios
    'short sale': 'A short sale occurs when a homeowner sells their property for less than the remaining mortgage balance, with lender approval, to avoid foreclosure.',
    'foreclosure': 'Foreclosure is the legal process where a lender repossesses a property after the owner fails to make mortgage payments. Foreclosed homes are often sold "as-is" at auction.',
    'probate': 'Probate sales occur when a property owner passes away and the court supervises the sale of the estate. These can be slower but offer unique opportunities.',
    'relocation': 'Our relocation specialists help you find a home in a new city while coordinating the sale of your current property. Check out our "State Resources" link.',
    'fsbo': 'For Sale By Owner (FSBO) homes are sold without an agent. While they may save on commission, they often sell for less and carry more legal risk for both parties.',

    // Platform Deep Dives
    'market vip': 'Market VIP is an exclusive lead generation tier for top-tier agents. It provides highest-intent buyer and seller connections in premium territories.',
    'readyconnect': 'ReadyConnect Concierge provides pre-screened, live-transfer leads with no upfront cost. You only pay a referral fee upon a successful closing.',
    'connections plus': 'Connections Plus is our predictable lead volume model. Choose your zip codes and receive a steady stream of buyer inquiries every month.',
    'listing manager': 'The PRO Listing Manager allows you to enhance your listings with 3D tours, drone footage, and professional descriptions that sync to every major portal.',
    'spotlight': 'Spotlight Listings stay at the top of search results in your targeted area, ensuring maximum exposure for your most important sellers.',
    'thrivepastfive': '#ThrivePastFive is our agent retention and growth program, offering coaching and tools designed to help you beat the industry high failure rate.',

    // B2B & Industry
    'builders': 'We offer specialized marketing packages for home builders, including community landing pages and "Coming Soon" lead capture tools.',
    'property managers': 'Property managers use Home Filla to find qualified tenants and manage their portfolios with our integrated maintenance and payment tools.',
    'brand advertisers': 'Brand advertisers reach our 31M monthly visitors through native display ads, newsletter features, and custom partnership campaigns.',
    'online store': 'The Home Filla PRO Online Store offers branded signage, professional photography packages, and marketing collateral for your business.',
    'referral manager': 'Managed through our specialized app, the Referral Manager ensures you can securely send and receive referrals with tracked splits and agreements.',
  };

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const userText = this.newMessage.toLowerCase();

    // Add user message
    this.chatMessages.push({
      text: this.newMessage,
      type: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.newMessage = '';

    // Find Answer from Knowledge Base
    let botResponse = '';

    // Simple Keyword Search
    for (const key in this.knowledgeBase) {
      if (userText.includes(key)) {
        botResponse = this.knowledgeBase[key];
        break;
      }
    }

    // Default Response if no keyword found
    if (!botResponse) {
      botResponse = `That is a great question! While I am learning more every day, I think one of our PRO advisors could give you a much better answer. Would you like us to have someone reach out?`;
    }

    // Simulate Bot Response
    setTimeout(() => {
      this.chatMessages.push({
        text: botResponse,
        type: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 300);
  }
}
