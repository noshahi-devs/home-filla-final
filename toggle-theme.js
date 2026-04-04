const fs = require('fs');
const files = [
  'src/app/admin/layout/admin-layout.component.css',
  'src/app/admin/dashboard/dashboard.component.css',
  'src/app/admin/properties/properties.component.css'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  
  // 1. Text colors
  content = content.replace(/#f1f5f9/ig, '__DARK_TEXT__'); 
  content = content.replace(/#e2e8f0/ig, '__DARK_TEXT__'); 
  content = content.replace(/#94a3b8/ig, '__MID_TEXT__'); 
  content = content.replace(/#cbd5e1/ig, '__MID_TEXT__'); 
  
  // 2. Backgrounds
  content = content.replace(/#1e293b/ig, '__CARD_BG__'); 
  content = content.replace(/#0f172a/ig, '__INPUT_BG__'); 
  content = content.replace(/#0b1120/ig, '__BODY_BG__'); 
  
  // 3. Borders & Translucents
  content = content.replace(/rgba\(255,255,255,/ig, 'rgba(0,0,0,');
  content = content.replace(/rgba\(15,23,42,0\.85\)/ig, 'rgba(255,255,255,0.85)'); // Topbar bg
  content = content.replace(/rgba\(15,23,42,0\.8\)/ig, 'rgba(240,245,250,0.8)'); // modal backdrop

  // Form input text color specifically for light mode
  content = content.replace(/color: white;\n  font-size: 14px;\n  font-family: inherit;/g, 'color: #0f172a;\n  font-size: 14px;\n  font-family: inherit;');

  // Apply placeholders
  content = content.replace(/__DARK_TEXT__/g, '#0f172a');
  content = content.replace(/__MID_TEXT__/g, '#475569');
  content = content.replace(/__CARD_BG__/g, '#ffffff');
  content = content.replace(/__INPUT_BG__/g, '#f8fafc');
  content = content.replace(/__BODY_BG__/g, '#f1f5f9');
  
  fs.writeFileSync(f, content);
});
console.log('Color scheme updated to light!');
