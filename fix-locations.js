const fs = require('fs');
let f = 'src/app/admin/locations/locations.component.css';
if (fs.existsSync(f)) {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/#1e293b/g, '#ffffff');
  c = c.replace(/rgba\(255,255,255,/g, 'rgba(0,0,0,');
  c = c.replace(/#f1f5f9/g, '__DARK_TEXT__');
  c = c.replace(/#0f172a/g, '#f8fafc');
  c = c.replace(/__DARK_TEXT__/g, '#0f172a');
  c = c.replace(/color: white;\r?\n  font-family: inherit;/g, 'color: #0f172a;\n  font-family: inherit;');
  
  // Add a reload trigger
  c += '\n/* reload location */\n';
  fs.writeFileSync(f, c);
  console.log('Fixed locations.component.css');
}
