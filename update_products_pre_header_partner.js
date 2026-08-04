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

const oldPreHeader = `  <!-- Pre-header Banner -->
  <div class="pre-header" style="background-color: var(--primary-brown); color: var(--bg-warm-cream); text-align: center; padding: 6px 10px; font-size: 0.8rem; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.1);">
    <span>For similar websites contact <a href="https://orbyza.com" target="_blank" style="color: var(--accent-gold); text-decoration: none; font-weight: 600;">orbyza.com</a></span>
  </div>`;

const newPreHeader = `  <!-- Pre-header Banner -->
  <div class="pre-header" style="background-color: var(--primary-brown); color: var(--bg-warm-cream); text-align: center; padding: 6px 10px; font-size: 0.8rem; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.1);">
    <span>For similar websites contact <a href="https://orbyza.com" target="_blank" style="color: var(--accent-gold); text-decoration: none; font-weight: 600;">orbyza.com</a> or Call/WhatsApp: <a href="tel:7297016879" style="color: var(--accent-gold); text-decoration: none; font-weight: 600;">7297016879</a></span>
  </div>`;

productFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes(oldPreHeader)) {
    content = content.replace(oldPreHeader, newPreHeader);
    console.log(`Updated pre-header with contact number in ${file}`);
  } else if (!content.includes('pre-header')) {
    // If it doesn't have it at all, add the new one before navigation bar
    content = content.replace('<!-- Navigation Bar -->', newPreHeader + '\n\n  <!-- Navigation Bar -->');
    console.log(`Added new pre-header with contact number to ${file}`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
});
