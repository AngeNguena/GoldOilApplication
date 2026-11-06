import React, { useEffect, useState, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import { User, ChevronDown, Menu, X } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700&family=DM+Sans:wght@400;500;600;700&display=swap');

  :root {
    --ox: #6B1A1A;
    --ox-dark: #4A0F0F;
    --ox-light: #8B2E2E;
    --ink: #0E0C0B;
    --muted: #8C847C;
  }

  .nav-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--ink);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .nav-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    gap: 12px;
  }
  @media(min-width:640px){ .nav-inner { padding: 0 24px; height: 68px; gap: 20px; } }

  /* Logo */
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
    min-width: 0;
  }
  .nav-logo-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    box-shadow: 0 4px 14px rgba(107,26,26,0.4);
    flex-shrink: 0;
  }
  @media(min-width:640px){ .nav-logo-icon { width: 40px; height: 40px; font-size: 18px; } }

  .nav-logo-text { min-width: 0; }
  .nav-logo-text h1 {
    font-family: 'Playfair Display', serif;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media(min-width:640px){ .nav-logo-text h1 { font-size: 16px; } }
  .nav-logo-text p {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ox-light);
    margin-top: 1px;
    display: none;
  }
  @media(min-width:640px){ .nav-logo-text p { display: block; font-size: 10px; } }

  /* Desktop Links - hidden below 1024px */
  .nav-links {
    display: none;
    align-items: center;
    gap: 2px;
    flex-wrap: wrap;
    flex: 1;
    justify-content: center;
  }
  @media(min-width:1024px){ .nav-links { display: flex; } }

  .nav-link {
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12.5px;
    font-weight: 500;
    text-decoration: none;
    color: rgba(255,255,255,0.55);
    transition: color .2s, background .2s;
    white-space: nowrap;
  }
  @media(min-width:1200px){ .nav-link { padding: 8px 16px; font-size: 13px; } }
  .nav-link:hover { color: #fff; background: rgba(255,255,255,0.06); }
  .nav-link.active {
    color: #fff;
    background: var(--ox);
    box-shadow: 0 2px 10px rgba(107,26,26,0.5);
  }

  /* Mobile menu toggle button */
  .nav-mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: #fff;
    cursor: pointer;
    flex-shrink: 0;
  }
  @media(min-width:1024px){ .nav-mobile-toggle { display: none; } }

  /* Mobile nav panel */
  .nav-mobile-panel {
    display: none;
    flex-direction: column;
    padding: 8px 16px 16px;
    border-top: 1px solid rgba(255,255,255,0.08);
    background: var(--ink);
  }
  .nav-mobile-panel.open { display: flex; }
  @media(min-width:1024px){ .nav-mobile-panel { display: none !important; } }

  .nav-mobile-link {
    padding: 12px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    color: rgba(255,255,255,0.7);
    transition: color .2s, background .2s;
  }
  .nav-mobile-link:hover { color: #fff; background: rgba(255,255,255,0.06); }
  .nav-mobile-link.active {
    color: #fff;
    background: var(--ox);
  }

  /* User */
  .nav-user {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
  .nav-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
  }
  @media(min-width:640px){ .nav-avatar { width: 36px; height: 36px; } }
  .nav-avatar svg:first-child { width: 16px; height: 16px; color: rgba(255,255,255,0.7); }
  .nav-avatar svg:last-child { width: 12px; height: 12px; color: rgba(255,255,255,0.5); }

  .account-menu { position: relative; }

  .account-button {
    border: none;
    cursor: pointer;
  }

  .account-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    min-width: 180px;
    max-width: calc(100vw - 32px);
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    padding: 6px 0;
    z-index: 1000;
    overflow: hidden;
  }

  .account-dropdown a {
    display: block;
    padding: 10px 14px;
    color: #333;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
  }

  .account-dropdown a:hover {
    background: #f5f5f5;
    color: var(--ox);
  }

  .account-user {
    padding: 10px 14px;
    border-bottom: 1px solid #eee;
    color: #666;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Navbar = () => {
  const { url } = usePage();
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const accountRef = useRef(null);

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
  }, []);

  // Close account dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [url]);

  const navItems = [
    { name: "Dashboard", href: "/inventory/dashboard/" },
    { name: "Products", href: "/inventory/products/" },
    { name: "Clients", href: "/inventory/clients/" },
    { name: "Categories", href: "/inventory/categories/" },
    { name: "Proformas", href: "/inventory/proformas/" },
    { name: "Delivery Notes", href: "/inventory/delivery-notes/" },
    { name: "Receipts", href: "/inventory/receipts/" },
    { name: "Reports", href: "/inventory/reports/" },
    { name: "Suppliers", href: "/inventory/suppliers/" },
  ];

  const isActive = (path) => {
    const normalizedUrl = url.replace(/\/$/, '');
    const normalizedPath = path.replace(/\/$/, '');
    return normalizedUrl === normalizedPath || normalizedUrl.startsWith(normalizedPath);
  };

  return (
    <nav className="nav-root">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="nav-inner">

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo Section */}
        <Link href="/inventory/dashboard/" className="nav-logo">
          <div className="nav-logo-icon">📦</div>
          <div className="nav-logo-text">
            <h1>Oil Management</h1>
            <p>Inventory System</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* User Menu */}
        <div className="nav-user">
          <div className="account-menu" ref={accountRef}>
            <button
              type="button"
              className="nav-avatar account-button"
              onClick={() => setAccountOpen(!accountOpen)}
            >
              <User strokeWidth={2} />
              <ChevronDown strokeWidth={2} />
            </button>

            {accountOpen && (
              <div className="account-dropdown">
                {isAuthenticated ? (
                  <>
                    <div className="account-user">
                      {user?.first_name || user?.username}
                    </div>

                    <Link href="/auth/admin-dashboard/" onClick={() => setAccountOpen(false)}>
                      Dashboard
                    </Link>

                    <Link href="/auth/profile/" onClick={() => setAccountOpen(false)}>
                      View Profile
                    </Link>

                    <Link href="/auth/logout/" onClick={() => setAccountOpen(false)}>
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login/" onClick={() => setAccountOpen(false)}>
                      Login
                    </Link>

                    <Link href="/auth/register/" onClick={() => setAccountOpen(false)}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Navigation Panel */}
      <div className={`nav-mobile-panel ${mobileOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-mobile-link ${isActive(item.href) ? 'active' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;