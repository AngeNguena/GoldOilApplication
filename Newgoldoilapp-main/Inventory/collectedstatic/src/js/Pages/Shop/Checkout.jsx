import React, { useState, useEffect } from 'react';
import ShopLayout from './Components/ShopLayout';
import { router } from '@inertiajs/react';
import { getCart, getCartTotal, clearCart } from './Components/CartManager';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root {
    --ox:#6B1A1A; --ox-dark:#4A0F0F; --ox-light:#8B2E2E;
    --cream:#FAF7F2; --ink:#0E0C0B; --mid:#3A3330; --muted:#8C847C; --border:#E5DDD5;
  }
  .ck-root { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--ink); }

  .ck-header { background:var(--ink); padding:52px 0 40px; position:relative; overflow:hidden; }
  .ck-header::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 50% 80% at 90% 50%, rgba(107,26,26,.22) 0%, transparent 70%); }
  .ck-header-inner { max-width:1240px; margin:0 auto; padding:0 32px; position:relative; z-index:2; }
  @media(max-width:640px){ .ck-header-inner { padding:0 20px; } }
  .ck-header-label { font-size:11px; font-weight:600; letter-spacing:.2em; text-transform:uppercase; color:var(--ox-light); margin-bottom:12px; display:flex; align-items:center; gap:10px; }
  .ck-header-label::after { content:''; width:28px; height:1px; background:var(--ox-light); opacity:.6; }
  .ck-header-title { font-family:'Playfair Display',serif; font-size:clamp(1.8rem,4vw,2.6rem); font-weight:700; color:#fff; line-height:1.1; margin-bottom:6px; }
  .ck-header-sub { font-size:13px; color:rgba(255,255,255,.35); font-weight:300; }

  .ck-stepper { background:#fff; border-bottom:1px solid var(--border); padding:14px 0; }
  .ck-stepper-inner { max-width:1240px; margin:0 auto; padding:0 32px; display:flex; align-items:center; }
  @media(max-width:640px){ .ck-stepper-inner { padding:0 20px; } }
  .ck-step { display:flex; align-items:center; gap:8px; }
  .ck-step-dot { width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; flex-shrink:0; transition:all .2s; }
  .ck-step-dot.done   { background:var(--ox); color:#fff; }
  .ck-step-dot.active { background:var(--ink); color:#fff; }
  .ck-step-dot.idle   { background:var(--cream); color:var(--muted); border:1px solid var(--border); }
  .ck-step-dot svg { width:12px; height:12px; }
  .ck-step-lbl { font-size:12px; font-weight:600; white-space:nowrap; }
  .ck-step-lbl.done { color:var(--ox); } .ck-step-lbl.active { color:var(--ink); } .ck-step-lbl.idle { color:var(--muted); }
  .ck-step-line { flex:1; height:1px; background:var(--border); margin:0 10px; min-width:16px; }
  .ck-step-line.done { background:var(--ox); }

  .ck-container { max-width:1240px; margin:0 auto; padding:36px 32px 72px; }
  @media(max-width:640px){ .ck-container { padding:24px 20px 60px; } }
  .ck-grid { display:grid; grid-template-columns:1fr 320px; gap:24px; align-items:start; }
  @media(max-width:960px){ .ck-grid { grid-template-columns:1fr; } }

  .ck-card { background:#fff; border:1px solid var(--border); border-radius:10px; overflow:hidden; margin-bottom:14px; }
  .ck-card-head { padding:14px 22px; border-bottom:1px solid var(--border); background:var(--cream); display:flex; align-items:center; justify-content:space-between; }
  .ck-card-head-left { display:flex; align-items:center; gap:10px; }
  .ck-head-icon { width:28px; height:28px; border-radius:6px; background:rgba(107,26,26,.08); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .ck-head-icon svg { width:14px; height:14px; color:var(--ox); }
  .ck-card-title { font-size:13px; font-weight:700; color:var(--ink); }
  .ck-edit-btn { display:flex; align-items:center; gap:5px; font-size:11px; font-weight:600; color:var(--ox); background:none; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; letter-spacing:.05em; text-transform:uppercase; transition:color .15s; }
  .ck-edit-btn:hover { color:var(--ox-light); }
  .ck-edit-btn svg { width:11px; height:11px; }
  .ck-card-body { padding:22px; }

  .ck-field-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:12px; }
  @media(max-width:640px){ .ck-field-row { grid-template-columns:1fr; } }
  .ck-field { margin-bottom:12px; }
  .ck-label { display:block; font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:5px; }
  .ck-req { color:var(--ox); }
  .ck-input, .ck-textarea { width:100%; padding:9px 13px; border:1px solid var(--border); border-radius:6px; font-size:13px; font-family:'DM Sans',sans-serif; color:var(--ink); background:var(--cream); outline:none; transition:border-color .2s, background .2s; }
  .ck-input:focus, .ck-textarea:focus { border-color:var(--ox); background:#fff; }
  .ck-input.err, .ck-textarea.err { border-color:var(--ox); }
  .ck-input::placeholder, .ck-textarea::placeholder { color:var(--muted); }
  .ck-textarea { resize:vertical; min-height:84px; }
  .ck-err { display:flex; align-items:center; gap:5px; font-size:11px; color:var(--ox); margin-top:4px; }
  .ck-err svg { width:11px; height:11px; flex-shrink:0; }

  .ck-review-dl { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  @media(max-width:640px){ .ck-review-dl { grid-template-columns:1fr; } }
  .ck-review-cell { padding:10px 13px; background:var(--cream); border-radius:6px; }
  .ck-review-cell.span2 { grid-column:1/-1; }
  .ck-review-dt { font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); margin-bottom:3px; }
  .ck-review-dd { font-size:13px; font-weight:600; color:var(--ink); }

  .ck-pay-opts { display:flex; flex-direction:column; gap:8px; }
  .ck-pay-opt { display:flex; align-items:center; gap:12px; padding:13px 15px; border:1px solid var(--border); border-radius:7px; cursor:pointer; background:#fff; transition:border-color .2s; }
  .ck-pay-opt.selected { border-color:var(--ox); background:rgba(107,26,26,.03); }
  .ck-pay-opt input { accent-color:var(--ox); width:15px; height:15px; cursor:pointer; flex-shrink:0; }
  .ck-pay-opt-name { font-size:13px; font-weight:600; color:var(--ink); }
  .ck-pay-opt-desc { font-size:11px; color:var(--muted); font-weight:300; margin-top:1px; }
  .ck-pay-badges { display:flex; gap:5px; margin-left:auto; flex-shrink:0; }
  .ck-badge { padding:3px 7px; border-radius:4px; font-size:10px; font-weight:700; }
  .ck-badge.mtn { background:#FFD700; color:#5A3E00; }
  .ck-badge.org { background:#FF6600; color:#fff; }
  .ck-badge.bk  { background:var(--cream); color:var(--mid); border:1px solid var(--border); }

  .ck-actions { display:flex; gap:10px; flex-wrap:wrap; }
  .btn-ox { flex:1; min-width:140px; padding:12px 18px; background:var(--ox); color:#fff; border:none; border-radius:7px; font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; font-family:'DM Sans',sans-serif; transition:background .2s; letter-spacing:.03em; }
  .btn-ox:hover:not(:disabled) { background:var(--ox-light); }
  .btn-ox:disabled { opacity:.5; cursor:not-allowed; }
  .btn-ox svg { width:14px; height:14px; }
  .btn-back { padding:12px 18px; background:var(--cream); color:var(--mid); border:1px solid var(--border); border-radius:7px; font-size:13px; font-weight:500; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:7px; font-family:'DM Sans',sans-serif; transition:background .2s; white-space:nowrap; }
  .btn-back:hover { background:var(--border); }
  .btn-back svg { width:14px; height:14px; }
  @keyframes spin { to { transform:rotate(360deg); } }
  .spin { animation:spin .7s linear infinite; }

  .ck-summary { background:#fff; border:1px solid var(--border); border-radius:10px; overflow:hidden; position:sticky; top:104px; }
  .ck-sum-head { padding:13px 20px; background:var(--cream); border-bottom:1px solid var(--border); font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); }
  .ck-sum-items { padding:14px 18px; max-height:200px; overflow-y:auto; }
  .ck-sum-item { display:flex; gap:9px; padding-bottom:10px; margin-bottom:10px; border-bottom:1px solid var(--border); }
  .ck-sum-item:last-child { border-bottom:none; margin-bottom:0; padding-bottom:0; }
  .ck-sum-img { width:46px; height:46px; border-radius:5px; overflow:hidden; background:var(--cream); flex-shrink:0; display:flex; align-items:center; justify-content:center; }
  .ck-sum-img img { width:100%; height:100%; object-fit:cover; }
  .ck-sum-img svg { width:18px; height:18px; color:#C8BFB8; }
  .ck-sum-name { font-size:12px; font-weight:600; color:var(--ink); line-height:1.3; }
  .ck-sum-qty  { font-size:11px; color:var(--muted); margin-top:2px; }
  .ck-sum-price { font-size:12px; font-weight:600; color:var(--mid); margin-left:auto; white-space:nowrap; }
  .ck-sum-totals { padding:14px 18px; border-top:1px solid var(--border); }
  .ck-sum-line { display:flex; align-items:center; justify-content:space-between; font-size:12px; margin-bottom:6px; }
  .ck-sum-line-lbl { color:var(--muted); }
  .ck-sum-line-val { color:var(--mid); font-weight:600; }
  .ck-sum-line-val.free { color:#166534; font-size:11px; }
  .ck-sum-total { display:flex; align-items:baseline; justify-content:space-between; padding-top:10px; border-top:1px solid var(--border); margin-top:4px; }
  .ck-sum-total-lbl { font-size:13px; font-weight:600; color:var(--ink); }
  .ck-sum-total-val { font-family:'Playfair Display',serif; font-size:1.3rem; font-weight:700; color:var(--ink); }
`;

const formatFCFA = (n) =>
  new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n)) + ' FCFA';

const ErrMsg = ({ msg }) => msg ? (
  <div className="ck-err">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    {msg}
  </div>
) : null;

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ customer_name:'', customer_email:'', customer_phone:'', customer_address:'', payment_method:'campay' });

  useEffect(() => {
    const c = getCart();
    if (!c.length) router.visit('/cart/');
    setCart(c);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]:'' }));
  };

  const validate = () => {
    const e = {};
    if (!formData.customer_name.trim())    e.customer_name    = 'Name is required';
    if (!formData.customer_email.trim())   e.customer_email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.customer_email)) e.customer_email = 'Invalid email';
    if (!formData.customer_phone.trim())   e.customer_phone   = 'Phone is required';
    if (!formData.customer_address.trim()) e.customer_address = 'Address is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleContinue = () => { if (validate()) { setCurrentStep(2); window.scrollTo({ top:0, behavior:'smooth' }); } };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { setCurrentStep(1); return; }
    if (!cart.length) return;
    setLoading(true);
    try {
      const res = await fetch('/checkout/', { method:'POST', headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ ...formData, items: cart.map(i => ({ product_id:i.product_id, quantity:i.quantity })) }) });
      const data = await res.json();
      if (data.success) { clearCart(); router.visit(`/payment/${data.order_number}/`); }
      else { alert(data.errors || 'Failed to create order'); setLoading(false); }
    } catch { alert('An error occurred.'); setLoading(false); }
  };

  const cartTotal = getCartTotal();
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const st = (n) => n < currentStep ? 'done' : n === currentStep ? 'active' : 'idle';

  return (
    <ShopLayout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="ck-root">
        <div className="ck-header">
          <div className="ck-header-inner">
            <div className="ck-header-label">Almost there</div>
            <h1 className="ck-header-title">Checkout</h1>
            <p className="ck-header-sub">Complete your order in a few simple steps</p>
          </div>
        </div>

        <div className="ck-stepper">
          <div className="ck-stepper-inner">
            {[{n:1,l:'Information'},{n:2,l:'Review'},{n:3,l:'Payment'}].map((s,i,arr) => (
              <React.Fragment key={s.n}>
                <div className="ck-step">
                  <div className={`ck-step-dot ${st(s.n)}`}>
                    {st(s.n)==='done'
                      ? <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                      : s.n}
                  </div>
                  <span className={`ck-step-lbl ${st(s.n)}`}>{s.l}</span>
                </div>
                {i < arr.length-1 && <div className={`ck-step-line ${st(s.n)==='done'?'done':''}`}/>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="ck-container">
          <form onSubmit={handleSubmit}>
            <div className="ck-grid">
              <div>
                {currentStep === 1 && (
                  <div className="ck-card">
                    <div className="ck-card-head">
                      <div className="ck-card-head-left">
                        <div className="ck-head-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>
                        <span className="ck-card-title">Customer Information</span>
                      </div>
                    </div>
                    <div className="ck-card-body">
                      <div className="ck-field-row">
                        <div className="ck-field">
                          <label className="ck-label">Full Name <span className="ck-req">*</span></label>
                          <input className={`ck-input${errors.customer_name?' err':''}`} type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} placeholder="John Doe"/>
                          <ErrMsg msg={errors.customer_name}/>
                        </div>
                        <div className="ck-field">
                          <label className="ck-label">Email <span className="ck-req">*</span></label>
                          <input className={`ck-input${errors.customer_email?' err':''}`} type="email" name="customer_email" value={formData.customer_email} onChange={handleChange} placeholder="john@example.com"/>
                          <ErrMsg msg={errors.customer_email}/>
                        </div>
                      </div>
                      <div className="ck-field">
                        <label className="ck-label">Phone Number <span className="ck-req">*</span></label>
                        <input className={`ck-input${errors.customer_phone?' err':''}`} type="tel" name="customer_phone" value={formData.customer_phone} onChange={handleChange} placeholder="+237 6XX XXX XXX"/>
                        <ErrMsg msg={errors.customer_phone}/>
                      </div>
                      <div className="ck-field">
                        <label className="ck-label">Delivery Address <span className="ck-req">*</span></label>
                        <textarea className={`ck-textarea${errors.customer_address?' err':''}`} name="customer_address" value={formData.customer_address} onChange={handleChange} placeholder="Street, neighbourhood, city…"/>
                        <ErrMsg msg={errors.customer_address}/>
                      </div>
                      <div style={{ marginTop:18 }}>
                        <button type="button" className="btn-ox" style={{ width:'100%' }} onClick={handleContinue}>
                          Continue to Review
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <>
                    <div className="ck-card">
                      <div className="ck-card-head">
                        <div className="ck-card-head-left">
                          <div className="ck-head-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>
                          <span className="ck-card-title">Your Information</span>
                        </div>
                        <button type="button" className="ck-edit-btn" onClick={() => setCurrentStep(1)}>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          Edit
                        </button>
                      </div>
                      <div className="ck-card-body">
                        <div className="ck-review-dl">
                          <div className="ck-review-cell"><div className="ck-review-dt">Name</div><div className="ck-review-dd">{formData.customer_name}</div></div>
                          <div className="ck-review-cell"><div className="ck-review-dt">Email</div><div className="ck-review-dd">{formData.customer_email}</div></div>
                          <div className="ck-review-cell"><div className="ck-review-dt">Phone</div><div className="ck-review-dd">{formData.customer_phone}</div></div>
                          <div className="ck-review-cell span2"><div className="ck-review-dt">Delivery Address</div><div className="ck-review-dd">{formData.customer_address}</div></div>
                        </div>
                      </div>
                    </div>

                    <div className="ck-card">
                      <div className="ck-card-head">
                        <div className="ck-card-head-left">
                          <div className="ck-head-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg></div>
                          <span className="ck-card-title">Payment Method</span>
                        </div>
                      </div>
                      <div className="ck-card-body">
                        <div className="ck-pay-opts">
                          <label className={`ck-pay-opt ${formData.payment_method==='campay'?'selected':''}`}>
                            <input type="radio" name="payment_method" value="campay" checked={formData.payment_method==='campay'} onChange={handleChange}/>
                            <div><div className="ck-pay-opt-name">Mobile Money</div><div className="ck-pay-opt-desc">Pay via MTN or Orange Money through Campay</div></div>
                            <div className="ck-pay-badges"><span className="ck-badge mtn">MTN</span><span className="ck-badge org">ORANGE</span></div>
                          </label>
                          <label className={`ck-pay-opt ${formData.payment_method==='bank_transfer'?'selected':''}`}>
                            <input type="radio" name="payment_method" value="bank_transfer" checked={formData.payment_method==='bank_transfer'} onChange={handleChange}/>
                            <div><div className="ck-pay-opt-name">Bank Transfer</div><div className="ck-pay-opt-desc">Transfer to our Africa Golden Bank account</div></div>
                            <div className="ck-pay-badges"><span className="ck-badge bk">BANK</span></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="ck-actions">
                      <button type="button" className="btn-back" onClick={() => setCurrentStep(1)}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                        Back
                      </button>
                      <button type="submit" className="btn-ox" disabled={loading || !cart.length}>
                        {loading ? (
                          <><svg className="spin" width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity=".25"/><path fill="currentColor" opacity=".75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Creating Order…</>
                        ) : (
                          <>Place Order<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="ck-summary">
                <div className="ck-sum-head">Order Summary</div>
                <div className="ck-sum-items">
                  {cart.map(item => (
                    <div className="ck-sum-item" key={item.product_id}>
                      <div className="ck-sum-img">{item.image_url ? <img src={item.image_url} alt={item.name}/> : <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>}</div>
                      <div style={{ flex:1, minWidth:0 }}><div className="ck-sum-name">{item.name}</div><div className="ck-sum-qty">Qty: {item.quantity}</div></div>
                      <div className="ck-sum-price">{formatFCFA(item.unit_price * item.quantity)}</div>
                    </div>
                  ))}
                </div>
                <div className="ck-sum-totals">
                  <div className="ck-sum-line"><span className="ck-sum-line-lbl">Subtotal ({totalItems} items)</span><span className="ck-sum-line-val">{formatFCFA(cartTotal)}</span></div>
                  <div className="ck-sum-line"><span className="ck-sum-line-lbl">Delivery (Douala)</span><span className="ck-sum-line-val free">FREE</span></div>
                  <div className="ck-sum-line"><span className="ck-sum-line-lbl">Tax</span><span className="ck-sum-line-val" style={{ color:'var(--muted)', fontSize:11 }}>Included</span></div>
                  <div className="ck-sum-total"><span className="ck-sum-total-lbl">Total</span><span className="ck-sum-total-val">{formatFCFA(cartTotal)}</span></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ShopLayout>
  );
}