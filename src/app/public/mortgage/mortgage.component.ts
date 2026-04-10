import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';
import { MortgageBannerComponent } from '../../shared/components/mortgage-banner/mortgage-banner';

@Component({
  selector: 'app-mortgage',
  standalone: true,
  templateUrl: './mortgage.component.html',
  styleUrl: './mortgage.component.css',
  imports: [CommonModule, FormsModule, RouterLink, SiteHeaderComponent, SiteFooterComponent, MortgageBannerComponent]
})
export class MortgageComponent {
  // Mortgage Calculator State
  homePrice = 500000;
  downPaymentPercent = 20;
  loanTerm = 30;
  interestRate = 6.5;
  address: string = '';

  // Rates Section State
  activeRateTab: string = '30y';
  showAllLenders: boolean = false;

  // Exact data from snippet
  marketAverages = {
    apr: '6.346%',
    rate: '6.317%',
    location: 'Sunnyvale, CA',
    price: '$1,486,500',
    downPayment: '$297,300'
  };

  lenders = [
    {
      name: 'Home Simply',
      logo: 'https://images.icanbuy.com/logos/advertiser/17400744865629_1/3c8157185d29bbc6ab1a87fdc6870cd6.gif',
      nmls: '2473786',
      apr: '5.964%',
      payment: '$7,035/mo',
      rate: '5.875%',
      fees: '$11,489',
      points: '0.874 points ($10,394)'
    },
    {
      name: 'DECO Mortgage',
      logo: 'https://images.icanbuy.com/logos/advertiser/17175949075779_1/76af1a8f000a4cb6509a5ab028497c2c.png',
      nmls: '2561451',
      apr: '5.973%',
      payment: '$7,035/mo',
      rate: '5.875%',
      fees: '$12,770',
      points: '0.924 points ($10,988)'
    },
    {
      name: 'Farmers Bank of Kansas City',
      logo: 'https://images.icanbuy.com/logos/advertiser/16045097272767_1/8c0353cd60caf6202fcf0534c3bcc1d1.gif',
      nmls: '613839',
      apr: '6.081%',
      payment: '$7,130/mo',
      rate: '6.000%',
      fees: '$10,332',
      points: '0.802 points ($9,537)'
    }
  ];

  loanOptions = [
    {
      type: '30-year fixed',
      income: 'Conventional loan income requirements vary by lender.',
      downPayment: 'Min. 3%',
      credit: '650+',
      assumable: false
    },
    {
      type: 'FHA 30-year fixed',
      income: 'No minimum income is required. Needs proof of steady income for the past two years.',
      downPayment: 'Min. 3.5%',
      credit: '580+',
      assumable: true
    },
    {
      type: 'USDA 30-year fixed',
      income: "Requires an income of less than 115% of what's typical for the area.",
      downPayment: 'No down payment required.',
      credit: 'No minimum',
      assumable: true,
      note: 'For homes located in a rural area.'
    },
    {
      type: 'VA 30-year fixed',
      income: 'Income requirements vary by lender.',
      downPayment: 'No down payment required.',
      credit: 'No minimum',
      assumable: true,
      note: 'Only applies to Veterans or their spouses.'
    },
    {
      type: '5/1 ARM',
      income: 'Income requirements vary by lender.',
      downPayment: 'Min. 5%',
      credit: '580 to 620',
      assumable: false,
      note: 'Fixed rate for the first five years, then adjustable once a year.'
    }
  ];

  glossaryTerms = [
    {
      term: 'Assumable mortgage',
      definition: 'Unlike a traditional mortgage, an assumable mortgage is passed directly from seller to buyer, bringing its remaining balance and interest rate with it. Only FHA, VA, and USDA mortgages can be assumed. Some eligibility requirements may apply, and down payments can often exceed 20% if a property has appreciated in value since the start of its mortgage.'
    },
    {
      term: 'Bi-weekly mortgage',
      definition: 'A bi-weekly mortgage is a mortgage in which the borrower makes half of their monthly mortgage payment every two weeks, rather than paying the full payment amount once every month.  So if you paid monthly and your monthly mortgage payment was $1,000, then for a year you would make 12 payments of $1,000 each, for a total of $12,000.  But with a bi-weekly mortgage, you would make 26 payments of $500 each, for a total of $13,000 for the year.  This can help the borrower pay off their mortgage loan sooner and reduces the total amount of interest paid over the life of the loan.).'
    },
    {
      term: 'Borrower',
      definition: 'A borrower is a person who takes out a loan from a lender.  For a mortgage loan, the borrower often is also referred to as the mortgagor (and the bank or lender the mortgagee).'
    },
    {
      term: 'Conventional loan',
      definition: 'A conventional loan is a type of mortgage that is not insured or guaranteed by the government.'
    },
    {
      term: 'Debt-to-income ratio',
      definition: 'A debt-to-income ratio is a factor looked at by lenders when qualifying a borrower for a mortgage loan.  The DTI is a number that lenders use to determine how well a borrower can handle their monthly debts. Your debt-to-income ratio is the number you get when you divide your monthly debt payments by your monthly gross income.  Many lenders will want to see that your DTI is 36% or lower.'
    },
    {
      term: 'Down payment',
      definition: 'A down payment is that portion of the purchase price of a home that the buyer pays upfront; usually the balance of the purchase price that is needed to buy the home is borrowed from a lender by way of a mortgage loan.'
    },
    {
      term: 'Homeowners insurance',
      definition: 'Homeowners insurance is a type of property insurance. It protects you from damage (for example, from fire) to your home or possessions. Homeowners insurance also provides liability insurance against claims by people who might be injured due to accidents in your home or on the property.'
    },
    {
      term: 'Interest-only mortgage',
      definition: 'An interest-only mortgage is a type of loan in which the borrower only pays interest on the principal balance for a set time, usually five to seven years. At the end of the interest-only period, the borrower must either pay the principal back entirely or begin making payments of both principal and interest.'
    },
    {
      term: 'Loan, and Mortgage Loan',
      definition: 'A loan is money that is borrowed by one person or company from another, under an agreement whereby the borrower promises to re-pay the loan amount to the lender, usually plus interest.  A mortgage loan is a type of loan for buying or financing real estate, where the borrower agrees that if they fail to repay the loan as promised then the lender may sell the real estate in order to recover the un-paid loan amount(s) out of the sale proceeds (in a process called foreclosure).'
    },
    {
      term: 'Loan-to-value ratio (LTV)',
      definition: 'The loan-to-value ratio (or. LTV) is a factor looked at by lenders when qualifying a borrower for a mortgage loan.  The LTV compares the amount of a loan to the value of the asset being financed:  the amount you are borrowing divided by the price of the property being purchased or financed.  So the LTV is 66.66% on a $300,000 house where the amount being borrowed to purchase it is $200,000 (meaning the down payment is $100,000).  The lower your LTV the easier it will be to qualify for a mortgage loan.  For example, many conventional loans require that your LTV be no higher than 80%.  Of course, the greater your down payment amount, the better/higher your LTV will be.'
    },
    {
      term: 'Payment',
      definition: 'A payment is an action that transfers money from one person or entity to another. Payments can be made in various ways, such as with physical currency, such as coins or bills, with a check (personal, cahiers, or otherwise) or with electronic forms of payment, such as debit or credit cards or electronic funds transfers (a transfer effected digitally, from one bank account to another).'
    },
    {
      term: 'Real estate',
      definition: 'Real estate is land, or a parcel of land, either vacant (un-improved) or improved with structures such as a house, apartment building, commercial building, etc. Real estate, especially once it is thus “improved,” can serve as a place of business or residence and can be used to produce income, such as through renting or leasing.  Real estate also can refer to a particular kind of legal interest in a land parcel (whether or not improved), such as ownership or entitlement to occupancy under a lease.'
    },
    {
      term: 'Reverse mortgage',
      definition: 'A reverse mortgage is a type of loan that allows seniors to borrow against the value of their homes. The loan does not have to be repaid until the borrower moves, sells, or dies.'
    },
    {
      term: 'Step-by-step Guide',
      definition: 'A step-by-step guide is a guide that takes you through the process of doing something, usually in a series of easy-to-follow, sequential steps.'
    },
    {
      term: 'The Federal Housing Administration (FHA), FHA Loan',
      definition: 'The Federal Housing Administration (FHA) is an agency of the U.S. government.  An FHA loan is a mortgage loan that is issued by banks and other commercial lenders but guaranteed by the FHA against a borrower’s default.  FHA loans make home ownership more possible for borrowers than it otherwise would be through conventional mortgage loans, because an FHA loan permits relatively low down payments, limits closing costs the borrower pays, and is accessible to borrowers who have a relatively lower credit score.  These features make an FHA loan particularly useful for many first-time homebuyers who have not yet saved enough for the amount of down payments that commercial lenders usually require for a conventional loan.'
    },
    {
      term: 'Veterans Affairs Department (VA), VA loan ',
      definition: 'The Veterans Affairs Department (VA) is an agency of the U.S. government.  A VA loan is a mortgage loan that is available to current and former members of the military (and select military spouses), issued by banks and other commercial lenders, but guaranteed by the VA against a borrower’s default.  VA loans make home ownership more possible for borrowers than it otherwise would be through conventional mortgage loans, primarily because a VA loan does not require any down payment.  Additionally, interest rates offered for VA loans often turn out to be lower than those offered for conventional loans.'
    }
  ];

  mortgageArticles = [
    {
      title: 'How much house can I afford?',
      desc: 'Use our affordability calculator to estimate your home-buying budget based on your income and debts.',
      linkText: 'Check affordability',
      url: '/mortgage/tools/affordability-calculator/'
    },
    {
      title: 'What is a mortgage?',
      desc: 'Learn the basics of how mortgage loans work, from interest rates to down payments and closing costs.',
      linkText: 'Learn the basics',
      url: '/mortgage/advice/what-is-a-mortgage/'
    },
    {
      title: 'How to get the best mortgage rate',
      desc: 'Follow these steps to improve your credit score and shop around for the most competitive rates.',
      linkText: 'Read our guide',
      url: '/mortgage/advice/how-to-get-best-rate/'
    }
  ];

  linkingGroups = [
    {
      title: 'Mortgage rates by city',
      links: [
        { text: 'San Francisco mortgage rates', url: '/mortgage/rates/San-Francisco_CA' },
        { text: 'Raleigh mortgage rates', url: '/mortgage/rates/Raleigh_NC' },
        { text: 'San Jose mortgage rates', url: '/mortgage/rates/San-Jose_CA' },
        { text: 'Austin mortgage rates', url: '/mortgage/rates/Austin_TX' }
      ],
      collapsedLinks: [
        { text: 'Seattle mortgage rates', url: '/mortgage/rates/Seattle_WA' },
        { text: 'Washington DC mortgage rates', url: '/mortgage/rates/Washington_DC' },
        { text: 'Charlotte mortgage rates', url: '/mortgage/rates/Charlotte_NC' },
        { text: 'San Diego mortgage rates', url: '/mortgage/rates/San-Diego_CA' },
        { text: 'Minneapolis mortgage rates', url: '/mortgage/rates/Minneapolis_MN' },
        { text: 'Los Angeles mortgage rates', url: '/mortgage/rates/Los-Angeles_CA' },
        { text: 'Portland mortgage rates', url: '/mortgage/rates/Portland_OR' },
        { text: 'Indianapolis mortgage rates', url: '/mortgage/rates/Indianapolis_IN' },
        { text: 'Houston mortgage rates', url: '/mortgage/rates/Houston_TX' },
        { text: 'New York mortgage rates', url: '/mortgage/rates/New-York_NY' },
        { text: 'Boston mortgage rates', url: '/mortgage/rates/Boston_MA' },
        { text: 'Denver mortgage rates', url: '/mortgage/rates/Denver_CO' },
        { text: 'Phoenix mortgage rates', url: '/mortgage/rates/Phoenix_AZ' },
        { text: 'Milwaukee mortgage rates', url: '/mortgage/rates/Milwaukee_WI' },
        { text: 'Richmond mortgage rates', url: '/mortgage/rates/Richmond_VA' },
        { text: 'Salt Lake City mortgage rates', url: '/mortgage/rates/Salt-Lake-City_UT' },
        { text: 'Dallas mortgage rates', url: '/mortgage/rates/Dallas_TX' },
        { text: 'Nashville mortgage rates', url: '/mortgage/rates/Nashville_TN' },
        { text: 'Las Vegas mortgage rates', url: '/mortgage/rates/Las-Vegas_NV' },
        { text: 'Sacramento mortgage rates', url: '/mortgage/rates/Sacramento_CA' },
        { text: 'Cincinnati mortgage rates', url: '/mortgage/rates/Cincinnati_OH' },
        { text: 'New Orleans mortgage rates', url: '/mortgage/rates/New-Orleans_LA' },
        { text: 'Columbus mortgage rates', url: '/mortgage/rates/Columbus_OH' },
        { text: 'Oklahoma City mortgage rates', url: '/mortgage/rates/Oklahoma-City_OK' },
        { text: 'Baltimore mortgage rates', url: '/mortgage/rates/Baltimore_MD' },
        { text: 'Saint Louis mortgage rates', url: '/mortgage/rates/Saint-Louis_MO' },
        { text: 'Chicago mortgage rates', url: '/mortgage/rates/Chicago_IL' },
        { text: 'Atlanta mortgage rates', url: '/mortgage/rates/Atlanta_GA' },
        { text: 'Virginia Beach mortgage rates', url: '/mortgage/rates/Virginia-Beach_VA' },
        { text: 'Philadelphia mortgage rates', url: '/mortgage/rates/Philadelphia_PA' },
        { text: 'Tampa mortgage rates', url: '/mortgage/rates/Tampa_FL' },
        { text: 'Detroit mortgage rates', url: '/mortgage/rates/Detroit_MI' },
        { text: 'Orlando mortgage rates', url: '/mortgage/rates/Orlando_FL' },
        { text: 'West Hartford mortgage rates', url: '/mortgage/rates/West-Hartford_CT' },
        { text: 'Riverside mortgage rates', url: '/mortgage/rates/Riverside_CA' },
        { text: 'Cleveland mortgage rates', url: '/mortgage/rates/Cleveland_OH' },
        { text: 'Miami mortgage rates', url: '/mortgage/rates/Miami_FL' },
        { text: 'Jacksonville mortgage rates', url: '/mortgage/rates/Jacksonville_FL' },
        { text: 'Providence mortgage rates', url: '/mortgage/rates/Providence_RI' },
        { text: 'Kansas City mortgage rates', url: '/mortgage/rates/Kansas-City_MO' },
        { text: 'Birmingham mortgage rates', url: '/mortgage/rates/Birmingham_AL' },
        { text: 'San Antonio mortgage rates', url: '/mortgage/rates/San-Antonio_TX' },
        { text: 'Pittsburgh mortgage rates', url: '/mortgage/rates/Pittsburgha_PA' },
        { text: 'Memphis mortgage rates', url: '/mortgage/rates/Memphis_TN' },
        { text: 'Louisville mortgage rates', url: '/mortgage/rates/Louisville_KY' },
        { text: 'Buffalo mortgage rates', url: '/mortgage/rates/Buffalo_NY' }
      ],
      showAll: false
    },
    {
      title: 'Mortgage rates by loan type',
      links: [
        { text: '30 year fixed', url: '/mortgage/rates/30-year-fixed' },
        { text: '20 year fixed', url: '/mortgage/rates/20-year-fixed' },
        { text: '15 year fixed', url: '/mortgage/rates/15-year-fixed' },
        { text: '5 year ARM', url: '/mortgage/rates/5-year-arm' }
      ],
      collapsedLinks: [
        { text: '7 year ARM', url: '/mortgage/rates/7-year-arm' }
      ],
      showAll: false
    },
    {
      title: 'Mortgage tools',
      links: [
        { text: 'Mortgage calculator', url: '/mortgage/tools/mortgage-calculator/' },
        { text: 'Affordability calculator', url: '/mortgage/tools/affordability-calculator/' },
        { text: 'Rent or Buy?', url: '/mortgage/tools/rent-or-buy-calculator/' },
        { text: 'Refinance calculator', url: '/mortgage/tools/refinance-calculator/' }
      ],
      collapsedLinks: [
        { text: 'Mortgage deferment and mortgage forbearance—is there a difference?', url: '/advice/finance/mortgage-deferment-and-mortgage-forbearance-is-there-a-difference/' },
        { text: '6 refinancing mistakes homeowners risk making right now', url: '/advice/finance/refinancing-mistakes-homeowners-are-at-risk-of-making-today/' },
        { text: 'Why does my mortgage keep getting sold?', url: '/advice/finance/why-does-my-mortgage-keep-getting-sold/' },
        { text: 'What is a force majeure clause, and what does it mean for mortgages?', url: '/advice/finance/what-is-a-force-majeure-clause-and-what-does-it-mean-for-mortgages/' },
        { text: 'Ready to refinance? Ask these 5 questions first', url: '/videos/ready-to-refinance-ask-these-5-questions-first/' }
      ],
      showAll: false
    },
    {
      title: 'Mortgage rates by state',
      links: [
        { text: 'Texas mortgage rates', url: '/mortgage/rates/Texas' },
        { text: 'California mortgage rates', url: '/mortgage/rates/California' },
        { text: 'Florida mortgage rates', url: '/mortgage/rates/Florida' },
        { text: 'Utah mortgage rates', url: '/mortgage/rates/Utah' }
      ],
      collapsedLinks: [
        { text: 'Colorado mortgage rates', url: '/mortgage/rates/Colorado' },
        { text: 'Massachusetts mortgage rates', url: '/mortgage/rates/Massachusetts' },
        { text: 'Ohio mortgage rates', url: '/mortgage/rates/Ohio' },
        { text: 'Illinois mortgage rates', url: '/mortgage/rates/Illinois' },
        { text: 'Michigan mortgage rates', url: '/mortgage/rates/Michigan' },
        { text: 'Missouri mortgage rates', url: '/mortgage/rates/Missouri' },
        { text: 'Indiana mortgage rates', url: '/mortgage/rates/Indiana' },
        { text: 'Tennessee mortgage rates', url: '/mortgage/rates/Tennessee' },
        { text: 'Wisconsin mortgage rates', url: '/mortgage/rates/Wisconsin' },
        { text: 'Oregon mortgage rates', url: '/mortgage/rates/Oregon' },
        { text: 'Maryland mortgage rates', url: '/mortgage/rates/Maryland' },
        { text: 'North Carolina mortgage rates', url: '/mortgage/rates/North-Carolina' },
        { text: 'Nevada mortgage rates', url: '/mortgage/rates/Nevada' },
        { text: 'New York mortgage rates', url: '/mortgage/rates/New-York' },
        { text: 'South Carolina mortgage rates', url: '/mortgage/rates/South-Carolina' },
        { text: 'Oklahoma mortgage rates', url: '/mortgage/rates/Oklahoma' },
        { text: 'Arizona mortgage rates', url: '/mortgage/rates/Arizona' },
        { text: 'Pennsylvania mortgage rates', url: '/mortgage/rates/Pennsylvania' },
        { text: 'Kentucky mortgage rates', url: '/mortgage/rates/Kentucky' },
        { text: 'Alabama mortgage rates', url: '/mortgage/rates/Alabama' },
        { text: 'Rhode Island mortgage rates', url: '/mortgage/rates/Rhode-Island' },
        { text: 'Nebraska mortgage rates', url: '/mortgage/rates/Nebraska' },
        { text: 'Idaho mortgage rates', url: '/mortgage/rates/Idaho' },
        { text: 'New Jersey mortgage rates', url: '/mortgage/rates/New-Jersey' },
        { text: 'Minnesota mortgage rates', url: '/mortgage/rates/Minnesota' },
        { text: 'New Hampshire mortgage rates', url: '/mortgage/rates/New-Hampshire' },
        { text: 'Georgia mortgage rates', url: '/mortgage/rates/Georgia' },
        { text: 'Iowa mortgage rates', url: '/mortgage/rates/Iowa' },
        { text: 'Louisiana mortgage rates', url: '/mortgage/rates/Louisiana' },
        { text: 'Maine mortgage rates', url: '/mortgage/rates/Maine' },
        { text: 'Connecticut mortgage rates', url: '/mortgage/rates/Connecticut' },
        { text: 'Kansas mortgage rates', url: '/mortgage/rates/Kansas' },
        { text: 'Arkansas mortgage rates', url: '/mortgage/rates/Arkansas' },
        { text: 'Delaware mortgage rates', url: '/mortgage/rates/Delaware' },
        { text: 'Virginia mortgage rates', url: '/mortgage/rates/Virginia' },
        { text: 'New Mexico mortgage rates', url: '/mortgage/rates/New-Mexico' },
        { text: 'Vermont mortgage rates', url: '/mortgage/rates/Vermont' },
        { text: 'Washington mortgage rates', url: '/mortgage/rates/Washington' },
        { text: 'Mississippi mortgage rates', url: '/mortgage/rates/Mississippi' },
        { text: 'Montana mortgage rates', url: '/mortgage/rates/Montana' },
        { text: 'Alaska mortgage rates', url: '/mortgage/rates/Alaska' },
        { text: 'West Virginia mortgage rates', url: '/mortgage/rates/West-Virginia' },
        { text: 'Hawaii mortgage rates', url: '/mortgage/rates/Hawaii' },
        { text: 'Wyoming mortgage rates', url: '/mortgage/rates/Wyoming' },
        { text: 'District of Columbia mortgage rates', url: '/mortgage/rates/District-of-Columbia' },
        { text: 'North Dakota mortgage rates', url: '/mortgage/rates/North-Dakota' },
        { text: 'South Dakota mortgage rates', url: '/mortgage/rates/South-Dakota' }
      ],
      showAll: false
    }
  ];

  toggleLinkingGroup(index: number): void {
    this.linkingGroups[index].showAll = !this.linkingGroups[index].showAll;
  }

  // Glossary State
  openTermIndex: number | null = null;

  calculateValuation(): void {
    const ratesSection = document.querySelector('.hfm-rates-section');
    if (ratesSection) {
      ratesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleTerm(index: number): void {
    if (this.openTermIndex === index) {
      this.openTermIndex = null;
    } else {
      this.openTermIndex = index;
    }
  }

  // Estimated constants
  propertyTaxRate = 1.2;
  homeInsurance = 1200;

  get downPaymentAmount(): number {
    return (this.homePrice * this.downPaymentPercent) / 100;
  }

  get loanAmount(): number {
    return this.homePrice - this.downPaymentAmount;
  }

  get principalAndInterest(): number {
    const p = this.loanAmount;
    const r = (this.interestRate / 100) / 12;
    const n = this.loanTerm * 12;

    if (r === 0) return p / n;
    
    // M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
    const numerator = r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;
    return p * (numerator / denominator);
  }

  get monthlyPropertyTax(): number {
    return (this.homePrice * (this.propertyTaxRate / 100)) / 12;
  }

  get monthlyHomeInsurance(): number {
    return this.homeInsurance / 12;
  }

  get totalMonthlyPayment(): number {
    return this.principalAndInterest + this.monthlyPropertyTax + this.monthlyHomeInsurance;
  }

}
