import React from 'react';
import Layout from './components/Layout';
import { Link } from '@inertiajs/react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

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

  .dash-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 28px 0;
  }
  @media(min-width:640px){ .dash-root { padding: 48px 0; } }

  .dash-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 16px;
  }
  @media(min-width:640px){ .dash-container { padding: 0 24px; } }
  @media(min-width:1024px){ .dash-container { padding: 0 32px; } }

  /* ── HEADER ── */
  .dash-header {
    margin-bottom: 28px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
  @media(min-width:640px){
    .dash-header {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 40px;
      gap: 16px;
    }
  }
  .dash-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ox);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  @media(min-width:640px){ .dash-label { font-size: 11px; letter-spacing: 0.2em; margin-bottom: 10px; } }
  .dash-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .dash-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 6vw, 2.8rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
  }
  .dash-sub {
    font-size: 12px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }
  @media(min-width:640px){ .dash-sub { font-size: 14px; } }
  .dash-date {
    font-size: 11px;
    color: var(--muted);
    font-weight: 500;
    padding: 8px 14px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 6px;
    white-space: nowrap;
    align-self: flex-start;
  }
  @media(min-width:640px){ .dash-date { font-size: 12px; padding: 10px 18px; align-self: auto; } }

  /* ── STAT CARDS ── */
  .stat-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
    margin-bottom: 28px;
  }
  @media(min-width:520px){ .stat-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
  @media(min-width:900px){ .stat-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; } }

  .stat-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    transition: transform .2s, box-shadow .2s, border-color .2s;
  }
  @media(min-width:640px){ .stat-card { padding: 28px; } }
  .stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(107,26,26,0.08);
    border-color: var(--ox-light);
  }
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px;
    height: 100%;
    background: var(--ox);
  }
  .stat-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  @media(min-width:640px){ .stat-top { margin-bottom: 18px; } }
  .stat-icon {
    width: 38px;
    height: 38px;
    border-radius: 9px;
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media(min-width:640px){ .stat-icon { width: 46px; height: 46px; border-radius: 10px; } }
  .stat-icon svg { width: 18px; height: 18px; color: var(--ox); }
  @media(min-width:640px){ .stat-icon svg { width: 22px; height: 22px; } }
  .stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1;
    word-break: break-word;
  }
  @media(min-width:640px){ .stat-val { font-size: 30px; } }
  .stat-val.warn { color: #B45309; }
  .stat-val.danger { color: var(--ox); }
  .stat-lbl {
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 6px;
  }
  @media(min-width:640px){ .stat-lbl { font-size: 12px; letter-spacing: 0.06em; } }
  .stat-foot {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
    font-size: 11px;
    color: var(--muted);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media(min-width:640px){ .stat-foot { margin-top: 16px; padding-top: 14px; font-size: 12px; } }
  .stat-link {
    font-size: 11px;
    font-weight: 600;
    color: var(--ox);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: gap .2s;
  }
  @media(min-width:640px){ .stat-link { font-size: 12px; } }
  .stat-link:hover { gap: 9px; }
  .stat-link svg { width: 14px; height: 14px; flex-shrink: 0; }

  /* ── SECONDARY PANELS ── */
  .panel-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 28px;
  }
  @media(min-width:900px){ .panel-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; } }

  .panel {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }
  .panel-head {
    padding: 16px 18px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--cream);
    gap: 10px;
    flex-wrap: wrap;
  }
  @media(min-width:640px){ .panel-head { padding: 20px 24px; } }
  .panel-head h3 {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--ink);
  }
  @media(min-width:640px){ .panel-head h3 { font-size: 17px; } }
  .panel-head a {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--ox);
    text-decoration: none;
    white-space: nowrap;
  }
  @media(min-width:640px){ .panel-head a { font-size: 11px; } }
  .panel-body { padding: 16px 18px; }
  @media(min-width:640px){ .panel-body { padding: 22px 24px; } }
  .panel-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    gap: 10px;
  }
  @media(min-width:640px){ .panel-row { padding: 12px 0; } }
  .panel-row:last-child { border-bottom: none; padding-bottom: 0; }
  .panel-row-label { font-size: 12px; color: var(--mid); font-weight: 400; }
  @media(min-width:640px){ .panel-row-label { font-size: 13px; } }
  .panel-row-val { font-size: 14px; font-weight: 700; color: var(--ink); white-space: nowrap; }
  @media(min-width:640px){ .panel-row-val { font-size: 15px; } }
  .panel-row-val.pending { color: #B45309; }
  .panel-row-val.done { color: #15803D; }
  .panel-note {
    font-size: 10px;
    color: var(--muted);
    padding-top: 12px;
    font-weight: 300;
  }
  @media(min-width:640px){ .panel-note { font-size: 11px; padding-top: 14px; } }

  /* ── ACTIVITY TABLES ── */
  .activity-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 28px;
  }
  @media(min-width:900px){ .activity-grid { grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; } }

  .activity-item {
    padding: 14px 18px;
    border-bottom: 1px solid var(--border);
    transition: background .15s;
  }
  @media(min-width:640px){ .activity-item { padding: 16px 24px; } }
  .activity-item:last-child { border-bottom: none; }
  .activity-item:hover { background: var(--cream); }
  .activity-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }
  .activity-name { font-size: 12px; font-weight: 700; color: var(--ink); word-break: break-word; }
  @media(min-width:640px){ .activity-name { font-size: 13px; } }
  .activity-sub { font-size: 10px; color: var(--muted); margin-top: 3px; }
  @media(min-width:640px){ .activity-sub { font-size: 11px; } }
  .activity-amount { font-size: 12px; font-weight: 700; color: var(--ox); text-align: right; white-space: nowrap; }
  @media(min-width:640px){ .activity-amount { font-size: 13px; } }
  .activity-date { font-size: 10px; color: var(--muted); margin-top: 3px; text-align: right; white-space: nowrap; }
  @media(min-width:640px){ .activity-date { font-size: 11px; } }

  .empty-row {
    padding: 32px 18px;
    text-align: center;
    font-size: 12px;
    color: var(--muted);
  }
  @media(min-width:640px){ .empty-row { padding: 40px 24px; font-size: 13px; } }

  .stock-badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
    white-space: nowrap;
    flex-shrink: 0;
  }
  @media(min-width:640px){ .stock-badge { padding: 4px 12px; font-size: 11px; } }
  .stock-badge.out { background: rgba(107,26,26,0.1); color: var(--ox); }
  .stock-badge.low { background: #FEF3C7; color: #B45309; }

  /* ── QUICK ACTIONS ── */
  .actions-panel {
    background: var(--ink);
    border-radius: 14px;
    padding: 22px;
    position: relative;
    overflow: hidden;
  }
  @media(min-width:640px){ .actions-panel { border-radius: 16px; padding: 36px; } }
  .actions-panel::before {
    content: 'GOLD';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Playfair Display', serif;
    font-size: 90px;
    font-weight: 700;
    color: rgba(255,255,255,0.03);
    line-height: 1;
    user-select: none;
    pointer-events: none;
  }
  @media(min-width:640px){ .actions-panel::before { font-size: 150px; } }
  .actions-head {
    position: relative;
    z-index: 2;
    margin-bottom: 18px;
  }
  @media(min-width:640px){ .actions-head { margin-bottom: 24px; } }
  .actions-head h3 {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }
  @media(min-width:640px){ .actions-head h3 { font-size: 22px; } }
  .actions-head p {
    font-size: 11px;
    color: rgba(255,255,255,0.4);
    margin-top: 4px;
    font-weight: 300;
  }
  @media(min-width:640px){ .actions-head p { font-size: 12px; } }
  .actions-row {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  @media(min-width:640px){ .actions-row { gap: 14px; } }
  @media(min-width:768px){ .actions-row { grid-template-columns: repeat(4,1fr); } }

  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 18px 10px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    text-decoration: none;
    transition: background .2s, border-color .2s, transform .2s;
  }
  @media(min-width:640px){ .action-btn { gap: 10px; padding: 24px 16px; } }
  .action-btn:hover {
    background: var(--ox);
    border-color: var(--ox);
    transform: translateY(-2px);
  }
  .action-btn svg { width: 20px; height: 20px; color: rgba(255,255,255,0.8); }
  @media(min-width:640px){ .action-btn svg { width: 24px; height: 24px; } }
  .action-btn span {
    font-size: 11px;
    font-weight: 600;
    color: #fff;
    text-align: center;
  }
  @media(min-width:640px){ .action-btn span { font-size: 12px; } }
`;

export default function Dashboard({
  total_products,
  low_stock_products,
  out_of_stock,
  total_stock_value,
  total_clients,
  total_proformas,
  pending_proformas,
  delivered_proformas,
  total_delivery_notes,
  total_receipts,
  pending_receipts,
  received_receipts,
  recent_deliveries,
  low_stock_list,
}) {
  const formatFCFA = (amount) => {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount)) + ' FCFA';
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="dash-root">
        <div className="dash-container">

          {/* Header */}
          <div className="dash-header">
            <div>
              <div className="dash-label">Overview</div>
              <h1 className="dash-title">Dashboard</h1>
              <p className="dash-sub">A complete view of your inventory system</p>
            </div>
            <div className="dash-date">{today}</div>
          </div>

          {/* Main Stats */}
          <div className="stat-grid">

            <div className="stat-card">
              <div className="stat-top">
                <div className="stat-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <div className="stat-val">{total_products}</div>
              <div className="stat-lbl">Total Products</div>
              <div className="stat-foot">
                <Link href="/inventory/products/" className="stat-link">
                  View all products
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <div className="stat-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div className="stat-val warn">{low_stock_products}</div>
              <div className="stat-lbl">Low Stock Alert</div>
              <div className="stat-foot">
                <span>{out_of_stock} products out of stock</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <div className="stat-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="stat-val" style={{ fontSize: 'inherit' }}>{formatFCFA(total_stock_value)}</div>
              <div className="stat-lbl">Stock Value</div>
              <div className="stat-foot">
                <span>Total inventory value</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <div className="stat-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="stat-val">{total_clients}</div>
              <div className="stat-lbl">Total Clients</div>
              <div className="stat-foot">
                <Link href="/inventory/clients/" className="stat-link">
                  View all clients
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Secondary Panels */}
          <div className="panel-grid">

            <div className="panel">
              <div className="panel-head">
                <h3>Proforma Invoices</h3>
                <a href="/inventory/proformas/">View all</a>
              </div>
              <div className="panel-body">
                <div className="panel-row">
                  <span className="panel-row-label">Total</span>
                  <span className="panel-row-val">{total_proformas}</span>
                </div>
                <div className="panel-row">
                  <span className="panel-row-label">Pending</span>
                  <span className="panel-row-val pending">{pending_proformas}</span>
                </div>
                <div className="panel-row">
                  <span className="panel-row-label">Delivered</span>
                  <span className="panel-row-val done">{delivered_proformas}</span>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Delivery Notes</h3>
                <a href="/inventory/delivery-notes/">View all</a>
              </div>
              <div className="panel-body">
                <div className="panel-row">
                  <span className="panel-row-label">Total Deliveries</span>
                  <span className="panel-row-val">{total_delivery_notes}</span>
                </div>
                <p className="panel-note">Auto-generated from delivered proformas</p>
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Stock Receipts</h3>
                <a href="/inventory/receipts/">View all</a>
              </div>
              <div className="panel-body">
                <div className="panel-row">
                  <span className="panel-row-label">Total</span>
                  <span className="panel-row-val">{total_receipts}</span>
                </div>
                <div className="panel-row">
                  <span className="panel-row-label">Pending</span>
                  <span className="panel-row-val pending">{pending_receipts}</span>
                </div>
                <div className="panel-row">
                  <span className="panel-row-label">Received</span>
                  <span className="panel-row-val done">{received_receipts}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity & Low Stock */}
          <div className="activity-grid">

            <div className="panel">
              <div className="panel-head">
                <h3>Recent Deliveries</h3>
              </div>
              <div>
                {recent_deliveries && recent_deliveries.length > 0 ? (
                  recent_deliveries.map((delivery, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-row">
                        <div>
                          <div className="activity-name">{delivery.note_number}</div>
                          <div className="activity-sub">{delivery.client_name}</div>
                        </div>
                        <div>
                          <div className="activity-amount">{formatFCFA(delivery.total)}</div>
                          <div className="activity-date">{delivery.delivery_date}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-row">No recent deliveries</div>
                )}
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Low Stock Alert</h3>
              </div>
              <div>
                {low_stock_list && low_stock_list.length > 0 ? (
                  low_stock_list.map((product) => (
                    <div key={product.id} className="activity-item">
                      <div className="activity-row">
                        <div>
                          <div className="activity-name">{product.name}</div>
                          <div className="activity-sub">{product.reference}</div>
                        </div>
                        <span className={`stock-badge ${product.stock_quantity === 0 ? 'out' : 'low'}`}>
                          {product.stock_quantity} units
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-row">All products are well stocked</div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="actions-panel">
            <div className="actions-head">
              <h3>Quick Actions</h3>
              <p>Jump straight into the most common tasks</p>
            </div>
            <div className="actions-row">
              <Link href="/inventory/products/create/" className="action-btn">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Product</span>
              </Link>

              <Link href="/inventory/proformas/create/" className="action-btn">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>New Proforma</span>
              </Link>

              <Link href="/inventory/receipts/create/" className="action-btn">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <span>Stock Receipt</span>
              </Link>

              <Link href="/inventory/clients/create/" className="action-btn">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>Add Client</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}