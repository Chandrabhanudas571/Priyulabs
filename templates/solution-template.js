/**
 * PriyuLabs Reusable Solution Page Template
 * Statically renders complete, production-grade, SEO-optimized solution pages.
 */
const { renderDrawerHtml, renderDrawerCss, renderDrawerScript, escapeHtml } = require('./common');

function renderSolutionPage(solution, category) {
  const currentYear = new Date().getFullYear();
  const canonicalUrl = `https://priyulabs.com/solutions/${category.categorySlug}/${solution.slug}`;
  const whatsappDemoUrl = `https://wa.me/917873844050?text=Hi%20PriyuLabs,%20I%20want%20to%20book%20a%2010-min%20demo%20for%20${encodeURIComponent(solution.title)}.`;
  const whatsappChatUrl = `https://wa.me/917849074050?text=Hi%20PriyuLabs,%20I%20want%20to%20learn%20more%20about%20${encodeURIComponent(solution.title)}.`;

  // Schema.org Structured Data
  const schemaBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://priyulabs.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Solutions",
        "item": "https://priyulabs.com/#solutions"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.categoryTitle,
        "item": `https://priyulabs.com/solutions/${category.categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": solution.title,
        "item": canonicalUrl
      }
    ]
  };

  const schemaSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `PriyuLabs ${solution.title} Module`,
    "operatingSystem": "Web, Android, iOS, Windows",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": solution.metaDescription
  };

  const problemsHtml = solution.problemsSolved.map((item, idx) => `
    <div class="dyn-card dyn-prob-card">
      <div class="dyn-prob-header">
        <span class="dyn-badge dyn-badge-red">Challenge ${idx + 1}</span>
        <h3 class="dyn-prob-title">${escapeHtml(item.problem)}</h3>
      </div>
      <div class="dyn-sol-box">
        <div class="dyn-sol-tag">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          PriyuLabs Solution
        </div>
        <p class="dyn-sol-desc">${escapeHtml(item.solution)}</p>
      </div>
    </div>
  `).join('');

  const featuresHtml = solution.features.map((feat, idx) => `
    <div class="dyn-card dyn-feat-card">
      <div class="dyn-feat-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${getSolutionFeatureIconSvg(idx)}
        </svg>
      </div>
      <h3 class="dyn-feat-title">${escapeHtml(feat.title)}</h3>
      <p class="dyn-feat-desc">${escapeHtml(feat.description)}</p>
    </div>
  `).join('');

  const faqsHtml = solution.faqs.map((faq, idx) => `
    <details class="dyn-faq-item" ${idx === 0 ? 'open' : ''}>
      <summary class="dyn-faq-question">
        <span>${escapeHtml(faq.q)}</span>
        <svg class="dyn-faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </summary>
      <div class="dyn-faq-answer">
        <p>${escapeHtml(faq.a)}</p>
      </div>
    </details>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <base href="/">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(solution.metaTitle)}</title>
  <meta name="description" content="${escapeHtml(solution.metaDescription)}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="favicon.png">
  <link rel="apple-touch-icon" href="favicon.png">
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="manifest" href="site.webmanifest">

  <!-- OpenGraph -->
  <meta property="og:title" content="${escapeHtml(solution.metaTitle)}">
  <meta property="og:description" content="${escapeHtml(solution.metaDescription)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="PriyuLabs">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <script type="application/ld+json">
  ${JSON.stringify(schemaBreadcrumbs)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(schemaSoftware)}
  </script>

  <style>
    :root {
      --bg: #FAF6EE;
      --bg-alt: #F1EAD9;
      --panel: #FFFFFF;
      --ink: #2A2419;
      --ink-soft: #6B6152;
      --accent: #3F5D42;
      --accent-soft: #E7EEE4;
      --gold: #B8863B;
      --line: #E3D9C1;
      --radius: 14px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--ink);
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      width: 100%;
    }

    h1, h2, h3, h4 {
      font-family: 'Fraunces', serif;
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 1.2;
      color: var(--ink);
    }

    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; display: block; }

    .dyn-wrap {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Desktop Navigation Header */
    .dyn-header {
      position: sticky;
      top: 0;
      z-index: 900;
      background: rgba(250, 246, 238, 0.94);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--line);
      height: 72px;
      display: flex;
      align-items: center;
    }

    .dyn-header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .dyn-logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: 'Fraunces', serif;
      font-size: 22px;
      font-weight: 600;
      color: var(--ink);
    }
    .dyn-logo img { width: 32px; height: 32px; object-fit: contain; }

    .dyn-nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
      list-style: none;
    }
    .dyn-nav-links a {
      font-size: 14.5px;
      font-weight: 500;
      color: var(--ink-soft);
      transition: color 0.15s ease;
    }
    .dyn-nav-links a:hover { color: var(--accent); }

    .dyn-header-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .dyn-btn-outline {
      padding: 9px 18px;
      border: 1px solid var(--line);
      border-radius: 100px;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--ink);
      transition: all 0.2s ease;
      background: transparent;
    }
    .dyn-btn-outline:hover {
      border-color: var(--accent);
      background: var(--accent-soft);
    }
    .dyn-btn-solid {
      padding: 10px 20px;
      border-radius: 100px;
      font-size: 13.5px;
      font-weight: 600;
      color: #FFFFFF;
      background: var(--accent);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .dyn-btn-solid:hover {
      background: #334b35;
      transform: translateY(-1px);
    }

    /* Mobile Navbar Header (<1024px) */
    .m-navbar {
      display: none;
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--bg);
      border-bottom: 1px solid var(--line);
      height: 64px;
      padding: 0 16px;
      align-items: center;
      justify-content: space-between;
    }
    .m-hamburger {
      width: 44px;
      height: 44px;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      padding: 8px;
      align-items: center;
    }
    .m-hamburger span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--ink);
      border-radius: 2px;
    }
    .m-nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .m-nav-trial-btn {
      background: var(--ink);
      color: var(--bg);
      font-size: 12.5px;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 100px;
      white-space: nowrap;
    }

    @media (max-width: 1023px) {
      .dyn-header { display: none; }
      .m-navbar { display: flex; }
    }

    /* Breadcrumbs */
    .dyn-breadcrumb {
      padding: 20px 0 10px;
      font-size: 13px;
      color: var(--ink-soft);
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    .dyn-breadcrumb a {
      color: var(--ink-soft);
      transition: color 0.15s ease;
    }
    .dyn-breadcrumb a:hover { color: var(--accent); }
    .dyn-breadcrumb-sep { opacity: 0.5; }
    .dyn-breadcrumb-current {
      color: var(--accent);
      font-weight: 600;
    }

    /* Hero Section */
    .dyn-hero {
      padding: 36px 0 56px;
      text-align: center;
    }
    .dyn-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 100px;
      background: var(--accent-soft);
      color: var(--accent);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 18px;
    }
    .dyn-hero h1 {
      font-size: clamp(30px, 4.5vw, 54px);
      max-width: 860px;
      margin: 0 auto 18px;
    }
    .dyn-hero-desc {
      font-size: clamp(16px, 2vw, 19px);
      color: var(--ink-soft);
      max-width: 720px;
      margin: 0 auto 32px;
      line-height: 1.6;
    }
    .dyn-hero-cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
      margin-bottom: 32px;
    }
    .dyn-cta-main {
      padding: 14px 28px;
      font-size: 15.5px;
      font-weight: 600;
      border-radius: 100px;
      background: var(--accent);
      color: #FFFFFF;
      box-shadow: 0 6px 20px rgba(63, 93, 66, 0.25);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    .dyn-cta-main:hover {
      background: #334b35;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(63, 93, 66, 0.35);
    }
    .dyn-cta-wa {
      padding: 14px 26px;
      font-size: 15.5px;
      font-weight: 600;
      border-radius: 100px;
      background: #25D366;
      color: #FFFFFF;
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.25);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .dyn-cta-wa:hover {
      background: #20BA5A;
      transform: translateY(-2px);
    }

    .dyn-trust-strip {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      font-size: 13px;
      color: var(--ink-soft);
      font-weight: 500;
    }
    .dyn-trust-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    /* Section Headers */
    .dyn-section {
      padding: 64px 0;
    }
    .dyn-section-header {
      text-align: center;
      max-width: 700px;
      margin: 0 auto 44px;
    }
    .dyn-section-tag {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 10px;
      display: block;
    }
    .dyn-section-title {
      font-size: clamp(26px, 3.2vw, 38px);
      margin-bottom: 12px;
    }
    .dyn-section-desc {
      font-size: 16px;
      color: var(--ink-soft);
    }

    /* Grid Layouts */
    .dyn-grid-2x2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 22px;
    }
    .dyn-grid-3x2 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 22px;
    }

    @media (max-width: 860px) {
      .dyn-grid-3x2 { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .dyn-grid-2x2,
      .dyn-grid-3x2 { grid-template-columns: 1fr; }
    }

    /* Cards */
    .dyn-card {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 26px;
      box-shadow: 0 4px 14px rgba(42, 36, 25, 0.04);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .dyn-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(42, 36, 25, 0.08);
    }

    /* Problem / Solution Card */
    .dyn-prob-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
    }
    .dyn-prob-header {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .dyn-badge-red {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 6px;
      background: #FEE2E2;
      color: #991B1B;
      font-size: 11.5px;
      font-weight: 700;
      width: fit-content;
    }
    .dyn-prob-title {
      font-size: 19px;
      color: var(--ink);
    }
    .dyn-sol-box {
      background: var(--accent-soft);
      border-radius: 10px;
      padding: 16px;
      border-left: 4px solid var(--accent);
    }
    .dyn-sol-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 6px;
    }
    .dyn-sol-desc {
      font-size: 14px;
      color: var(--ink);
      line-height: 1.5;
    }

    /* Feature Card */
    .dyn-feat-card {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .dyn-feat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: var(--accent-soft);
      color: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dyn-feat-title {
      font-size: 19px;
    }
    .dyn-feat-desc {
      font-size: 14.5px;
      color: var(--ink-soft);
      line-height: 1.55;
    }

    /* FAQ */
    .dyn-faq-list {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .dyn-faq-item {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 18px 22px;
      box-shadow: 0 2px 8px rgba(42, 36, 25, 0.03);
    }
    .dyn-faq-question {
      font-family: 'Fraunces', serif;
      font-size: 18px;
      font-weight: 600;
      color: var(--ink);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      list-style: none;
      user-select: none;
    }
    .dyn-faq-question::-webkit-details-marker { display: none; }
    .dyn-faq-chevron {
      color: var(--accent);
      transition: transform 0.2s ease;
      flex-shrink: 0;
      margin-left: 12px;
    }
    .dyn-faq-item[open] .dyn-faq-chevron {
      transform: rotate(180deg);
    }
    .dyn-faq-answer {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--line);
      font-size: 14.5px;
      color: var(--ink-soft);
      line-height: 1.6;
    }

    /* Bottom CTA Banner */
    .dyn-bottom-cta {
      margin: 60px 0 80px;
      background: linear-gradient(135deg, var(--accent) 0%, #2A3C2D 100%);
      color: #FFFFFF;
      border-radius: 20px;
      padding: 56px 36px;
      text-align: center;
      box-shadow: 0 16px 40px rgba(42, 60, 45, 0.25);
    }
    .dyn-bottom-cta h2 {
      color: #FFFFFF;
      font-size: clamp(28px, 3.8vw, 44px);
      margin-bottom: 14px;
    }
    .dyn-bottom-cta p {
      color: #E7EEE4;
      font-size: 17px;
      max-width: 640px;
      margin: 0 auto 32px;
    }
    .dyn-bottom-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .dyn-btn-white {
      padding: 14px 28px;
      font-size: 15.5px;
      font-weight: 700;
      border-radius: 100px;
      background: #FFFFFF;
      color: var(--accent);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .dyn-btn-white:hover {
      background: #FAF6EE;
      transform: translateY(-2px);
    }

    /* Footer */
    footer {
      background: var(--bg-alt);
      border-top: 1px solid var(--line);
      padding: 60px 0 32px;
    }
    .foot-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.2fr;
      gap: 36px;
      margin-bottom: 40px;
    }
    @media (max-width: 860px) {
      .foot-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 520px) {
      .foot-grid { grid-template-columns: 1fr; }
    }
    .foot-brand-desc {
      font-size: 13.5px;
      color: var(--ink-soft);
      margin-top: 10px;
      max-width: 300px;
    }
    footer h5 {
      font-family: 'Fraunces', serif;
      font-size: 16px;
      margin-bottom: 14px;
      color: var(--ink);
    }
    footer ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
    footer ul a {
      font-size: 13.5px;
      color: var(--ink-soft);
      transition: color 0.15s ease;
    }
    footer ul a:hover { color: var(--accent); }
    .foot-bottom {
      border-top: 1px solid var(--line);
      padding-top: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12.5px;
      color: var(--ink-soft);
      flex-wrap: wrap;
      gap: 12px;
    }

    /* Floating WhatsApp Button */
    .cms-whatsapp-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #25D366;
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      transition: transform 0.2s ease;
    }
    .cms-whatsapp-fab:hover {
      transform: scale(1.08);
    }
    .cms-whatsapp-fab img {
      width: 36px;
      height: 36px;
    }

    ${renderDrawerCss()}
  </style>
</head>
<body>

  <!-- Desktop Header -->
  <header class="dyn-header">
    <div class="dyn-wrap dyn-header-inner">
      <a href="/" class="dyn-logo">
        <img src="assets/logo.svg" alt="PriyuLabs" onerror="this.onerror=null; this.src='assets/logo.svg';" />
        <span>PriyuLabs</span>
      </a>
      <ul class="dyn-nav-links">
        <li><a href="/#business-types">Business Types</a></li>
        <li><a href="/#solutions">Solutions</a></li>
        <li><a href="/#pricing">Pricing</a></li>
        <li><a href="/#whats-new">What's New</a></li>
      </ul>
      <div class="dyn-header-actions">
        <a href="${whatsappChatUrl}" target="_blank" rel="noopener noreferrer" class="dyn-btn-outline">WhatsApp Support</a>
        <a href="${whatsappDemoUrl}" target="_blank" rel="noopener noreferrer" class="dyn-btn-solid">Book a 10-Min Demo</a>
      </div>
    </div>
  </header>

  <!-- Mobile Header (<1024px) -->
  <header class="m-navbar" id="mobileNavbar">
    <a href="/" class="m-nav-logo">
      <img src="assets/logo.svg" alt="PriyuLabs" onerror="this.onerror=null; this.src='assets/logo.svg';" />
      <span>PriyuLabs</span>
    </a>
    <div class="m-nav-actions">
      <a href="${whatsappDemoUrl}" target="_blank" rel="noopener noreferrer" class="m-nav-trial-btn">Start Free Trial</a>
      <button class="m-hamburger" id="hamburger" aria-label="Toggle navigation menu" onclick="openMobileNav()">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  ${renderDrawerHtml()}

  <!-- Breadcrumbs -->
  <div class="dyn-wrap">
    <nav class="dyn-breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="dyn-breadcrumb-sep">&gt;</span>
      <a href="/#solutions">Solutions</a>
      <span class="dyn-breadcrumb-sep">&gt;</span>
      <span>${escapeHtml(category.categoryTitle)}</span>
      <span class="dyn-breadcrumb-sep">&gt;</span>
      <span class="dyn-breadcrumb-current">${escapeHtml(solution.title)}</span>
    </nav>
  </div>

  <!-- Hero Section -->
  <section class="dyn-hero">
    <div class="dyn-wrap">
      <span class="dyn-hero-badge">PriyuLabs Solution &bull; ${escapeHtml(category.categoryTitle)}</span>
      <h1>${escapeHtml(solution.h1)}</h1>
      <p class="dyn-hero-desc">${escapeHtml(solution.shortDescription)}</p>
      <div class="dyn-hero-cta">
        <a href="${whatsappDemoUrl}" target="_blank" rel="noopener noreferrer" class="dyn-cta-main">
          Book a 10-Min Demo &rarr;
        </a>
        <a href="${whatsappChatUrl}" target="_blank" rel="noopener noreferrer" class="dyn-cta-wa">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.18-.54-1.898-.782-3.118-2.73-3.212-2.857-.094-.127-.775-1.029-.775-1.961 0-.932.489-1.391.663-1.583.174-.192.38-.24.507-.24.127 0 .254.001.363.007.119.006.279-.045.437.334.164.394.561 1.366.611 1.467.05.101.082.22.016.353-.067.133-.1.216-.198.33-.099.115-.208.257-.297.345-.101.099-.207.207-.089.41.118.203.525.867 1.127 1.403.774.689 1.427.902 1.63.1.203.101.323.089.444-.051.121-.14.52-.607.66-.814.14-.207.279-.172.47-.101.191.071 1.213.571 1.421.674.208.103.346.155.397.243.05.088.05.512-.094.917z"/>
          </svg>
          Chat on WhatsApp
        </a>
      </div>
      <div class="dyn-trust-strip">
        <span class="dyn-trust-item">⚡ Sub-second execution</span>
        <span class="dyn-trust-item">&bull;</span>
        <span class="dyn-trust-item">📱 Cloud &amp; Offline sync</span>
        <span class="dyn-trust-item">&bull;</span>
        <span class="dyn-trust-item">📦 Real-time telemetry</span>
        <span class="dyn-trust-item">&bull;</span>
        <span class="dyn-trust-item">🛡️ Enterprise 256-bit security</span>
      </div>
    </div>
  </section>

  <!-- Problems We Solve Section -->
  <section class="dyn-section" style="background: var(--bg-alt); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);">
    <div class="dyn-wrap">
      <div class="dyn-section-header">
        <span class="dyn-section-tag">Friction Points Eliminated</span>
        <h2 class="dyn-section-title">Critical Operational Bottlenecks Solved</h2>
        <p class="dyn-section-desc">Engineered to eliminate error-prone manual workflows and restore total transparency.</p>
      </div>
      <div class="dyn-grid-2x2">
        ${problemsHtml}
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="dyn-section">
    <div class="dyn-wrap">
      <div class="dyn-section-header">
        <span class="dyn-section-tag">System Modules</span>
        <h2 class="dyn-section-title">Core Architecture &amp; Capabilities</h2>
        <p class="dyn-section-desc">Reliable, scalable infrastructure built to accelerate counter throughput and management control.</p>
      </div>
      <div class="dyn-grid-3x2">
        ${featuresHtml}
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="dyn-section" style="background: var(--bg-alt); border-top: 1px solid var(--line);">
    <div class="dyn-wrap">
      <div class="dyn-section-header">
        <span class="dyn-section-tag">Frequently Asked</span>
        <h2 class="dyn-section-title">Frequently Asked Questions</h2>
        <p class="dyn-section-desc">Common questions answered about implementing ${escapeHtml(solution.title)} in your business.</p>
      </div>
      <div class="dyn-faq-list">
        ${faqsHtml}
      </div>
    </div>
  </section>

  <!-- High-Impact Bottom CTA Banner -->
  <div class="dyn-wrap">
    <section class="dyn-bottom-cta">
      <h2>Deploy ${escapeHtml(solution.title)} in Your Stores</h2>
      <p>Seamlessly integrate with your existing barcode hardware, printers, and bank UPI QR soundboxes in 1 day.</p>
      <div class="dyn-bottom-actions">
        <a href="${whatsappDemoUrl}" target="_blank" rel="noopener noreferrer" class="dyn-btn-white">Book a 10-Min Demo &rarr;</a>
        <a href="${whatsappChatUrl}" target="_blank" rel="noopener noreferrer" class="dyn-cta-wa" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);">
          WhatsApp Support (+91 78738 44050)
        </a>
      </div>
    </section>
  </div>

  <!-- Standard Footer -->
  <footer>
    <div class="dyn-wrap">
      <div class="foot-grid">
        <div>
          <div class="dyn-logo">
            <img src="assets/logo.svg" alt="PriyuLabs" onerror="this.onerror=null; this.src='assets/logo.svg';" />
            <span>PriyuLabs</span>
          </div>
          <p class="foot-brand-desc">India's AI retail OS — POS billing, inventory, staff HRMS and GST, built for Bharat.</p>
        </div>
        <div>
          <h5>Solutions</h5>
          <ul>
            <li><a href="/solutions/billing-pos/smart-pos">Smart POS</a></li>
            <li><a href="/solutions/billing-pos/gst-billing">GST Billing</a></li>
            <li><a href="/solutions/inventory/stock-tracking">Stock Tracking</a></li>
            <li><a href="/solutions/growth-marketing/customer-crm">Customer CRM</a></li>
          </ul>
        </div>
        <div>
          <h5>Business Types</h5>
          <ul>
            <li><a href="/cafes-chai-bars">Cafes &amp; Bakeries</a></li>
            <li><a href="/grocery-supermarkets-kirana">Grocery &amp; Supermarkets</a></li>
            <li><a href="/salons-spas">Salons &amp; Spas</a></li>
            <li><a href="/apparel-boutiques">Clothing &amp; Retail</a></li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li><a href="mailto:priylabspos@gmail.com">priylabspos@gmail.com</a></li>
            <li><a href="tel:+917873844050">+91 78738 44050</a></li>
            <li>Basisthanagar, Bhubaneswar, Odisha</li>
          </ul>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© ${currentYear} PriyuLabs Software. All rights reserved.</span>
        <span>MSME REGISTERED: UDYAM-OD-19-0177979</span>
        <span>Made with Pride in India</span>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp FAB -->
  <a href="${whatsappChatUrl}" class="cms-whatsapp-fab" id="cmsWhatsappFab" target="_blank" rel="noopener noreferrer" aria-label="Chat with PriyuLabs on WhatsApp">
    <svg width="34" height="34" viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.18-.54-1.898-.782-3.118-2.73-3.212-2.857-.094-.127-.775-1.029-.775-1.961 0-.932.489-1.391.663-1.583.174-.192.38-.24.507-.24.127 0 .254.001.363.007.119.006.279-.045.437.334.164.394.561 1.366.611 1.467.05.101.082.22.016.353-.067.133-.1.216-.198.33-.099.115-.208.257-.297.345-.101.099-.207.207-.089.41.118.203.525.867 1.127 1.403.774.689 1.427.902 1.63.1.203.101.323.089.444-.051.121-.14.52-.607.66-.814.14-.207.279-.172.47-.101.191.071 1.213.571 1.421.674.208.103.346.155.397.243.05.088.05.512-.094.917z"/>
    </svg>
  </a>

  <!-- Mobile Drawer Controller Scripts -->
  <script>
    function openMobileNav() {
      var drawer = document.getElementById('mobileDrawer');
      var backdrop = document.getElementById('drawerBackdrop');
      if (drawer && backdrop) {
        drawer.classList.add('is-open', 'open');
        backdrop.classList.add('is-open', 'open');
        document.body.style.overflow = 'hidden';
      }
    }
    function closeMobileNav() {
      var drawer = document.getElementById('mobileDrawer');
      var backdrop = document.getElementById('drawerBackdrop');
      if (drawer && backdrop) {
        drawer.classList.remove('is-open', 'open');
        backdrop.classList.remove('is-open', 'open');
        document.body.style.overflow = '';
      }
    }
    window.openMobileNav = openMobileNav;
    window.closeMobileNav = closeMobileNav;

    function handleDrawerNavClick(event, targetId) {
      closeMobileNav();
    }
  </script>
  ${renderDrawerScript()}

</body>
</html>
`;
}

function getSolutionFeatureIconSvg(idx) {
  const icons = [
    '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/>',
    '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'
  ];
  return icons[idx % icons.length];
}

module.exports = {
  renderSolutionPage
};
