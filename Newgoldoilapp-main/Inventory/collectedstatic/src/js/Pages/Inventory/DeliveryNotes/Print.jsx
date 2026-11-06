import React, { useEffect } from 'react';

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
    --gold: #C8922A;
  }

  .dp-root {
    font-family: 'DM Sans', sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    background: #fff;
    color: var(--ink);
  }

  .dp-print-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.03em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
    margin-bottom: 20px;
  }

  .dp-header {
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 3px solid var(--ox);
  }
  .dp-company-name {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 700;
    color: var(--ox);
    margin-bottom: 8px;
  }
  .dp-company-meta { font-size: 12px; color: var(--muted); line-height: 1.7; }

  .dp-doc-title {
    text-align: center;
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 32px;
    letter-spacing: 0.02em;
  }

  .dp-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 32px;
  }
  .dp-info-block h3 {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ox);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
  }
  .dp-info-block p {
    font-size: 13px;
    color: var(--mid);
    margin-bottom: 6px;
  }
  .dp-info-block p strong { color: var(--ink); font-weight: 700; }

  .dp-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 32px;
    font-size: 13px;
  }
  .dp-table thead tr {
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
  }
  .dp-table th {
    border: 1px solid var(--border);
    padding: 12px 16px;
    text-align: left;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.03em;
  }
  .dp-table th.right { text-align: right; }
  .dp-table td {
    border: 1px solid var(--border);
    padding: 10px 16px;
    color: var(--mid);
  }
  .dp-table td.right { text-align: right; }
  .dp-table tfoot tr { background: rgba(107,26,26,0.06); font-weight: 700; }
  .dp-table tfoot td {
    padding: 14px 16px;
    text-align: right;
    text-transform: uppercase;
    color: var(--ox-dark);
  }
  .dp-table tfoot td:last-child { font-size: 17px; }

  .dp-notes {
    margin-bottom: 32px;
    padding: 16px 18px;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 10px;
  }
  .dp-notes h3 { font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
  .dp-notes p { font-size: 13px; color: var(--mid); }

  .dp-signature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    margin-top: 64px;
  }
  .dp-signature-box { text-align: center; }
  .dp-signature-line {
    border-top: 2px solid var(--border);
    padding-top: 8px;
    margin-top: 64px;
  }
  .dp-signature-line p:first-child { font-size: 13px; font-weight: 700; color: var(--ink); }
  .dp-signature-line p:last-child { font-size: 11px; color: var(--muted); margin-top: 4px; }

  .dp-footer {
    margin-top: 48px;
    text-align: center;
    font-size: 11px;
    color: var(--muted);
    line-height: 1.6;
  }

  @media print {
    body { margin: 0; }
    @page { margin: 1cm; }
    .no-print { display: none !important; }
  }
`;

export default function DeliveryNotePrint({ note, items, total_amount, company_name, company_address, company_phone, company_email }) {
  useEffect(() => {
    window.print();
  }, []);

  const formatFCFA = (amount) => {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount)) + ' FCFA';
  };

  return (
    <div className="dp-root">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Print Button */}
      <div className="no-print">
        <button onClick={() => window.print()} className="dp-print-btn">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print
        </button>
      </div>

      {/* Company Header */}
      <div className="dp-header">
        <h1 className="dp-company-name">{company_name}</h1>
        <div className="dp-company-meta">
          <p>{company_address}</p>
          <p>Tel: {company_phone} | Email: {company_email}</p>
        </div>
      </div>

      {/* Title */}
      <h2 className="dp-doc-title">BON DE LIVRAISON / DELIVERY NOTE</h2>

      {/* Info Grid */}
      <div className="dp-info-grid">
        <div className="dp-info-block">
          <h3>Client Information</h3>
          <p><strong>Name:</strong> {note.client_name}</p>
          {note.client_address && <p><strong>Address:</strong> {note.client_address}</p>}
          {note.client_phone && <p><strong>Phone:</strong> {note.client_phone}</p>}
        </div>
        <div className="dp-info-block">
          <h3>Delivery Information</h3>
          <p><strong>Note #:</strong> {note.note_number}</p>
          <p><strong>Date:</strong> {note.delivery_date}</p>
          <p><strong>Proforma:</strong> {note.proforma_number}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="dp-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Reference</th>
            <th className="right">Qty</th>
            <th className="right">Unit Price</th>
            <th className="right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.product_name}</td>
              <td>{item.product_reference}</td>
              <td className="right">{item.quantity}</td>
              <td className="right">{formatFCFA(item.unit_price)}</td>
              <td className="right">{formatFCFA(item.total)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5">TOTAL</td>
            <td>{formatFCFA(total_amount)}</td>
          </tr>
        </tfoot>
      </table>

      {/* Notes */}
      {note.notes && (
        <div className="dp-notes">
          <h3>Notes:</h3>
          <p>{note.notes}</p>
        </div>
      )}

      {/* Signature Section */}
      <div className="dp-signature-grid">
        <div className="dp-signature-box">
          <div className="dp-signature-line">
            <p>Client Signature</p>
            <p>Date: _______________</p>
          </div>
        </div>
        <div className="dp-signature-box">
          <div className="dp-signature-line">
            <p>Company Representative</p>
            <p>Date: _______________</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="dp-footer">
        <p>This document serves as proof of delivery and acceptance of the goods listed above.</p>
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
}