/**
 * PMD Campaign — Shared Site Navigation
 * ----------------------------------------------------
 * Include this ONE file on every page and it will inject:
 *   - the top disclaimer banner
 *   - the desktop nav bar (with dropdowns)
 *   - the hamburger + mobile slide-out menu
 *   - the Google Fonts link it needs (Cinzel + Nunito)
 *   - all associated CSS and JS behavior
 *
 * Edit NAV_LINKS below to add/remove/rename links in ONE place
 * and every page picks up the change automatically.
 */
(function () {
  'use strict';

  // ------------------------------------------------------------------
  // 1. CONFIG — edit this to change links across the whole site
  // ------------------------------------------------------------------
  var SITE_NAME = 'PMD Campaign';
  var HOME_HREF = '/';
  var LOGO_SRC = '/css/images/logo.jpg';
  var DISCLAIMER_TEXT = '⚠️ This is a fan made site with no affiliation to the Pokémon Company ©';

  var NAV_LINKS = [
    { label: 'Home', href: '/' },
    {
      label: 'Character',
      children: [
        { label: 'Calculator', href: '/calc' },
        { label: 'Pokémon', href: '/pokemon' },
        { label: 'Character Sheet ↗', href: 'https://drive.google.com/file/d/1-PPZYwp9lDPKSIE1H84srav0aA2Z-R61/view?usp=drive_link', external: true }
      ]
    },
    {
      label: 'Game',
      children: [
        { label: 'Rules', href: '/rules' },
        { label: 'Jobs', href: '/jobs' },
        { label: 'Map', href: '/map' },
        { label: 'Shop', href: '/shop' },
        { label: 'Items', href: '/items' },
        { label: 'Lore', href: '/lore' }
      ]
    }
  ];

  // ------------------------------------------------------------------
  // 2. FONTS — injected once, guarded against duplicates
  // ------------------------------------------------------------------
  function injectFonts() {
    if (document.getElementById('pmd-nav-fonts')) return;
    var link = document.createElement('link');
    link.id = 'pmd-nav-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Nunito:wght@400;600;700;900&display=swap';
    document.head.appendChild(link);
  }

  // ------------------------------------------------------------------
  // 3. STYLES — only the nav-related CSS; safe to load on any page
  // ------------------------------------------------------------------
  var CSS = ''
    + ':root {'
    + '  --poke-red: #3B4CCA; --poke-red-dk: #2a379f;'
    + '  --poke-yellow: #FFCB05; --poke-white: #F8F8F8;'
    + '  --nav-h: 64px;'
    + '}'
    + '.disclaimer-banner{background:var(--poke-red);color:var(--poke-yellow);font-family:"Nunito",sans-serif;font-size:.72rem;font-weight:700;text-align:center;padding:8px 16px;letter-spacing:.04em;border-bottom:2px solid var(--poke-yellow);position:relative;z-index:200;}'
    + '.nav-brand{display:flex;align-items:center;gap:.6rem;text-decoration:none;flex-shrink:0;}'
    + '.nav-site-name{font-family:"Cinzel",serif;font-size:1rem;font-weight:700;color:var(--poke-yellow);letter-spacing:.1em;white-space:nowrap;}'
    + 'nav.pmd-nav{position:sticky;top:0;z-index:100;background:var(--poke-red);border-bottom:4px solid var(--poke-yellow);height:var(--nav-h);display:flex;align-items:center;padding:0 2rem;gap:1rem;box-shadow:0 4px 20px rgba(0,0,0,.5);}'
    + '.nav-logo{height:44px;width:auto;flex-shrink:0;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4));}'
    + '.nav-links{display:flex;align-items:center;gap:.15rem;list-style:none;margin-left:auto;}'
    + '.nav-links>li{position:relative;}'
    + '.nav-links>li>a,.nav-links>li>span{display:block;padding:.5rem 1rem;color:var(--poke-white);text-decoration:none;font-family:"Cinzel",serif;font-size:.78rem;font-weight:600;letter-spacing:.08em;border-radius:4px;transition:background .2s,color .2s;cursor:pointer;white-space:nowrap;}'
    + '.nav-links>li>a:hover,.nav-links>li>span:hover,.nav-links>li>a.active{background:var(--poke-yellow);color:var(--poke-red-dk);}'
    + '.dropdown-menu{display:none;position:absolute;top:100%;right:0;padding-top:6px;min-width:170px;z-index:999;}'
    + '.nav-links>li.open .dropdown-menu{display:block;}'
    + '.dropdown-menu-inner{background:var(--poke-red-dk);border:2px solid var(--poke-yellow);border-radius:6px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.5);}'
    + '.dropdown-menu a{display:block;padding:.6rem 1rem;color:var(--poke-white);text-decoration:none;font-family:"Nunito",sans-serif;font-size:.85rem;font-weight:700;border-bottom:1px solid rgba(255,203,5,.2);transition:background .15s,color .15s;}'
    + '.dropdown-menu a:last-child{border-bottom:none;}'
    + '.dropdown-menu a:hover,.dropdown-menu a.active{background:var(--poke-yellow);color:var(--poke-red-dk);}'
    + '.dropdown-arrow{margin-left:4px;font-size:.6rem;}'
    + '.hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;width:40px;height:40px;background:none;border:none;cursor:pointer;padding:4px;margin-left:auto;border-radius:6px;transition:background .2s;}'
    + '.hamburger:hover{background:rgba(255,203,5,.15);}'
    + '.hamburger span{display:block;height:3px;border-radius:2px;background:var(--poke-yellow);transition:transform .3s ease,opacity .3s ease;transform-origin:center;}'
    + '.hamburger.open span:nth-child(1){transform:translateY(8px) rotate(45deg);}'
    + '.hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0);}'
    + '.hamburger.open span:nth-child(3){transform:translateY(-8px) rotate(-45deg);}'
    + '.mobile-menu{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#1a1a2e;z-index:99;overflow-y:auto;padding-top:calc(var(--nav-h) + 38px);flex-direction:column;}'
    + '.mobile-menu.open{display:flex;}'
    + '.mobile-menu-inner{display:flex;flex-direction:column;padding:1rem 0 3rem;}'
    + '.mobile-menu a.mob-link,.mobile-menu button.mob-group-btn{display:block;width:100%;padding:1rem 1.5rem;color:var(--poke-white);text-decoration:none;font-family:"Cinzel",serif;font-size:.9rem;font-weight:700;letter-spacing:.08em;border:none;background:none;text-align:left;cursor:pointer;border-bottom:1px solid rgba(255,203,5,.1);transition:background .15s,color .15s;}'
    + '.mobile-menu a.mob-link:hover,.mobile-menu button.mob-group-btn:hover,.mobile-menu a.mob-link.active{background:rgba(255,203,5,.08);color:var(--poke-yellow);}'
    + '.mob-group-btn{display:flex!important;justify-content:space-between;align-items:center;}'
    + '.mob-arrow{font-size:.65rem;transition:transform .3s ease;}'
    + '.mob-group-btn.open .mob-arrow{transform:rotate(180deg);}'
    + '.mob-sub{max-height:0;overflow:hidden;transition:max-height .35s ease;background:rgba(0,0,0,.25);}'
    + '.mob-sub.open{max-height:400px;}'
    + '.mob-sub a{display:block;padding:.75rem 2.5rem;color:rgba(248,248,248,.8);text-decoration:none;font-family:"Nunito",sans-serif;font-size:.88rem;font-weight:700;border-bottom:1px solid rgba(255,203,5,.07);transition:background .15s,color .15s;}'
    + '.mob-sub a:hover,.mob-sub a.active{background:rgba(255,203,5,.1);color:var(--poke-yellow);}'
    + '@media (max-width:640px){.nav-links{display:none;}.hamburger{display:flex;}.nav-site-name{display:none;}nav.pmd-nav{padding:0 1rem;}}';

  function injectStyles() {
    if (document.getElementById('pmd-nav-styles')) return;
    var style = document.createElement('style');
    style.id = 'pmd-nav-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  // ------------------------------------------------------------------
  // 4. MARKUP BUILDERS
  // ------------------------------------------------------------------
  function esc(str) {
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function buildDesktopLinks() {
    return NAV_LINKS.map(function (item) {
      if (item.children) {
        var inner = item.children.map(function (c) {
          var extra = c.external ? ' target="_blank" rel="noopener"' : '';
          return '<a href="' + esc(c.href) + '"' + extra + ' data-nav-href="' + esc(c.href) + '">' + esc(c.label) + '</a>';
        }).join('');
        return '<li><span>' + esc(item.label) + ' <span class="dropdown-arrow">▼</span></span>'
          + '<div class="dropdown-menu"><div class="dropdown-menu-inner">' + inner + '</div></div></li>';
      }
      return '<li><a href="' + esc(item.href) + '" data-nav-href="' + esc(item.href) + '">' + esc(item.label) + '</a></li>';
    }).join('');
  }

  function buildMobileLinks() {
    var html = '<a href="' + esc(HOME_HREF) + '" class="mob-link" data-nav-href="' + esc(HOME_HREF) + '">Home</a>';
    NAV_LINKS.filter(function (i) { return i.href !== HOME_HREF; }).forEach(function (item, idx) {
      if (item.children) {
        var btnId = 'pmdMobGroup' + idx;
        var subId = 'pmdMobSub' + idx;
        var subLinks = item.children.map(function (c) {
          var extra = c.external ? ' target="_blank" rel="noopener"' : '';
          return '<a href="' + esc(c.href) + '"' + extra + ' data-nav-href="' + esc(c.href) + '">' + esc(c.label) + '</a>';
        }).join('');
        html += '<button class="mob-group-btn" id="' + btnId + '" data-target="' + subId + '">' + esc(item.label) + ' <span class="mob-arrow">▼</span></button>'
          + '<div class="mob-sub" id="' + subId + '">' + subLinks + '</div>';
      } else {
        html += '<a href="' + esc(item.href) + '" class="mob-link" data-nav-href="' + esc(item.href) + '">' + esc(item.label) + '</a>';
      }
    });
    return html;
  }

  function buildHTML() {
    return ''
      + '<div class="disclaimer-banner">' + DISCLAIMER_TEXT + '</div>'
      + '<nav class="pmd-nav">'
      + '  <a href="' + esc(HOME_HREF) + '" class="nav-brand">'
      + '    <img src="' + esc(LOGO_SRC) + '" alt="' + esc(SITE_NAME) + ' Logo" class="nav-logo" onerror="this.style.display=\'none\'" />'
      + '    <span class="nav-site-name">' + esc(SITE_NAME) + '</span>'
      + '  </a>'
      + '  <ul class="nav-links">' + buildDesktopLinks() + '</ul>'
      + '  <button class="hamburger" id="pmdHamburger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>'
      + '</nav>'
      + '<div class="mobile-menu" id="pmdMobileMenu" aria-hidden="true">'
      + '  <div class="mobile-menu-inner">' + buildMobileLinks() + '</div>'
      + '</div>';
  }

  // ------------------------------------------------------------------
  // 5. BEHAVIOR
  // ------------------------------------------------------------------
  function wireEvents(root) {
    // Desktop dropdowns
    root.querySelectorAll('.nav-links > li').forEach(function (li) {
      var trigger = li.querySelector('span');
      if (!trigger || !li.querySelector('.dropdown-menu')) return;
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = li.classList.contains('open');
        root.querySelectorAll('.nav-links > li').forEach(function (x) { x.classList.remove('open'); });
        if (!isOpen) li.classList.add('open');
      });
    });
    document.addEventListener('click', function () {
      root.querySelectorAll('.nav-links > li').forEach(function (x) { x.classList.remove('open'); });
    });

    // Hamburger + mobile menu
    var hamburger = document.getElementById('pmdHamburger');
    var mobileMenu = document.getElementById('pmdMobileMenu');
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open', !isOpen);
      hamburger.classList.toggle('open', !isOpen);
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.setAttribute('aria-hidden', String(isOpen));
    });
    document.addEventListener('click', function (e) {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Mobile submenu groups
    mobileMenu.querySelectorAll('.mob-group-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sub = document.getElementById(btn.getAttribute('data-target'));
        sub.classList.toggle('open', !sub.classList.contains('open'));
        btn.classList.toggle('open', !btn.classList.contains('open'));
      });
    });
  }

  // Highlight whichever link matches the current page path
  function highlightActive() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('[data-nav-href]').forEach(function (el) {
      var href = el.getAttribute('data-nav-href');
      if (!href || href.indexOf('http') === 0) return; // skip external links
      var normalized = href.replace(/\/$/, '') || '/';
      if (normalized === path) el.classList.add('active');
    });
  }

  // ------------------------------------------------------------------
  // 6. INIT
  // ------------------------------------------------------------------
  function init() {
    injectFonts();
    injectStyles();
    document.body.insertAdjacentHTML('afterbegin', buildHTML());
    wireEvents(document);
    highlightActive();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
