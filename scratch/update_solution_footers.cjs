const fs = require('fs');
const path = require('path');

const universalFooter = `  <!-- ══════════════════════════════════════════════════════════
       UNIVERSAL EDITORIAL FOOTER
  ══════════════════════════════════════════════════════════ -->
  <footer class="priyulabs-universal-footer" style="padding: 72px 0 36px; border-top: 2px solid #D4C3A3; margin-top: 80px; background: #F1E8D5 !important; box-shadow: 0 -16px 40px rgba(42, 36, 25, 0.08); position: relative; z-index: 10; font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; text-align: left; color: #383023;">
    <div class="wrap" style="max-width: 1200px; margin: 0 auto; padding: 0 24px;">
      <div class="foot-grid" style="display: grid; grid-template-columns: 1.3fr 1fr 1.1fr 1fr; gap: 36px; text-align: left;">
        <div>
          <div class="logo" style="display: flex; align-items: center; gap: 10px; font-family: 'Fraunces', Georgia, serif; font-size: 24px; font-weight: 700; color: #1A150D;">
            <img src="/assets/logo.svg" alt="PriyuLabs" onerror="if(!this.dataset.retry){this.dataset.retry='1';this.src='assets/logo.svg';}" style="height: 28px; width: 28px; object-fit: contain; border-radius: 7px; display: inline-block;" />
            <span>PriyuLabs</span>
          </div>
          <p class="foot-brand-desc" style="margin-top: 14px; color: #383023; font-size: 14.5px; font-weight: 500; line-height: 1.6; max-width: 290px; text-align: left;">India's AI retail OS — POS billing, inventory, staff HRMS and GST, built for Bharat.</p>
        </div>
        <div>
          <h5 style="font-family: 'Fraunces', Georgia, serif; font-size: 17px; margin-bottom: 18px; color: #1A150D; font-weight: 700; letter-spacing: -0.01em; display: flex; align-items: center; gap: 8px;">
            Solutions <span style="display: inline-block; width: 16px; height: 2.5px; background: #B8863B; border-radius: 2px;"></span>
          </h5>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; padding: 0; margin: 0;">
            <li><a href="/pos" style="font-size: 14.5px; font-weight: 600; color: #383023; text-decoration: none; transition: all .2s ease;">Smart POS</a></li>
            <li><a href="/complete-management-system" style="font-size: 14.5px; font-weight: 600; color: #383023; text-decoration: none; transition: all .2s ease;">Management System</a></li>
            <li><a href="/website-builder" style="font-size: 14.5px; font-weight: 600; color: #383023; text-decoration: none; transition: all .2s ease;">Website Building</a></li>
            <li><a href="/digital-marketing" style="font-size: 14.5px; font-weight: 600; color: #383023; text-decoration: none; transition: all .2s ease;">Digital Marketing</a></li>
          </ul>
        </div>
        <div>
          <h5 style="font-family: 'Fraunces', Georgia, serif; font-size: 17px; margin-bottom: 18px; color: #1A150D; font-weight: 700; letter-spacing: -0.01em; display: flex; align-items: center; gap: 8px;">
            Business Types <span style="display: inline-block; width: 16px; height: 2.5px; background: #B8863B; border-radius: 2px;"></span>
          </h5>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; padding: 0; margin: 0;">
            <li><a href="/restaurants-fine-dining" style="font-size: 14.5px; font-weight: 600; color: #383023; text-decoration: none; transition: all .2s ease;">Restaurants &amp; Cafes</a></li>
            <li><a href="/grocery-supermarkets-kirana" style="font-size: 14.5px; font-weight: 600; color: #383023; text-decoration: none; transition: all .2s ease;">Grocery &amp; Supermarkets</a></li>
            <li><a href="/beauty-fashion/apparel" style="font-size: 14.5px; font-weight: 600; color: #383023; text-decoration: none; transition: all .2s ease;">Clothing &amp; Boutiques</a></li>
            <li><a href="/electronics-mobile-shops" style="font-size: 14.5px; font-weight: 600; color: #383023; text-decoration: none; transition: all .2s ease;">Electronics &amp; Mobiles</a></li>
            <li><a href="/beauty-fashion/salons" style="font-size: 14.5px; font-weight: 600; color: #383023; text-decoration: none; transition: all .2s ease;">Salons &amp; Spas</a></li>
            <li><a href="/footwear-leather-stores" style="font-size: 14.5px; font-weight: 600; color: #383023; text-decoration: none; transition: all .2s ease;">Footwear &amp; Leather</a></li>
            <li><a href="/all-business-types.html" style="font-size: 14.5px; font-weight: 600; color: #B8863B; text-decoration: none; transition: all .2s ease;">All Business Types &rarr;</a></li>
          </ul>
        </div>
        <div>
          <h5 style="font-family: 'Fraunces', Georgia, serif; font-size: 17px; margin-bottom: 18px; color: #1A150D; font-weight: 700; letter-spacing: -0.01em; display: flex; align-items: center; gap: 8px;">
            Contact <span style="display: inline-block; width: 16px; height: 2.5px; background: #B8863B; border-radius: 2px;"></span>
          </h5>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; padding: 0; margin: 0;">
            <li><a href="mailto:priylabspos@gmail.com" style="font-size: 14.5px; font-weight: 600; color: #383023; text-decoration: none; transition: all .2s ease;">priylabspos@gmail.com</a></li>
            <li><a href="tel:+917873844050" style="font-size: 14.5px; font-weight: 600; color: #383023; text-decoration: none;">+91 78738 44050</a> / <a href="tel:+917205045905" style="font-size: 14.5px; font-weight: 600; color: #383023; text-decoration: none;">+91 72050 45905</a></li>
            <li class="foot-address" style="font-size: 14.5px; font-weight: 600; color: #383023; line-height: 1.4;">Basisthanagar, Bhubaneswar, Odisha</li>
          </ul>
        </div>
      </div>
      <!-- National Pride: Make in India & Ashoka Stambha MSME Emblems -->
      <div class="footer-national-emblems-wrap" style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 34px auto 18px; text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap; margin-bottom: 12px;">
          <!-- Make in India Lion Logo -->
          <img src="/Made in india logo.png" alt="Make in India" class="foot-make-in-india-logo" style="height: 64px; width: auto; max-width: 140px; object-fit: contain; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,0.14);" onerror="if(!this.dataset.retry){this.dataset.retry='1';this.src='Made in india logo.png';}" />
          <!-- Ashoka Stambha MSME Emblem -->
          <img src="/image_4.png" alt="Ashoka Stambha MSME Government of India" class="foot-msme-emblem" style="height: 64px; width: auto; max-width: 85px; object-fit: contain; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,0.14);" onerror="if(!this.dataset.retry){this.dataset.retry='1';this.src='image_4.png';}" />
        </div>
        <div style="font-size: 11.5px; font-weight: 700; letter-spacing: 0.12em; color: #B8863B; text-transform: uppercase;">GOVERNMENT OF INDIA &bull; MAKE IN INDIA</div>
        <div style="font-size: 12px; font-family: monospace; color: #6B6152; margin-top: 3px;">MSME REGISTERED: UDYAM-OD-19-0177979</div>
      </div>
      <div class="foot-bottom" style="margin-top: 52px; padding-top: 24px; border-top: 1.5px solid #D4C3A3; font-size: 13.5px; font-weight: 600; color: #4A4030; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <span>© 2026 Priyulabs Software. All rights reserved.</span>
        <span class="foot-version-badge" title="PriyuLabs Platform v2.4.68 (Live)" style="display: inline-flex; align-items: center; gap: 6px; background: rgba(0, 0, 0, 0.05); border: 1px solid rgba(0, 0, 0, 0.08); padding: 3px 10px; border-radius: 9999px; font-size: 11.5px; font-family: ui-monospace, monospace; color: #4a4030;">
          <span class="version-pulse-dot" style="width: 6px; height: 6px; border-radius: 50%; background: #10b981; display: inline-block; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);"></span>
          <span class="foot-version" id="siteVersion">v2.4.68</span>
        </span>
        <span>UDYAM-OD-19-0177979</span>
      </div>
    </div>
  </footer>`;

function getFiles(dir) {
  let list = [];
  if (!fs.existsSync(dir)) return list;
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) list = list.concat(getFiles(full));
    else if (f.endsWith('.html')) list.push(full);
  });
  return list;
}

const targetFiles = [
  'solutions.html',
  'dist/solutions.html',
  'pos.html',
  'dist/pos.html',
  'pos/index.html',
  'dist/pos/index.html',
  'complete-management-system.html',
  'dist/complete-management-system.html',
  'complete-management-system/index.html',
  'dist/complete-management-system/index.html',
  'website-builder.html',
  'dist/website-builder.html',
  'website-builder/index.html',
  'dist/website-builder/index.html',
  'digital-marketing.html',
  'dist/digital-marketing.html',
  'digital-marketing/index.html',
  'dist/digital-marketing/index.html',
]
  .concat(getFiles('solutions'))
  .concat(getFiles('dist/solutions'));

const uniqueFiles = Array.from(new Set(targetFiles));
let updatedCount = 0;

uniqueFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let text = fs.readFileSync(filePath, 'utf8');
  let newText;

  if (text.includes('<footer')) {
    newText = text.replace(/<footer[\s\S]*?<\/footer>/i, universalFooter);
  } else {
    // Insert before closing body or before scripts at end
    if (text.includes('</body>')) {
      newText = text.replace('</body>', `${universalFooter}\n</body>`);
    } else {
      newText = text + '\n' + universalFooter;
    }
  }

  if (newText !== text) {
    fs.writeFileSync(filePath, newText, 'utf8');
    updatedCount++;
    console.log('Updated footer in:', filePath);
  }
});

console.log(`\nSuccessfully updated ${updatedCount} solution files with the universal footer.`);
