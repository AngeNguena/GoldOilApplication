import React from 'react';
import ShopLayout from './Components/ShopLayout';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root { --ox:#6B1A1A; --ox-dark:#4A0F0F; --ox-light:#8B2E2E; --cream:#FAF7F2; --ink:#0E0C0B; --mid:#3A3330; --muted:#8C847C; --border:#E5DDD5; }
  .dl-root { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--ink); }

  .dl-hero { background:var(--ink); padding:64px 0 52px; position:relative; overflow:hidden; }
  .dl-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 50% 80% at 90% 50%, rgba(107,26,26,.22) 0%, transparent 70%); }
  .dl-hero-wm { position:absolute; right:-10px; bottom:-20px; font-family:'Playfair Display',serif; font-size:200px; font-weight:700; color:rgba(255,255,255,.03); line-height:1; pointer-events:none; user-select:none; }
  .dl-hero-inner { max-width:1240px; margin:0 auto; padding:0 32px; position:relative; z-index:2; }
  @media(max-width:640px){ .dl-hero-inner { padding:0 20px; } }
  .dl-hero-label { font-size:11px; font-weight:600; letter-spacing:.2em; text-transform:uppercase; color:var(--ox-light); margin-bottom:12px; display:flex; align-items:center; gap:10px; }
  .dl-hero-label::after { content:''; width:28px; height:1px; background:var(--ox-light); opacity:.6; }
  .dl-hero-title { font-family:'Playfair Display',serif; font-size:clamp(2rem,4.5vw,3.2rem); font-weight:700; color:#fff; line-height:1.1; margin-bottom:10px; }
  .dl-hero-sub { font-size:14px; font-weight:300; color:rgba(255,255,255,.4); line-height:1.7; }

  .dl-wrap { max-width:900px; margin:0 auto; padding:52px 32px 72px; }
  @media(max-width:640px){ .dl-wrap { padding:36px 20px 60px; } }

  .dl-card { background:#fff; border:1px solid var(--border); border-radius:10px; overflow:hidden; margin-bottom:18px; }
  .dl-card-head { padding:14px 22px; background:var(--cream); border-bottom:1px solid var(--border); display:flex; align-items:center; gap:10px; }
  .dl-card-icon { width:30px; height:30px; border-radius:6px; background:rgba(107,26,26,.08); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .dl-card-icon svg { width:15px; height:15px; color:var(--ox); }
  .dl-card-title { font-size:13px; font-weight:700; color:var(--ink); }
  .dl-card-body { padding:24px 22px; }

  .dl-section-title { font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); margin-bottom:12px; display:flex; align-items:center; gap:8px; }
  .dl-section-title::after { content:''; flex:1; height:1px; background:var(--border); }

  .dl-body-text { font-size:13px; font-weight:300; color:var(--muted); line-height:1.8; margin-bottom:16px; }

  .dl-cities { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:20px; }
  .dl-city { padding:5px 12px; background:var(--cream); border:1px solid var(--border); border-radius:100px; font-size:12px; font-weight:500; color:var(--mid); }

  .dl-times { display:flex; flex-direction:column; gap:8px; margin-bottom:20px; }
  .dl-time { display:flex; align-items:center; gap:12px; padding:10px 14px; background:var(--cream); border-radius:7px; }
  .dl-time-city { font-size:13px; font-weight:600; color:var(--ink); min-width:100px; }
  .dl-time-sep { width:1px; height:16px; background:var(--border); }
  .dl-time-val { font-size:13px; font-weight:300; color:var(--muted); }

  .dl-free-box { background:rgba(107,26,26,.05); border:1px solid rgba(107,26,26,.15); border-radius:7px; padding:14px 18px; margin-bottom:20px; }
  .dl-free-title { font-size:13px; font-weight:700; color:var(--ox); margin-bottom:4px; }
  .dl-free-sub { font-size:12px; font-weight:300; color:var(--muted); }

  .dl-steps { display:flex; flex-direction:column; gap:10px; }
  .dl-step { display:flex; gap:12px; align-items:flex-start; }
  .dl-step-num { width:26px; height:26px; border-radius:50%; background:rgba(107,26,26,.08); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:var(--ox); flex-shrink:0; }
  .dl-step-text { font-size:13px; font-weight:300; color:var(--muted); line-height:1.6; padding-top:4px; }

  .dl-list { display:flex; flex-direction:column; gap:7px; }
  .dl-list-item { display:flex; align-items:flex-start; gap:8px; font-size:13px; font-weight:300; color:var(--muted); line-height:1.6; }
  .dl-list-dot { width:5px; height:5px; border-radius:50%; background:var(--ox); flex-shrink:0; margin-top:7px; }

  .dl-warn { background:rgba(107,26,26,.05); border:1px solid rgba(107,26,26,.15); border-radius:7px; padding:14px 18px; }
  .dl-warn-title { font-size:12px; font-weight:700; color:var(--ox); margin-bottom:8px; display:flex; align-items:center; gap:6px; }
  .dl-warn-title svg { width:14px; height:14px; }
  .dl-warn-list { display:flex; flex-direction:column; gap:4px; }
  .dl-warn-item { font-size:12px; font-weight:300; color:var(--muted); display:flex; gap:6px; }
  .dl-warn-item::before { content:'•'; color:var(--ox); flex-shrink:0; }

  .dl-cta { background:var(--ox-dark); border-radius:10px; padding:40px 36px; text-align:center; position:relative; overflow:hidden; }
  .dl-cta::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,46,46,.2) 0%, transparent 70%); }
  .dl-cta-title { font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:600; color:#fff; margin-bottom:6px; position:relative; z-index:2; }
  .dl-cta-sub { font-size:13px; font-weight:300; color:rgba(255,255,255,.4); margin-bottom:24px; position:relative; z-index:2; }
  .dl-cta-btns { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; position:relative; z-index:2; }
  .btn-w { display:inline-flex; align-items:center; gap:7px; padding:12px 22px; background:#fff; color:var(--ox-dark); font-size:13px; font-weight:600; border-radius:6px; text-decoration:none; font-family:'DM Sans',sans-serif; transition:opacity .2s; }
  .btn-w:hover { opacity:.9; }
  .btn-w svg { width:14px; height:14px; }
  .btn-ow { display:inline-flex; align-items:center; gap:7px; padding:12px 22px; border:1px solid rgba(255,255,255,.2); color:rgba(255,255,255,.7); font-size:13px; font-weight:500; border-radius:6px; text-decoration:none; font-family:'DM Sans',sans-serif; transition:border-color .2s, color .2s; }
  .btn-ow:hover { border-color:rgba(255,255,255,.6); color:#fff; }
`;

export default function Delivery() {
  return (
    <ShopLayout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="dl-root">
        <div className="dl-hero">
          <div className="dl-hero-wm">DELIVER</div>
          <div className="dl-hero-inner">
            <div className="dl-hero-label">Shipping & Returns</div>
            <h1 className="dl-hero-title">Delivery & Returns</h1>
            <p className="dl-hero-sub">Everything you need to know about shipping and our return policy.</p>
          </div>
        </div>

        <div className="dl-wrap">

          {/* DELIVERY */}
          <div className="dl-card">
            <div className="dl-card-head">
              <div className="dl-card-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg></div>
              <span className="dl-card-title">Delivery Information</span>
            </div>
            <div className="dl-card-body">
              <div className="dl-section-title">Delivery Areas</div>
              <p className="dl-body-text">We deliver to all major cities in Cameroon.</p>
              <div className="dl-cities">
                {['Douala','Yaoundé','Bafoussam','Bamenda','Garoua','Limbe','Kribi','Buea','Ngaoundéré'].map(c => (
                  <span className="dl-city" key={c}>{c}</span>
                ))}
              </div>

              <div className="dl-section-title">Delivery Times</div>
              <div className="dl-times">
                {[['Douala','Same day or next day'],['Yaoundé','1–2 business days'],['Other Cities','2–5 business days']].map(([city,time]) => (
                  <div className="dl-time" key={city}>
                    <span className="dl-time-city">{city}</span>
                    <div className="dl-time-sep"/>
                    <span className="dl-time-val">{time}</span>
                  </div>
                ))}
              </div>

              <div className="dl-section-title">Shipping Costs</div>
              <div className="dl-free-box">
                <div className="dl-free-title">🚚 Free delivery in Douala</div>
                <div className="dl-free-sub">Other cities: 2,000–5,000 FCFA depending on location</div>
              </div>

              <div className="dl-section-title">Order Tracking</div>
              <p className="dl-body-text">Track your order in real-time with your order number. You'll receive updates via SMS and email at every stage.</p>
            </div>
          </div>

          {/* RETURNS */}
          <div className="dl-card">
            <div className="dl-card-head">
              <div className="dl-card-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg></div>
              <span className="dl-card-title">Returns Policy</span>
            </div>
            <div className="dl-card-body">
              <div className="dl-section-title">Return Conditions</div>
              <p className="dl-body-text">We accept returns within <strong>14 days</strong> of delivery, provided:</p>
              <div className="dl-list" style={{ marginBottom:20 }}>
                {['Product is unused and in original packaging','All seals and labels are intact','You have the original receipt or order confirmation','Product is defective or damaged upon arrival'].map((t,i) => (
                  <div className="dl-list-item" key={i}><div className="dl-list-dot"/>{t}</div>
                ))}
              </div>

              <div className="dl-section-title">How to Return</div>
              <div className="dl-steps" style={{ marginBottom:20 }}>
                {[
                  'Contact us at +237 671 516 335 or goldoiltradingltd@gmail.com',
                  'Provide your order number and reason for return',
                  'Package the item securely in its original packaging',
                  'Ship or drop off at our Douala location',
                  'Refund processed within 5–7 business days',
                ].map((t,i) => (
                  <div className="dl-step" key={i}>
                    <div className="dl-step-num">{i+1}</div>
                    <div className="dl-step-text">{t}</div>
                  </div>
                ))}
              </div>

              <div className="dl-section-title">Refund Method</div>
              <p className="dl-body-text" style={{ marginBottom:20 }}>Refunds are issued to your original payment method (Mobile Money or Bank Transfer). Processing time: 5–7 business days.</p>

              <div className="dl-warn">
                <div className="dl-warn-title">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  Non-Returnable Items
                </div>
                <div className="dl-warn-list">
                  {['Opened or used oil containers','Items without original packaging','Products damaged due to misuse'].map((t,i) => (
                    <div className="dl-warn-item" key={i}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="dl-cta">
            <div className="dl-cta-title">Need Help?</div>
            <p className="dl-cta-sub">Our team is here to assist with any delivery or return questions.</p>
            <div className="dl-cta-btns">
              <a href="tel:+237671516335" className="btn-w">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                Call Us
              </a>
              <a href="mailto:goldoiltradingltd@gmail.com" className="btn-ow">Email Us</a>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}