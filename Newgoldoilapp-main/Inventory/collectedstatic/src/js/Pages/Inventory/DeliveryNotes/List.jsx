import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link, router } from '@inertiajs/react';

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

  .dn-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }
  .dn-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media(max-width:640px){ .dn-container { padding: 0 20px; } }

  /* Header */
  .dn-header { margin-bottom: 28px; }
  .dn-label {
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
  .dn-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .dn-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
  }
  .dn-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }

  /* Info box */
  .dn-info {
    margin-bottom: 28px;
    background: var(--ink);
    border-radius: 12px;
    padding: 20px 24px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    position: relative;
    overflow: hidden;
  }
  .dn-info::before {
    content: 'GOLD';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Playfair Display', serif;
    font-size: 80px;
    font-weight: 700;
    color: rgba(255,255,255,0.03);
    line-height: 1;
    pointer-events: none;
  }
  .dn-info-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
  }
  .dn-info-icon svg { width: 18px; height: 18px; color: var(--ox-light); }
  .dn-info-text { position: relative; z-index: 2; }
  .dn-info-text h3 { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 4px; }
  .dn-info-text p { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 300; }

  /* Stats */
  .dn-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 32px;
  }
  @media(max-width:768px){ .dn-stats { grid-template-columns: 1fr; } }

  .dn-stat-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 22px 26px;
    position: relative;
    overflow: hidden;
  }
  .dn-stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px;
    height: 100%;
    background: var(--ox);
  }
  .dn-stat-lbl {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .dn-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1;
  }

  /* Table wrap */
  .dn-table-wrap {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .dn-perpage-bar {
    padding: 14px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
  .dn-perpage-bar .info { font-size: 12px; color: var(--muted); font-weight: 500; }
  .dn-perpage-group { display: flex; align-items: center; gap: 8px; }
  .dn-perpage-group label { font-size: 12px; color: var(--muted); font-weight: 500; }
  .dn-perpage-group select {
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: #fff;
  }
  .dn-perpage-group select:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }

  .dn-table { width: 100%; border-collapse: collapse; }
  .dn-table thead { background: var(--cream); }
  .dn-table th {
    padding: 14px 24px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
  }
  .dn-table th.right { text-align: right; }
  .dn-table td {
    padding: 16px 24px;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    color: var(--mid);
  }
  .dn-table tbody tr:hover { background: var(--cream); }
  .dn-table tbody tr:last-child td { border-bottom: none; }
  .dn-note-num { font-weight: 700; color: var(--ink); }
  .dn-total { font-weight: 700; color: var(--ink); }

  .dn-actions-cell { text-align: right; white-space: nowrap; }
  .dn-action-link {
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    margin-left: 16px;
    transition: color .2s;
  }
  .dn-action-link:first-child { margin-left: 0; }
  .dn-link-view { color: var(--ox); }
  .dn-link-view:hover { color: var(--ox-dark); }
  .dn-link-print { color: var(--ox-light); }
  .dn-link-print:hover { color: var(--ox); }
  .dn-link-pdf { color: #4A3B1F; }
  .dn-link-pdf:hover { color: var(--ox-dark); }
  .dn-delete-btn {
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 16px;
    transition: color .2s;
  }
  .dn-delete-btn:hover { color: var(--ox); }

  .dn-empty {
    padding: 60px 24px;
    text-align: center;
    color: var(--muted);
    font-size: 13px;
    font-weight: 600;
  }

  /* Pagination footer */
  .dn-pag-footer {
    padding: 18px 24px;
    border-top: 1px solid var(--border);
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }
  .dn-pag-info { font-size: 12px; color: var(--muted); }
  .dn-pag-controls { display: flex; gap: 8px; }
  .dn-pag-btn {
    padding: 7px 16px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--mid);
    background: #fff;
    cursor: pointer;
    transition: border-color .2s, color .2s;
  }
  .dn-pag-btn:hover:not(:disabled) { border-color: var(--ox-light); color: var(--ox); }
  .dn-pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export default function DeliveryNoteList({ delivery_notes = [], pagination = null }) {
  const [perPage, setPerPage] = useState(pagination?.per_page || 10);


  const handleDelete = (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this delivery note? Stock will be restored."
      )
    ) {
      return;
    }

    router.post(
      `/inventory/delivery-notes/delete/${id}/`,
      {},
      {
        preserveScroll: true,
      }
    );
  };


  const handlePageChange = (page) => {
    router.get('/inventory/delivery-notes/', { page, per_page: perPage }, {
      preserveState: true,
      preserveScroll: false
    });
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    router.get('/inventory/delivery-notes/', { page: 1, per_page: newPerPage }, {
      preserveState: true,
      preserveScroll: false
    });
  };

  const formatFCFA = (amount) => {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount)) + ' FCFA';
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="dn-root">
        <div className="dn-container">

          {/* Header */}
          <div className="dn-header">
            <div className="dn-label">Logistics</div>
            <h1 className="dn-title">Delivery Notes</h1>
            <p className="dn-sub">
              {pagination ? `Showing ${delivery_notes.length} of ${pagination.total_items} delivery notes` : `${delivery_notes.length} delivery notes`}
            </p>
          </div>

          {/* Info Box */}
          <div className="dn-info">
            <div className="dn-info-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="dn-info-text">
              <h3>Auto-Generated Records</h3>
              <p>Delivery notes are automatically created when you mark a proforma invoice as "Delivered".</p>
            </div>
          </div>

          {/* Stats */}
          <div className="dn-stats">
            <div className="dn-stat-card">
              <div className="dn-stat-lbl">Total Deliveries</div>
              <div className="dn-stat-val">{pagination ? pagination.total_items : delivery_notes.length}</div>
            </div>

            <div className="dn-stat-card">
              <div className="dn-stat-lbl">This Month</div>
              <div className="dn-stat-val">
                {delivery_notes.filter(d => {
                  if (!d.created_at) return false;
                  const noteDate = new Date(d.created_at);
                  const now = new Date();
                  return noteDate.getMonth() === now.getMonth() && noteDate.getFullYear() === now.getFullYear();
                }).length}
              </div>
            </div>

            <div className="dn-stat-card">
              <div className="dn-stat-lbl">Total Value</div>
              <div className="dn-stat-val">
                {formatFCFA(delivery_notes.reduce((sum, d) => sum + (parseFloat(d.total_amount) || 0), 0))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="dn-table-wrap">

            {pagination && (
              <div className="dn-perpage-bar">
                <div className="info">Page {pagination.current_page} of {pagination.total_pages}</div>
                <div className="dn-perpage-group">
                  <label>Show:</label>
                  <select value={perPage} onChange={(e) => handlePerPageChange(e.target.value)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
            )}

            <table className="dn-table">
              <thead>
                <tr>
                  <th>Note #</th>
                  <th>Proforma</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th className="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {delivery_notes.length === 0 ? (
                  <tr>
                    <td colSpan="6"><div className="dn-empty">No delivery notes found</div></td>
                  </tr>
                ) : (
                  delivery_notes.map((d) => (
                    <tr key={d.id}>
                      <td className="dn-note-num">{d.note_number}</td>
                      <td>{d.proforma_number || 'N/A'}</td>
                      <td>{d.client_name}</td>
                      <td>{d.delivery_date || 'N/A'}</td>
                      <td className="dn-total">{formatFCFA(d.total_amount || 0)}</td>
                      <td className="dn-actions-cell">
                        <a href={`/inventory/delivery-notes/view/${d.id}/`} className="dn-action-link dn-link-view">
                          View
                        </a>
                        <a href={`/inventory/delivery-notes/print/${d.id}/`} target="_blank" rel="noopener noreferrer" className="dn-action-link dn-link-print">
                          Print
                        </a>
                        <a href={`/inventory/delivery-notes/download/${d.id}/`} className="dn-action-link dn-link-pdf">
                          PDF
                        </a>
                        <button onClick={() => handleDelete(d.id)} className="dn-delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {pagination && delivery_notes.length > 0 && (
              <div className="dn-pag-footer">
                <div className="dn-pag-info">
                  Showing {((pagination.current_page - 1) * pagination.per_page) + 1} to {Math.min(pagination.current_page * pagination.per_page, pagination.total_items)} of {pagination.total_items}
                </div>
                <div className="dn-pag-controls">
                  <button
                    onClick={() => handlePageChange(pagination.previous_page)}
                    disabled={!pagination.has_previous}
                    className="dn-pag-btn"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.next_page)}
                    disabled={!pagination.has_next}
                    className="dn-pag-btn"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}