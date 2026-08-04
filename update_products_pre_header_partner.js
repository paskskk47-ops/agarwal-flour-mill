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

const whatsappFloatHTML = `  <!-- Floating WhatsApp Widget -->
  <a href="https://wa.me/919636220880?text=Hello%20Agarawal%20Flour%20Mill%2C%20I%20want%20to%20inquire%20about%20your%20grinding%20services." 
     class="whatsapp-float" 
     target="_blank" 
     rel="noopener noreferrer" 
     aria-label="Contact us on WhatsApp">
    <svg viewBox="0 0 448 512" class="wa-icon">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  </a>`;

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
  
  // Update footer hours to 9:00 AM – 9:30 PM
  if (content.includes('8:00 AM – 8:00 PM')) {
    content = content.replace('8:00 AM – 8:00 PM', '9:00 AM – 9:30 PM');
    console.log(`Updated timings in ${file}`);
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
  
  // Inject floating WhatsApp button if not present
  if (!content.includes('whatsapp-float')) {
    content = content.replace('</body>', `${whatsappFloatHTML}\n\n</body>`);
    console.log(`Injected floating WhatsApp button into ${file}`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
});
