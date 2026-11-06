import React, { useState } from 'react';
import ShopLayout from './Components/ShopLayout';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root {
    --ox:#6B1A1A; --ox-dark:#4A0F0F; --ox-light:#8B2E2E;
    --cream:#FAF7F2; --ink:#0E0C0B; --mid:#3A3330; --muted:#8C847C; --border:#E5DDD5;
  }
  .ct-root { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--ink); }

  /* HERO */
  .ct-hero { background:var(--ink); padding:64px 0 52px; position:relative; overflow:hidden; }
  .ct-hero::before {
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse 50% 80% at 90% 50%, rgba(107,26,26,.25) 0%, transparent 70%);
  }
  .ct-hero-wm {
    position:absolute; right:-10px; bottom:-20px;
    font-family:'Playfair Display',serif; font-size:200px; font-weight:700;
    color:rgba(255,255,255,.03); line-height:1; pointer-events:none; user-select:none;
  }
  .ct-hero-inner { max-width:1240px; margin:0 auto; padding:0 32px; position:relative; z-index:2; }
  @media(max-width:640px){ .ct-hero-inner { padding:0 20px; } }
  .ct-hero-label {
    font-size:11px; font-weight:600; letter-spacing:.2em; text-transform:uppercase;
    color:var(--ox-light); margin-bottom:12px; display:flex; align-items:center; gap:10px;
  }
  .ct-hero-label::after { content:''; width:28px; height:1px; background:var(--ox-light); opacity:.6; }
  .ct-hero-title {
    font-family:'Playfair Display',serif;
    font-size:clamp(2rem,4.5vw,3.2rem); font-weight:700; color:#fff; line-height:1.1; margin-bottom:10px;
  }
  .ct-hero-sub { font-size:14px; font-weight:300; color:rgba(255,255,255,.4); line-height:1.7; }

  /* LAYOUT */
  .ct-container { max-width:1240px; margin:0 auto; padding:52px 32px 72px; }
  @media(max-width:640px){ .ct-container { padding:36px 20px 60px; } }
  .ct-grid { display:grid; grid-template-columns:300px 1fr; gap:28px; align-items:start; }
  @media(max-width:960px){ .ct-grid { grid-template-columns:1fr; } }

  /* SIDEBAR CARDS */
  .ct-info-stack { display:flex; flex-direction:column; gap:12px; }
  .ct-info-card {
    background:#fff; border:1px solid var(--border); border-radius:9px; overflow:hidden;
  }
  .ct-info-card-head {
    padding:12px 18px; background:var(--cream); border-bottom:1px solid var(--border);
    display:flex; align-items:center; gap:10px;
    font-size:10px; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:var(--muted);
  }
  .ct-info-card-head-icon {
    width:26px; height:26px; border-radius:5px; background:rgba(107,26,26,.08);
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
  }
  .ct-info-card-head-icon svg { width:13px; height:13px; color:var(--ox); }
  .ct-info-card-body { padding:16px 18px; }
  .ct-info-val {
    font-size:13px; color:var(--mid); font-weight:400; line-height:1.7;
  }
  .ct-info-link {
    display:block; font-size:13px; font-weight:600; color:var(--ox);
    text-decoration:none; line-height:1.8; transition:color .15s;
  }
  .ct-info-link:hover { color:var(--ox-light); }

  /* Hours table */
  .ct-hours { width:100%; border-collapse:collapse; }
  .ct-hours tr { border-bottom:1px solid var(--border); }
  .ct-hours tr:last-child { border-bottom:none; }
  .ct-hours td { padding:8px 0; font-size:12px; vertical-align:middle; }
  .ct-hours td:first-child { color:var(--muted); font-weight:400; }
  .ct-hours td:last-child { text-align:right; font-weight:600; color:var(--ink); }
  .ct-hours td.closed { color:var(--ox); }

  /* FORM CARD */
  .ct-form-card {
    background:#fff; border:1px solid var(--border); border-radius:10px; overflow:hidden;
  }
  .ct-form-card-head {
    padding:20px 28px; border-bottom:1px solid var(--border);
  }
  .ct-form-title {
    font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:600; color:var(--ink); margin-bottom:4px;
  }
  .ct-form-sub { font-size:12px; color:var(--muted); font-weight:300; }
  .ct-form-body { padding:28px; }

  /* Alerts */
  .ct-alert {
    display:flex; align-items:flex-start; gap:10px; padding:12px 16px;
    border-radius:7px; margin-bottom:20px; font-size:13px;
  }
  .ct-alert svg { width:16px; height:16px; flex-shrink:0; margin-top:1px; }
  .ct-alert.success { background:rgba(34,197,94,.07); border:1px solid rgba(34,197,94,.25); color:#166534; }
  .ct-alert.error   { background:rgba(107,26,26,.06); border:1px solid rgba(107,26,26,.2);  color:var(--ox); }

  /* Form fields */
  .ct-field-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; }
  @media(max-width:640px){ .ct-field-row { grid-template-columns:1fr; } }
  .ct-field { margin-bottom:16px; }
  .ct-label {
    display:block; font-size:10px; font-weight:700; letter-spacing:.12em;
    text-transform:uppercase; color:var(--muted); margin-bottom:6px;
  }
  .ct-req { color:var(--ox); margin-left:2px; }
  .ct-input, .ct-select, .ct-textarea {
    width:100%; padding:10px 14px;
    border:1px solid var(--border); border-radius:6px;
    font-size:13px; font-family:'DM Sans',sans-serif; color:var(--ink);
    background:var(--cream); outline:none; transition:border-color .2s, background .2s;
  }
  .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
    border-color:var(--ox); background:#fff;
  }
  .ct-input::placeholder, .ct-textarea::placeholder { color:var(--muted); }
  .ct-select {
    appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238C847C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:right 12px center;
  }
  .ct-textarea { resize:vertical; min-height:120px; }

  .ct-submit {
    width:100%; padding:13px; background:var(--ox); color:#fff; border:none; border-radius:7px;
    font-size:13px; font-weight:600; letter-spacing:.04em; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:8px;
    font-family:'DM Sans',sans-serif; transition:background .2s; margin-top:4px;
  }
  .ct-submit:hover:not(:disabled) { background:var(--ox-light); }
  .ct-submit:disabled { opacity:.5; cursor:not-allowed; }
  .ct-submit svg { width:15px; height:15px; }
  @keyframes spin { to { transform:rotate(360deg); } }
  .spin { animation:spin .7s linear infinite; }

  /* MAP */
  .ct-map-wrap {
    margin-top:36px; background:#fff; border:1px solid var(--border); border-radius:10px; overflow:hidden;
  }
  .ct-map-placeholder {
    aspect-ratio:16/5; background:var(--cream);
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;
  }
  .ct-map-placeholder svg { width:36px; height:36px; color:#C8BFB8; }
  .ct-map-lbl { font-size:13px; font-weight:600; color:var(--mid); }
  .ct-map-sub { font-size:11px; color:var(--muted); }
`;

export default function Contact() {
  const [formData, setFormData] = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/contact/submit/', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name:'', email:'', phone:'', subject:'', message:'' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.errors || 'Failed to send message. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try calling us instead.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <ShopLayout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="ct-root">

        {/* HERO */}
        <div className="ct-hero">
          <div className="ct-hero-wm">CONTACT</div>
          <div className="ct-hero-inner">
            <div className="ct-hero-label">Get in Touch</div>
            <h1 className="ct-hero-title">We're here to help.</h1>
            <p className="ct-hero-sub">Reach out to our team — we respond within 24 hours.</p>
          </div>
        </div>

        <div className="ct-container">
          <div className="ct-grid">

            {/* SIDEBAR */}
            <div className="ct-info-stack">

              {/* Location */}
              <div className="ct-info-card">
                <div className="ct-info-card-head">
                  <div className="ct-info-card-head-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  Location
                </div>
                <div className="ct-info-card-body">
                  <div className="ct-info-val">
                    Bonamoussadi, Rond-point Maetur<br />
                    Derrière la station OLA<br />
                    Douala — Cameroun
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="ct-info-card">
                <div className="ct-info-card-head">
                  <div className="ct-info-card-head-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  Phone
                </div>
                <div className="ct-info-card-body">
                  <a href="tel:+237671516335" className="ct-info-link">+237 671 516 335</a>
                  <a href="tel:+237693805193" className="ct-info-link">+237 693 805 193</a>
                </div>
              </div>

              {/* Email */}
              <div className="ct-info-card">
                <div className="ct-info-card-head">
                  <div className="ct-info-card-head-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  Email
                </div>
                <div className="ct-info-card-body">
                  <a href="mailto:goldoiltradingltd@gmail.com" className="ct-info-link" style={{ wordBreak:'break-all' }}>
                    goldoiltradingltd@gmail.com
                  </a>
                  <div style={{ fontSize:11, color:'var(--muted)', marginTop:4 }}>Replies within 24 hours</div>
                </div>
              </div>

              {/* Hours */}
              <div className="ct-info-card">
                <div className="ct-info-card-head">
                  <div className="ct-info-card-head-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  Business Hours
                </div>
                <div className="ct-info-card-body">
                  <table className="ct-hours">
                    <tbody>
                      <tr><td>Mon – Fri</td><td>8:00 AM – 6:00 PM</td></tr>
                      <tr><td>Saturday</td><td>9:00 AM – 4:00 PM</td></tr>
                      <tr><td>Sunday</td><td className="closed">Closed</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="ct-form-card">
              <div className="ct-form-card-head">
                <div className="ct-form-title">Send Us a Message</div>
                <div className="ct-form-sub">Fill out the form and we'll get back to you as soon as possible.</div>
              </div>
              <div className="ct-form-body">
                {submitted && (
                  <div className="ct-alert success">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                      <strong>Message sent!</strong> We'll respond within 24 hours.
                    </div>
                  </div>
                )}
                {error && (
                  <div className="ct-alert error">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="ct-field-row">
                    <div className="ct-field">
                      <label className="ct-label">Your Name<span className="ct-req">*</span></label>
                      <input className="ct-input" type="text" name="name" required
                        value={formData.name} onChange={handleChange} placeholder="John Doe" />
                    </div>
                    <div className="ct-field">
                      <label className="ct-label">Email Address<span className="ct-req">*</span></label>
                      <input className="ct-input" type="email" name="email" required
                        value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="ct-field-row">
                    <div className="ct-field">
                      <label className="ct-label">Phone Number</label>
                      <input className="ct-input" type="tel" name="phone"
                        value={formData.phone} onChange={handleChange} placeholder="+237 6XX XXX XXX" />
                    </div>
                    <div className="ct-field">
                      <label className="ct-label">Subject<span className="ct-req">*</span></label>
                      <select className="ct-select" name="subject" required
                        value={formData.subject} onChange={handleChange}>
                        <option value="">Select a subject</option>
                        <option value="product">Product Inquiry</option>
                        <option value="order">Order Status</option>
                        <option value="wholesale">Wholesale Partnership</option>
                        <option value="support">Customer Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">Message<span className="ct-req">*</span></label>
                    <textarea className="ct-textarea" name="message" required
                      value={formData.message} onChange={handleChange}
                      placeholder="Tell us how we can help you…" />
                  </div>
                  <button type="submit" className="ct-submit" disabled={loading}>
                    {loading ? (
                      <>
                        <svg className="spin" width="15" height="15" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity=".25"/>
                          <path fill="currentColor" opacity=".75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className="ct-map-wrap">
            <div className="ct-map-placeholder">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <div className="ct-map-lbl">Bonamoussadi, Douala — Cameroun</div>
              <div className="ct-map-sub">Rond-point Maetur, Derrière la station OLA</div>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}