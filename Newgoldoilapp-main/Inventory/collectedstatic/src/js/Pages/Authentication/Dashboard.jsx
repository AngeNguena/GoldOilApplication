import React from "react";
import { Head, Link } from "@inertiajs/react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  :root {
    --ox: #6B1A1A;
    --ox-dark: #4A0F0F;
    --ox-light: #8B2E2E;
    --cream: #FAF7F2;
    --ink: #0E0C0B;
    --mid: #3A3330;
    --muted: #8C847C;
    --border: #E5DDD5;
  }

  .cd-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
  }

  /* Header */
  .cd-header {
    background: var(--ink);
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .cd-header-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }
  @media(max-width:640px){ .cd-header-inner { padding: 16px 20px; } }
  .cd-header-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }
  .cd-header-links { display: flex; align-items: center; gap: 24px; }
  .cd-profile-link {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    transition: color .2s;
  }
  .cd-profile-link:hover { color: #fff; }
  .cd-logout-btn {
    font-size: 13px;
    font-weight: 700;
    color: var(--ox-light);
    background: none;
    border: none;
    cursor: pointer;
    transition: color .2s;
  }
  .cd-logout-btn:hover { color: #fff; }

  /* Main */
  .cd-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 32px;
  }
  @media(max-width:640px){ .cd-main { padding: 32px 20px; } }

  /* Welcome card */
  .cd-welcome {
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    border-radius: 16px;
    padding: 40px;
    margin-bottom: 32px;
    position: relative;
    overflow: hidden;
  }
  .cd-welcome::before {
    content: 'GOLD';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Playfair Display', serif;
    font-size: 130px;
    font-weight: 700;
    color: rgba(255,255,255,0.06);
    line-height: 1;
    pointer-events: none;
  }
  .cd-welcome-label {
    position: relative;
    z-index: 2;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    margin-bottom: 12px;
  }
  .cd-welcome h2 {
    position: relative;
    z-index: 2;
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 2.4rem);
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
  }
  .cd-welcome p {
    position: relative;
    z-index: 2;
    font-size: 14px;
    color: rgba(255,255,255,0.7);
    font-weight: 300;
  }

  /* Cards grid */
  .cd-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  @media(max-width:768px){ .cd-grid { grid-template-columns: 1fr; } }

  .cd-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 28px;
    text-decoration: none;
    color: inherit;
    display: block;
    position: relative;
    overflow: hidden;
    transition: transform .25s, box-shadow .25s, border-color .25s;
  }
  .cd-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px rgba(107,26,26,0.1);
    border-color: var(--ox-light);
  }
  .cd-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px;
    height: 100%;
    background: var(--ox);
  }

  .cd-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    transition: background .25s;
  }
  .cd-card:hover .cd-card-icon { background: var(--ox); }
  .cd-card-icon svg { width: 22px; height: 22px; color: var(--ox); transition: color .25s; }
  .cd-card:hover .cd-card-icon svg { color: #fff; }

  .cd-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
  }
  .cd-card p {
    font-size: 13px;
    color: var(--muted);
    font-weight: 300;
    line-height: 1.6;
  }

  .cd-card-arrow {
    position: absolute;
    top: 28px;
    right: 24px;
    width: 18px;
    height: 18px;
    color: var(--border);
    transition: color .25s, transform .25s;
  }
  .cd-card:hover .cd-card-arrow { color: var(--ox); transform: translateX(3px); }
`;

export default function Dashboard({ user }) {
    return (
        <>
            <Head title="My Dashboard" />
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <div className="cd-root">

                {/* Header */}
                <header className="cd-header">
                    <div className="cd-header-inner">
                        <h1 className="cd-header-title">My Account</h1>

                        <div className="cd-header-links">
                            <Link href="/auth/profile/" className="cd-profile-link">
                                Profile
                            </Link>

                            <Link href="/auth/logout/" method="post" as="button" className="cd-logout-btn">
                                Logout
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="cd-main">

                    {/* Welcome Card */}
                    <div className="cd-welcome">
                        <div className="cd-welcome-label">My Account</div>
                        <h2>Welcome, {user?.first_name || user?.username || "Customer"}!</h2>
                        <p>Welcome to your account.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="cd-grid">

                        <Link href="/products/" className="cd-card">
                            <div className="cd-card-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3>Shop</h3>
                            <p>Browse our products.</p>
                            <svg className="cd-card-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>

                        <Link href="/auth/profile/" className="cd-card">
                            <div className="cd-card-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3>My Profile</h3>
                            <p>View your account information.</p>
                            <svg className="cd-card-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>

                        <Link href="/auth/profile/edit/" className="cd-card">
                            <div className="cd-card-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3>Edit Profile</h3>
                            <p>Update your account information.</p>
                            <svg className="cd-card-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>

                    </div>
                </main>
            </div>
        </>
    );
}