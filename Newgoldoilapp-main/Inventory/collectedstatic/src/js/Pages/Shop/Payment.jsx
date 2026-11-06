import React, { useState, useEffect } from 'react';
import ShopLayout from './Components/ShopLayout';
import { Link } from '@inertiajs/react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root { --ox:#6B1A1A; --ox-dark:#4A0F0F; --ox-light:#8B2E2E; --cream:#FAF7F2; --ink:#0E0C0B; --mid:#3A3330; --muted:#8C847C; --border:#E5DDD5; }
  .pm-root { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--ink); min-height:80vh; }

  .pm-container { max-width:760px; margin:0 auto; padding:40px 32px 72px; }
  @media(max-width:640px){ .pm-container { padding:28px 20px 60px; } }

  /* ORDER SNAPSHOT */
  .pm-order-card { background:#fff; border:1px solid var(--border); border-radius:10px; overflow:hidden; margin-bottom:20px; }
  .pm-order-head { padding:13px 20px; background:var(--cream); border-bottom:1px solid var(--border); display:flex; align-items:center; gap:9px; }
  .pm-order-head-icon { width:26px; height:26px; border-radius:5px; background:rgba(107,26,26,.08); display:flex; align-items:center; justify-content:center; }
  .pm-order-head-icon svg { width:13px; height:13px; color:var(--ox); }
  .pm-order-head-title { font-size:12px; font-weight:700; color:var(--ink); text-transform:uppercase; letter-spacing:.06em; }
  .pm-order-head-num { font-size:11px; color:var(--muted); margin-left:auto; }
  .pm-order-body { padding:16px 20px; }
  .pm-order-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:12px; }
  @media(max-width:640px){ .pm-order-grid { grid-template-columns:1fr 1fr; } }
  .pm-order-cell { padding:10px 12px; background:var(--cream); border-radius:6px; }
  .pm-order-cell.highlight { background:rgba(107,26,26,.06); }
  .pm-order-dt { font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); margin-bottom:3px; }
  .pm-order-dd { font-size:13px; font-weight:600; color:var(--ink); }
  .pm-order-dd.price { font-family:'Playfair Display',serif; font-size:1.1rem; color:var(--ox); }
  .pm-order-items { background:var(--cream); border-radius:6px; padding:12px; }
  .pm-order-item { display:flex; align-items:center; justify-content:space-between; font-size:12px; padding:3px 0; }
  .pm-order-item-name { color:var(--mid); }
  .pm-order-item-price { color:var(--ink); font-weight:600; }

  /* PAY CARD */
  .pm-card { background:#fff; border:1px solid var(--border); border-radius:10px; overflow:hidden; margin-bottom:16px; }
  .pm-card-head { padding:14px 22px; border-bottom:1px solid var(--border); }
  .pm-card-title { font-family:'Playfair Display',serif; font-size:1.2rem; font-weight:600; color:var(--ink); margin-bottom:3px; }
  .pm-card-sub { font-size:12px; color:var(--muted); font-weight:300; }
  .pm-card-body { padding:22px; }

  .pm-err { display:flex; align-items:flex-start; gap:9px; padding:11px 14px; background:rgba(107,26,26,.06); border:1px solid rgba(107,26,26,.2); border-radius:7px; margin-bottom:16px; font-size:13px; color:var(--ox); }
  .pm-err svg { width:14px; height:14px; flex-shrink:0; margin-top:1px; }

  .pm-momo-box { background:var(--cream); border:1px solid var(--border); border-radius:7px; padding:16px; margin-bottom:14px; }
  .pm-momo-info { font-size:12px; color:var(--muted); font-weight:300; line-height:1.7; margin-bottom:12px; display:flex; gap:7px; }
  .pm-momo-info svg { width:13px; height:13px; flex-shrink:0; margin-top:2px; color:var(--ox); }
  .pm-label { display:block; font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:5px; }
  .pm-req { color:var(--ox); }
  .pm-input { width:100%; padding:9px 13px; border:1px solid var(--border); border-radius:6px; font-size:13px; font-family:'DM Sans',sans-serif; color:var(--ink); background:#fff; outline:none; transition:border-color .2s; }
  .pm-input:focus { border-color:var(--ox); }
  .pm-input::placeholder { color:var(--muted); }
  .pm-hint { font-size:11px; color:var(--muted); margin-top:5px; font-weight:300; }

  .pm-divider { display:flex; align-items:center; gap:12px; margin:20px 0; }
  .pm-divider-line { flex:1; height:1px; background:var(--border); }
  .pm-divider-label { font-size:11px; font-weight:700; color:var(--muted); letter-spacing:.1em; }

  .pm-bank-box { background:var(--cream); border:1px solid var(--border); border-radius:7px; padding:16px; margin-bottom:14px; }
  .pm-bank-title { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); margin-bottom:10px; }
  .pm-bank-dl { display:flex; flex-direction:column; gap:8px; }
  .pm-bank-row { display:flex; align-items:baseline; justify-content:space-between; gap:12px; font-size:12px; }
  .pm-bank-dt { color:var(--muted); font-weight:400; flex-shrink:0; }
  .pm-bank-dd { font-weight:600; color:var(--ink); text-align:right; }
  .pm-bank-dd.mono { font-family:monospace; font-size:11px; }
  .pm-bank-dd.amount { font-family:'Playfair Display',serif; font-size:1rem; color:var(--ox); }
  .pm-bank-divider { height:1px; background:var(--border); margin:6px 0; }

  .btn-ox { width:100%; padding:12px; background:var(--ox); color:#fff; border:none; border-radius:7px; font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; font-family:'DM Sans',sans-serif; transition:background .2s; }
  .btn-ox:hover:not(:disabled) { background:var(--ox-light); }
  .btn-ox:disabled { opacity:.5; cursor:not-allowed; }
  .btn-ox.blue { background:#1D4ED8; }
  .btn-ox.blue:hover:not(:disabled) { background:#1E40AF; }
  .btn-ox svg { width:14px; height:14px; }
  @keyframes spin { to { transform:rotate(360deg); } }
  .spin { animation:spin .7s linear infinite; }

  /* PROCESSING STATE */
  .pm-processing { text-align:center; padding:20px 0; }
  .pm-processing-icon { width:72px; height:72px; border-radius:50%; background:var(--cream); border:2px solid var(--border); display:flex; align-items:center; justify-content:center; margin:0 auto 20px; }
  .pm-processing-icon svg { width:32px; height:32px; color:var(--ox); animation:spin .8s linear infinite; }
  .pm-processing-title { font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:600; color:var(--ink); margin-bottom:8px; }
  .pm-processing-sub { font-size:13px; color:var(--muted); font-weight:300; line-height:1.7; margin-bottom:20px; }
  .pm-processing-box { background:var(--cream); border:1px solid var(--border); border-radius:7px; padding:14px 18px; max-width:320px; margin:0 auto 20px; }
  .pm-tx-row { display:flex; align-items:center; justify-content:space-between; font-size:12px; margin-bottom:6px; }
  .pm-tx-row:last-child { margin-bottom:0; }
  .pm-tx-label { color:var(--muted); }
  .pm-tx-val { font-weight:600; color:var(--ink); font-family:monospace; font-size:11px; }
  .pm-tx-countdown { color:var(--ox); font-size:1rem; font-family:monospace; font-weight:700; }
  .pm-dots { display:flex; justify-content:center; gap:5px; margin-bottom:10px; }
  .pm-dot { width:7px; height:7px; border-radius:50%; background:var(--ox); animation:bounce .8s ease infinite; }
  .pm-dot:nth-child(2) { animation-delay:.15s; }
  .pm-dot:nth-child(3) { animation-delay:.3s; }
  @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  .pm-processing-note { font-size:11px; color:var(--muted); }

  /* SUCCESS STATE */
  .pm-success { text-align:center; padding:24px 0; }
  .pm-success-icon { width:72px; height:72px; border-radius:50%; background:rgba(34,197,94,.1); border:2px solid rgba(34,197,94,.25); display:flex; align-items:center; justify-content:center; margin:0 auto 20px; }
  .pm-success-icon svg { width:32px; height:32px; color:#166534; }
  .pm-success-title { font-family:'Playfair Display',serif; font-size:1.6rem; font-weight:700; color:var(--ink); margin-bottom:8px; }
  .pm-success-sub { font-size:13px; color:var(--muted); font-weight:300; margin-bottom:20px; }
  .pm-success-box { background:rgba(34,197,94,.06); border:1px solid rgba(34,197,94,.2); border-radius:7px; padding:12px 18px; max-width:280px; margin:0 auto 24px; display:flex; align-items:center; justify-content:space-between; }
  .pm-success-box-lbl { font-size:11px; color:var(--muted); }
  .pm-success-box-val { font-size:12px; font-weight:700; color:var(--ink); font-family:monospace; }

  /* FAILED STATE */
  .pm-failed { text-align:center; padding:24px 0; }
  .pm-failed-icon { width:72px; height:72px; border-radius:50%; background:rgba(107,26,26,.08); border:2px solid rgba(107,26,26,.2); display:flex; align-items:center; justify-content:center; margin:0 auto 20px; }
  .pm-failed-icon svg { width:32px; height:32px; color:var(--ox); }
  .pm-failed-title { font-family:'Playfair Display',serif; font-size:1.6rem; font-weight:700; color:var(--ink); margin-bottom:8px; }
  .pm-failed-sub { font-size:13px; color:var(--muted); font-weight:300; margin-bottom:20px; }

  /* SUBMITTED STATE */
  .pm-submitted { text-align:center; padding:24px 0; }
  .pm-submitted-icon { width:72px; height:72px; border-radius:50%; background:rgba(29,78,216,.08); border:2px solid rgba(29,78,216,.2); display:flex; align-items:center; justify-content:center; margin:0 auto 20px; }
  .pm-submitted-icon svg { width:32px; height:32px; color:#1D4ED8; }
  .pm-submitted-title { font-family:'Playfair Display',serif; font-size:1.5rem; font-weight:700; color:var(--ink); margin-bottom:8px; }
  .pm-submitted-sub { font-size:13px; color:var(--muted); font-weight:300; margin-bottom:20px; }
  .pm-submitted-steps { background:var(--cream); border:1px solid var(--border); border-radius:7px; padding:16px; max-width:380px; margin:0 auto 24px; text-align:left; }
  .pm-submitted-step { display:flex; gap:9px; font-size:12px; color:var(--muted); margin-bottom:8px; line-height:1.5; }
  .pm-submitted-step:last-child { margin-bottom:0; }
  .pm-submitted-step svg { width:14px; height:14px; color:var(--ox); flex-shrink:0; margin-top:1px; }

  .pm-btn-row { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
  .btn-ox-inline { display:inline-flex; align-items:center; gap:7px; padding:11px 22px; background:var(--ox); color:#fff; border-radius:6px; font-size:13px; font-weight:600; text-decoration:none; font-family:'DM Sans',sans-serif; transition:background .2s; }
  .btn-ox-inline:hover { background:var(--ox-light); }
  .btn-blue-inline { display:inline-flex; align-items:center; gap:7px; padding:11px 22px; background:#1D4ED8; color:#fff; border-radius:6px; font-size:13px; font-weight:600; text-decoration:none; font-family:'DM Sans',sans-serif; transition:background .2s; }
  .btn-blue-inline:hover { background:#1E40AF; }
  .btn-ghost-inline { display:inline-flex; align-items:center; gap:7px; padding:11px 22px; background:var(--cream); color:var(--mid); border:1px solid var(--border); border-radius:6px; font-size:13px; font-weight:500; text-decoration:none; font-family:'DM Sans',sans-serif; transition:background .2s; }
  .btn-ghost-inline:hover { background:var(--border); }
`;

const formatFCFA = (n) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits:0 }).format(Math.round(n)) + ' FCFA';

export default function Payment({ order }) {
  const [paymentStep, setPaymentStep] = useState('method');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [countdown, setCountdown] = useState(300);

  useEffect(() => {
    if (paymentStep !== 'processing') return;
    const t = setInterval(() => setCountdown(p => p <= 1 ? (clearInterval(t), 0) : p - 1), 1000);
    return () => clearInterval(t);
  }, [paymentStep]);

  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  const handleCampay = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    if (!phoneNumber.trim()) { setError('Please enter your phone number'); setLoading(false); return; }
    try {
      const res = await fetch(`/payment/${order.order_number}/campay/initiate/`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ phone_number: phoneNumber }) });
      const data = await res.json();
      if (data.success) {
        setTransactionRef(data.external_reference);
        setPaymentStep('processing');
        setCountdown(300);
        const iv = setInterval(async () => {
          try {
            const r2 = await fetch(`/payment/${order.order_number}/check-status/`);
            const d2 = await r2.json();
            if (d2.success) {
              if (d2.status === 'successful') { clearInterval(iv); setPaymentStep('success'); setLoading(false); }
              else if (d2.status === 'failed') { clearInterval(iv); setPaymentStep('failed'); setError(d2.message || 'Payment failed'); setLoading(false); }
            }
          } catch {}
        }, 5000);
        setTimeout(() => clearInterval(iv), 300000);
      } else { setError(data.errors || 'Failed to initiate payment'); setLoading(false); }
    } catch { setError('An error occurred. Please try again.'); setLoading(false); }
  };

  const handleBank = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const ref = e.target.payment_reference.value;
    if (!ref.trim()) { setError('Please enter your transaction reference'); setLoading(false); return; }
    try {
      const res = await fetch(`/payment/${order.order_number}/bank-transfer/`, { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:`payment_reference=${encodeURIComponent(ref)}` });
      const data = await res.json();
      if (data.success) setPaymentStep('submitted');
      else setError(data.errors || 'Failed to submit payment details');
      setLoading(false);
    } catch { setError('An error occurred.'); setLoading(false); }
  };

  return (
    <ShopLayout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="pm-root">
        <div className="pm-container">

          {/* ORDER SNAPSHOT */}
          <div className="pm-order-card">
            <div className="pm-order-head">
              <div className="pm-order-head-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></div>
              <span className="pm-order-head-title">Order Summary</span>
              <span className="pm-order-head-num">#{order.order_number}</span>
            </div>
            <div className="pm-order-body">
              <div className="pm-order-grid">
                <div className="pm-order-cell"><div className="pm-order-dt">Customer</div><div className="pm-order-dd">{order.customer_name}</div></div>
                <div className="pm-order-cell"><div className="pm-order-dt">Email</div><div className="pm-order-dd" style={{ fontSize:12, wordBreak:'break-all' }}>{order.customer_email}</div></div>
                <div className="pm-order-cell"><div className="pm-order-dt">Phone</div><div className="pm-order-dd">{order.customer_phone}</div></div>
                <div className="pm-order-cell highlight"><div className="pm-order-dt">Total</div><div className="pm-order-dd price">{formatFCFA(order.total_amount)}</div></div>
              </div>
              <div className="pm-order-items">
                {order.items.map((item, i) => (
                  <div className="pm-order-item" key={i}>
                    <span className="pm-order-item-name">{item.product_name} × {item.quantity}</span>
                    <span className="pm-order-item-price">{formatFCFA(item.total_price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* METHOD STEP */}
          {paymentStep === 'method' && (
            <div className="pm-card">
              <div className="pm-card-head">
                <div className="pm-card-title">Choose Payment Method</div>
                <div className="pm-card-sub">Select how you'd like to pay for your order</div>
              </div>
              <div className="pm-card-body">
                {error && (
                  <div className="pm-err">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    {error}
                  </div>
                )}

                {/* Mobile Money */}
                <div style={{ marginBottom:8 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:12 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:'var(--ink)' }}>Mobile Money</div>
                    <span style={{ padding:'2px 7px', background:'#FFD700', color:'#5A3E00', borderRadius:4, fontSize:10, fontWeight:700 }}>MTN</span>
                    <span style={{ padding:'2px 7px', background:'#FF6600', color:'#fff', borderRadius:4, fontSize:10, fontWeight:700 }}>ORANGE</span>
                  </div>
                  <form onSubmit={handleCampay}>
                    <div className="pm-momo-box">
                      <div className="pm-momo-info">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        You'll receive a USSD prompt on your phone to approve the payment.
                      </div>
                      <label className="pm-label">Mobile Money Number <span className="pm-req">*</span></label>
                      <input className="pm-input" type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="237671234567"/>
                      <div className="pm-hint">Format: 237XXXXXXXXX (e.g. 237671234567)</div>
                    </div>
                    <button type="submit" className="btn-ox" disabled={loading}>
                      {loading ? <><svg className="spin" width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity=".25"/><path fill="currentColor" opacity=".75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Initiating…</>
                        : <>Pay {formatFCFA(order.total_amount)} with Mobile Money</>}
                    </button>
                  </form>
                </div>

                <div className="pm-divider">
                  <div className="pm-divider-line"/>
                  <span className="pm-divider-label">OR</span>
                  <div className="pm-divider-line"/>
                </div>

                {/* Bank Transfer */}
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--ink)', marginBottom:12 }}>Bank Transfer</div>
                  <div className="pm-bank-box">
                    <div className="pm-bank-title">Bank Details</div>
                    <div className="pm-bank-dl">
                      {[['Bank','AFRICA GOLDEN BANK',false],['Account Name','GOLD OIL TRADING LTD',false],['Account No.','10043 00101 37100049401 38',true]].map(([dt,dd,mono]) => (
                        <div className="pm-bank-row" key={dt}>
                          <span className="pm-bank-dt">{dt}</span>
                          <span className={`pm-bank-dd${mono?' mono':''}`}>{dd}</span>
                        </div>
                      ))}
                      <div className="pm-bank-divider"/>
                      <div className="pm-bank-row">
                        <span className="pm-bank-dt">Amount</span>
                        <span className="pm-bank-dd amount">{formatFCFA(order.total_amount)}</span>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleBank}>
                    <div style={{ marginBottom:12 }}>
                      <label className="pm-label">Transaction Reference <span className="pm-req">*</span></label>
                      <input className="pm-input" type="text" name="payment_reference" placeholder="Enter your bank transfer reference number"/>
                      <div className="pm-hint">After making the transfer, enter the transaction reference here.</div>
                    </div>
                    <button type="submit" className="btn-ox blue" disabled={loading}>
                      {loading ? 'Submitting…' : 'Submit Bank Transfer Details'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* PROCESSING */}
          {paymentStep === 'processing' && (
            <div className="pm-card">
              <div className="pm-card-body">
                <div className="pm-processing">
                  <div className="pm-processing-icon">
                    <svg fill="none" viewBox="0 0 24 24" width="32" height="32">
                      <circle cx="12" cy="12" r="10" stroke="var(--ox)" strokeWidth="3" opacity=".25"/>
                      <path fill="var(--ox)" opacity=".75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  </div>
                  <div className="pm-processing-title">Awaiting Payment Approval</div>
                  <p className="pm-processing-sub">
                    Check your phone <strong>{phoneNumber}</strong><br/>
                    Approve the payment request to complete your order.
                  </p>
                  <div className="pm-processing-box">
                    <div className="pm-tx-row"><span className="pm-tx-label">Reference</span><span className="pm-tx-val">{transactionRef}</span></div>
                    <div className="pm-tx-row"><span className="pm-tx-label">Time remaining</span><span className="pm-tx-countdown">{fmt(countdown)}</span></div>
                  </div>
                  <div className="pm-dots"><div className="pm-dot"/><div className="pm-dot"/><div className="pm-dot"/></div>
                  <p className="pm-processing-note">This page updates automatically when confirmed.</p>
                </div>
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {paymentStep === 'success' && (
            <div className="pm-card">
              <div className="pm-card-body">
                <div className="pm-success">
                  <div className="pm-success-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg></div>
                  <div className="pm-success-title">Payment Successful</div>
                  <p className="pm-success-sub">Your order is confirmed and being processed.</p>
                  <div className="pm-success-box">
                    <span className="pm-success-box-lbl">Order Number</span>
                    <span className="pm-success-box-val">{order.order_number}</span>
                  </div>
                  <div className="pm-btn-row">
                    <Link href={`/track/${order.order_number}/`} className="btn-ox-inline">Track Order</Link>
                    <Link href="/" className="btn-ghost-inline">Continue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAILED */}
          {paymentStep === 'failed' && (
            <div className="pm-card">
              <div className="pm-card-body">
                <div className="pm-failed">
                  <div className="pm-failed-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></div>
                  <div className="pm-failed-title">Payment Failed</div>
                  <p className="pm-failed-sub">{error || 'Please try again or choose a different method.'}</p>
                  <button className="btn-ox-inline" onClick={() => { setPaymentStep('method'); setError(''); setPhoneNumber(''); }}>Try Again</button>
                </div>
              </div>
            </div>
          )}

          {/* SUBMITTED */}
          {paymentStep === 'submitted' && (
            <div className="pm-card">
              <div className="pm-card-body">
                <div className="pm-submitted">
                  <div className="pm-submitted-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                  <div className="pm-submitted-title">Payment Details Submitted</div>
                  <p className="pm-submitted-sub">We'll verify your payment and contact you shortly.</p>
                  <div className="pm-submitted-steps">
                    {['Our team will verify your payment within 24 hours','We\'ll send you an email confirmation','Your order will be processed after verification'].map((t,i) => (
                      <div className="pm-submitted-step" key={i}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                        {t}
                      </div>
                    ))}
                  </div>
                  <div className="pm-btn-row">
                    <Link href={`/track/${order.order_number}/`} className="btn-blue-inline">Track Order</Link>
                    <Link href="/" className="btn-ghost-inline">Continue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </ShopLayout>
  );
}