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
  
  // Replace old preloader dismissal script or append navigation script
  if (content.includes('<!-- Preloader Dismissal script -->')) {
    // If it has old dismissal script, replace it
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
    // Append script right before </body>
    content = content.replace('</body>', `${navScriptHTML}\n\n</body>`);
    console.log(`Appended navigation script to ${file}`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
});
