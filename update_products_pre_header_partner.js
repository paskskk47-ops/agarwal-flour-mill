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

const faviconHTML = '<link rel="icon" type="image/png" href="logo.png">';

const oldPreHeader = `  <!-- Pre-header Banner -->
  <div class="pre-header" style="background-color: var(--primary-brown); color: var(--bg-warm-cream); text-align: center; padding: 6px 10px; font-size: 0.8rem; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.1);">
    <span>For similar websites contact <a href="https://orbyza.com" target="_blank" style="color: var(--accent-gold); text-decoration: none; font-weight: 600;">orbyza.com</a></span>
  </div>`;

const newPreHeader = `  <!-- Pre-header Banner -->
  <div class="pre-header" style="background-color: var(--primary-brown); color: var(--bg-warm-cream); text-align: center; padding: 6px 10px; font-size: 0.8rem; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.1);">
    <span>For similar websites contact <a href="https://orbyza.com" target="_blank" style="color: var(--accent-gold); text-decoration: none; font-weight: 600;">orbyza.com</a> or Call/WhatsApp: <a href="tel:7297016879" style="color: var(--accent-gold); text-decoration: none; font-weight: 600;">7297016879</a></span>
  </div>`;

const oldFooterAbout = `<div class="footer-about">
          <h3>Agarawal Flour Mill</h3>
          <p>Providing pure, hygienic, and personalized grain and spice grinding services at Shop no. 16, Zone 35, Rajat Path, Mansarovar, Jaipur since years.</p>
        </div>`;

const newFooterAbout = `<div class="footer-about">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
            <img src="logo.png" alt="Agarawal Flour Mill Logo" style="height: 48px; width: auto; object-fit: contain; filter: brightness(0) invert(1);">
            <h3 style="margin-bottom: 0; color: #fff;">Agarawal Flour Mill</h3>
          </div>
          <p>Providing pure, hygienic, and personalized grain and spice grinding services at Shop no. 16, Zone 35, Rajat Path, Mansarovar, Jaipur since years.</p>
        </div>`;

const targetFooter = `<div class="footer-bottom">
        <p>&copy; 2026 Agarawal Flour Mill. All rights reserved. Designed for local trust and health.</p>
      </div>`;

const replacementFooter = `<div class="footer-bottom" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <p>&copy; 2026 Agarawal Flour Mill. All rights reserved. Designed for local trust and health.</p>
        <p style="font-size: 0.8rem; opacity: 0.7; margin-top: 5px;">Website Designed & Managed by <a href="https://orbyza.com" target="_blank" style="color: var(--accent-gold); text-decoration: none; font-weight: 600;">Orbyza</a></p>
      </div>`;

const waFooterText = `Website Designed & Managed by <a href="https://orbyza.com" target="_blank" style="color: var(--accent-gold); text-decoration: none; font-weight: 600;">Orbyza</a>`;

const navScriptHTML = `  <!-- Navigation & Preloader script -->
  <script>
    // Mobile menu toggle logic
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }

    // Preloader Dismissal script
    window.addEventListener('load', function() {
      const loader = document.getElementById('preloader');
      if (loader) {
        setTimeout(() => {
          loader.classList.add('fade-out');
        }, 1000);
      }
    });
  </script>`;

productFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Inject favicon in head if not present
  if (!content.includes('rel="icon"')) {
    content = content.replace('<link rel="stylesheet" href="style.css">', `<link rel="stylesheet" href="style.css">\n  ${faviconHTML}`);
    console.log(`Injected favicon into ${file}`);
  }
  
  // Replace pre-header to include phone number if old pre-header present
  if (content.includes(oldPreHeader)) {
    content = content.replace(oldPreHeader, newPreHeader);
    console.log(`Updated pre-header in ${file}`);
  } else if (!content.includes('pre-header')) {
    // If it doesn't have pre-header at all, add it before navbar
    content = content.replace('<!-- Navigation Bar -->', newPreHeader + '\n\n  <!-- Navigation Bar -->');
    console.log(`Added new pre-header with contact number to ${file}`);
  }
  
  // Insert footer-about logo
  if (content.includes(oldFooterAbout)) {
    content = content.replace(oldFooterAbout, newFooterAbout);
    console.log(`Added footer logo in ${file}`);
  }
  
  // Update footer-bottom link to Orbyza if not already done
  if (content.includes(targetFooter)) {
    content = content.replace(targetFooter, replacementFooter);
    console.log(`Updated footer-bottom to Orbyza link in ${file}`);
  } else if (content.includes('balajibestkabadiwala')) {
    const balajiFooter = `<div class="footer-bottom" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <p>&copy; 2026 Agarawal Flour Mill. All rights reserved. Designed for local trust and health.</p>
        <p style="font-size: 0.8rem; opacity: 0.7; margin-top: 5px;">Our Partner: <a href="https://balajibestkabadiwala.in/" target="_blank" style="color: var(--accent-gold); text-decoration: none; font-weight: 600;">Balaji Best Kabadi Wala</a> (Top Scrap Dealer in Jaipur)</p>
      </div>`;
    content = content.replace(balajiFooter, replacementFooter);
    console.log(`Replaced Balaji link with Orbyza in ${file}`);
  } else if (!content.includes('orbyza.com') && content.includes('<div class="footer-bottom"')) {
    // Basic substitution
    content = content.replace('</p>\n      </div>', `</p>\n        <p style="font-size: 0.8rem; opacity: 0.7; margin-top: 5px;">${waFooterText}</p>\n      </div>`);
    console.log(`Appended Orbyza credit in ${file}`);
  }
  
  // Replace old preloader dismissal script or append navigation script
  if (content.includes('<!-- Preloader Dismissal script -->')) {
    const oldDismissalScript = `  <!-- Preloader Dismissal script -->
  <script>
    window.addEventListener('load', function() {
      const loader = document.getElementById('preloader');
      if (loader) {
        setTimeout(() => {
          loader.classList.add('fade-out');
        }, 1000);
      }
    });
  </script>`;
    content = content.replace(oldDismissalScript, navScriptHTML);
    console.log(`Updated preloader script with navigation controls in ${file}`);
  } else if (!content.includes('menuToggle')) {
    content = content.replace('</body>', `${navScriptHTML}\n\n</body>`);
    console.log(`Appended navigation script to ${file}`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
});
