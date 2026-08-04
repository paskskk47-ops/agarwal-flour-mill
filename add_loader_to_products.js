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

const preloaderHTML = `<!-- Preloader Overlay -->
  <div id="preloader" class="preloader-overlay">
    <div class="preloader-content">
      <div class="chakki-loader">
        <!-- Grain Hopper -->
        <div class="hopper"></div>
        
        <!-- Falling Grains -->
        <div class="grains-container">
          <span class="grain g1"></span>
          <span class="grain g2"></span>
          <span class="grain g3"></span>
        </div>
        
        <!-- Stone Chakki -->
        <div class="chakki-stones">
          <div class="bottom-stone"></div>
          <div class="top-stone-wrapper">
            <div class="top-stone">
              <div class="stone-hole"></div>
              <div class="stone-handle"></div>
            </div>
          </div>
          <!-- Emerging Flour Dust -->
          <div class="flour-sparks">
            <span class="dust d1"></span>
            <span class="dust d2"></span>
            <span class="dust d3"></span>
            <span class="dust d4"></span>
          </div>
        </div>
      </div>
      <p class="loader-text">Grinding Fresh & Pure Grains...</p>
      <p class="loader-subtext" style="font-family: var(--font-heading); color: var(--accent-gold); margin-top: 5px; font-size:0.9rem; opacity:0.9;">ताज़ा और शुद्ध पिसाई चालू है...</p>
    </div>
  </div>`;

const dismissScript = `  <!-- Preloader Dismissal script -->
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

productFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`${file} does not exist`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('id="preloader"')) {
    console.log(`${file} already has preloader`);
    return;
  }
  
  content = content.replace('<body>', `<body>\n\n  ${preloaderHTML}`);
  content = content.replace('</body>', `${dismissScript}\n\n</body>`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully added preloader to ${file}`);
});
