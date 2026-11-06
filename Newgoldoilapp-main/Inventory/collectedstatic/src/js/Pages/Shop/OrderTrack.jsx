import React from 'react';
import ShopLayout from './Components/ShopLayout';
import { Link } from '@inertiajs/react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root { --ox:#6B1A1A; --ox-dark:#4A0F0F; --ox-light:#8B2E2E; --cream:#FAF7F2; --ink:#0E0C0B; --mid:#3A3330; --muted:#8C847C; --border:#E5DDD5; }
  .ot-root { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--ink); }

  .ot-container { max-width:1100px; margin:0 auto; padding:40px 32px 72px; }
  @media(max-width:640px){ .ot-container { padding:28px 20px 60px; } }

  /* STATUS BANNER */
  .ot-status-banner {
    border-radius:10px; overflow:hidden; margin-bottom:24px;
    display:flex; align-items:stretch;
  }
  .ot-status-accent { width:4px; flex-shrink:0; }
  .ot-status-body { flex:1; padding:20px 22px; background:#fff; border:1px solid var(--border); border-left:none; display:flex; align-items:center; gap:16px; flex-wrap:wrap; border-radius:0 10px 10px 0; }
  .ot-status-icon { width:44px; height:44px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .ot-status-icon svg { width:22px; height:22px; color:#fff; }
  .ot-status-label { font-family:'Playfair Display',serif; font-size:1.2rem; font-weight:600; color:var(--ink); margin-bottom:2px; }
  .ot-status-msg { font-size:12px; color:var(--muted); font-weight:300; }
  .ot-order-num { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; }
  .ot-status-date { font-size:11px; color:var(--muted); margin-top:2px; }
  .ot-pay-verified { display:inline-flex; align-items:center; gap:6px; padding:5px 12px; background:rgba(34,197,94,.08); border-radius:100px; font-size:11px; font-weight:600; color:#166534; margin-left:auto; }
  .ot-pay-verified svg { width:12px; height:12px; }

  /* PROGRESS BAR */
  .ot-progress-card { background:#fff; border:1px solid var(--border); border-radius:10px; padding:24px; margin-bottom:24px; overflow:hidden; }
  .ot-progress-title { font-size:12px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:20px; }
  .ot-steps-wrap { position:relative; }
  .ot-steps-track { position:absolute; top:12px; left:0; right:0; height:2px; background:var(--border); }
  .ot-steps-fill { position:absolute; top:12px; left:0; height:2px; background:var(--ox); transition:width .6s ease; }
  .ot-steps { position:relative; display:flex; justify-content:space-between; }
  .ot-step { display:flex; flex-direction:column; align-items:center; gap:8px; }
  .ot-step-dot { width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; transition:all .3s; border:2px solid var(--border); background:#fff; color:var(--muted); }
  .ot-step-dot.active { background:var(--ox); border-color:var(--ox); color:#fff; }
  .ot-step-dot svg { width:12px; height:12px; }
  .ot-step-label { font-size:10px; font-weight:600; letter-spacing:.04em; text-align:center; max-width:70px; }
  .ot-step-label.active { color:var(--ink); }
  .ot-step-label.idle   { color:var(--muted); }

  /* GRID */
  .ot-grid { display:grid; grid-template-columns:1fr 300px; gap:20px; align-items:start; }
  @media(max-width:960px){ .ot-grid { grid-template-columns:1fr; } }

  /* CARDS */
  .ot-card { background:#fff; border:1px solid var(--border); border-radius:10px; overflow:hidden; margin-bottom:16px; }
  .ot-card:last-child { margin-bottom:0; }
  .ot-card-head { padding:13px 20px; background:var(--cream); border-bottom:1px solid var(--border); display:flex; align-items:center; gap:9px; }
  .ot-card-icon { width:26px; height:26px; border-radius:5px; background:rgba(107,26,26,.08); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .ot-card-icon svg { width:13px; height:13px; color:var(--ox); }
  .ot-card-title { font-size:12px; font-weight:700; color:var(--ink); text-transform:uppercase; letter-spacing:.06em; }
  .ot-card-body { padding:18px 20px; }

  .ot-dl { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  @media(max-width:640px){ .ot-dl { grid-template-columns:1fr; } }
  .ot-dl-cell { padding:10px 12px; background:var(--cream); border-radius:6px; }
  .ot-dl-cell.span2 { grid-column:1/-1; }
  .ot-dl-dt { font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); margin-bottom:3px; }
  .ot-dl-dd { font-size:13px; font-weight:600; color:var(--ink); }

  .ot-items { display:flex; flex-direction:column; gap:14px; }
  .ot-item { display:flex; gap:12px; padding-bottom:14px; border-bottom:1px solid var(--border); }
  .ot-item:last-child { border-bottom:none; padding-bottom:0; }
  .ot-item-img { width:60px; height:60px; border-radius:7px; overflow:hidden; background:var(--cream); flex-shrink:0; display:flex; align-items:center; justify-content:center; }
  .ot-item-img img { width:100%; height:100%; object-fit:cover; }
  .ot-item-img svg { width:22px; height:22px; color:#C8BFB8; }
  .ot-item-name { font-size:13px; font-weight:600; color:var(--ink); margin-bottom:2px; }
  .ot-item-ref { font-size:11px; color:var(--muted); margin-bottom:6px; }
  .ot-item-footer { display:flex; align-items:center; justify-content:space-between; }
  .ot-item-qty { font-size:12px; color:var(--muted); }
  .ot-item-price { font-family:'Playfair Display',serif; font-size:14px; font-weight:600; color:var(--ink); }

  .ot-tx-item { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; background:var(--cream); border-radius:6px; margin-bottom:8px; }
  .ot-tx-item:last-child { margin-bottom:0; }
  .ot-tx-ref { font-size:12px; font-weight:600; color:var(--ink); }
  .ot-tx-meta { font-size:11px; color:var(--muted); }
  .ot-tx-amount { font-size:13px; font-weight:600; color:var(--ink); margin-bottom:4px; text-align:right; }
  .ot-tx-status { display:inline-block; padding:2px 8px; border-radius:100px; font-size:10px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; }
  .ot-tx-status.successful { background:rgba(34,197,94,.1); color:#166534; }
  .ot-tx-status.pending    { background:rgba(234,179,8,.1);  color:#854D0E; }
  .ot-tx-status.failed     { background:rgba(107,26,26,.1);  color:var(--ox); }

  /* SIDEBAR */
  .ot-sidebar { background:#fff; border:1px solid var(--border); border-radius:10px; overflow:hidden; position:sticky; top:104px; }
  .ot-sb-head { padding:13px 18px; background:var(--cream); border-bottom:1px solid var(--border); font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); }
  .ot-sb-body { padding:18px; }
  .ot-sb-line { display:flex; align-items:center; justify-content:space-between; font-size:12px; margin-bottom:7px; }
  .ot-sb-line-lbl { color:var(--muted); }
  .ot-sb-line-val { color:var(--mid); font-weight:600; }
  .ot-sb-line-val.free { color:#166534; font-size:11px; }
  .ot-sb-total { display:flex; align-items:baseline; justify-content:space-between; padding-top:12px; border-top:1px solid var(--border); margin-top:4px; margin-bottom:18px; }
  .ot-sb-total-lbl { font-size:13px; font-weight:600; color:var(--ink); }
  .ot-sb-total-val { font-family:'Playfair Display',serif; font-size:1.3rem; font-weight:700; color:var(--ink); }
  .ot-sb-actions { display:flex; flex-direction:column; gap:8px; }
  .btn-ox-full { display:block; width:100%; padding:11px; background:var(--ox); color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; text-align:center; text-decoration:none; font-family:'DM Sans',sans-serif; transition:background .2s; }
  .btn-ox-full:hover { background:var(--ox-light); }
  .btn-ghost-full { display:block; width:100%; padding:11px; background:var(--cream); color:var(--mid); border:1px solid var(--border); border-radius:6px; font-size:12px; font-weight:500; text-align:center; text-decoration:none; font-family:'DM Sans',sans-serif; transition:background .2s; }
  .btn-ghost-full:hover { background:var(--border); }
  .ot-support { padding:16px 18px; border-top:1px solid var(--border); }
  .ot-support-label { font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:10px; }
  .ot-support-link { display:flex; align-items:center; gap:7px; font-size:12px; font-weight:500; color:var(--ox); text-decoration:none; margin-bottom:7px; transition:color .15s; }
  .ot-support-link:hover { color:var(--ox-light); }
  .ot-support-link svg { width:13px; height:13px; flex-shrink:0; }
`;

const STATUS_MAP = {
  pending:             { label:'Pending Payment',         color:'#B8902A', bg:'#FDF3E0', icon:'clock' },
  payment_initiated:   { label:'Payment Initiated',       color:'#1D4ED8', bg:'#EFF6FF', icon:'dollar' },
  payment_processing:  { label:'Payment Processing',      color:'#1D4ED8', bg:'#EFF6FF', icon:'spin' },
  payment_submitted:   { label:'Payment Proof Submitted', color:'#7E22CE', bg:'#F5F3FF', icon:'doc' },
  payment_verified:    { label:'Payment Verified',        color:'#166534', bg:'#F0FDF4', icon:'check' },
  processing:          { label:'Processing',              color:'#4338CA', bg:'#EEF2FF', icon:'box' },
  shipped:             { label:'Shipped',                 color:'#0369A1', bg:'#E0F2FE', icon:'truck' },
  delivered:           { label:'Delivered',               color:'#166534', bg:'#F0FDF4', icon:'check' },
  cancelled:           { label:'Cancelled',               color:'#6B1A1A', bg:'#FEF2F2', icon:'x' },
  failed:              { label:'Payment Failed',          color:'#6B1A1A', bg:'#FEF2F2', icon:'warn' },
};

const StatusIcon = ({ type, size=22, spin=false }) => {
  const paths = {
    clock:  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>,
    dollar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
    spin:   null,
    doc:    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>,
    check:  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>,
    box:    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>,
    truck:  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zm-7-10v10M5 12H3m16 0h-2M5 12a2 2 0 00-2 2v3h2m14 0h2v-3a2 2 0 00-2-2h-2m0 0V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v5"/>,
    x:      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>,
    warn:   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
  };
  if (type === 'spin') return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24"
      style={{ animation:'spin .8s linear infinite' }}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25"/>
      <path fill="currentColor" opacity=".75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  );
  return <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">{paths[type]}</svg>;
};

const formatFCFA = (n) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits:0 }).format(Math.round(n)) + ' FCFA';

export default function OrderTrack({ order }) {
  const info = STATUS_MAP[order.status] || STATUS_MAP.pending;
  const ORDER_STEPS = [
    { id:'pending',          label:'Order Placed',       active:true },
    { id:'payment_verified', label:'Payment Verified',   active:['payment_verified','processing','shipped','delivered'].includes(order.status) },
    { id:'processing',       label:'Processing',         active:['processing','shipped','delivered'].includes(order.status) },
    { id:'shipped',          label:'Shipped',            active:['shipped','delivered'].includes(order.status) },
    { id:'delivered',        label:'Delivered',          active:order.status === 'delivered' },
  ];
  const activeCount = ORDER_STEPS.filter(s => s.active).length;
  const fillPct = ((activeCount - 1) / (ORDER_STEPS.length - 1)) * 100;
  const cancelled = ['cancelled','failed'].includes(order.status);

  return (
    <ShopLayout>
      <style dangerouslySetInnerHTML={{ __html: styles + `@keyframes spin { to { transform:rotate(360deg); } }` }} />
      <div className="ot-root">
        <div className="ot-container">

          {/* STATUS BANNER */}
          <div className="ot-status-banner">
            <div className="ot-status-accent" style={{ background:info.color }}/>
            <div className="ot-status-body">
              <div className="ot-status-icon" style={{ background:info.color }}>
                <StatusIcon type={info.icon}/>
              </div>
              <div>
                <div className="ot-status-label">{info.label}</div>
                <div className="ot-order-num" style={{ color:info.color }}>Order #{order.order_number}</div>
                <div className="ot-status-date">Placed on {order.created_at}</div>
              </div>
              {order.payment_verified && (
                <div className="ot-pay-verified">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                  </svg>
                  Payment Verified
                </div>
              )}
            </div>
          </div>

          {/* PROGRESS */}
          {!cancelled && (
            <div className="ot-progress-card">
              <div className="ot-progress-title">Order Progress</div>
              <div className="ot-steps-wrap">
                <div className="ot-steps-track"/>
                <div className="ot-steps-fill" style={{ width:`${fillPct}%` }}/>
                <div className="ot-steps">
                  {ORDER_STEPS.map(step => (
                    <div className="ot-step" key={step.id}>
                      <div className={`ot-step-dot ${step.active?'active':''}`}>
                        {step.active
                          ? <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                          : null}
                      </div>
                      <span className={`ot-step-label ${step.active?'active':'idle'}`}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="ot-grid">
            <div>
              {/* CUSTOMER INFO */}
              <div className="ot-card">
                <div className="ot-card-head">
                  <div className="ot-card-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>
                  <span className="ot-card-title">Customer Information</span>
                </div>
                <div className="ot-card-body">
                  <div className="ot-dl">
                    <div className="ot-dl-cell"><div className="ot-dl-dt">Name</div><div className="ot-dl-dd">{order.customer_name}</div></div>
                    <div className="ot-dl-cell"><div className="ot-dl-dt">Email</div><div className="ot-dl-dd" style={{ wordBreak:'break-all' }}>{order.customer_email}</div></div>
                    <div className="ot-dl-cell"><div className="ot-dl-dt">Phone</div><div className="ot-dl-dd">{order.customer_phone}</div></div>
                    <div className="ot-dl-cell"><div className="ot-dl-dt">Payment</div><div className="ot-dl-dd">{order.payment_method?.replace('_',' ')}</div></div>
                    <div className="ot-dl-cell span2"><div className="ot-dl-dt">Delivery Address</div><div className="ot-dl-dd">{order.customer_address}</div></div>
                  </div>
                </div>
              </div>

              {/* ORDER ITEMS */}
              <div className="ot-card">
                <div className="ot-card-head">
                  <div className="ot-card-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg></div>
                  <span className="ot-card-title">Order Items ({order.items.length})</span>
                </div>
                <div className="ot-card-body">
                  <div className="ot-items">
                    {order.items.map((item, i) => (
                      <div className="ot-item" key={i}>
                        <div className="ot-item-img">
                          {item.image_url
                            ? <img src={item.image_url} alt={item.product_name}/>
                            : <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>}
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div className="ot-item-name">{item.product_name}</div>
                          <div className="ot-item-ref">REF: {item.product_reference}</div>
                          <div className="ot-item-footer">
                            <span className="ot-item-qty">{item.quantity} × {formatFCFA(item.unit_price)}</span>
                            <span className="ot-item-price">{formatFCFA(item.total_price)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* TRANSACTIONS */}
              {order.transactions?.length > 0 && (
                <div className="ot-card">
                  <div className="ot-card-head">
                    <div className="ot-card-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                    <span className="ot-card-title">Payment Transactions</span>
                  </div>
                  <div className="ot-card-body">
                    {order.transactions.map((tx, i) => (
                      <div className="ot-tx-item" key={i}>
                        <div>
                          <div className="ot-tx-ref">{tx.reference}</div>
                          <div className="ot-tx-meta">{tx.operator} · {tx.created_at}</div>
                        </div>
                        <div>
                          <div className="ot-tx-amount">{formatFCFA(tx.amount)}</div>
                          <span className={`ot-tx-status ${tx.status}`}>{tx.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="ot-sidebar">
              <div className="ot-sb-head">Order Total</div>
              <div className="ot-sb-body">
                <div className="ot-sb-line"><span className="ot-sb-line-lbl">Subtotal</span><span className="ot-sb-line-val">{formatFCFA(order.total_amount)}</span></div>
                <div className="ot-sb-line"><span className="ot-sb-line-lbl">Delivery</span><span className="ot-sb-line-val free">FREE</span></div>
                <div className="ot-sb-line"><span className="ot-sb-line-lbl">Tax</span><span className="ot-sb-line-val" style={{ color:'var(--muted)', fontSize:11 }}>Included</span></div>
                <div className="ot-sb-total">
                  <span className="ot-sb-total-lbl">Total</span>
                  <span className="ot-sb-total-val">{formatFCFA(order.total_amount)}</span>
                </div>
                <div className="ot-sb-actions">
                  {order.status === 'pending' && (
                    <Link href={`/payment/${order.order_number}/`} className="btn-ox-full">Complete Payment</Link>
                  )}
                  <Link href="/" className="btn-ghost-full">Continue Shopping</Link>
                </div>
              </div>
              <div className="ot-support">
                <div className="ot-support-label">Need Help?</div>
                <a href="tel:+237671516335" className="ot-support-link">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  +237 671 516 335
                </a>
                <a href="mailto:goldoiltradingltd@gmail.com" className="ot-support-link">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}