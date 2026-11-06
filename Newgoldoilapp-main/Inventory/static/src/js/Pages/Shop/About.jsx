import React from 'react';
import ShopLayout from './Components/ShopLayout';
import { Link } from '@inertiajs/react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root {
    --ox:#6B1A1A; --ox-dark:#4A0F0F; --ox-light:#8B2E2E;
    --cream:#FAF7F2; --ink:#0E0C0B; --mid:#3A3330; --muted:#8C847C; --border:#E5DDD5;
  }
  .ab-root { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--ink); }

  /* HERO */
  .ab-hero {
    background:var(--ink); padding:72px 0 60px; position:relative; overflow:hidden;
  }
  .ab-hero::before {
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse 55% 70% at 80% 60%, rgba(107,26,26,0.28) 0%, transparent 70%);
  }
  .ab-hero-watermark {
    position:absolute; right:-10px; bottom:-20px;
    font-family:'Playfair Display',serif; font-size:220px; font-weight:700; font-style:italic;
    color:rgba(255,255,255,0.03); line-height:1; pointer-events:none; user-select:none;
  }
  .ab-hero-inner {
    max-width:1240px; margin:0 auto; padding:0 32px;
    position:relative; z-index:2;
  }
  @media(max-width:640px){ .ab-hero-inner { padding:0 20px; } }
  .ab-hero-label {
    font-size:11px; font-weight:600; letter-spacing:.2em; text-transform:uppercase;
    color:var(--ox-light); margin-bottom:14px;
    display:flex; align-items:center; gap:10px;
  }
  .ab-hero-label::after { content:''; width:28px; height:1px; background:var(--ox-light); opacity:.6; }
  .ab-hero-title {
    font-family:'Playfair Display',serif;
    font-size:clamp(2.2rem,5vw,4rem); font-weight:700; color:#fff; line-height:1.1;
    margin-bottom:16px;
  }
  .ab-hero-title em { font-style:italic; color:var(--ox-light); }
  .ab-hero-sub {
    font-size:15px; font-weight:300; color:rgba(255,255,255,.45); max-width:480px; line-height:1.7;
  }

  /* CONTAINER */
  .ab-container { max-width:1240px; margin:0 auto; padding:0 32px; }
  @media(max-width:640px){ .ab-container { padding:0 20px; } }
  .ab-section { padding:72px 0; }
  .ab-section--white { background:#fff; }
  .ab-section--cream { background:var(--cream); }

  .ab-label {
    font-size:11px; font-weight:600; letter-spacing:.2em; text-transform:uppercase;
    color:var(--ox); margin-bottom:10px;
    display:flex; align-items:center; gap:10px;
  }
  .ab-label::after { content:''; width:28px; height:1px; background:var(--ox); opacity:.5; }
  .ab-title {
    font-family:'Playfair Display',serif;
    font-size:clamp(1.7rem,3.5vw,2.4rem); font-weight:700; color:var(--ink); line-height:1.15;
  }
  .ab-body {
    font-size:14px; font-weight:300; color:var(--muted); line-height:1.85; margin-top:16px;
  }
  .ab-body + .ab-body { margin-top:12px; }

  /* STORY GRID */
  .ab-story-grid {
    display:grid; grid-template-columns:1fr 400px; gap:60px; align-items:center;
  }
  @media(max-width:900px){ .ab-story-grid { grid-template-columns:1fr; } }

  .ab-stats-card {
    background:#fff; border:1px solid var(--border); border-radius:12px; overflow:hidden;
  }
  .ab-stats-grid { display:grid; grid-template-columns:1fr 1fr; }
  .ab-stat {
    padding:32px 24px; text-align:center; border-right:1px solid var(--border);
    border-bottom:1px solid var(--border);
  }
  .ab-stat:nth-child(2n) { border-right:none; }
  .ab-stat:nth-child(3), .ab-stat:nth-child(4) { border-bottom:none; }
  .ab-stat-val {
    font-family:'Playfair Display',serif; font-size:2.2rem; font-weight:700;
    color:var(--ox); line-height:1; margin-bottom:6px;
  }
  .ab-stat-lbl {
    font-size:11px; font-weight:600; letter-spacing:.1em; text-transform:uppercase;
    color:var(--muted);
  }

  /* VALUES */
  .ab-values-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; margin-top:48px; background:var(--border); border:1px solid var(--border); border-radius:12px; overflow:hidden; }
  @media(max-width:768px){ .ab-values-grid { grid-template-columns:1fr; } }
  .ab-value-item { background:#fff; padding:36px 32px; transition:background .2s; }
  .ab-value-item:hover { background:var(--cream); }
  .ab-value-num {
    font-family:'Playfair Display',serif; font-size:40px; font-weight:700;
    color:var(--border); line-height:1; margin-bottom:16px;
  }
  .ab-value-icon {
    width:40px; height:40px; border-radius:7px; background:rgba(107,26,26,.08);
    display:flex; align-items:center; justify-content:center; margin-bottom:14px;
  }
  .ab-value-icon svg { width:20px; height:20px; color:var(--ox); }
  .ab-value-title { font-size:15px; font-weight:600; color:var(--ink); margin-bottom:8px; }
  .ab-value-desc { font-size:13px; font-weight:300; color:var(--muted); line-height:1.75; }

  /* TEAM */
  .ab-team-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:48px; }
  @media(max-width:768px){ .ab-team-grid { grid-template-columns:1fr; } }
  .ab-team-card {
    background:#fff; border:1px solid var(--border); border-radius:10px; padding:32px 24px; text-align:center;
    transition:border-color .2s, box-shadow .2s;
  }
  .ab-team-card:hover { border-color:var(--ox); box-shadow:0 4px 20px rgba(107,26,26,.08); }
  .ab-team-emoji { font-size:36px; margin-bottom:16px; }
  .ab-team-name { font-size:15px; font-weight:600; color:var(--ink); margin-bottom:4px; }
  .ab-team-role { font-size:12px; color:var(--muted); font-weight:400; letter-spacing:.03em; }

  /* COMPANY INFO */
  .ab-info-card {
    background:#fff; border:1px solid var(--border); border-radius:12px; overflow:hidden;
  }
  .ab-info-head {
    padding:16px 24px; background:var(--cream); border-bottom:1px solid var(--border);
    font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--muted);
  }
  .ab-info-grid { display:grid; grid-template-columns:1fr 1fr; }
  @media(max-width:768px){ .ab-info-grid { grid-template-columns:1fr; } }
  .ab-info-col { padding:28px 28px; border-right:1px solid var(--border); }
  .ab-info-col:last-child { border-right:none; }
  @media(max-width:768px){ .ab-info-col { border-right:none; border-bottom:1px solid var(--border); } }
  @media(max-width:768px){ .ab-info-col:last-child { border-bottom:none; } }
  .ab-info-col-title { font-size:13px; font-weight:600; color:var(--ink); margin-bottom:20px; }
  .ab-dl { display:flex; flex-direction:column; gap:14px; }
  .ab-dt { font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:3px; }
  .ab-dd { font-size:13px; font-weight:600; color:var(--ink); }
  .ab-dd.mono { font-family:monospace; font-size:12px; letter-spacing:.04em; }

  /* CTA */
  .ab-cta { background:var(--ox-dark); padding:72px 0; position:relative; overflow:hidden; }
  .ab-cta::before {
    content:'GOLD OIL'; position:absolute; right:-20px; top:50%; transform:translateY(-50%);
    font-family:'Playfair Display',serif; font-size:160px; font-weight:700;
    color:rgba(255,255,255,.03); line-height:1; pointer-events:none; user-select:none;
  }
  .ab-cta-inner { position:relative; z-index:2; max-width:600px; }
  .ab-cta-title {
    font-family:'Playfair Display',serif;
    font-size:clamp(1.7rem,3vw,2.4rem); font-weight:700; color:#fff; line-height:1.2; margin-bottom:12px;
  }
  .ab-cta-sub { font-size:14px; font-weight:300; color:rgba(255,255,255,.4); margin-bottom:36px; line-height:1.7; }
  .ab-cta-btns { display:flex; gap:14px; flex-wrap:wrap; }
  .btn-white {
    display:inline-flex; align-items:center; gap:8px;
    padding:13px 26px; background:#fff; color:var(--ox-dark);
    font-size:13px; font-weight:600; border-radius:6px; text-decoration:none;
    transition:opacity .2s;
  }
  .btn-white:hover { opacity:.9; }
  .btn-outline-w {
    display:inline-flex; align-items:center; gap:8px;
    padding:13px 26px; border:1px solid rgba(255,255,255,.2); color:rgba(255,255,255,.7);
    font-size:13px; font-weight:500; border-radius:6px; text-decoration:none;
    transition:border-color .2s, color .2s;
  }
  .btn-outline-w:hover { border-color:rgba(255,255,255,.6); color:#fff; }
`;

export default function About() {
  return (
    <ShopLayout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="ab-root">

        {/* HERO */}
        <div className="ab-hero">
          <div className="ab-hero-watermark">GOLD</div>
          <div className="ab-hero-inner">
            <div className="ab-hero-label">Our Company</div>
            <h1 className="ab-hero-title">
              The story behind<br /><em>Gold Oil Trading</em>
            </h1>
            <p className="ab-hero-sub">
              Your trusted partner in premium automotive oils, lubricants, and spare parts since 2024.
            </p>
          </div>
        </div>

        {/* OUR STORY */}
        <section className="ab-section ab-section--cream">
          <div className="ab-container">
            <div className="ab-story-grid">
              <div>
                <div className="ab-label">Our Story</div>
                <h2 className="ab-title">Excellence in Automotive Solutions</h2>
                <p className="ab-body">
                  GOLD OIL TRADING LTD is a leading provider of premium automotive oils and lubricants in Cameroon. Since our establishment in 2024, we have been committed to delivering quality products that meet international standards.
                </p>
                <p className="ab-body">
                  Our expertise in both import and export allows us to source the finest products from around the world while serving customers locally through retail and wholesale operations.
                </p>
                <p className="ab-body">
                  Located in the heart of Douala at Bonamoussadi, we pride ourselves on personalized service, competitive pricing, and genuine products that keep your vehicles running smoothly.
                </p>
              </div>
              <div className="ab-stats-card">
                <div className="ab-stats-grid">
                  {[
                    { val:'500+', lbl:'Products' },
                    { val:'1K+',  lbl:'Customers' },
                    { val:'100%', lbl:'Authentic' },
                    { val:'24/7', lbl:'Support' },
                  ].map((s,i) => (
                    <div className="ab-stat" key={i}>
                      <div className="ab-stat-val">{s.val}</div>
                      <div className="ab-stat-lbl">{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="ab-section ab-section--white">
          <div className="ab-container">
            <div className="ab-label">Our Values</div>
            <h2 className="ab-title">What We Stand For</h2>
            <div className="ab-values-grid">
              {[
                {
                  n:'01', title:'Quality First',
                  desc:'We never compromise on quality. Every product meets international standards and is 100% authentic.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                },
                {
                  n:'02', title:'Customer Focus',
                  desc:'Your satisfaction is our priority. We go above and beyond to ensure every customer gets the best experience.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                },
                {
                  n:'03', title:'Fast Delivery',
                  desc:'We understand time is valuable. Quick delivery across Cameroon — same day in Douala.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                },
              ].map((v,i) => (
                <div className="ab-value-item" key={i}>
                  <div className="ab-value-num">{v.n}</div>
                  <div className="ab-value-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">{v.icon}</svg>
                  </div>
                  <div className="ab-value-title">{v.title}</div>
                  <div className="ab-value-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="ab-section ab-section--cream">
          <div className="ab-container">
            <div className="ab-label">Our Team</div>
            <h2 className="ab-title">Meet Our Experts</h2>
            <div className="ab-team-grid">
              {[
                { name:'Management Team', role:'Leadership & Strategy', icon:'👔' },
                { name:'Sales Team',      role:'Customer Service',      icon:'🤝' },
                { name:'Technical Team',  role:'Product Expertise',     icon:'🔧' },
              ].map((m,i) => (
                <div className="ab-team-card" key={i}>
                  <div className="ab-team-emoji">{m.icon}</div>
                  <div className="ab-team-name">{m.name}</div>
                  <div className="ab-team-role">{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPANY INFO */}
        <section className="ab-section ab-section--white">
          <div className="ab-container">
            <div className="ab-label">Legal & Banking</div>
            <h2 className="ab-title">Company Information</h2>
            <div style={{ marginTop:36 }} className="ab-info-card">
              <div className="ab-info-head">Official Records</div>
              <div className="ab-info-grid">
                <div className="ab-info-col">
                  <div className="ab-info-col-title">Company Details</div>
                  <div className="ab-dl">
                    {[
                      ['Company Name',        'GOLD OIL TRADING LIMITED COMPANY'],
                      ['Registration (RCCM)', 'CM-DLA-02-2024-B12-00243'],
                      ['Tax ID (NUI)',         'M042416661695E'],
                      ['Business Type',       'Import & Export — Retail & Wholesale'],
                    ].map(([dt,dd],i) => (
                      <div key={i}>
                        <div className="ab-dt">{dt}</div>
                        <div className="ab-dd">{dd}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ab-info-col">
                  <div className="ab-info-col-title">Bank Details</div>
                  <div className="ab-dl">
                    {[
                      ['Bank Name',       'AFRICA GOLDEN BANK', false],
                      ['Account Number', '10043 00101 37100049401 38', true],
                      ['Account Name',   'GOLD OIL TRADING LTD', false],
                    ].map(([dt,dd,mono],i) => (
                      <div key={i}>
                        <div className="ab-dt">{dt}</div>
                        <div className={`ab-dd${mono?' mono':''}`}>{dd}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="ab-cta">
          <div className="ab-container">
            <div className="ab-cta-inner">
              <h2 className="ab-cta-title">Ready to Experience Excellence?</h2>
              <p className="ab-cta-sub">
                Join thousands of satisfied customers who trust Gold Oil for their automotive needs across Cameroon.
              </p>
              <div className="ab-cta-btns">
                <Link href="/products/" className="btn-white">
                  Shop Now
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link href="/contact/" className="btn-outline-w">Contact Us</Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </ShopLayout>
  );
}