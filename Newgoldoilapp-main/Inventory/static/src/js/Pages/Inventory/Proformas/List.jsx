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
    --amber: #B45309;
    --amber-bg: #FEF3C7;
    --green: #15803D;
    --green-bg: #D1FAE5;
  }

  .pv-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 28px 0;
  }
  @media(min-width:640px){ .pv-root { padding: 48px 0; } }

  .pv-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 16px;
  }
  @media(min-width:640px){ .pv-container { padding: 0 24px; } }
  @media(min-width:1024px){ .pv-container { padding: 0 32px; } }

  /* Toast */
  .pv-toast {
    position: fixed;
    top: 12px;
    left: 12px;
    right: 12px;
    z-index: 100;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 12px 32px rgba(0,0,0,0.15);
    padding: 14px 16px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    border-left: 4px solid var(--ox);
  }
  @media(min-width:640px){
    .pv-toast { top: 20px; left: auto; right: 20px; max-width: 380px; padding: 16px 18px; }
  }
  .pv-toast.error { border-left-color: var(--ox-dark); }
  .pv-toast.warning { border-left-color: var(--amber); }
  .pv-toast p { font-size: 12px; font-weight: 600; color: var(--ink); flex: 1; }
  @media(min-width:640px){ .pv-toast p { font-size: 13px; } }
  .pv-toast-close {
    background: none; border: none; cursor: pointer; color: var(--muted); flex-shrink: 0;
  }

  /* Header */
  .pv-header {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    margin-bottom: 24px;
  }
  @media(min-width:640px){
    .pv-header {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 36px;
    }
  }
  .pv-label {
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
  @media(min-width:640px){ .pv-label { font-size: 11px; letter-spacing: 0.2em; margin-bottom: 10px; } }
  .pv-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .pv-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 6vw, 2.6rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
  }
  .pv-sub {
    font-size: 12px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }
  @media(min-width:640px){ .pv-sub { font-size: 13px; } }
  .pv-add-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 13px 20px;
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.03em;
    border-radius: 8px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
    transition: transform .2s, box-shadow .2s;
    width: 100%;
  }
  @media(min-width:640px){ .pv-add-btn { width: auto; padding: 13px 26px; border-radius: 6px; } }
  .pv-add-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }

  /* Stats */
  .pv-stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 24px;
  }
  @media(min-width:480px){ .pv-stats { grid-template-columns: repeat(3, 1fr); gap: 16px; } }
  @media(min-width:768px){ .pv-stats { gap: 20px; margin-bottom: 32px; } }

  .pv-stat-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 18px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media(min-width:480px){ .pv-stat-card { display: block; padding: 22px 26px; } }
  .pv-stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px;
    height: 100%;
    background: var(--ox);
  }
  .pv-stat-card.pending::before { background: var(--amber); }
  .pv-stat-card.delivered::before { background: var(--green); }
  .pv-stat-lbl {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0;
    order: 2;
  }
  @media(min-width:480px){ .pv-stat-lbl { font-size: 11px; letter-spacing: 0.08em; margin-bottom: 8px; order: 0; } }
  .pv-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1;
    order: 1;
  }
  @media(min-width:480px){ .pv-stat-val { font-size: 28px; order: 0; } }
  .pv-stat-val.pending { color: var(--amber); }
  .pv-stat-val.delivered { color: var(--green); }

  /* Table wrap */
  .pv-table-wrap {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .pv-perpage-bar {
    padding: 12px 14px;
    border-bottom: 1px solid var(--border);
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }
  @media(min-width:640px){ .pv-perpage-bar { padding: 14px 24px; gap: 12px; } }
  .pv-perpage-bar .info { font-size: 11px; color: var(--muted); font-weight: 500; }
  @media(min-width:640px){ .pv-perpage-bar .info { font-size: 12px; } }
  .pv-perpage-group { display: flex; align-items: center; gap: 6px; }
  .pv-perpage-group label { font-size: 11px; color: var(--muted); font-weight: 500; }
  @media(min-width:640px){ .pv-perpage-group label { font-size: 12px; } }
  .pv-perpage-group select {
    padding: 6px 8px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 11px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: #fff;
  }
  @media(min-width:640px){ .pv-perpage-group select { padding: 6px 10px; font-size: 12px; } }
  .pv-perpage-group select:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }

  .pv-table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .pv-table { width: 100%; border-collapse: collapse; min-width: 680px; }
  .pv-table thead { background: var(--cream); }
  .pv-table th {
    padding: 12px 14px;
    text-align: left;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
  }
  @media(min-width:640px){ .pv-table th { padding: 14px 24px; font-size: 10px; letter-spacing: 0.1em; } }
  .pv-table th.right { text-align: right; }
  .pv-table td {
    padding: 12px 14px;
    border-bottom: 1px solid var(--border);
    font-size: 12px;
    color: var(--mid);
    white-space: nowrap;
  }
  @media(min-width:640px){ .pv-table td { padding: 16px 24px; font-size: 13px; } }
  .pv-table tbody tr:hover { background: var(--cream); }
  .pv-table tbody tr:last-child td { border-bottom: none; }
  .pv-invoice-num { font-size: 12px; font-weight: 700; color: var(--ink); }
  @media(min-width:640px){ .pv-invoice-num { font-size: 13px; } }
  .pv-total { font-weight: 700; color: var(--ink); }

  .pv-scroll-hint {
    display: block;
    text-align: center;
    font-size: 10px;
    color: var(--muted);
    padding: 8px 0 2px;
    font-weight: 500;
  }
  @media(min-width:640px){ .pv-scroll-hint { display: none; } }

  .pv-status-select {
    font-size: 10px;
    font-weight: 700;
    padding: 6px 10px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
  }
  @media(min-width:640px){ .pv-status-select { font-size: 11px; padding: 6px 12px; } }
  .pv-status-select:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(107,26,26,0.15);
  }
  .pv-status-select:disabled { opacity: 0.5; cursor: not-allowed; }

  .pv-actions-cell { text-align: right; white-space: nowrap; }
  .pv-action-link {
    font-size: 11px;
    font-weight: 700;
    text-decoration: none;
    margin-left: 12px;
    transition: color .2s;
  }
  @media(min-width:640px){ .pv-action-link { font-size: 12px; margin-left: 16px; } }
  .pv-action-link:first-child { margin-left: 0; }
  .pv-view-link { color: var(--ox); }
  .pv-view-link:hover { color: var(--ox-dark); }
  .pv-edit-link { color: var(--ox-light); }
  .pv-edit-link:hover { color: var(--ox); }
  .pv-delete-btn {
    font-size: 11px;
    font-weight: 700;
    color: var(--muted);
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 12px;
    transition: color .2s;
  }
  @media(min-width:640px){ .pv-delete-btn { font-size: 12px; margin-left: 16px; } }
  .pv-delete-btn:hover { color: var(--ox); }
  .pv-delete-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .pv-empty {
    padding: 48px 20px;
    text-align: center;
    color: var(--muted);
    font-size: 13px;
    font-weight: 600;
  }
  @media(min-width:640px){ .pv-empty { padding: 60px 24px; } }

  /* Pagination footer */
  .pv-pag-footer {
    padding: 14px;
    border-top: 1px solid var(--border);
    background: var(--cream);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  @media(min-width:640px){
    .pv-pag-footer {
      padding: 18px 24px;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
  }
  .pv-pag-info { font-size: 11px; color: var(--muted); text-align: center; }
  @media(min-width:640px){ .pv-pag-info { font-size: 12px; text-align: left; } }
  .pv-pag-info strong { color: var(--ink); font-weight: 700; }
  .pv-pag-controls {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  @media(min-width:640px){ .pv-pag-controls { justify-content: flex-end; } }
  .pv-pag-btn {
    padding: 7px 12px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    color: var(--mid);
    background: #fff;
    cursor: pointer;
    transition: border-color .2s, color .2s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  @media(min-width:640px){ .pv-pag-btn { padding: 7px 14px; font-size: 12px; } }
  .pv-pag-btn:hover:not(:disabled) { border-color: var(--ox-light); color: var(--ox); }
  .pv-pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .pv-pag-btn.active {
    background: var(--ox);
    border-color: var(--ox);
    color: #fff;
  }
  .pv-pag-ellipsis { color: var(--muted); padding: 0 4px; font-size: 12px; flex-shrink: 0; }

  /* Workflow info */
  .pv-workflow {
    margin-top: 20px;
    background: var(--ink);
    border-radius: 12px;
    padding: 18px 20px;
    position: relative;
    overflow: hidden;
  }
  @media(min-width:640px){ .pv-workflow { margin-top: 24px; padding: 22px 26px; } }
  .pv-workflow::before {
    content: 'GOLD';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Playfair Display', serif;
    font-size: 60px;
    font-weight: 700;
    color: rgba(255,255,255,0.03);
    line-height: 1;
    pointer-events: none;
  }
  @media(min-width:640px){ .pv-workflow::before { font-size: 90px; } }
  .pv-workflow h3 {
    position: relative;
    z-index: 2;
    font-family: 'Playfair Display', serif;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 10px;
  }
  @media(min-width:640px){ .pv-workflow h3 { font-size: 15px; margin-bottom: 12px; } }
  .pv-workflow-steps {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .pv-workflow-steps p {
    font-size: 11px;
    color: rgba(255,255,255,0.55);
    font-weight: 300;
  }
  @media(min-width:640px){ .pv-workflow-steps p { font-size: 12px; } }
  .pv-workflow-steps strong { color: rgba(255,255,255,0.9); font-weight: 700; }
`;

export default function ProformaList({ proformas, pagination }) {
  const [changingStatus, setChangingStatus] = useState(null);
  const [perPage, setPerPage] = useState(pagination.per_page);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this proforma?")) {
      return;
    }

    router.post(
      `/inventory/proformas/delete/${id}/`,
      {},
      {
        preserveScroll: true,
      }
    );
  };

  const handleStatusChange = async (id, newStatus, oldStatus) => {
    if (newStatus === 'delivered') {
      if (!confirm('Mark as DELIVERED? This will:\n• Create a delivery note automatically\n• Deduct stock from inventory\n\nContinue?')) {
        return;
      }
    } else if (oldStatus === 'delivered' && newStatus !== 'delivered') {
      if (!confirm('Change from DELIVERED? This will:\n• Cancel the delivery note\n• Restore stock to inventory\n\nContinue?')) {
        return;
      }
    }

    setChangingStatus(id);

    try {
      const response = await fetch(`/inventory/proformas/${id}/update-status/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (data.success) {
        if (data.delivery_note_created) {
          showNotification('Delivery note created automatically! Stock has been deducted.', 'success');
        } else if (newStatus === 'delivered') {
          showNotification('Status changed to DELIVERED. Stock deducted.', 'success');
        } else if (newStatus === 'rejected') {
          showNotification('Invoice rejected.', 'warning');
        } else {
          showNotification('Status updated successfully.', 'success');
        }

        router.reload({ preserveScroll: true });
      } else {
        showNotification(`${data.errors}`, 'error');
        setChangingStatus(null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showNotification('Failed to update status. Please try again.', 'error');
      setChangingStatus(null);
    }
  };

  const handlePageChange = (page) => {
    router.get(`/inventory/proformas/`, { page, per_page: perPage }, {
      preserveState: true,
      preserveScroll: false
    });
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    router.get(`/inventory/proformas/`, { page: 1, per_page: newPerPage }, {
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
      case 'delivered': return { bg: '#D1FAE5', text: '#065F46' };
      case 'rejected': return { bg: 'rgba(107,26,26,0.1)', text: '#6B1A1A' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="pv-root">
        <div className="pv-container">

          {/* Toast */}
          {notification && (
            <div className={`pv-toast ${notification.type}`}>
              <p>{notification.message}</p>
              <button className="pv-toast-close" onClick={() => setNotification(null)}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}

          {/* Header */}
          <div className="pv-header">
            <div>
              <div className="pv-label">Sales</div>
              <h1 className="pv-title">Proforma Invoices</h1>
              <p className="pv-sub">Showing {proformas.length} of {pagination.total_items} invoices</p>
            </div>
            <Link href="/inventory/proformas/create/" className="pv-add-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Invoice
            </Link>
          </div>

          {/* Stats */}
          <div className="pv-stats">
            <div className="pv-stat-card">
              <div className="pv-stat-lbl">Total</div>
              <div className="pv-stat-val">{pagination.total_items}</div>
            </div>
            <div className="pv-stat-card pending">
              <div className="pv-stat-lbl">Pending</div>
              <div className="pv-stat-val pending">{proformas.filter(p => p.status === 'pending').length}</div>
            </div>
            <div className="pv-stat-card delivered">
              <div className="pv-stat-lbl">Delivered</div>
              <div className="pv-stat-val delivered">{proformas.filter(p => p.status === 'delivered').length}</div>
            </div>
          </div>

          {/* Table */}
          <div className="pv-table-wrap">

            <div className="pv-perpage-bar">
              <div className="info">Page {pagination.current_page} of {pagination.total_pages}</div>
              <div className="pv-perpage-group">
                <label>Show:</label>
                <select value={perPage} onChange={(e) => handlePerPageChange(e.target.value)}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>per page</span>
              </div>
            </div>

            <div className="pv-table-scroll">
              <table className="pv-table">
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th className="right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {proformas.length === 0 ? (
                    <tr>
                      <td colSpan="6"><div className="pv-empty">No invoices found</div></td>
                    </tr>
                  ) : (
                    proformas.map((p) => {
                      const statusColors = getStatusColor(p.status);
                      return (
                        <tr key={p.id}>
                          <td><div className="pv-invoice-num">{p.proforma_number}</div></td>
                          <td>{p.client_name}</td>
                          <td>{p.date_created}</td>
                          <td className="pv-total">{formatFCFA(p.total_ttc || 0)}</td>
                          <td>
                            <select
                              value={p.status}
                              onChange={(e) => handleStatusChange(p.id, e.target.value, p.status)}
                              disabled={changingStatus === p.id}
                              className="pv-status-select"
                              style={{ backgroundColor: statusColors.bg, color: statusColors.text }}
                            >
                              <option value="pending">Pending</option>
                              <option value="delivered">Delivered</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="pv-actions-cell">
                            <Link href={`/inventory/proformas/view/${p.id}/`} className="pv-action-link pv-view-link">
                              View
                            </Link>
                            <Link href={`/inventory/proformas/update/${p.id}/`} className="pv-action-link pv-edit-link">
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(p.id)}
                              disabled={changingStatus === p.id}
                              className="pv-delete-btn"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <span className="pv-scroll-hint">← Scroll to see more →</span>

            {/* Pagination Controls */}
            <div className="pv-pag-footer">
              <div className="pv-pag-info">
                Showing <strong>{((pagination.current_page - 1) * pagination.per_page) + 1}</strong> to{' '}
                <strong>{Math.min(pagination.current_page * pagination.per_page, pagination.total_items)}</strong> of{' '}
                <strong>{pagination.total_items}</strong> results
              </div>

              <div className="pv-pag-controls">
                <button
                  onClick={() => handlePageChange(pagination.previous_page)}
                  disabled={!pagination.has_previous}
                  className="pv-pag-btn"
                >
                  Previous
                </button>

                {[...Array(pagination.total_pages)].map((_, i) => {
                  const pageNumber = i + 1;
                  const isCurrentPage = pageNumber === pagination.current_page;

                  const showPage =
                    pageNumber === 1 ||
                    pageNumber === pagination.total_pages ||
                    (pageNumber >= pagination.current_page - 1 && pageNumber <= pagination.current_page + 1);

                  if (!showPage) {
                    if (pageNumber === pagination.current_page - 2 || pageNumber === pagination.current_page + 2) {
                      return <span key={i} className="pv-pag-ellipsis">...</span>;
                    }
                    return null;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`pv-pag-btn ${isCurrentPage ? 'active' : ''}`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(pagination.next_page)}
                  disabled={!pagination.has_next}
                  className="pv-pag-btn"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Workflow Info */}
          <div className="pv-workflow">
            <h3>Simplified Workflow</h3>
            <div className="pv-workflow-steps">
              <p><strong>1. Pending:</strong> Invoice created, awaiting delivery</p>
              <p><strong>2. Delivered:</strong> Automatically creates delivery note & deducts stock</p>
              <p><strong>3. Rejected:</strong> Invoice cancelled</p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}