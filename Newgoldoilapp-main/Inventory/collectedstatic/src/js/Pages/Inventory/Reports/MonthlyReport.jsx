import React, { useState } from 'react';
import Layout from '../components/Layout';
import { router } from '@inertiajs/react';

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

  .mr-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 40px 0;
  }
  .mr-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media(max-width:640px){ .mr-container { padding: 0 20px; } }

  /* Header */
  .mr-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
  }
  .mr-label {
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
  .mr-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .mr-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.15;
  }
  .mr-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }
  .mr-download-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 26px;
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.03em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
    transition: transform .2s, box-shadow .2s;
  }
  .mr-download-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }

  /* Filters */
  .mr-filters {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 22px 24px;
    margin-bottom: 28px;
    display: flex;
    align-items: flex-end;
    gap: 16px;
    flex-wrap: wrap;
  }
  .mr-filter-field { flex: 1; min-width: 160px; }
  .mr-filter-field label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .mr-filter-field select {
    width: 100%;
    padding: 11px 14px;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: #fff;
    transition: border-color .2s, box-shadow .2s;
  }
  .mr-filter-field select:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }
  .mr-apply-btn {
    padding: 11px 26px;
    background: var(--ink);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.03em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background .2s;
  }
  .mr-apply-btn:hover { background: var(--ox-dark); }

  /* Summary cards */
  .mr-summary-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 28px;
  }
  @media(max-width:900px){ .mr-summary-grid { grid-template-columns: 1fr; } }

  .mr-summary-card {
    border-radius: 14px;
    padding: 28px;
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .mr-summary-card.c1 { background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%); }
  .mr-summary-card.c2 { background: linear-gradient(135deg, #4A3B1F 0%, #2E2412 100%); }
  .mr-summary-card.c3 { background: linear-gradient(135deg, var(--ink) 0%, #000 100%); }

  .mr-summary-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .mr-summary-top h3 {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.75);
  }
  .mr-summary-top svg { width: 26px; height: 26px; color: rgba(255,255,255,0.5); }
  .mr-summary-val {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
  }
  .mr-summary-foot {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    margin-top: 10px;
    font-weight: 300;
  }

  /* Tables */
  .mr-tables-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 28px;
  }
  @media(max-width:900px){ .mr-tables-grid { grid-template-columns: 1fr; } }

  .mr-panel {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }
  .mr-panel-head {
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--cream);
  }
  .mr-panel-head h3 {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
  }
  .mr-panel-head.alert { background: rgba(107,26,26,0.06); }
  .mr-panel-head.alert h3 {
    color: var(--ox-dark);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .mr-panel-head.alert svg { width: 18px; height: 18px; }

  .mr-table { width: 100%; border-collapse: collapse; }
  .mr-table th {
    padding: 12px 20px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
  }
  .mr-table th.right { text-align: right; }
  .mr-table td {
    padding: 14px 20px;
    font-size: 13px;
    color: var(--mid);
    border-bottom: 1px solid var(--border);
  }
  .mr-table td.right { text-align: right; }
  .mr-table td.bold { font-weight: 700; color: var(--ink); }
  .mr-table tbody tr:last-child td { border-bottom: none; }
  .mr-table tbody tr:hover { background: var(--cream); }
  .mr-table-empty {
    padding: 32px 20px;
    text-align: center;
    color: var(--muted);
    font-size: 13px;
  }

  .mr-stock-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
  }
  .mr-stock-badge.out { background: rgba(107,26,26,0.1); color: var(--ox); }
  .mr-stock-badge.low { background: #FEF3C7; color: #B45309; }
`;

export default function MonthlyReport({
  filters,
  summary,
  top_products = [],
  top_clients = [],
  low_stock = [],
  months = [],
  years = []
}) {
  const [selectedYear, setSelectedYear] = useState(filters.year);
  const [selectedMonth, setSelectedMonth] = useState(filters.month);

  const formatFCFA = (amount) => {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount)) + ' FCFA';
  };

  const handleFilterChange = () => {
    router.get('/inventory/reports/monthly/', {
      year: selectedYear,
      month: selectedMonth,
    }, {
      preserveState: true,
    });
  };

  const handleDownloadPDF = () => {
    window.location.href = `/inventory/reports/monthly/download/?year=${selectedYear}&month=${selectedMonth}`;
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="mr-root">
        <div className="mr-container">

          {/* Header */}
          <div className="mr-header">
            <div>
              <div className="mr-label">Analytics</div>
              <h1 className="mr-title">Monthly Report</h1>
              <p className="mr-sub">{filters.month_name}</p>
            </div>
            <button onClick={handleDownloadPDF} className="mr-download-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
          </div>

          {/* Filters */}
          <div className="mr-filters">
            <div className="mr-filter-field">
              <label>Year</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                {years.map(y => (
                  <option key={y.value} value={y.value}>{y.label}</option>
                ))}
              </select>
            </div>

            <div className="mr-filter-field">
              <label>Month</label>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                {months.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>

            <button onClick={handleFilterChange} className="mr-apply-btn">
              Apply Filter
            </button>
          </div>

          {/* Summary Cards */}
          <div className="mr-summary-grid">
            <div className="mr-summary-card c1">
              <div className="mr-summary-top">
                <h3>Total Sales</h3>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="mr-summary-val">{formatFCFA(summary.total_sales)}</p>
              <p className="mr-summary-foot">{summary.sales_count} orders delivered</p>
            </div>

            <div className="mr-summary-card c2">
              <div className="mr-summary-top">
                <h3>Stock Received</h3>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="mr-summary-val">{formatFCFA(summary.total_stock_in)}</p>
              <p className="mr-summary-foot">{summary.stock_in_count} receipts received</p>
            </div>

            <div className="mr-summary-card c3">
              <div className="mr-summary-top">
                <h3>Current Stock Value</h3>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <p className="mr-summary-val">{formatFCFA(summary.current_stock_value)}</p>
              <p className="mr-summary-foot">{summary.low_stock_count} items low stock</p>
            </div>
          </div>

          {/* Tables Row */}
          <div className="mr-tables-grid">

            {/* Top Products */}
            <div className="mr-panel">
              <div className="mr-panel-head">
                <h3>Top 10 Products</h3>
              </div>
              <table className="mr-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="right">Qty Sold</th>
                    <th className="right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {top_products.length === 0 ? (
                    <tr>
                      <td colSpan={3}>
                        <div className="mr-table-empty">No sales data for this period</div>
                      </td>
                    </tr>
                  ) : (
                    top_products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td className="right">{product.quantity}</td>
                        <td className="right bold">{formatFCFA(product.revenue)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Top Clients */}
            <div className="mr-panel">
              <div className="mr-panel-head">
                <h3>Top 10 Clients</h3>
              </div>
              <table className="mr-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th className="right">Orders</th>
                    <th className="right">Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {top_clients.length === 0 ? (
                    <tr>
                      <td colSpan={3}>
                        <div className="mr-table-empty">No client data for this period</div>
                      </td>
                    </tr>
                  ) : (
                    top_clients.map((client, index) => (
                      <tr key={index}>
                        <td>{client.name}</td>
                        <td className="right">{client.purchases}</td>
                        <td className="right bold">{formatFCFA(client.value)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alert */}
          {low_stock.length > 0 && (
            <div className="mr-panel">
              <div className="mr-panel-head alert">
                <h3>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Low Stock Alert
                </h3>
              </div>
              <table className="mr-table">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Product</th>
                    <th className="right">Stock Qty</th>
                    <th className="right">Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  {low_stock.map((product) => (
                    <tr key={product.id}>
                      <td className="bold">{product.reference}</td>
                      <td>{product.name}</td>
                      <td className="right">
                        <span className={`mr-stock-badge ${product.stock_quantity === 0 ? 'out' : 'low'}`}>
                          {product.stock_quantity}
                        </span>
                      </td>
                      <td className="right">{formatFCFA(product.unit_price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}