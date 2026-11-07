/**
 * PriyuLabs Static Dynamic Page & Sitemap Builder
 * Reads data/menuData.js and outputs static HTML files for all sectors,
 * solutions, and builds sitemap.xml.
 */
const fs = require('fs');
const path = require('path');
const menuData = require('../data/menuData');
const { renderSolutionPage } = require('../templates/solution-template');

const ROOT_DIR = path.resolve(__dirname, '..');

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function buildPages() {
  console.log('🚀 Starting PriyuLabs dynamic pages and sitemap generation...');

  const generatedRoutes = [];

  // Build Solution Pages
  menuData.solutions.forEach(category => {
    category.items.forEach(solution => {
      const outDir = path.join(ROOT_DIR, 'solutions', category.categorySlug, solution.slug);
      ensureDirSync(outDir);

      const html = renderSolutionPage(solution, category);
      const filePath = path.join(outDir, 'index.html');
      fs.writeFileSync(filePath, html, 'utf8');

      const route = `/solutions/${category.categorySlug}/${solution.slug}`;
      generatedRoutes.push({
        url: route,
        type: 'Solution',
        title: solution.title,
        category: category.categoryTitle
      });
      console.log(`  ✓ Built solution page: ${route}`);
    });
  });

  // 3. Build sitemap.xml
  const today = new Date().toISOString().split('T')[0];
  const baseUrl = 'https://priyulabs.com';

  const coreRoutes = [
    { loc: '/', changefreq: 'daily', priority: '1.0' },
    { loc: '/pos.html', changefreq: 'weekly', priority: '0.8' },
    { loc: '/complete-management-system.html', changefreq: 'weekly', priority: '0.8' },
    { loc: '/website-builder.html', changefreq: 'weekly', priority: '0.8' },
    { loc: '/digital-marketing.html', changefreq: 'weekly', priority: '0.8' },
    { loc: '/all-business-types.html', changefreq: 'weekly', priority: '0.8' },
    { loc: '/restaurants-fine-dining.html', changefreq: 'weekly', priority: '0.7' },
    { loc: '/grocery-supermarkets-kirana.html', changefreq: 'weekly', priority: '0.7' },
    { loc: '/electronics-mobile-shops.html', changefreq: 'weekly', priority: '0.7' }
  ];

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  coreRoutes.forEach(r => {
    sitemapXml += `  <url>\n`;
    sitemapXml += `    <loc>${baseUrl}${r.loc}</loc>\n`;
    sitemapXml += `    <lastmod>${today}</lastmod>\n`;
    sitemapXml += `    <changefreq>${r.changefreq}</changefreq>\n`;
    sitemapXml += `    <priority>${r.priority}</priority>\n`;
    sitemapXml += `  </url>\n`;
  });

  generatedRoutes.forEach(r => {
    sitemapXml += `  <url>\n`;
    sitemapXml += `    <loc>${baseUrl}${r.url}</loc>\n`;
    sitemapXml += `    <lastmod>${today}</lastmod>\n`;
    sitemapXml += `    <changefreq>weekly</changefreq>\n`;
    sitemapXml += `    <priority>0.8</priority>\n`;
    sitemapXml += `  </url>\n`;
  });

  sitemapXml += `</urlset>\n`;

  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
  console.log(`\n✓ Generated sitemap.xml with ${coreRoutes.length + generatedRoutes.length} URLs`);

  console.log(`\n🎉 Successfully generated ${generatedRoutes.length} dynamic solution pages under /solutions/*`);
}

if (require.main === module) {
  buildPages();
}

module.exports = {
  buildPages
};

