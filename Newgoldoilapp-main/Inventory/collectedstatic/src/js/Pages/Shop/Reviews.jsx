import React, { useState } from 'react';
import ShopLayout from './Components/ShopLayout';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root {
    --ox:#6B1A1A; --ox-dark:#4A0F0F; --ox-light:#8B2E2E;
    --cream:#FAF7F2; --ink:#0E0C0B; --mid:#3A3330; --muted:#8C847C; --border:#E5DDD5;
    --gold:#C8922A;
  }
  .rv-root { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--ink); }

  /* HERO */
  .rv-hero { background:var(--ink); padding:64px 0 52px; position:relative; overflow:hidden; }
  .rv-hero::before {
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse 50% 80% at 90% 50%, rgba(107,26,26,.25) 0%, transparent 70%);
  }
  .rv-hero-wm {
    position:absolute; right:-10px; bottom:-20px;
    font-family:'Playfair Display',serif; font-size:200px; font-weight:700;
    color:rgba(255,255,255,.03); line-height:1; pointer-events:none; user-select:none;
  }
  .rv-hero-inner { max-width:1240px; margin:0 auto; padding:0 32px; position:relative; z-index:2; }
  @media(max-width:640px){ .rv-hero-inner { padding:0 20px; } }
  .rv-hero-label {
    font-size:11px; font-weight:600; letter-spacing:.2em; text-transform:uppercase;
    color:var(--ox-light); margin-bottom:12px; display:flex; align-items:center; gap:10px;
  }
  .rv-hero-label::after { content:''; width:28px; height:1px; background:var(--ox-light); opacity:.6; }
  .rv-hero-title {
    font-family:'Playfair Display',serif;
    font-size:clamp(2rem,4.5vw,3.2rem); font-weight:700; color:#fff; line-height:1.1; margin-bottom:10px;
  }
  .rv-hero-sub { font-size:14px; font-weight:300; color:rgba(255,255,255,.4); line-height:1.7; }

  /* CONTAINER */
  .rv-container { max-width:1000px; margin:0 auto; padding:52px 32px 72px; }
  @media(max-width:640px){ .rv-container { padding:36px 20px 60px; } }

  /* RATING SUMMARY */
  .rv-summary {
    background:#fff; border:1px solid var(--border); border-radius:12px; overflow:hidden; margin-bottom:36px;
  }
  .rv-summary-head {
    padding:14px 24px; background:var(--cream); border-bottom:1px solid var(--border);
    font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--muted);
  }
  .rv-summary-body {
    padding:28px 28px; display:grid; grid-template-columns:180px 1fr; gap:40px; align-items:center;
  }
  @media(max-width:640px){ .rv-summary-body { grid-template-columns:1fr; gap:24px; } }
  .rv-avg { text-align:center; }
  .rv-avg-num {
    font-family:'Playfair Display',serif; font-size:4rem; font-weight:700; color:var(--ink); line-height:1;
  }
  .rv-stars { display:flex; gap:3px; justify-content:center; margin:8px 0; }
  .rv-stars svg { width:18px; height:18px; fill:var(--gold); }
  .rv-stars svg.empty { fill:var(--border); }
  .rv-avg-sub { font-size:11px; color:var(--muted); font-weight:400; }

  .rv-bars { display:flex; flex-direction:column; gap:8px; }
  .rv-bar-row { display:flex; align-items:center; gap:10px; }
  .rv-bar-label {
    font-size:11px; font-weight:600; color:var(--mid); width:30px; text-align:right; flex-shrink:0;
    display:flex; align-items:center; gap:3px;
  }
  .rv-bar-label svg { width:11px; height:11px; fill:var(--gold); }
  .rv-bar-track {
    flex:1; height:6px; background:var(--cream); border-radius:100px; overflow:hidden;
  }
  .rv-bar-fill { height:100%; background:var(--gold); border-radius:100px; }
  .rv-bar-count { font-size:11px; color:var(--muted); width:16px; text-align:right; flex-shrink:0; }

  /* REVIEWS LIST */
  .rv-list { display:flex; flex-direction:column; gap:14px; }
  .rv-card {
    background:#fff; border:1px solid var(--border); border-radius:10px; padding:22px 24px;
    transition:border-color .2s;
  }
  .rv-card:hover { border-color:#C8BFB8; }
  .rv-card-head {
    display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:12px;
  }
  .rv-card-left { display:flex; align-items:flex-start; gap:12px; }
  .rv-avatar {
    width:40px; height:40px; border-radius:50%; background:var(--ox-dark);
    display:flex; align-items:center; justify-content:center;
    font-family:'Playfair Display',serif; font-size:15px; font-weight:700; color:#fff;
    flex-shrink:0;
  }
  .rv-name { font-size:14px; font-weight:600; color:var(--ink); margin-bottom:2px; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  .rv-verified {
    display:inline-flex; align-items:center; gap:4px;
    padding:2px 8px; background:rgba(34,197,94,.07);
    border-radius:100px; font-size:10px; font-weight:600; color:#166534;
    letter-spacing:.03em;
  }
  .rv-verified svg { width:10px; height:10px; }
  .rv-location { font-size:11px; color:var(--muted); font-weight:400; }
  .rv-date { font-size:11px; color:var(--muted); white-space:nowrap; }
  .rv-rating { display:flex; gap:2px; margin-bottom:8px; }
  .rv-rating svg { width:14px; height:14px; fill:var(--gold); }
  .rv-rating svg.empty { fill:var(--border); }
  .rv-product {
    font-size:11px; font-weight:600; color:var(--muted); margin-bottom:8px;
    text-transform:uppercase; letter-spacing:.06em;
  }
  .rv-product span { color:var(--ox); }
  .rv-comment { font-size:13px; font-weight:300; color:var(--mid); line-height:1.75; }

  /* CTA */
  .rv-cta {
    margin-top:36px; background:var(--ox-dark); border-radius:12px; padding:44px 40px; text-align:center;
    position:relative; overflow:hidden;
  }
  .rv-cta::before {
    content:'★'; position:absolute; right:20px; top:50%; transform:translateY(-50%);
    font-size:200px; color:rgba(255,255,255,.03); pointer-events:none; line-height:1;
  }
  .rv-cta-title {
    font-family:'Playfair Display',serif; font-size:1.7rem; font-weight:700;
    color:#fff; margin-bottom:8px; position:relative; z-index:2;
  }
  .rv-cta-sub {
    font-size:13px; font-weight:300; color:rgba(255,255,255,.4); margin-bottom:28px;
    max-width:400px; margin-left:auto; margin-right:auto; line-height:1.7; position:relative; z-index:2;
  }
  .rv-cta-btn {
    display:inline-flex; align-items:center; gap:8px;
    padding:13px 26px; background:#fff; color:var(--ox-dark);
    font-size:13px; font-weight:600; border-radius:6px; text-decoration:none;
    font-family:'DM Sans',sans-serif; transition:opacity .2s; position:relative; z-index:2;
  }
  .rv-cta-btn:hover { opacity:.9; }
  .rv-cta-btn svg { width:16px; height:16px; }
`;

const REVIEWS = [
  { id:1, name:'Jean-Paul Kamga',  location:'Douala, Cameroon',    rating:5, date:'2 weeks ago',  comment:'Excellent service! The quality of oils is top-notch and delivery was very fast. Highly recommend GOLD OIL for authentic products.', product:'Castrol EDGE 5W-30',       verified:true },
  { id:2, name:'Marie Fotso',      location:'Yaoundé, Cameroon',   rating:5, date:'1 month ago',  comment:'Great prices and genuine products. The customer service team was very helpful in choosing the right oil for my vehicle. Will definitely buy again!', product:'Mobil 1 0W-40', verified:true },
  { id:3, name:'Emmanuel Ndjock',  location:'Bafoussam, Cameroon', rating:4, date:'1 month ago',  comment:'Good quality products. Delivery took a bit longer than expected but packaging was excellent and products arrived in perfect condition.', product:'Shell Helix Ultra 5W-40', verified:true },
  { id:4, name:'Francine Mbarga',  location:'Douala, Cameroon',    rating:5, date:'2 months ago', comment:'Very professional team! They helped me understand which lubricants I needed for my truck. Prices are competitive and Mobile Money payment was seamless.', product:'Total Quartz 9000 5W-30', verified:true },
  { id:5, name:'Patrick Ewane',    location:'Limbe, Cameroon',     rating:5, date:'2 months ago', comment:'Best place to buy automotive oils in Cameroon! Everything is authentic and they even provide certificates. Customer support is excellent.', product:'ATF Dexron III', verified:true },
  { id:6, name:'Sandrine Kouam',   location:'Yaoundé, Cameroon',   rating:4, date:'3 months ago', comment:'Good experience overall. Products are genuine and pricing is fair. Would appreciate faster delivery to Yaoundé but otherwise very satisfied.', product:'DOT 4 Brake Fluid', verified:true },
];

function Stars({ rating, size = 14 }) {
  return (
    <div style={{ display:'flex', gap:2 }}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24"
          style={{ fill: s <= rating ? 'var(--gold)' : 'var(--border)' }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const avgRating = (REVIEWS.reduce((s,r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);
  const ratingCounts = [5,4,3,2,1].map(r => REVIEWS.filter(v => v.rating === r).length);

  return (
    <ShopLayout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="rv-root">

        {/* HERO */}
        <div className="rv-hero">
          <div className="rv-hero-wm">★</div>
          <div className="rv-hero-inner">
            <div className="rv-hero-label">Testimonials</div>
            <h1 className="rv-hero-title">Customer Reviews</h1>
            <p className="rv-hero-sub">See what our customers are saying about us.</p>
          </div>
        </div>

        <div className="rv-container">

          {/* RATING SUMMARY */}
          <div className="rv-summary">
            <div className="rv-summary-head">Rating Overview</div>
            <div className="rv-summary-body">
              <div className="rv-avg">
                <div className="rv-avg-num">{avgRating}</div>
                <Stars rating={Math.round(parseFloat(avgRating))} size={18} />
                <div className="rv-avg-sub">{REVIEWS.length} reviews</div>
              </div>
              <div className="rv-bars">
                {[5,4,3,2,1].map((r,i) => (
                  <div className="rv-bar-row" key={r}>
                    <div className="rv-bar-label">
                      {r}<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                    <div className="rv-bar-track">
                      <div className="rv-bar-fill" style={{ width:`${(ratingCounts[i]/REVIEWS.length)*100}%` }} />
                    </div>
                    <div className="rv-bar-count">{ratingCounts[i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* REVIEWS */}
          <div className="rv-list">
            {REVIEWS.map(r => (
              <div className="rv-card" key={r.id}>
                <div className="rv-card-head">
                  <div className="rv-card-left">
                    <div className="rv-avatar">{r.name.charAt(0)}</div>
                    <div>
                      <div className="rv-name">
                        {r.name}
                        {r.verified && (
                          <span className="rv-verified">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                            </svg>
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="rv-location">{r.location}</div>
                    </div>
                  </div>
                  <div className="rv-date">{r.date}</div>
                </div>
                <div className="rv-rating"><Stars rating={r.rating} size={14} /></div>
                <div className="rv-product">Product: <span>{r.product}</span></div>
                <div className="rv-comment">{r.comment}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rv-cta">
            <h3 className="rv-cta-title">Share Your Experience</h3>
            <p className="rv-cta-sub">Have you purchased from us? We'd love to hear your feedback.</p>
            <a href="mailto:goldoiltradingltd@gmail.com?subject=Customer Review" className="rv-cta-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
              Write a Review
            </a>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}