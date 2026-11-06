import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { User, ChevronDown } from 'lucide-react';

const layoutStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --ox:       #6B1A1A;
    --ox-dark:  #4A0F0F;
    --ox-light: #8B2E2E;
    --cream:    #FAF7F2;
    --ink:      #0E0C0B;
    --mid:      #3A3330;
    --muted:    #8C847C;
    --border:   #E5DDD5;
  }

  /* ── TOP BAR ── */
  .sl-topbar {
    background: var(--ox-dark);
    height: 36px;
    display: flex;
    align-items: center;
  }
  .sl-topbar-inner {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 32px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sl-topbar-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .sl-topbar-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.65);
    text-decoration: none;
    letter-spacing: 0.02em;
    font-family: 'DM Sans', sans-serif;
    transition: color .15s;
  }
  .sl-topbar-item:hover { color: rgba(255,255,255,0.9); }
  .sl-topbar-item svg { width: 12px; height: 12px; flex-shrink: 0; }
  .sl-topbar-right {
    font-size: 11px;
    color: rgba(255,255,255,0.45);
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.03em;
  }
  .sl-topbar-right strong { color: rgba(255,255,255,0.75); font-weight: 600; }
  @media(max-width:640px){
    .sl-topbar-right { display:none; }
    .sl-topbar-item:nth-child(2) { display:none; }
  }

  /* ── MAIN NAV ── */
  .sl-nav {
    position: fixed;
    top: 36px;
    left: 0;
    right: 0;
    z-index: 999;
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
    transition: box-shadow .2s, top .2s;
    font-family: 'DM Sans', sans-serif;
  }
  .sl-nav.scrolled {
    box-shadow: 0 2px 20px rgba(0,0,0,0.08);
    top: 0;
  }
  .sl-nav-inner {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 32px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }
  @media(max-width:640px){ .sl-nav-inner { padding: 0 20px; } }

  /* Logo */
  .sl-logo {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .sl-logo-mark {
    width: 36px;
    height: 36px;
    background: var(--ink);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sl-logo-mark span {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    font-weight: 700;
    font-style: italic;
    color: #fff;
    letter-spacing: -0.02em;
  }
  .sl-logo-text {}
  .sl-logo-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    line-height: 1.1;
  }
  .sl-logo-sub {
    font-size: 9px;
    font-weight: 600;
    color: var(--ox);
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  /* Desktop nav links */
  .sl-nav-links {
    display: flex;
    align-items: center;
    gap: 2px;
    list-style: none;
  }
  .sl-nav-link {
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--mid);
    text-decoration: none;
    border-radius: 5px;
    transition: color .15s, background .15s;
    white-space: nowrap;
  }
  .sl-nav-link:hover { color: var(--ox); background: rgba(107,26,26,0.05); }
  .sl-nav-link.active { color: var(--ox); }
  @media(max-width:900px){ .sl-nav-links { display:none; } }

  /* Cart & Hamburger */
  .sl-nav-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .sl-cart-btn {
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    text-decoration: none;
    transition: background .15s;
  }
  .sl-cart-btn:hover { background: rgba(107,26,26,0.06); }
  .sl-cart-btn svg { width: 20px; height: 20px; color: var(--ink); }
  .sl-cart-badge {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 17px;
    height: 17px;
    background: var(--ox);
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
  .sl-hamburger {
    display: none;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    border: none;
    background: none;
    cursor: pointer;
    transition: background .15s;
  }
  .sl-hamburger:hover { background: rgba(107,26,26,0.06); }
  .sl-hamburger svg { width: 20px; height: 20px; color: var(--ink); }
  @media(max-width:900px){ .sl-hamburger { display:flex; } }

  /* Mobile drawer */
  .sl-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 280px;
    background: #fff;
    z-index: 1100;
    box-shadow: -4px 0 40px rgba(0,0,0,0.12);
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform .28s cubic-bezier(.4,0,.2,1);
    font-family: 'DM Sans', sans-serif;
  }
  .sl-drawer.open { transform: translateX(0); }
  .sl-drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(14,12,11,0.4);
    z-index: 1099;
    opacity: 0;
    pointer-events: none;
    transition: opacity .28s;
  }
  .sl-drawer-overlay.open { opacity: 1; pointer-events: auto; }

  .sl-drawer-head {
    padding: 20px 24px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sl-drawer-close {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 6px;
    transition: background .15s;
  }
  .sl-drawer-close:hover { background: var(--cream); }
  .sl-drawer-close svg { width: 18px; height: 18px; color: var(--mid); }
  .sl-drawer-nav {
    padding: 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    overflow-y: auto;
  }
  .sl-drawer-link {
    padding: 11px 14px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--mid);
    text-decoration: none;
    border-radius: 7px;
    transition: color .15s, background .15s;
    display: block;
  }
  .sl-drawer-link:hover { color: var(--ox); background: rgba(107,26,26,0.05); }
  .sl-drawer-footer {
    padding: 20px 24px;
    border-top: 1px solid var(--border);
  }
  .sl-drawer-phone {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 600;
    color: var(--ink);
    text-decoration: none;
  }
  .sl-drawer-phone svg { width: 16px; height: 16px; color: var(--ox); }

  /* ── CONTENT OFFSET ── */
  .sl-offset {
    padding-top: calc(36px + 60px);
  }

  /* ── FOOTER ── */
  .sl-footer {
    background: var(--ink);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    margin-top: 80px;
  }
  .sl-footer-main {
    max-width: 1240px;
    margin: 0 auto;
    padding: 60px 32px 48px;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr;
    gap: 48px;
  }
  @media(max-width:900px){ .sl-footer-main { grid-template-columns:1fr 1fr; } }
  @media(max-width:600px){ .sl-footer-main { grid-template-columns:1fr; gap:32px; padding:40px 20px 32px; } }

  .sl-footer-brand {}
  .sl-footer-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }
  .sl-footer-logo-mark {
    width: 36px;
    height: 36px;
    background: var(--ox-dark);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .sl-footer-logo-mark span {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    font-weight: 700;
    font-style: italic;
    color: #fff;
  }
  .sl-footer-logo-name {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fff;
    line-height: 1.2;
  }
  .sl-footer-logo-sub {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ox-light);
  }
  .sl-footer-desc {
    font-size: 12px;
    font-weight: 300;
    color: rgba(255,255,255,0.35);
    line-height: 1.8;
    margin-bottom: 14px;
  }
  .sl-footer-addr {
    font-size: 12px;
    font-weight: 300;
    color: rgba(255,255,255,0.3);
    line-height: 1.8;
  }

  .sl-footer-col-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 16px;
  }
  .sl-footer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .sl-footer-links a {
    font-size: 13px;
    font-weight: 400;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color .15s;
  }
  .sl-footer-links a:hover { color: rgba(255,255,255,0.85); }
  .sl-footer-links a svg { width: 12px; height: 12px; opacity: 0.4; flex-shrink: 0; }

  .sl-footer-contact-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 14px;
  }
  .sl-footer-contact-icon {
    width: 28px;
    height: 28px;
    background: rgba(107,26,26,0.3);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .sl-footer-contact-icon svg { width: 13px; height: 13px; color: var(--ox-light); }
  .sl-footer-contact-text {
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.25);
    margin-bottom: 2px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .sl-footer-contact-val {
    font-size: 13px;
    color: rgba(255,255,255,0.55);
    font-weight: 400;
    text-decoration: none;
    line-height: 1.5;
    display: block;
    transition: color .15s;
  }
  .sl-footer-contact-val:hover { color: rgba(255,255,255,0.85); }

  .sl-footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 20px 32px;
    max-width: 1240px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  @media(max-width:600px){ .sl-footer-bottom { padding: 20px; } }
  .sl-footer-copy {
    font-size: 11px;
    color: rgba(255,255,255,0.2);
    font-weight: 300;
  }
  .sl-footer-copy strong { color: rgba(255,255,255,0.35); font-weight: 500; }
  .sl-payment-badges {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .sl-payment-lbl {
    font-size: 10px;
    color: rgba(255,255,255,0.2);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-right: 4px;
  }
  .sl-payment-badge {
    padding: 4px 10px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
  }
  .sl-payment-badge.mtn  { color: #FFD700; }
  .sl-payment-badge.org  { color: #FF6600; }


  .sl-account {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.sl-account-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: inherit;
}

.sl-account-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 170px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  padding: 6px 0;
  z-index: 1000;
}

.sl-account-dropdown a {
  display: block;
  padding: 10px 14px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
}

.sl-account-dropdown a:hover {
  background: #f5f5f5;
}
`;

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/products/', label: 'Products' },
  { href: '/reviews/', label: 'Reviews' },
  { href: '/contact/', label: 'Contact' },
  { href: '/faq/', label: 'FAQ' },
];

const FOOTER_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About Us' },
  { href: '/products/', label: 'Products' },
  { href: '/delivery/', label: 'Delivery & Returns' },
  { href: '/reviews/', label: 'Reviews' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/contact/', label: 'Contact' },
];

export default function ShopLayout({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/auth/user/")
  .then((response) => response.json())
  .then((data) => {
    setIsAuthenticated(data.authenticated);
    setUser(data.user);
  })
  .catch(() => {
    setIsAuthenticated(false);
    setUser(null);
  });
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((s, i) => s + i.quantity, 0));
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: layoutStyles }} />

      {/* ── TOP BAR ── */}
      <div className="sl-topbar" style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000 }}>
        <div className="sl-topbar-inner">
          <div className="sl-topbar-left">
            <a href="tel:+237671516335" className="sl-topbar-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +237 671 516 335
            </a>
            <a href="mailto:goldoiltradingltd@gmail.com" className="sl-topbar-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              goldoiltradingltd@gmail.com
            </a>
          </div>
          <div className="sl-topbar-right">
            🚚 Free delivery in <strong>Douala</strong>
          </div>
        </div>
      </div>

      {/* ── STICKY NAV ── */}
      <nav className={`sl-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="sl-nav-inner">
          <Link href="/" className="sl-logo">
            <div className="sl-logo-mark"><span>GO</span></div>
            <div className="sl-logo-text">
              <div className="sl-logo-name">Gold Oil</div>
              <div className="sl-logo-sub">Trading Ltd</div>
            </div>
          </Link>

          <ul className="sl-nav-links">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="sl-nav-link">{l.label}</Link>
              </li>
            ))}
          </ul>

          <div className="sl-nav-actions">
            <div className="sl-account">
              <button
                className="sl-account-btn"
                onClick={() => setAccountOpen(!accountOpen)}
              >
                <User size={19} strokeWidth={1.8} />
                <ChevronDown size={13} strokeWidth={1.8} />
              </button>

              {accountOpen && (
                <div className="sl-account-dropdown">
                  {!isAuthenticated ? (
                    <>
                      <Link href="/auth/login/" onClick={() => setAccountOpen(false)}>
                        Login
                      </Link>

                      <Link href="/auth/register/" onClick={() => setAccountOpen(false)}>
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      
                      <Link href="/my-orders/"onClick={() => setAccountOpen(false)}>
                        My Orders
                      </Link>
                      <Link href="/auth/profile/" onClick={() => setAccountOpen(false)}>
                        View Profile
                      </Link>

                      <Link href="/auth/logout/" onClick={() => setAccountOpen(false)}>
                        Logout
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <Link href="/cart/" className="sl-cart-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              {cartCount > 0 && <span className="sl-cart-badge">{cartCount}</span>}
            </Link>
            <button className="sl-hamburger" onClick={() => setDrawerOpen(true)}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`sl-drawer-overlay ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} />
      <div className={`sl-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="sl-drawer-head">
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div className="sl-logo-mark"><span>GO</span></div>
            <div>
              <div className="sl-logo-name" style={{ fontFamily:'DM Sans,sans-serif', fontSize:13, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'#0E0C0B' }}>Gold Oil</div>
              <div className="sl-logo-sub" style={{ fontFamily:'DM Sans,sans-serif', fontSize:9, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'#6B1A1A' }}>Trading Ltd</div>
            </div>
          </div>
          <button className="sl-drawer-close" onClick={() => setDrawerOpen(false)}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <nav className="sl-drawer-nav">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className="sl-drawer-link" onClick={() => setDrawerOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="sl-drawer-footer">
          <a href="tel:+237671516335" className="sl-drawer-phone">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            +237 671 516 335
          </a>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="sl-offset">
        <main>{children}</main>

        {/* ── FOOTER ── */}
        <footer className="sl-footer">
          <div className="sl-footer-main">

            {/* Brand */}
            <div className="sl-footer-brand">
              <div className="sl-footer-logo">
                <div className="sl-footer-logo-mark"><span>GO</span></div>
                <div>
                  <div className="sl-footer-logo-name">Gold Oil Trading Ltd</div>
                  <div className="sl-footer-logo-sub">Import · Export</div>
                </div>
              </div>
              <p className="sl-footer-desc">
                Your trusted partner for quality automotive oils, lubricants, and spare parts. Serving professionals and individuals across Cameroon.
              </p>
              <p className="sl-footer-addr">
                Bonamoussadi, Rond-point Maetur<br />
                Derrière la station OLA<br />
                Douala, Cameroun
              </p>
            </div>

            {/* Links */}
            <div>
              <div className="sl-footer-col-title">Navigation</div>
              <ul className="sl-footer-links">
                {FOOTER_LINKS.map(l => (
                  <li key={l.href}>
                    <Link href={l.href}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                      </svg>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="sl-footer-col-title">Contact</div>
              <div className="sl-footer-contact-item">
                <div className="sl-footer-contact-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <div className="sl-footer-contact-text">Phone</div>
                  <a href="tel:+237671516335" className="sl-footer-contact-val">+237 671 516 335</a>
                  <a href="tel:+237693805193" className="sl-footer-contact-val">+237 693 805 193</a>
                </div>
              </div>
              <div className="sl-footer-contact-item">
                <div className="sl-footer-contact-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <div className="sl-footer-contact-text">Email</div>
                  <a href="mailto:goldoiltradingltd@gmail.com" className="sl-footer-contact-val">
                    goldoiltradingltd@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="sl-footer-bottom">
            <div className="sl-footer-copy">
              &copy; {new Date().getFullYear()} <strong>Gold Oil Trading Ltd</strong>. All rights reserved. &nbsp;·&nbsp; RCCM: CM-DLA-02-2024-B12-00243
            </div>
            <div className="sl-payment-badges">
              <span className="sl-payment-lbl">Pay via</span>
              <span className="sl-payment-badge mtn">MTN MOMO</span>
              <span className="sl-payment-badge org">ORANGE MONEY</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}