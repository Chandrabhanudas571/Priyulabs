/**
 * Updates index.html with the new 3-level sliding drawer markup, styles, and controller.
 */
const fs = require('fs');
const path = require('path');
const { renderDrawerHtml, renderDrawerCss } = require('../templates/common');

const indexPath = path.resolve(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Update <style id="pl-mobile-drawer">
const styleRegex = /<style id="pl-mobile-drawer">[\s\S]*?<\/style>/;
const newStyle = `<style id="pl-mobile-drawer">
${renderDrawerCss()}
</style>`;

if (styleRegex.test(content)) {
  content = content.replace(styleRegex, newStyle);
  console.log('✓ Updated <style id="pl-mobile-drawer">');
} else {
  console.error('Could not find <style id="pl-mobile-drawer">');
}

// 2. Update the drawer markup
const drawerRegex = /<!-- Mobile Navigation Drawer[\s\S]*?<\/aside>/;
const newDrawerHtml = renderDrawerHtml().trim();

if (drawerRegex.test(content)) {
  content = content.replace(drawerRegex, newDrawerHtml);
  console.log('✓ Updated Mobile Navigation Drawer markup');
} else {
  console.error('Could not find <!-- Mobile Navigation Drawer --> block');
}

// 3. Update the drawer JS controller in index.html
const jsTargetRegex = /function closeNav\(\) \{[\s\S]*?window\.handleDrawerNavClick = handleDrawerNavClick;/;

const newJsController = `function closeNav() {
        if (!drawer || !backdrop) return;
        drawer.classList.remove('is-open', 'open');
        backdrop.classList.remove('is-open', 'open');
        drawer.setAttribute('aria-hidden', 'true');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        setTimeout(function() {
          if (window.mDrillReset) window.mDrillReset();
        }, 280);
      }

      window.openMobileNav = openNav;
      window.closeMobileNav = closeNav;
      window.openMobileDrawer = openNav;
      window.closeMobileDrawer = closeNav;

      // 3-Level Drill-Down State Controller
      var currentDrillLevel = 1;
      var currentFlowType = null;
      var currentCategorySlug = null;

      function setTrackTransform(level) {
        var track = document.getElementById('mDrillTrack');
        if (!track) return;
        if (level === 1) track.style.transform = 'translateX(0%)';
        else if (level === 2) track.style.transform = 'translateX(-33.33333%)';
        else if (level === 3) track.style.transform = 'translateX(-66.66667%)';
        currentDrillLevel = level;
      }

      window.mDrillGoLevel2 = function(flowType, title) {
        currentFlowType = flowType;
        var titleEl = document.getElementById('mDrillTitleLevel2');
        if (titleEl) titleEl.textContent = title;

        var btypesGroup = document.getElementById('mDrillGroup-categories-business-types');
        var solGroup = document.getElementById('mDrillGroup-categories-solutions');

        if (btypesGroup) {
          if (flowType === 'business-types') btypesGroup.classList.add('is-active');
          else btypesGroup.classList.remove('is-active');
        }
        if (solGroup) {
          if (flowType === 'solutions') solGroup.classList.add('is-active');
          else solGroup.classList.remove('is-active');
        }

        setTrackTransform(2);
        try {
          window.history.pushState({ priyuDrillLevel: 2, flow: flowType }, '');
        } catch(e) {}
      };

      window.mDrillGoLevel3 = function(flowType, categorySlug, categoryTitle) {
        currentFlowType = flowType;
        currentCategorySlug = categorySlug;

        // Normalise category slugs
        if (categorySlug === 'fnb') categorySlug = 'food-beverage';
        if (categorySlug === 'beauty' || categorySlug === 'beauty-wellness') categorySlug = 'beauty-fashion';
        if (categorySlug === 'retail-shops') categorySlug = 'retail';
        if (categorySlug === 'education-services') categorySlug = 'services';

        var titleEl = document.getElementById('mDrillTitleLevel3');
        if (titleEl) titleEl.textContent = categoryTitle;

        var allGroups = document.querySelectorAll('#mDrillPanel3 .m-drill-group');
        for (var i = 0; i < allGroups.length; i++) {
          allGroups[i].classList.remove('is-active');
        }

        var targetGroup = document.getElementById('mDrillGroup-' + flowType + '-' + categorySlug);
        if (targetGroup) {
          targetGroup.classList.add('is-active');
        }

        setTrackTransform(3);
        try {
          window.history.pushState({ priyuDrillLevel: 3, flow: flowType, cat: categorySlug }, '');
        } catch(e) {}
      };

      window.mDrillGoBack = function(targetLevel) {
        setTrackTransform(targetLevel);
      };

      window.mDrillReset = function() {
        setTrackTransform(1);
        currentFlowType = null;
        currentCategorySlug = null;
        var allGroups = document.querySelectorAll('.m-drill-group');
        for (var i = 0; i < allGroups.length; i++) {
          allGroups[i].classList.remove('is-active');
        }
      };

      window.handleDrawerSectorClick = function(event, url) {
        closeNav();
      };

      // Native back button listener for drawer drill-down
      window.addEventListener('popstate', function(e) {
        var isOpen = drawer && (drawer.classList.contains('is-open') || drawer.classList.contains('open'));
        if (!isOpen) return;

        if (currentDrillLevel === 3) {
          setTrackTransform(2);
        } else if (currentDrillLevel === 2) {
          setTrackTransform(1);
        } else if (currentDrillLevel === 1) {
          closeNav();
        }
      });

      function handleDrawerNavClick(event, targetId) {
        if (event && event.preventDefault) {
          event.preventDefault();
        }
        closeNav();
        setTimeout(function() {
          const el = document.getElementById(targetId);
          if (el) {
            const headerOffset = 64;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 120);
      }
      window.handleDrawerNavClick = handleDrawerNavClick;

      // Dynamic Single Source of Truth sync from Desktop mega-menu
      function syncMobileSectorsFromDesktop() {
        var mapping = [
          { catSlug: 'food-beverage', altSlug: 'fnb', desktopTabId: 'tab-fnb' },
          { catSlug: 'retail', altSlug: 'retail', desktopTabId: 'tab-retail' },
          { catSlug: 'beauty-fashion', altSlug: 'beauty', desktopTabId: 'tab-beauty' },
          { catSlug: 'services', altSlug: 'services', desktopTabId: 'tab-services' }
        ];
        mapping.forEach(function(item) {
          var desktopTab = document.getElementById(item.desktopTabId);
          var targetGroup = document.getElementById('mDrillGroup-business-types-' + item.catSlug) ||
                            document.getElementById('mDrillGroup-business-types-' + item.altSlug);
          if (desktopTab && targetGroup) {
            var desktopLinks = desktopTab.querySelectorAll('a.sq-disc-item');
            if (desktopLinks.length > 0) {
              var html = '';
              for (var i = 0; i < desktopLinks.length; i++) {
                var link = desktopLinks[i];
                var text = link.textContent.trim().replace(/\\s+/g, ' ');
                var href = link.getAttribute('href');
                var isPrimary = link.classList.contains('sq-disc-primary');
                html += '<a href="' + href + '" class="m-drawer-link' + (isPrimary ? ' highlight' : '') + '" onclick="handleDrawerSectorClick(event, this.href)">' +
                  '<span>' + text + '</span>' +
                  '<span class="m-drawer-arrow">&rarr;</span>' +
                  '</a>\\n';
              }
              targetGroup.innerHTML = html;
            }
          }
        });
      }
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', syncMobileSectorsFromDesktop);
      } else {
        syncMobileSectorsFromDesktop();
      }`;

if (jsTargetRegex.test(content)) {
  content = content.replace(jsTargetRegex, newJsController);
  console.log('✓ Updated JavaScript controller');
} else {
  console.error('Could not find JS controller target regex');
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('🎉 index.html successfully updated with 3-level drilldown drawer!');
