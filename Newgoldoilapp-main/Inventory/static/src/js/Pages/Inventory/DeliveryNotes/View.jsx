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

  .dv-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }
  .dv-container {
    max-width: 920px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media(max-width:640px){ .dv-container { padding: 0 20px; } }

  .dv-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
  }
  .dv-label {
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
  .dv-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .dv-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.15;
  }
  .dv-sub { font-size: 13px; color: var(--muted); margin-top: 6px; font-weight: 300; }

  .dv-btn-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .dv-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 11px 20px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.02em;
    border-radius: 8px;
    text-decoration: none;
    transition: transform .2s, box-shadow .2s, background .2s;
  }
  .dv-btn-ghost { background: #fff; color: var(--mid); border: 1px solid var(--border); }
  .dv-btn-ghost:hover { border-color: var(--ox-light); color: var(--ox); }
  .dv-btn-print { background: var(--ink); color: #fff; border: none; }
  .dv-btn-print:hover { background: var(--ox-dark); }
  .dv-btn-download {
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    color: #fff; border: none;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
  }
  .dv-btn-download:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }

  .dv-panel {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  .dv-panel-head { padding: 18px 24px; border-bottom: 1px solid var(--border); background: var(--cream); }
  .dv-panel-head h2 { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: var(--ink); }
  .dv-panel-body { padding: 26px 24px; }

  .dv-dl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 24px; }
  @media(max-width:520px){ .dv-dl-grid { grid-template-columns: 1fr; } }
  .dv-dl-item dt {
    font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
    text-transform: uppercase; color: var(--muted); margin-bottom: 6px;
  }
  .dv-dl-item dd { font-size: 14px; color: var(--ink); font-weight: 600; }
  .dv-dl-full { grid-column: 1 / -1; }

  .dv-client-card { background: var(--cream); border: 1px solid var(--border); border-radius: 10px; padding: 18px; }
  .dv-client-card p.name { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
  .dv-client-card p { font-size: 13px; color: var(--mid); display: flex; align-items: center; gap: 8px; margin-top: 6px; }
  .dv-client-card svg { width: 15px; height: 15px; color: var(--ox); flex-shrink: 0; }

  .dv-notes-box {
    background: rgba(107,26,26,0.05);
    border: 1px solid rgba(107,26,26,0.15);
    border-radius: 8px; padding: 12px 16px; font-size: 13px; color: var(--mid);
  }

  .dv-table { width: 100%; border-collapse: collapse; }
  .dv-table th {
    padding: 12px 24px; text-align: left; font-size: 10px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted);
    border-bottom: 1px solid var(--border);
  }
  .dv-table th.right { text-align: right; }
  .dv-table td { padding: 14px 24px; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--mid); }
  .dv-table td.right { text-align: right; }
  .dv-table td.bold { font-weight: 700; color: var(--ink); }
  .dv-table tbody tr:hover { background: var(--cream); }
  .dv-table-empty { padding: 32px 24px; text-align: center; color: var(--muted); font-size: 13px; }

  .dv-table tfoot tr td { background: rgba(107,26,26,0.06); border-bottom: none; padding: 18px 24px; }
  .dv-table tfoot .lbl {
    font-size: 12px; font-weight: 700; letter-spacing: 0.05em;
    text-transform: uppercase; color: var(--ox-dark); text-align: right;
  }
  .dv-table tfoot .val {
    font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700;
    color: var(--ox); text-align: right;
  }

  .dv-company-footer { text-align: center; font-size: 12px; color: var(--muted); line-height: 1.7; }
  .dv-company-footer p:first-child { font-weight: 700; color: var(--ink); font-size: 13px; }
`;

export default function DeliveryNoteView({ delivery_note, company_info }) {
  const formatFCFA = (amount) => {
    const value = parseFloat(amount) || 0;
    return new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: 0
    }).format(Math.round(value)) + ' FCFA';
  };

  const items = delivery_note?.items || [];
  const totalAmount = delivery_note?.total_amount || 0;

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="dv-root">
        <div className="dv-container">

          <div className="dv-header">
            <div>
              <div className="dv-label">Logistics</div>
              <h1 className="dv-title">Delivery Note</h1>
              <p className="dv-sub">{delivery_note?.note_number || 'N/A'}</p>
            </div>

            <div className="dv-btn-row">
              <Link href="/inventory/delivery-notes/" className="dv-btn dv-btn-ghost">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to List
              </Link>

              <a href={`/inventory/delivery-notes/print/${delivery_note?.id || ''}/`} target="_blank" rel="noopener noreferrer" className="dv-btn dv-btn-print">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </a>

              <a href={`/inventory/delivery-notes/download/${delivery_note?.id || ''}/`} className="dv-btn dv-btn-download">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>

          <div className="dv-panel">
            <div className="dv-panel-head"><h2>Delivery Information</h2></div>
            <div className="dv-panel-body">
              <dl className="dv-dl-grid">
                <div className="dv-dl-item">
                  <dt>Delivery Note Number</dt>
                  <dd>{delivery_note?.note_number || 'N/A'}</dd>
                </div>

                <div className="dv-dl-item">
                  <dt>Proforma Invoice</dt>
                  <dd>{delivery_note?.proforma_number || 'N/A'}</dd>
                </div>

                <div className="dv-dl-item">
                  <dt>Delivery Date</dt>
                  <dd>{delivery_note?.delivery_date || 'N/A'}</dd>
                </div>

                <div className="dv-dl-item">
                  <dt>Created At</dt>
                  <dd>{delivery_note?.created_at || 'N/A'}</dd>
                </div>

                <div className="dv-dl-item dv-dl-full">
                  <dt>Client Information</dt>
                  <dd>
                    <div className="dv-client-card">
                      <p className="name">{delivery_note?.client_name || 'N/A'}</p>

                      {delivery_note?.client_address && (
                        <p>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {delivery_note.client_address}
                        </p>
                      )}

                      {delivery_note?.client_phone && (
                        <p>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {delivery_note.client_phone}
                        </p>
                      )}

                      {delivery_note?.client_email && (
                        <p>
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {delivery_note.client_email}
                        </p>
                      )}
                    </div>
                  </dd>
                </div>

                {delivery_note?.notes && (
                  <div className="dv-dl-item dv-dl-full">
                    <dt>Notes</dt>
                    <dd><div className="dv-notes-box">{delivery_note.notes}</div></dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          <div className="dv-panel">
            <div className="dv-panel-head"><h2>Delivered Items ({items.length})</h2></div>

            <table className="dv-table">
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
                  <tr><td colSpan={6}><div className="dv-table-empty">No items found</div></td></tr>
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

          {company_info && (
            <div className="dv-panel">
              <div className="dv-panel-body">
                <div className="dv-company-footer">
                  <p>{company_info?.name || 'Company Name'}</p>
                  <p>{company_info?.address || 'Address'}</p>
                  <p>Tel: {company_info?.phone || 'N/A'} | Email: {company_info?.email || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}