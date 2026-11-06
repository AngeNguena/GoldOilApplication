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

  .rc-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }
  .rc-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media(max-width:640px){ .rc-container { padding: 0 20px; } }

  /* Header */
  .rc-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
  }
  .rc-label {
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
  .rc-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .rc-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
  }
  .rc-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }
  .rc-add-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 26px;
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.03em;
    border-radius: 6px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
    transition: transform .2s, box-shadow .2s;
  }
  .rc-add-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }

  /* Info box */
  .rc-info {
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
  .rc-info::before {
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
  .rc-info-icon {
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
  .rc-info-icon svg { width: 18px; height: 18px; color: var(--ox-light); }
  .rc-info-text { position: relative; z-index: 2; }
  .rc-info-text h3 { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 4px; }
  .rc-info-text p { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 300; }

  /* Stats */
  .rc-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 32px;
  }
  @media(max-width:900px){ .rc-stats { grid-template-columns: repeat(2,1fr); } }
  @media(max-width:520px){ .rc-stats { grid-template-columns: 1fr; } }

  .rc-stat-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px 22px;
    position: relative;
    overflow: hidden;
  }
  .rc-stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px;
    height: 100%;
    background: var(--ox);
  }
  .rc-stat-card.pending::before { background: #B45309; }
  .rc-stat-card.received::before { background: #15803D; }
  .rc-stat-lbl {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .rc-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1;
  }
  .rc-stat-val.pending { color: #B45309; }
  .rc-stat-val.received { color: #15803D; }

  /* Table wrap */
  .rc-table-wrap {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .rc-perpage-bar {
    padding: 14px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
  .rc-perpage-bar .info { font-size: 12px; color: var(--muted); font-weight: 500; }
  .rc-perpage-group { display: flex; align-items: center; gap: 8px; }
  .rc-perpage-group label { font-size: 12px; color: var(--muted); font-weight: 500; }
  .rc-perpage-group select {
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: #fff;
  }
  .rc-perpage-group select:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }

  .rc-table { width: 100%; border-collapse: collapse; }
  .rc-table thead { background: var(--cream); }
  .rc-table th {
    padding: 14px 24px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
  }
  .rc-table th.right { text-align: right; }
  .rc-table td {
    padding: 16px 24px;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    color: var(--mid);
  }
  .rc-table tbody tr:hover { background: var(--cream); }
  .rc-table tbody tr:last-child td { border-bottom: none; }
  .rc-receipt-num { font-weight: 700; color: var(--ink); }
  .rc-total { font-weight: 700; color: var(--ink); }

  .rc-status-select {
    font-size: 11px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
  }
  .rc-status-select:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(107,26,26,0.15);
  }
  .rc-status-select:disabled { opacity: 0.5; cursor: not-allowed; }

  .rc-actions-cell { text-align: right; white-space: nowrap; }
  .rc-view-link {
    font-size: 12px;
    font-weight: 700;
    color: var(--ox);
    text-decoration: none;
    margin-right: 16px;
    transition: color .2s;
  }
  .rc-view-link:hover { color: var(--ox-dark); }
  .rc-delete-btn {
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    background: none;
    border: none;
    cursor: pointer;
    transition: color .2s;
  }
  .rc-delete-btn:hover { color: var(--ox); }

  .rc-empty {
    padding: 60px 24px;
    text-align: center;
  }
  .rc-empty svg { width: 44px; height: 44px; color: var(--border); margin: 0 auto 14px; }
  .rc-empty p:first-child { font-size: 14px; font-weight: 700; color: var(--mid); margin-bottom: 4px; }
  .rc-empty p:last-child { font-size: 12px; color: var(--muted); font-weight: 300; }

  /* Pagination footer */
  .rc-pag-footer {
    padding: 18px 24px;
    border-top: 1px solid var(--border);
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }
  .rc-pag-info { font-size: 12px; color: var(--muted); }
  .rc-pag-controls { display: flex; gap: 8px; }
  .rc-pag-btn {
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
  .rc-pag-btn:hover:not(:disabled) { border-color: var(--ox-light); color: var(--ox); }
  .rc-pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export default function ReceiptList({ receipts = [], pagination = null }) {
  const [changingStatus, setChangingStatus] = useState(null);
  const [perPage, setPerPage] = useState(pagination?.per_page || 10);

  
const handleDelete = (id) => {
  if (!confirm("Are you sure you want to delete this receipt?")) {
    return;
  }

  router.post(
    `/inventory/receipts/delete/${id}/`,
    {},
    {
      preserveScroll: true,
    }
  );
};


  const handleStatusChange = async (id, newStatus) => {
    if (newStatus === 'received' && !confirm('Mark as RECEIVED? Stock will be added to inventory.')) {
      return;
    }

    setChangingStatus(id);

    try {
      const response = await fetch(`/inventory/receipts/${id}/update-status/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (data.success) {
        router.reload({ preserveScroll: true });
      } else {
        alert(`Error: ${data.errors}`);
        setChangingStatus(null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
      setChangingStatus(null);
    }
  };

  const handlePageChange = (page) => {
    router.get('/inventory/receipts/', { page, per_page: perPage }, {
      preserveState: true,
      preserveScroll: false
    });
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    router.get('/inventory/receipts/', { page: 1, per_page: newPerPage }, {
      preserveState: true,
      preserveScroll: false
    });
  };

  const formatFCFA = (amount) => {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount)) + ' FCFA';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return { bg: '#FEF3C7', text: '#92400E' };
      case 'received': return { bg: '#D1FAE5', text: '#065F46' };
      case 'cancelled': return { bg: 'rgba(107,26,26,0.1)', text: '#6B1A1A' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="rc-root">
        <div className="rc-container">

          {/* Header */}
          <div className="rc-header">
            <div>
              <div className="rc-label">Logistics</div>
              <h1 className="rc-title">Stock Receipts</h1>
              <p className="rc-sub">
                {pagination ? `Showing ${receipts.length} of ${pagination.total_items} receipts` : `${receipts.length} receipts`}
              </p>
            </div>
            <Link href="/inventory/receipts/create/" className="rc-add-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Receipt
            </Link>
          </div>

          {/* Info Box */}
          <div className="rc-info">
            <div className="rc-info-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
            <div className="rc-info-text">
              <h3>Stock IN Management</h3>
              <p>Track inventory received from suppliers. When you mark a receipt as "Received", stock is automatically added to your inventory.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="rc-stats">
            <div className="rc-stat-card">
              <div className="rc-stat-lbl">Total Receipts</div>
              <div className="rc-stat-val">{pagination ? pagination.total_items : receipts.length}</div>
            </div>
            <div className="rc-stat-card pending">
              <div className="rc-stat-lbl">Pending</div>
              <div className="rc-stat-val pending">{receipts.filter(r => r.status === 'pending').length}</div>
            </div>
            <div className="rc-stat-card received">
              <div className="rc-stat-lbl">Received</div>
              <div className="rc-stat-val received">{receipts.filter(r => r.status === 'received').length}</div>
            </div>
            <div className="rc-stat-card">
              <div className="rc-stat-lbl">Total Value</div>
              <div className="rc-stat-val">{formatFCFA(receipts.reduce((sum, r) => sum + (parseFloat(r.total_amount) || 0), 0))}</div>
            </div>
          </div>

          {/* Table */}
          <div className="rc-table-wrap">

            {pagination && (
              <div className="rc-perpage-bar">
                <div className="info">Page {pagination.current_page} of {pagination.total_pages}</div>
                <div className="rc-perpage-group">
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

            <table className="rc-table">
              <thead>
                <tr>
                  <th>Receipt #</th>
                  <th>Supplier</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th className="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {receipts.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="rc-empty">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p>No receipts found</p>
                        <p>Create your first receipt to track stock coming in</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  receipts.map((r) => {
                    const statusColors = getStatusColor(r.status);
                    return (
                      <tr key={r.id}>
                        <td className="rc-receipt-num">{r.receipt_number}</td>
                        <td>{r.supplier_name}</td>
                        <td>{r.receipt_date || 'N/A'}</td>
                        <td>{r.item_count} items</td>
                        <td className="rc-total">{formatFCFA(r.total_amount || 0)}</td>
                        <td>
                          <select
                            value={r.status}
                            onChange={(e) => handleStatusChange(r.id, e.target.value)}
                            disabled={changingStatus === r.id}
                            className="rc-status-select"
                            style={{ backgroundColor: statusColors.bg, color: statusColors.text }}
                          >
                            <option value="pending">Pending</option>
                            <option value="received">Received</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="rc-actions-cell">
                          <Link href={`/inventory/receipts/view/${r.id}/`} className="rc-view-link">
                            View
                          </Link>
                          <button onClick={() => handleDelete(r.id)} className="rc-delete-btn">
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {pagination && receipts.length > 0 && (
              <div className="rc-pag-footer">
                <div className="rc-pag-info">
                  Showing {((pagination.current_page - 1) * pagination.per_page) + 1} to {Math.min(pagination.current_page * pagination.per_page, pagination.total_items)} of {pagination.total_items}
                </div>
                <div className="rc-pag-controls">
                  <button
                    onClick={() => handlePageChange(pagination.previous_page)}
                    disabled={!pagination.has_previous}
                    className="rc-pag-btn"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.next_page)}
                    disabled={!pagination.has_next}
                    className="rc-pag-btn"
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