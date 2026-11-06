import React, { useState } from 'react';
import ShopLayout from './Components/ShopLayout';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root {
    --ox:#6B1A1A; --ox-dark:#4A0F0F; --ox-light:#8B2E2E;
    --cream:#FAF7F2; --ink:#0E0C0B; --mid:#3A3330; --muted:#8C847C; --border:#E5DDD5;
  }
  .fq-root { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--ink); }

  /* HERO */
  .fq-hero { background:var(--ink); padding:64px 0 52px; position:relative; overflow:hidden; }
  .fq-hero::before {
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse 50% 80% at 90% 50%, rgba(107,26,26,.25) 0%, transparent 70%);
  }
  .fq-hero-watermark {
    position:absolute; right:-10px; bottom:-20px;
    font-family:'Playfair Display',serif; font-size:200px; font-weight:700;
    color:rgba(255,255,255,.03); line-height:1; pointer-events:none; user-select:none;
  }
  .fq-hero-inner { max-width:1240px; margin:0 auto; padding:0 32px; position:relative; z-index:2; }
  @media(max-width:640px){ .fq-hero-inner { padding:0 20px; } }
  .fq-hero-label {
    font-size:11px; font-weight:600; letter-spacing:.2em; text-transform:uppercase;
    color:var(--ox-light); margin-bottom:12px; display:flex; align-items:center; gap:10px;
  }
  .fq-hero-label::after { content:''; width:28px; height:1px; background:var(--ox-light); opacity:.6; }
  .fq-hero-title {
    font-family:'Playfair Display',serif;
    font-size:clamp(2rem,4.5vw,3.2rem); font-weight:700; color:#fff; line-height:1.1; margin-bottom:12px;
  }
  .fq-hero-sub { font-size:14px; font-weight:300; color:rgba(255,255,255,.4); max-width:460px; line-height:1.7; }

  /* CONTAINER */
  .fq-wrap { max-width:900px; margin:0 auto; padding:52px 32px 72px; }
  @media(max-width:640px){ .fq-wrap { padding:36px 20px 60px; } }

  /* QUICK STATS */
  .fq-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:52px; }
  @media(max-width:640px){ .fq-stats { grid-template-columns:1fr; } }
  .fq-stat {
    background:#fff; border:1px solid var(--border); border-radius:9px;
    padding:22px 20px; display:flex; align-items:center; gap:14px;
  }
  .fq-stat-icon {
    width:40px; height:40px; border-radius:7px; background:rgba(107,26,26,.07);
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
  .fq-stat-icon svg { width:20px; height:20px; color:var(--ox); }
  .fq-stat-val { font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:700; color:var(--ink); line-height:1; }
  .fq-stat-lbl { font-size:11px; color:var(--muted); font-weight:400; margin-top:2px; }

  /* CATEGORIES */
  .fq-category { margin-bottom:28px; }
  .fq-cat-head {
    display:flex; align-items:center; gap:12px; margin-bottom:16px; padding-bottom:14px;
    border-bottom:1px solid var(--border);
  }
  .fq-cat-icon {
    width:36px; height:36px; border-radius:7px; background:rgba(107,26,26,.07);
    display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:16px;
  }
  .fq-cat-title {
    font-family:'Playfair Display',serif; font-size:1.2rem; font-weight:600; color:var(--ink);
  }

  /* ACCORDION */
  .fq-item {
    background:#fff; border:1px solid var(--border); border-radius:8px; overflow:hidden;
    margin-bottom:8px; transition:border-color .2s;
  }
  .fq-item.open { border-color:#C8BFB8; }
  .fq-item:hover { border-color:#C8BFB8; }
  .fq-btn {
    width:100%; display:flex; align-items:center; justify-content:space-between;
    padding:15px 18px; background:none; border:none; cursor:pointer; text-align:left;
    font-family:'DM Sans',sans-serif; transition:background .15s;
    gap:12px;
  }
  .fq-btn:hover { background:var(--cream); }
  .fq-btn-q { font-size:13px; font-weight:600; color:var(--ink); line-height:1.4; }
  .fq-chevron {
    width:18px; height:18px; color:var(--ox); flex-shrink:0;
    transition:transform .25s; transform:rotate(0deg);
  }
  .fq-chevron.open { transform:rotate(180deg); }
  .fq-answer {
    padding:0 18px; max-height:0; overflow:hidden;
    transition:max-height .3s ease, padding .3s ease;
  }
  .fq-answer.open { max-height:500px; padding:0 18px 16px; }
  .fq-answer-text {
    font-size:13px; font-weight:300; color:var(--muted); line-height:1.8;
    padding-top:12px; border-top:1px solid var(--border);
  }

  /* STILL HAVE QS */
  .fq-contact {
    background:var(--ox-dark); border-radius:12px; padding:44px 40px; text-align:center;
    margin-top:48px; position:relative; overflow:hidden;
  }
  .fq-contact::before {
    content:'?'; position:absolute; right:20px; top:50%; transform:translateY(-50%);
    font-family:'Playfair Display',serif; font-size:200px; font-weight:700;
    color:rgba(255,255,255,.04); line-height:1; pointer-events:none;
  }
  .fq-contact-title {
    font-family:'Playfair Display',serif; font-size:1.7rem; font-weight:700;
    color:#fff; margin-bottom:8px; position:relative; z-index:2;
  }
  .fq-contact-sub {
    font-size:13px; font-weight:300; color:rgba(255,255,255,.4);
    margin-bottom:28px; max-width:400px; margin-left:auto; margin-right:auto;
    line-height:1.7; position:relative; z-index:2;
  }
  .fq-contact-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; position:relative; z-index:2; }
  .btn-w {
    display:inline-flex; align-items:center; gap:8px;
    padding:12px 24px; background:#fff; color:var(--ox-dark);
    font-size:13px; font-weight:600; border-radius:6px; text-decoration:none;
    font-family:'DM Sans',sans-serif; transition:opacity .2s;
  }
  .btn-w:hover { opacity:.9; }
  .btn-w svg { width:15px; height:15px; }
  .btn-ow {
    display:inline-flex; align-items:center; gap:8px;
    padding:12px 24px; border:1px solid rgba(255,255,255,.2); color:rgba(255,255,255,.7);
    font-size:13px; font-weight:500; border-radius:6px; text-decoration:none;
    font-family:'DM Sans',sans-serif; transition:border-color .2s, color .2s;
  }
  .btn-ow:hover { border-color:rgba(255,255,255,.6); color:#fff; }
`;

const FAQS = [
  {
    category:'Orders & Payment', icon:'🛒',
    questions:[
      { q:'How do I place an order?', a:'Browse our products, add items to your cart, proceed to checkout, fill in your details, and choose a payment method. You\'ll receive confirmation via email and SMS.' },
      { q:'What payment methods do you accept?', a:'We accept MTN Mobile Money, Orange Money, Bank Transfer, and Cash on Delivery. All payments are secure and encrypted.' },
      { q:'Is it safe to pay online?', a:'Absolutely. We use Campay for mobile money transactions — a certified, encrypted payment gateway. Your payment information is never stored on our servers.' },
      { q:'Can I cancel my order?', a:'Yes, before it ships. Contact us at +237 671 516 335 or goldoiltradingltd@gmail.com with your order number as soon as possible.' },
      { q:'How do I track my order?', a:'After placing your order, you\'ll receive an order number. Use it on our Order Tracking page or contact customer service for real-time updates.' },
    ]
  },
  {
    category:'Delivery & Shipping', icon:'🚚',
    questions:[
      { q:'Do you offer free delivery?', a:'Yes — FREE delivery in Douala on all orders. For other cities, standard delivery fees apply (2,000–5,000 FCFA depending on location).' },
      { q:'How long does delivery take?', a:'Douala: same day or next day. Yaoundé: 1–2 business days. Other cities: 2–5 business days.' },
      { q:'Do you deliver nationwide?', a:'Yes, to all major cities — Douala, Yaoundé, Bafoussam, Bamenda, Garoua, Limbe, and more.' },
      { q:'Can I change my delivery address?', a:'Yes, but only before the order ships. Call us at +237 671 516 335 immediately.' },
      { q:'What if I\'m not home during delivery?', a:'Our team calls before arrival. If unavailable, we can reschedule or deliver to an alternative address.' },
    ]
  },
  {
    category:'Products & Quality', icon:'🛢️',
    questions:[
      { q:'Are your products authentic?', a:'100%. We import directly from authorized distributors. Every product comes with a certificate of authenticity — we never sell counterfeits.' },
      { q:'How do I know which oil is right for my vehicle?', a:'Check your vehicle manual for manufacturer recommendations, or call our technical team at +237 671 516 335 for expert advice.' },
      { q:'Do you offer wholesale pricing?', a:'Yes. Contact goldoiltradingltd@gmail.com or call +237 671 516 335 to discuss bulk and wholesale pricing.' },
      { q:'What brands do you carry?', a:'We carry Castrol, Mobil 1, Shell, Total, and other premium international brands — all meeting international quality standards.' },
      { q:'Do products come with warranty?', a:'Yes, manufacturer\'s warranty against defects. Contact us within 14 days of receiving a defective product for replacement or refund.' },
    ]
  },
  {
    category:'Returns & Refunds', icon:'↩️',
    questions:[
      { q:'What is your return policy?', a:'Returns accepted within 14 days if products are unused, in original packaging with seals intact. Opened oil containers cannot be returned unless defective.' },
      { q:'How do I initiate a return?', a:'Call +237 671 516 335 with your order number and reason. We\'ll guide you through the process and provide return instructions.' },
      { q:'How long does a refund take?', a:'Refunds are processed within 5–7 business days after we receive and inspect the returned item. Returned to your original payment method.' },
      { q:'What if I receive a damaged product?', a:'Contact us immediately with photos of the damage. We\'ll arrange a replacement or full refund at no cost to you.' },
    ]
  },
  {
    category:'Account & Support', icon:'👤',
    questions:[
      { q:'Do I need an account to order?', a:'No, guest checkout is available. An account lets you track orders easily and save details for faster future checkouts.' },
      { q:'What are your business hours?', a:'Monday–Friday: 8:00 AM–6:00 PM. Saturday: 9:00 AM–4:00 PM. Sunday: Closed. Online orders accepted 24/7.' },
      { q:'Where is your physical store?', a:'Bonamoussadi Rond-point Maetur, Derrière la station OLA, Douala. Visit us during business hours.' },
    ]
  },
  {
    category:'Pricing & Discounts', icon:'💰',
    questions:[
      { q:'Do you offer discounts?', a:'Yes — promotions, bulk discounts, and special deals are available. Follow us or contact us to stay updated.' },
      { q:'Are prices negotiable for bulk orders?', a:'Yes. Contact goldoiltradingltd@gmail.com or +237 671 516 335 to discuss volume pricing.' },
      { q:'Do prices include VAT?', a:'Yes, all displayed prices include applicable taxes. No hidden fees at checkout.' },
    ]
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (ci, qi) => {
    const key = `${ci}-${qi}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <ShopLayout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="fq-root">

        {/* HERO */}
        <div className="fq-hero">
          <div className="fq-hero-watermark">FAQ</div>
          <div className="fq-hero-inner">
            <div className="fq-hero-label">Help Center</div>
            <h1 className="fq-hero-title">Frequently Asked<br />Questions</h1>
            <p className="fq-hero-sub">Find answers to common questions about our products, delivery, and services.</p>
          </div>
        </div>

        <div className="fq-wrap">

          {/* QUICK STATS */}
          <div className="fq-stats">
            {[
              { val:'24/7', lbl:'Customer Support', icon:<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/> },
              { val:'FREE', lbl:'Delivery in Douala', icon:<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/> },
              { val:'100%', lbl:'Authentic Products', icon:<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/> },
            ].map((s,i) => (
              <div className="fq-stat" key={i}>
                <div className="fq-stat-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
                </div>
                <div>
                  <div className="fq-stat-val">{s.val}</div>
                  <div className="fq-stat-lbl">{s.lbl}</div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ CATEGORIES */}
          {FAQS.map((cat, ci) => (
            <div className="fq-category" key={ci}>
              <div className="fq-cat-head">
                <div className="fq-cat-icon">{cat.icon}</div>
                <div className="fq-cat-title">{cat.category}</div>
              </div>
              {cat.questions.map((faq, qi) => {
                const key = `${ci}-${qi}`;
                const isOpen = openIndex === key;
                return (
                  <div className={`fq-item ${isOpen ? 'open' : ''}`} key={qi}>
                    <button className="fq-btn" onClick={() => toggle(ci, qi)}>
                      <span className="fq-btn-q">{faq.q}</span>
                      <svg className={`fq-chevron ${isOpen ? 'open' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>
                    <div className={`fq-answer ${isOpen ? 'open' : ''}`}>
                      <div className="fq-answer-text">{faq.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* STILL HAVE QS */}
          <div className="fq-contact">
            <h3 className="fq-contact-title">Still Have Questions?</h3>
            <p className="fq-contact-sub">Our customer support team is ready to help you anytime.</p>
            <div className="fq-contact-btns">
              <a href="tel:+237671516335" className="btn-w">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +237 671 516 335
              </a>
              <a href="/contact/" className="btn-ow">Send a Message</a>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}