import React from 'react';
import Layout from '../components/Layout';
import { Link } from '@inertiajs/react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

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

  .rv-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }
  .rv-container {
    max-width: 920px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media(max-width:640px){ .rv-container { padding: 0 20px; } }

  .rv-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
  }
  .rv-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ox);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .rv-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .rv-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.15;
  }
  .rv-sub { font-size: 13px; color: var(--muted); margin-top: 6px; font-weight: 300; }

  .rv-back-link {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 11px 20px;
    background: #fff;
    color: var(--mid);
    font-size: 12px;
    font-weight: 700;
    border: 1px solid var(--border);
    border-radius: 8px;
    text-decoration: none;
    transition: border-color .2s, color .2s;
  }
  .rv-back-link:hover { border-color: var(--ox-light); color: var(--ox); }

  .rv-panel {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  .rv-panel-head {
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .rv-panel-head h2 {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
  }
  .rv-panel-body { padding: 26px 24px; }

  .rv-status-badge {
    display: inline-block;
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
  }
  .rv-status-badge.pending { background: #FEF3C7; color: #92400E; }
  .rv-status-badge.received { background: #D1FAE5; color: #065F46; }
  .rv-status-badge.cancelled { background: rgba(107,26,26,0.1); color: var(--ox); }

  .rv-dl-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 24px;
  }
  @media(max-width:520px){ .rv-dl-grid { grid-template-columns: 1fr; } }
  .rv-dl-item dt {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
  }
  .rv-dl-item dd { font-size: 14px; color: var(--ink); font-weight: 600; }
  .rv-dl-full { grid-column: 1 / -1; }

  .rv-supplier-card {
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px;
  }
  .rv-supplier-card p.name { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
  .rv-supplier-card p { font-size: 13px; color: var(--mid); display: flex; align-items: center; gap: 8px; margin-top: 6px; }
  .rv-supplier-card svg { width: 15px; height: 15px; color: var(--ox); flex-shrink: 0; }

  .rv-notes-box {
    background: rgba(107,26,26,0.05);
    border: 1px solid rgba(107,26,26,0.15);
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 13px;
    color: var(--mid);
  }

  .rv-table { width: 100%; border-collapse: collapse; }
  .rv-table th {
    padding: 12px 24px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
  }
  .rv-table th.right { text-align: right; }
  .rv-table td {
    padding: 14px 24px;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    color: var(--mid);
  }
  .rv-table td.right { text-align: right; }
  .rv-table td.bold { font-weight: 700; color: var(--ink); }
  .rv-table tbody tr:hover { background: var(--cream); }
  .rv-table-empty { padding: 32px 24px; text-align: center; color: var(--muted); font-size: 13px; }

  .rv-table tfoot tr td { background: rgba(107,26,26,0.06); border-bottom: none; padding: 18px 24px; }
  .rv-table tfoot .lbl {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--ox-dark);
    text-align: right;
  }
  .rv-table tfoot .val {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--ox);
    text-align: right;
  }

  /* Status info boxes */
  .rv-info-box {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 18px;
    border-radius: 10px;
  }
  .rv-info-box.received { background: #D1FAE5; }
  .rv-info-box.pending { background: #FEF3C7; }
  .rv-info-box svg { width: 20px; height: 20px; flex-shrink: 0; margin-top: 1px; }
  .rv-info-box.received svg { color: #065F46; }
  .rv-info-box.pending svg { color: #92400E; }
  .rv-info-box h3 { font-size: 13px; font-weight: 700; margin-bottom: 2px; }
  .rv-info-box.received h3 { color: #065F46; }
  .rv-info-box.pending h3 { color: #92400E; }
  .rv-info-box p { font-size: 12px; }
  .rv-info-box.received p { color: #065F46; }
  .rv-info-box.pending p { color: #92400E; }
`;

export default function ReceiptView({ receipt }) {
  const formatFCFA = (amount) => {
    const value = parseFloat(amount) || 0;
    return new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: 0
    }).format(Math.round(value)) + ' FCFA';
  };

  const items = receipt?.items || [];
  const totalAmount = receipt?.total_amount || 0;
  const statusLabel = receipt?.status ? receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1) : 'N/A';

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="rv-root">
        <div className="rv-container">

          {/* Header */}
          <div className="rv-header">
            <div>
              <div className="rv-label">Logistics</div>
              <h1 className="rv-title">Stock Receipt</h1>
              <p className="rv-sub">{receipt?.receipt_number || 'N/A'}</p>
            </div>

            <Link href="/inventory/receipts/" className="rv-back-link">
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to List
            </Link>
          </div>

          {/* Receipt Info Card */}
          <div className="rv-panel">
            <div className="rv-panel-head">
              <h2>Receipt Information</h2>
              <span className={`rv-status-badge ${receipt?.status}`}>{statusLabel}</span>
            </div>
            <div className="rv-panel-body">
              <dl className="rv-dl-grid">
                <div className="rv-dl-item">
                  <dt>Receipt Number</dt>
                  <dd>{receipt?.receipt_number || 'N/A'}</dd>
                </div>

                <div className="rv-dl-item">
                  <dt>Receipt Date</dt>
                  <dd>{receipt?.receipt_date || 'N/A'}</dd>
                </div>

                <div className="rv-dl-item">
                  <dt>Created At</dt>
                  <dd>{receipt?.created_at || 'N/A'}</dd>
                </div>

                <div className="rv-dl-item">
                  <dt>Status</dt>
                  <dd><span className={`rv-status-badge ${receipt?.status}`}>{statusLabel}</span></dd>
                </div>

                <div className="rv-dl-item rv-dl-full">
                  <dt>Supplier Information</dt>
                  <dd>
                    <div className="rv-supplier-card">
                      <p className="name">{receipt?.supplier_name || 'N/A'}</p>

                      {receipt?.supplier_phone && (
                        <p>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {receipt.supplier_phone}
                        </p>
                      )}

                      {receipt?.supplier_email && (
                        <p>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {receipt.supplier_email}
                        </p>
                      )}
                    </div>
                  </dd>
                </div>

                {receipt?.notes && (
                  <div className="rv-dl-item rv-dl-full">
                    <dt>Notes</dt>
                    <dd><div className="rv-notes-box">{receipt.notes}</div></dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Items Table */}
          <div className="rv-panel">
            <div className="rv-panel-head">
              <h2>Received Items ({items.length})</h2>
            </div>

            <table className="rv-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Reference</th>
                  <th className="right">Quantity</th>
                  <th className="right">Unit Price</th>
                  <th className="right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="bold">{item?.product_name || 'N/A'}</td>
                      <td>{item?.product_reference || 'N/A'}</td>
                      <td className="right bold">{item?.quantity || 0}</td>
                      <td className="right">{formatFCFA(item?.unit_price || 0)}</td>
                      <td className="right bold">{formatFCFA(item?.total || 0)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={6}><div className="rv-table-empty">No items found</div></td></tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5} className="lbl">Grand Total</td>
                  <td className="val">{formatFCFA(totalAmount)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Status Info Box */}
          {receipt?.status === 'received' && (
            <div className="rv-info-box received">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3>Stock Added</h3>
                <p>This receipt has been marked as received and stock has been added to inventory.</p>
              </div>
            </div>
          )}

          {receipt?.status === 'pending' && (
            <div className="rv-info-box pending">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3>Awaiting Receipt</h3>
                <p>This receipt is pending. Stock will be added when marked as "Received".</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}