import React, { useState } from 'react';
import ShopLayout from './Components/ShopLayout';
import ProductCart from './Components/ProductCart';
import { Link } from '@inertiajs/react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root {
    --ox:#6B1A1A; --ox-dark:#4A0F0F; --ox-light:#8B2E2E;
    --cream:#FAF7F2; --ink:#0E0C0B; --mid:#3A3330; --muted:#8C847C; --border:#E5DDD5;
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  .g-root{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--ink);overflow-x:hidden;}

  /* HERO */
  .hero{position:relative;background:var(--ink);min-height:92vh;display:grid;grid-template-columns:1fr 1fr;overflow:hidden;}
  @media(max-width:768px){.hero{grid-template-columns:1fr;min-height:80vh;}}
  .hero-left{padding:80px 60px;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2;}
  @media(max-width:768px){.hero-left{padding:60px 28px;}}
  .hero-tag{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--ox-light);margin-bottom:32px;}
  .hero-tag::before{content:'';display:block;width:28px;height:1px;background:var(--ox-light);}
  .hero-h1{font-family:'Playfair Display',serif;font-size:clamp(3rem,6vw,5.5rem);font-weight:700;line-height:1.05;color:#fff;margin-bottom:28px;}
  .hero-h1 em{font-style:italic;color:var(--ox-light);}
  .hero-sub{font-size:15px;font-weight:300;line-height:1.75;color:rgba(255,255,255,.55);max-width:380px;margin-bottom:48px;}
  .hero-ctas{display:flex;gap:14px;flex-wrap:wrap;}
  .btn-primary{display:inline-flex;align-items:center;gap:10px;padding:14px 30px;background:var(--ox);color:#fff;font-size:13px;font-weight:600;letter-spacing:.04em;border-radius:4px;text-decoration:none;transition:background .2s,transform .2s;}
  .btn-primary:hover{background:var(--ox-light);transform:translateY(-1px);}
  .btn-ghost{display:inline-flex;align-items:center;gap:10px;padding:14px 30px;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.8);font-size:13px;font-weight:500;letter-spacing:.04em;border-radius:4px;text-decoration:none;transition:border-color .2s,color .2s;}
  .btn-ghost:hover{border-color:rgba(255,255,255,.6);color:#fff;}
  .hero-right{position:relative;overflow:hidden;}
  .hero-right::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,var(--ink) 0%,transparent 40%);z-index:1;}
  .hero-bg-pattern{position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 70% 40%,rgba(107,26,26,.35) 0%,transparent 70%),repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,.02) 40px,rgba(255,255,255,.02) 41px);}
  .hero-oil-text{position:absolute;bottom:40px;right:40px;z-index:2;font-family:'Playfair Display',serif;font-size:clamp(80px,14vw,180px);font-weight:700;font-style:italic;color:rgba(107,26,26,.15);line-height:1;user-select:none;}
  .hero-badges{position:absolute;top:40px;right:40px;z-index:3;display:flex;flex-direction:column;gap:12px;align-items:flex-end;}
  .hero-badge{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);padding:10px 16px;border-radius:6px;font-size:12px;color:rgba(255,255,255,.7);font-weight:500;letter-spacing:.03em;}
  .hero-badge strong{color:#fff;display:block;font-size:15px;font-weight:600;}
  @media(max-width:768px){.hero-right{display:none;}}

  /* METRICS */
  .metrics{background:var(--ox-dark);padding:0;overflow:hidden;}
  .metrics-inner{display:grid;grid-template-columns:repeat(4,1fr);}
  @media(max-width:640px){.metrics-inner{grid-template-columns:repeat(2,1fr);}}
  .metric-item{padding:28px 24px;border-right:1px solid rgba(255,255,255,.08);text-align:center;}
  .metric-item:last-child{border-right:none;}
  .metric-val{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:#fff;line-height:1;margin-bottom:4px;}
  .metric-lbl{font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.4);}

  /* SECTIONS */
  .section{padding:80px 0;}
  .section--cream{background:var(--cream);}
  .section--white{background:#fff;}
  .container{max-width:1240px;margin:0 auto;padding:0 32px;}
  @media(max-width:640px){.container{padding:0 20px;}}
  .section-label{font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--ox);margin-bottom:12px;display:flex;align-items:center;gap:10px;}
  .section-label::after{content:'';flex:1;max-width:40px;height:1px;background:var(--ox);opacity:.5;}
  .section-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:700;color:var(--ink);line-height:1.15;}
  .section-sub{font-size:14px;color:var(--muted);margin-top:8px;font-weight:300;}

  /* CATEGORIES */
  .cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-top:36px;}
  .cat-card{text-decoration:none;display:flex;align-items:center;gap:14px;padding:18px 20px;border:1px solid var(--border);border-radius:8px;background:#fff;transition:border-color .2s,box-shadow .2s,transform .2s;}
  .cat-card:hover{border-color:var(--ox);box-shadow:0 4px 20px rgba(107,26,26,.1);transform:translateY(-2px);}
  .cat-icon{width:42px;height:42px;background:var(--cream);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s;}
  .cat-card:hover .cat-icon{background:var(--ox);}
  .cat-icon svg{width:20px;height:20px;color:var(--mid);transition:color .2s;}
  .cat-card:hover .cat-icon svg{color:#fff;}
  .cat-name{font-size:13px;font-weight:600;color:var(--ink);}
  .cat-count{font-size:11px;color:var(--muted);margin-top:2px;}

  /* TABS */
  .tab-row{display:flex;gap:0;margin-bottom:36px;border-bottom:1px solid var(--border);}
  .tab-btn{padding:12px 26px;font-size:13px;font-weight:600;letter-spacing:.03em;background:none;border:none;cursor:pointer;color:var(--muted);border-bottom:2px solid transparent;margin-bottom:-1px;transition:color .2s,border-color .2s;font-family:'DM Sans',sans-serif;}
  .tab-btn.active{color:var(--ox);border-bottom-color:var(--ox);}
  .tab-btn:hover:not(.active){color:var(--ink);}
  .prod-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px;}
  .view-all-link{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--ox);text-decoration:none;margin-top:36px;letter-spacing:.04em;transition:gap .2s;}
  .view-all-link:hover{gap:14px;}
  .view-all-link svg{width:18px;height:18px;}

  /* FEATURES */
  .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:48px;background:var(--border);border:1px solid var(--border);border-radius:12px;overflow:hidden;}
  @media(max-width:768px){.features-grid{grid-template-columns:1fr;}}
  .feature-item{background:#fff;padding:36px 32px;transition:background .2s;}
  .feature-item:hover{background:var(--cream);}
  .feature-num{font-family:'Playfair Display',serif;font-size:42px;font-weight:700;color:var(--border);line-height:1;margin-bottom:16px;}
  .feature-title{font-size:15px;font-weight:600;color:var(--ink);margin-bottom:10px;}
  .feature-desc{font-size:13px;font-weight:300;color:var(--muted);line-height:1.75;}

  /* TRUST */
  .trust-wrap{display:grid;grid-template-columns:1fr 400px;gap:60px;align-items:center;}
  @media(max-width:900px){.trust-wrap{grid-template-columns:1fr;}}
  .trust-body{font-size:14px;font-weight:300;color:var(--muted);line-height:1.8;margin:16px 0 28px;max-width:460px;}
  .check-list{list-style:none;display:flex;flex-direction:column;gap:12px;}
  .check-list li{display:flex;align-items:center;gap:12px;font-size:13px;color:var(--mid);font-weight:400;}
  .check-dot{width:20px;height:20px;border-radius:50%;background:rgba(107,26,26,.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .check-dot svg{width:11px;height:11px;color:var(--ox);}
  .review-card{background:var(--ink);border-radius:12px;padding:36px;text-align:center;}
  .review-score{font-family:'Playfair Display',serif;font-size:52px;font-weight:700;color:#fff;line-height:1;margin-bottom:4px;}
  .review-score-lbl{font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:20px;}
  .stars{display:flex;justify-content:center;gap:4px;margin-bottom:20px;}
  .stars svg{width:18px;height:18px;fill:#C8922A;}
  .review-quote{font-size:13px;color:rgba(255,255,255,.5);font-style:italic;font-family:'Playfair Display',serif;line-height:1.6;margin-bottom:20px;}
  .review-link{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ox-light);text-decoration:none;}
  .review-link:hover{color:#fff;}

  /* CTA */
  .cta-band{background:var(--ox-dark);padding:72px 0;position:relative;overflow:hidden;}
  .cta-band::before{content:'GOLD';position:absolute;right:-20px;top:50%;transform:translateY(-50%);font-family:'Playfair Display',serif;font-size:200px;font-weight:700;color:rgba(255,255,255,.03);line-height:1;user-select:none;pointer-events:none;}
  .cta-inner{position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:40px;flex-wrap:wrap;}
  .cta-title{font-family:'Playfair Display',serif;font-size:clamp(1.5rem,3vw,2.2rem);font-weight:600;color:#fff;line-height:1.2;margin-bottom:8px;}
  .cta-sub{font-size:13px;color:rgba(255,255,255,.45);font-weight:300;}
  .cta-actions{display:flex;gap:14px;flex-wrap:wrap;}
  .btn-cta-white{display:inline-flex;align-items:center;gap:8px;padding:14px 26px;background:#fff;color:var(--ox-dark);font-size:13px;font-weight:600;border-radius:4px;text-decoration:none;letter-spacing:.03em;transition:opacity .2s;}
  .btn-cta-white:hover{opacity:.92;}
  .btn-cta-outline{display:inline-flex;align-items:center;gap:8px;padding:14px 26px;border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.8);font-size:13px;font-weight:500;border-radius:4px;text-decoration:none;letter-spacing:.03em;transition:border-color .2s,color .2s;}
  .btn-cta-outline:hover{border-color:rgba(255,255,255,.7);color:#fff;}

  /* EMPTY */
  .empty-state{padding:60px;text-align:center;border:1px dashed var(--border);border-radius:10px;background:#fff;}
  .empty-state svg{width:44px;height:44px;color:var(--border);margin-bottom:12px;}
  .empty-state p{font-size:13px;color:var(--muted);}

  /* ANIMATIONS */
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
  .fade-up{animation:fadeUp .6s ease both;}
  .delay-1{animation-delay:.1s;} .delay-2{animation-delay:.2s;} .delay-3{animation-delay:.3s;} .delay-4{animation-delay:.45s;}
`;

export default function Home({ featured_oils = [], featured_spare_parts = [], categories = [] }) {
  const [activeTab, setActiveTab] = useState('oil');
  const featuredProducts = activeTab === 'oil' ? featured_oils : featured_spare_parts;

  return (
    <ShopLayout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="g-root">

        {/* HERO */}
        <section className="hero">
          <div className="hero-left">
            <span className="hero-tag fade-up">Premium Quality Since 2024</span>
            <h1 className="hero-h1 fade-up delay-1">
              Automotive<br />
              <em>excellence</em><br />
              made simple.
            </h1>
            <p className="hero-sub fade-up delay-2">
              Professional-grade oils and spare parts imported from the world's most trusted manufacturers. Authenticity guaranteed.
            </p>
            <div className="hero-ctas fade-up delay-3">
              <Link href="/products/?type=oil" className="btn-primary">
                Browse Collection
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/contact/" className="btn-ghost">Get in Touch</Link>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-bg-pattern" />
            <div className="hero-oil-text">OIL</div>
            <div className="hero-badges fade-up delay-4">
              <div className="hero-badge"><strong>500+</strong>Products in stock</div>
              <div className="hero-badge"><strong>1,000+</strong>Satisfied customers</div>
              <div className="hero-badge"><strong>24/7</strong>Customer support</div>
            </div>
          </div>
        </section>

        {/* METRICS */}
        <div className="metrics">
          <div className="metrics-inner">
            {[
              { value:'500+',   label:'Products' },
              { value:'1,000+', label:'Customers' },
              { value:'100%',   label:'Authentic' },
              { value:'24/7',   label:'Support' },
            ].map((m, i) => (
              <div className="metric-item" key={i}>
                <div className="metric-val">{m.value}</div>
                <div className="metric-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        {categories.length > 0 && (
          <section className="section section--cream">
            <div className="container">
              <div className="section-label">Catalogue</div>
              <h2 className="section-title">Product Categories</h2>
              <p className="section-sub">Find exactly what you need, fast</p>
              <div className="cat-grid">
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/products/?category=${cat.id}`} className="cat-card">
                    <div className="cat-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <div className="cat-name">{cat.name}</div>
                      <div className="cat-count">{cat.product_count} items</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FEATURED PRODUCTS */}
        <section className="section section--white">
          <div className="container">
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:32 }}>
              <div>
                <div className="section-label">Selection</div>
                <h2 className="section-title">Featured Products</h2>
                <p className="section-sub">Handpicked for quality and performance</p>
              </div>
            </div>
            <div className="tab-row">
              <button className={`tab-btn ${activeTab==='oil'?'active':''}`} onClick={() => setActiveTab('oil')}>
                🛢 Oils & Lubricants
              </button>
              <button className={`tab-btn ${activeTab==='spare_part'?'active':''}`} onClick={() => setActiveTab('spare_part')}>
                🔧 Spare Parts
              </button>
            </div>
            {featuredProducts.length > 0 ? (
              <>
                <div className="prod-grid">
                  {featuredProducts.map((product) => (
                    <ProductCart key={product.id} product={product} />
                  ))}
                </div>
                <Link href={`/products/?type=${activeTab}`} className="view-all-link">
                  View all {activeTab === 'oil' ? 'oils' : 'spare parts'}
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              </>
            ) : (
              <div className="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p>No products available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* WHY US */}
        <section className="section section--cream">
          <div className="container">
            <div style={{ maxWidth:500 }}>
              <div className="section-label">Our Commitment</div>
              <h2 className="section-title">Why Choose GOLD OIL</h2>
              <p className="section-sub">International quality, local expertise, unmatched service.</p>
            </div>
            <div className="features-grid">
              {[
                { n:'01', title:'100% Authentic Products',  desc:'Every item is sourced directly from authorised distributors. Authenticity certified with complete documentation.' },
                { n:'02', title:'Secure Payments',           desc:'Mobile Money (MTN, Orange), bank transfer, or cash on delivery — you choose what works for you.' },
                { n:'03', title:'Fast Delivery',             desc:'Same-day delivery in Douala, 1–2 days to Yaoundé, and nationwide shipping to all major cities.' },
              ].map((f, i) => (
                <div className="feature-item" key={i}>
                  <div className="feature-num">{f.n}</div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section className="section section--white">
          <div className="container">
            <div className="trust-wrap">
              <div>
                <div className="section-label">Credibility</div>
                <h2 className="section-title">Trusted by Professionals</h2>
                <p className="trust-body">
                  From individual vehicle owners to fleet managers and workshops, GOLD OIL serves a diverse clientele across Cameroon with the same unwavering commitment to quality.
                </p>
                <ul className="check-list">
                  {[
                    'RCCM CM-DLA-02-2024-B12-00243',
                    'Active import & export licence',
                    'Authorised dealer for major brands',
                  ].map((item, i) => (
                    <li key={i}>
                      <span className="check-dot">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="review-card">
                <div className="review-score">1K+</div>
                <div className="review-score-lbl">Happy Customers</div>
                <div className="stars">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="review-quote">"Excellent service and genuine products. Highly recommend!"</p>
                <Link href="/reviews/" className="review-link">Read Customer Reviews →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-band">
          <div className="container">
            <div className="cta-inner">
              <div>
                <h2 className="cta-title">Need help choosing<br />the right product?</h2>
                <p className="cta-sub">Our experts are ready to assist you right now.</p>
              </div>
              <div className="cta-actions">
                <a href="tel:+237671516335" className="btn-cta-white">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  +237 671 516 335
                </a>
                <Link href="/contact/" className="btn-cta-outline">
                  Send a Message
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </ShopLayout>
  );
}