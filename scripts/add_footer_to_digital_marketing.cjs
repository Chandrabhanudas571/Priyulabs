const fs = require('fs');

const footerStyles = `
/* ==========================================================
   PRIYULABS UNIVERSAL EDITORIAL FOOTER (.priyulabs-universal-footer)
========================================================== */
footer.priyulabs-universal-footer {
  padding: 72px 0 36px;
  border-top: 2px solid #D4C3A3;
  margin-top: 80px;
  background: #F1E8D5;
  box-shadow: 0 -16px 40px rgba(42, 36, 25, 0.08);
  position: relative;
  z-index: 10;
  color: #383023;
  text-align: left;
}

.foot-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1.1fr 1fr;
  gap: 36px;
  text-align: left;
}

.foot-brand-desc {
  margin-top: 14px;
  color: #383023;
  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.6;
  max-width: 290px;
  text-align: left;
}

.foot-grid h5 {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 17px;
  margin-bottom: 18px;
  color: #1A150D;
  font-weight: 700;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.foot-grid h5::after {
  content: '';
  display: inline-block;
  width: 16px;
  height: 2.5px;
  background: #B8863B;
  border-radius: 2px;
}

.foot-grid ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  margin: 0;
}

.foot-grid a {
  font-size: 14.5px;
  font-weight: 600;
  color: #383023;
  transition: all .2s ease;
  display: inline-block;
  text-decoration: none;
}

.foot-grid a:hover {
  color: #263B28;
}

.foot-bottom {
  margin-top: 52px;
  padding-top: 24px;
  border-top: 1.5px solid #D4C3A3;
  font-size: 13.5px;
  font-weight: 600;
  color: #4A4030;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

/* Standardized Mobile Footer System (<= 767px) */
@media(max-width: 767px) {
  footer,
  footer.priyulabs-universal-footer {
    padding: 40px 20px 24px !important;
    margin-top: 40px !important;
    background: #FAF6EE !important;
    border-top: 1px solid rgba(0, 0, 0, 0.06) !important;
    box-shadow: none !important;
  }

  footer.priyulabs-universal-footer .wrap {
    padding: 0 !important;
  }

  .foot-grid {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 24px 16px !important;
    align-items: start !important;
  }

  .foot-grid > div:first-child {
    grid-column: 1 / -1 !important;
  }

  .foot-grid .logo img {
    height: 28px !important;
    width: 28px !important;
    object-fit: contain !important;
  }

  .foot-brand-desc {
    margin-top: 10px !important;
    margin-bottom: 16px !important;
    color: #5B5448 !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
    max-width: 280px !important;
  }

  .foot-social {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 12px !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    position: relative !important;
    z-index: 10 !important;
    pointer-events: auto !important;
  }

  .foot-social-btn {
    width: 44px !important;
    height: 44px !important;
    min-width: 44px !important;
    min-height: 44px !important;
    border-radius: 50% !important;
    background: #FFFFFF !important;
    border: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.10) !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-decoration: none !important;
    box-sizing: border-box !important;
    cursor: pointer !important;
    padding: 0 !important;
  }

  .foot-social-btn svg {
    width: 22px !important;
    height: 22px !important;
    display: block !important;
    pointer-events: none !important;
  }

  footer h5,
  .foot-grid h5 {
    font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    color: #1E1B16 !important;
    margin-bottom: 12px !important;
    text-transform: none !important;
    letter-spacing: -0.01em !important;
  }

  footer h5 span,
  .foot-grid h5 span,
  .foot-grid h5::after {
    display: none !important;
  }

  footer ul,
  .foot-grid ul {
    list-style: none !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  footer ul li a,
  .foot-grid a,
  .foot-address {
    font-size: 14px !important;
    line-height: 1.5 !important;
    font-weight: 400 !important;
    color: #5B5448 !important;
    text-decoration: none !important;
  }

  .footer-national-emblems-wrap img {
    height: 34px !important;
    max-height: 34px !important;
    width: auto !important;
    object-fit: contain !important;
    box-shadow: none !important;
  }

  .foot-bottom {
    margin-top: 20px !important;
    padding-top: 16px !important;
    padding-bottom: calc(76px + env(safe-area-inset-bottom, 0px) + 12px) !important;
    border-top: 1px solid rgba(0, 0, 0, 0.06) !important;
    font-size: 12.5px !important;
    font-weight: 400 !important;
    color: #6E6554 !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    flex-wrap: wrap !important;
    gap: 10px !important;
  }
}

@media (min-width: 768px) {
  .foot-social {
    display: none !important;
  }
}
`;

['digital-marketing/index.html', 'digital-marketing.html'].forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  if (!c.includes('/* ==========================================================\n   PRIYULABS UNIVERSAL EDITORIAL FOOTER')) {
    c = c.replace('</style>', footerStyles + '\n</style>');
    fs.writeFileSync(f, c, 'utf8');
    console.log('Appended footer styles to', f);
  }
});

