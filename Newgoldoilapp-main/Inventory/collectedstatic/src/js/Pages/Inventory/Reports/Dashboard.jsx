import React from 'react';
import Layout from '../components/Layout';
import { Link } from '@inertiajs/react';

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

  .rp-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }
  .rp-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media(max-width:640px){ .rp-container { padding: 0 20px; } }

  .rp-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ox);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .rp-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .rp-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
  }
  .rp-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 8px;
    font-weight: 300;
    margin-bottom: 40px;
    max-width: 520px;
  }

  /* Report cards */
  .rp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 40px;
  }
  @media(max-width:900px){ .rp-grid { grid-template-columns: 1fr; } }

  .rp-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 32px;
    text-decoration: none;
    color: inherit;
    display: block;
    position: relative;
    overflow: hidden;
    transition: transform .25s, box-shadow .25s, border-color .25s;
  }
  .rp-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px rgba(107,26,26,0.1);
    border-color: var(--ox-light);
  }
  .rp-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px;
    height: 100%;
    background: var(--ox);
  }

  .rp-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  }
  .rp-card-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-bottom: 18px;
    transition: background .25s;
  }
  .rp-card:hover .rp-card-icon { background: var(--ox); }
  .rp-card-icon svg { width: 26px; height: 26px; color: var(--ox); transition: color .25s; }
  .rp-card:hover .rp-card-icon svg { color: #fff; }

  .rp-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 12px;
  }
  .rp-card-desc {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.7;
    font-weight: 300;
    margin-bottom: 20px;
  }

  .rp-card-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .rp-card-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: var(--mid);
    font-weight: 400;
  }
  .rp-check {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(107,26,26,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .rp-check svg { width: 10px; height: 10px; color: var(--ox); }

  .rp-arrow {
    width: 24px;
    height: 24px;
    color: var(--border);
    flex-shrink: 0;
    transition: color .25s, transform .25s;
  }
  .rp-card:hover .rp-arrow { color: var(--ox); transform: translateX(4px); }

  /* Feature band */
  .rp-features {
    background: var(--ink);
    border-radius: 16px;
    padding: 36px;
    position: relative;
    overflow: hidden;
  }
  .rp-features::before {
    content: 'GOLD';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Playfair Display', serif;
    font-size: 140px;
    font-weight: 700;
    color: rgba(255,255,255,0.03);
    line-height: 1;
    user-select: none;
    pointer-events: none;
  }
  .rp-features-title {
    position: relative;
    z-index: 2;
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 24px;
  }
  .rp-features-grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  @media(max-width:768px){ .rp-features-grid { grid-template-columns: 1fr; } }

  .rp-feature-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }
  .rp-feature-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .rp-feature-icon svg { width: 18px; height: 18px; color: var(--ox-light); }
  .rp-feature-item h4 {
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 4px;
  }
  .rp-feature-item p {
    font-size: 12px;
    color: rgba(255,255,255,0.45);
    font-weight: 300;
    line-height: 1.5;
  }
`;

export default function ReportsDashboard() {
  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="rp-root">
        <div className="rp-container">

          {/* Header */}
          <div className="rp-label">Analytics</div>
          <h1 className="rp-title">Reports & Analytics</h1>
          <p className="rp-sub">
            Generate detailed reports for inventory, sales, and financial analysis
          </p>

          {/* Report Cards */}
          <div className="rp-grid">

            <Link href="/inventory/reports/monthly/" className="rp-card">
              <div className="rp-card-top">
                <div style={{ flex: 1 }}>
                  <div className="rp-card-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="rp-card-title">Monthly Reports</h2>
                  <p className="rp-card-desc">
                    View detailed monthly performance including sales, stock movements, top products, and client analytics.
                  </p>
                  <ul className="rp-card-list">
                    {[
                      'Sales summary by month',
                      'Top performing products',
                      'Top clients analysis',
                      'Stock level alerts',
                      'PDF export available',
                    ].map((item, i) => (
                      <li key={i}>
                        <span className="rp-check">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <svg className="rp-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link href="/inventory/reports/yearly/" className="rp-card">
              <div className="rp-card-top">
                <div style={{ flex: 1 }}>
                  <div className="rp-card-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="rp-card-title">Yearly Reports</h2>
                  <p className="rp-card-desc">
                    Comprehensive annual overview with month-by-month breakdown, trends, and year-over-year comparisons.
                  </p>
                  <ul className="rp-card-list">
                    {[
                      'Annual sales performance',
                      'Monthly breakdown charts',
                      'Top products of the year',
                      'Best clients ranking',
                      'PDF export available',
                    ].map((item, i) => (
                      <li key={i}>
                        <span className="rp-check">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <svg className="rp-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Report Features */}
          <div className="rp-features">
            <h3 className="rp-features-title">Report Features</h3>
            <div className="rp-features-grid">

              <div className="rp-feature-item">
                <div className="rp-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4>PDF Export</h4>
                  <p>Download professional reports in PDF format</p>
                </div>
              </div>

              <div className="rp-feature-item">
                <div className="rp-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <div>
                  <h4>Custom Filters</h4>
                  <p>Filter by month, year, and date ranges</p>
                </div>
              </div>

              <div className="rp-feature-item">
                <div className="rp-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h4>Visual Analytics</h4>
                  <p>Charts and graphs for easy analysis</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}