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

const targetText = `<div class="footer-bottom">
        <p>&copy; 2026 Agarawal Flour Mill. All rights reserved. Designed for local trust and health.</p>
      </div>`;

const replacementText = `<div class="footer-bottom" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <p>&copy; 2026 Agarawal Flour Mill. All rights reserved. Designed for local trust and health.</p>
        <p style="font-size: 0.8rem; opacity: 0.7; margin-top: 5px;">Our Partner: <a href="https://balajibestkabadiwala.in/" target="_blank" style="color: var(--accent-gold); text-decoration: none; font-weight: 600;">Balaji Best Kabadi Wala</a> (Top Scrap Dealer in Jaipur)</p>
      </div>`;

productFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes(targetText)) {
    content = content.replace(targetText, replacementText);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated footer-bottom in ${file}`);
  } else {
    console.log(`Could not find target in ${file}`);
  }
});
