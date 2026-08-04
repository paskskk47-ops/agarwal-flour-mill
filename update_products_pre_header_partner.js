const fs = require('fs');
const path = require('path');

const productFiles = [
  'wheat-atta.html',
  'bajra-atta.html',
  'makka-atta.html',
  'besan.html',
  'multigrain-atta.html',
  'haldi-powder.html',
  'lal-mirch-powder.html',
  'dhaniya-powder.html',
  'jeera-powder.html',
  'garam-masala.html'
];

const preHeaderHTML = `  <!-- Pre-header Banner -->
  <div class="pre-header" style="background-color: var(--primary-brown); color: var(--bg-warm-cream); text-align: center; padding: 6px 10px; font-size: 0.8rem; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.1);">
    <span>For similar websites contact <a href="https://orbyza.com" target="_blank" style="color: var(--accent-gold); text-decoration: none; font-weight: 600;">orbyza.com</a></span>
  </div>

  <!-- Navigation Bar -->`;

const targetFooter = `<div class="footer-bottom">
        <p>&copy; 2026 Agarawal Flour Mill. All rights reserved. Designed for local trust and health.</p>
      </div>`;

const replacementFooter = `<div class="footer-bottom" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <p>&copy; 2026 Agarawal Flour Mill. All rights reserved. Designed for local trust and health.</p>
        <p style="font-size: 0.8rem; opacity: 0.7; margin-top: 5px;">Website Designed & Managed by <a href="https://orbyza.com" target="_blank" style="color: var(--accent-gold); text-decoration: none; font-weight: 600;">Orbyza</a></p>
      </div>`;

productFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace navbar with pre-header + navbar
  if (content.includes('<!-- Navigation Bar -->') && !content.includes('pre-header')) {
    content = content.replace('<!-- Navigation Bar -->', preHeaderHTML);
    console.log(`Added pre-header to ${file}`);
  }
  
  // Replace old footer-bottom
  if (content.includes(targetFooter)) {
    content = content.replace(targetFooter, replacementFooter);
    console.log(`Updated footer-bottom to Orbyza link in ${file}`);
  } else if (content.includes('balajibestkabadiwala')) {
    // If it had the old balaji link, replace it
    const balajiFooter = `<div class="footer-bottom" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <p>&copy; 2026 Agarawal Flour Mill. All rights reserved. Designed for local trust and health.</p>
        <p style="font-size: 0.8rem; opacity: 0.7; margin-top: 5px;">Our Partner: <a href="https://balajibestkabadiwala.in/" target="_blank" style="color: var(--accent-gold); text-decoration: none; font-weight: 600;">Balaji Best Kabadi Wala</a> (Top Scrap Dealer in Jaipur)</p>
      </div>`;
    content = content.replace(balajiFooter, replacementFooter);
    console.log(`Replaced Balaji link with Orbyza in ${file}`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
});
