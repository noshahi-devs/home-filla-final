// Discover Tabs Switching
function switchDiscoverTab(tab) {
  document.getElementById('dgrid-buying').style.display = 'none';
  document.getElementById('dgrid-renting').style.display = 'none';
  document.getElementById('dgrid-selling').style.display = 'none';
  document.getElementById('dtab-buying').classList.remove('active');
  document.getElementById('dtab-renting').classList.remove('active');
  document.getElementById('dtab-selling').classList.remove('active');

  document.getElementById('dgrid-' + tab).style.display = 'grid';
  document.getElementById('dtab-' + tab).classList.add('active');

  if (window.innerWidth <= 768) {
    document.getElementById('dgrid-' + tab).style.display = 'flex';
    document.getElementById('dgrid-' + tab).style.flexDirection = 'column';
  }
}

// Hero Search Integration
function scrollToSearch(tab) {
  document.querySelector('.hero-section').scrollIntoView({ behavior: 'smooth' });

  const heroTabs = document.querySelectorAll('.hero-section .tab');
  heroTabs.forEach((t) => t.classList.remove('active'));
  if (tab === 'buy') heroTabs[0]?.classList.add('active');
  if (tab === 'rent') heroTabs[1]?.classList.add('active');
  if (tab === 'sold') heroTabs[2]?.classList.add('active');
}

// Tab Switching
function switchCalc(type) {
  document.getElementById('calc-mortgage').style.display = 'none';
  document.getElementById('calc-affordability').style.display = 'none';
  document.getElementById('calc-rent-buy').style.display = 'none';
  document.getElementById('tab-mortgage').classList.remove('active');
  document.getElementById('tab-affordability').classList.remove('active');
  document.getElementById('tab-rent-buy').classList.remove('active');

  if (window.innerWidth <= 1024) {
    document.getElementById('calc-' + type).style.display = 'flex';
    document.getElementById('calc-' + type).style.flexDirection = 'column';
  } else {
    document.getElementById('calc-' + type).style.display = 'grid';
  }
  document.getElementById('tab-' + type).classList.add('active');
}

// Scroll from Discover
function openCalculator(type) {
  switchCalc(type);
  document.getElementById('tools-calculators').scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
    window.scrollBy(0, -100);
  }, 500);
}

const formatCurrency = (num) => {
  if (!isFinite(num) || isNaN(num) || num < 0) return '$0';
  return '$' + Math.round(num).toLocaleString('en-US');
};

const searchPlaceholderPhrases = [
  'Enter address, city, or ZIP',
  "Search by neighborhood or school",
  'Try "San Francisco, CA"'
];
let placeholderAnimationTimer = null;

function startSearchPlaceholderAnimation() {
  const inputs = Array.from(
    document.querySelectorAll('.hero-search input, #sticky-search input')
  );
  if (!inputs.length) {
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function updateInputs(text) {
    inputs.forEach((input) => {
      if (!input.value) {
        input.placeholder = text;
      }
    });
  }

  function step() {
    const currentPhrase = searchPlaceholderPhrases[phraseIndex];

    if (!deleting) {
      charIndex = Math.min(charIndex + 1, currentPhrase.length);
      updateInputs(currentPhrase.slice(0, charIndex));
      placeholderAnimationTimer = setTimeout(step, charIndex === currentPhrase.length ? 1200 : 80);
      if (charIndex === currentPhrase.length) {
        deleting = true;
      }
    } else {
      charIndex = Math.max(charIndex - 1, 0);
      updateInputs(currentPhrase.slice(0, charIndex));
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % searchPlaceholderPhrases.length;
        placeholderAnimationTimer = setTimeout(step, 300);
      } else {
        placeholderAnimationTimer = setTimeout(step, 40);
      }
    }
  }

  clearTimeout(placeholderAnimationTimer);
  charIndex = 0;
  deleting = false;
  step();
}

function calculateMortgage() {
  const price = parseFloat(document.getElementById('mort-price').value) || 0;
  const down = parseFloat(document.getElementById('mort-down').value) || 0;
  const rateStr = parseFloat(document.getElementById('mort-rate').value) || 0;
  const years = parseInt(document.getElementById('mort-term').value) || 30;

  const principal = Math.max(0, price - down);
  let monthlyPI = 0;

  if (principal > 0 && rateStr > 0) {
    const r = (rateStr / 100) / 12;
    const n = years * 12;
    monthlyPI = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else if (principal > 0 && rateStr === 0) {
    monthlyPI = principal / (years * 12);
  }

  const monthlyTax = (price * 0.011) / 12;
  const monthlyIns = (price * 0.0035) / 12;
  const total = monthlyPI + monthlyTax + monthlyIns;

  document.getElementById('mort-result').textContent = formatCurrency(monthlyPI);
  document.getElementById('mort-pi').textContent = formatCurrency(monthlyPI);
  document.getElementById('mort-tax').textContent = formatCurrency(monthlyTax);
  document.getElementById('mort-ins').textContent = formatCurrency(monthlyIns);
  document.getElementById('mort-total').textContent = formatCurrency(total);
}

function calculateAffordability() {
  const income = parseFloat(document.getElementById('aff-income').value) || 0;
  const debts = parseFloat(document.getElementById('aff-debts').value) || 0;
  const down = parseFloat(document.getElementById('aff-down').value) || 0;
  const rateStr = parseFloat(document.getElementById('aff-rate').value) || 0;

  const maxTotalDebtPayment = (income / 12) * 0.36;
  let maxHousingPayment = maxTotalDebtPayment - debts;
  if (maxHousingPayment < 0) maxHousingPayment = 0;

  let maxPI = maxHousingPayment * 0.8;
  let maxLoan = 0;
  if (maxPI > 0 && rateStr > 0) {
    const r = (rateStr / 100) / 12;
    const n = 30 * 12;
    maxLoan = (maxPI * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
  } else if (maxPI > 0 && rateStr === 0) {
    maxLoan = maxPI * 30 * 12;
  }

  let estPrice = maxLoan + down;
  if (estPrice < 0 || !isFinite(estPrice)) estPrice = down;

  document.getElementById('aff-result-price').textContent = formatCurrency(estPrice);
  document.getElementById('aff-loan').textContent = formatCurrency(maxLoan);
  document.getElementById('aff-down-disp').textContent = formatCurrency(down);
  document.getElementById('aff-max-monthly').textContent = formatCurrency(maxHousingPayment);
}

function calculateRentVsBuy() {
  const rent = parseFloat(document.getElementById('rb-rent').value) || 0;
  const price = parseFloat(document.getElementById('rb-price').value) || 0;
  const down = parseFloat(document.getElementById('rb-down').value) || 0;
  const years = parseInt(document.getElementById('rb-years').value) || 1;

  const rateStr = 6.5;
  const principal = Math.max(0, price - down);
  let monthlyPI = 0;
  const r = (rateStr / 100) / 12;
  const n = 30 * 12;
  if (principal > 0 && rateStr > 0) {
    monthlyPI = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  let totalInterestPaid = 0;
  let balance = principal;
  for (let i = 0; i < years * 12; i++) {
    const interestForMonth = balance * r;
    totalInterestPaid += interestForMonth;
    balance -= monthlyPI - interestForMonth;
  }

  const totalPropTax = (price * 0.011) * years;
  const totalIns = (price * 0.0035) * years;
  const totalMaintenance = (price * 0.01) * years;
  const futureHomeValue = price * Math.pow(1.03, years);
  const equityGained = futureHomeValue - price + (principal - balance);
  const totalUnrecoverableBuying = totalInterestPaid + totalPropTax + totalIns + totalMaintenance - equityGained + (price * 0.04);

  let totalRentPaid = 0;
  let currentRent = rent;
  for (let i = 0; i < years; i++) {
    totalRentPaid += currentRent * 12;
    currentRent *= 1.04;
  }

  const rbTotalRent = document.getElementById('rb-total-rent');
  const rbTotalBuy = document.getElementById('rb-total-buy-cost');
  const rbVerdictTitle = document.getElementById('rb-verdict-title');
  const rbSavings = document.getElementById('rb-savings');

  rbTotalRent.textContent = formatCurrency(totalRentPaid);
  rbTotalBuy.textContent = formatCurrency(totalUnrecoverableBuying);

  if (totalUnrecoverableBuying < totalRentPaid) {
    rbVerdictTitle.textContent = 'Buying is cheaper';
    rbSavings.textContent = 'by ' + formatCurrency(totalRentPaid - totalUnrecoverableBuying) + ' over ' + years + ' years';
    rbVerdictTitle.style.color = 'var(--text-secondary)';
    rbTotalBuy.style.color = '#10b981';
    rbTotalRent.style.color = '#ef4444';
  } else {
    rbVerdictTitle.textContent = 'Renting is cheaper';
    rbSavings.textContent = 'by ' + formatCurrency(totalUnrecoverableBuying - totalRentPaid) + ' over ' + years + ' years';
    rbVerdictTitle.style.color = 'var(--text-secondary)';
    rbTotalBuy.style.color = '#ef4444';
    rbTotalRent.style.color = '#10b981';
  }
}

function toggleFilter(event, id) {
  event.stopPropagation();
  const dropdowns = document.querySelectorAll('.filter-dropdown');
  dropdowns.forEach((d) => {
    if (d.id !== id) d.classList.remove('show');
  });
  const target = document.getElementById(id);
  if (target) {
    target.classList.toggle('show');
  }
}

function applyFilter(btn) {
  const dropdown = btn.closest('.filter-dropdown');
  dropdown.classList.remove('show');
  const chip = dropdown.parentElement.querySelector('.filter-chip');
  if (chip && !chip.classList.contains('active')) {
    chip.style.borderColor = 'var(--accent-blue)';
    chip.style.backgroundColor = 'var(--accent-light)';
    chip.style.color = 'var(--accent-blue)';
  }
}

function loadMoreProperties(event) {
  const button = event?.currentTarget;
  const hiddenCards = Array.from(document.querySelectorAll('.extra-property'));
  if (!hiddenCards.length) {
    return;
  }

  addClass(button, 'loading');
  if (button) {
    button.disabled = true;
  }

  hiddenCards.forEach((card, index) => {
    card.style.display = 'block';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    const delay = index * 120;
    setTimeout(() => {
      card.style.animation = 'fadeIn 0.55s ease forwards';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, delay);
  });

  const container = document.getElementById('load-more-container');
  setTimeout(() => {
    if (container) {
      container.style.display = 'none';
    }
  }, hiddenCards.length * 120 + 500);
}

function addClass(element, className) {
  if (element && className) {
    element.classList.add(className);
  }
}

const globalScope = window;

function initHomeFillaPage() {
  if (globalScope.__homeFillaInit) {
    return;
  }
  globalScope.__homeFillaInit = true;

  calculateMortgage();
  calculateAffordability();
  calculateRentVsBuy();

  startSearchPlaceholderAnimation();

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-wrapper')) {
      const dropdowns = document.querySelectorAll('.filter-dropdown');
      dropdowns.forEach((d) => d.classList.remove('show'));
    }
  });

  document.querySelectorAll('.filter-dropdown').forEach((dropdown) => {
    dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  document.querySelectorAll('.btn-group .tgl-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      Array.from(this.parentElement.children).forEach((sibling) => sibling.classList.remove('active'));
      this.classList.add('active');
    });
  });

  const heroSearch = document.querySelector('.hero-search');
  const stickySearch = document.getElementById('sticky-search');
  if (heroSearch && stickySearch) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            stickySearch.classList.add('visible');
          } else {
            stickySearch.classList.remove('visible');
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    );
    observer.observe(heroSearch);
  }

  window.addEventListener('resize', () => {
    const mortgageTab = document.getElementById('tab-mortgage');
    const activeType = mortgageTab?.classList.contains('active') ? 'mortgage' : 'affordability';
    switchCalc(activeType);
  });
}

globalScope.toggleFilter = toggleFilter;
globalScope.applyFilter = applyFilter;
globalScope.loadMoreProperties = loadMoreProperties;
globalScope.switchDiscoverTab = switchDiscoverTab;
globalScope.switchCalc = switchCalc;
globalScope.openCalculator = openCalculator;
globalScope.scrollToSearch = scrollToSearch;
globalScope.initHomeFillaPage = initHomeFillaPage;

window.addEventListener('load', initHomeFillaPage);
