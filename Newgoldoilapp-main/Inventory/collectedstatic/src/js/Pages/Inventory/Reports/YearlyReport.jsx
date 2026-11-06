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

  .yr-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 40px 0;
  }
  .yr-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media(max-width:640px){ .yr-container { padding: 0 20px; } }

  /* Header */
  .yr-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
  }
  .yr-label {
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
  .yr-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .yr-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.15;
  }
  .yr-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }
  .yr-download-btn {
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
  .yr-download-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }

  /* Filter */
  .yr-filters {
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
  .yr-filter-field { flex: 1; max-width: 220px; min-width: 160px; }
  .yr-filter-field label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .yr-filter-field select {
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
  .yr-filter-field select:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }
  .yr-apply-btn {
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
  .yr-apply-btn:hover { background: var(--ox-dark); }

  /* Summary cards */
  .yr-summary-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 28px;
  }
  @media(max-width:900px){ .yr-summary-grid { grid-template-columns: 1fr; } }

  .yr-summary-card {
    border-radius: 14px;
    padding: 28px;
    color: #fff;
  }
  .yr-summary-card.c1 { background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%); }
  .yr-summary-card.c2 { background: linear-gradient(135deg, #4A3B1F 0%, #2E2412 100%); }
  .yr-summary-card.c3 { background: linear-gradient(135deg, var(--ink) 0%, #000 100%); }

  .yr-summary-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .yr-summary-top h3 {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.75);
  }
  .yr-summary-top svg { width: 26px; height: 26px; color: rgba(255,255,255,0.5); }
  .yr-summary-val {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
  }
  .yr-summary-foot {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    margin-top: 10px;
    font-weight: 300;
  }

  /* Chart panel */
  .yr-panel {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 28px;
    overflow: hidden;
  }
  .yr-panel-pad { padding: 28px; }
  .yr-panel-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 26px;
  }

  .yr-chart-row { margin-bottom: 18px; }
  .yr-chart-row:last-child { margin-bottom: 0; }
  .yr-chart-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .yr-chart-month {
    font-size: 12px;
    font-weight: 700;
    color: var(--mid);
    width: 90px;
    flex-shrink: 0;
  }
  .yr-chart-bars { flex: 1; display: flex; gap: 10px; }
  .yr-bar-group { flex: 1; }
  .yr-bar-track {
    height: 30px;
    background: var(--cream);
    border-radius: 6px;
    overflow: hidden;
  }
  .yr-bar-fill {
    height: 100%;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 10px;
    transition: width .5s ease;
    min-width: fit-content;
  }
  .yr-bar-fill.sales { background: var(--ox); }
  .yr-bar-fill.stock { background: #4A3B1F; }
  .yr-bar-fill span {
    font-size: 11px;
    color: #fff;
    font-weight: 600;
    white-space: nowrap;
  }
  .yr-bar-lbl {
    font-size: 10px;
    color: var(--muted);
    margin-top: 4px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .yr-chart-orders {
    font-size: 12px;
    color: var(--muted);
    width: 80px;
    flex-shrink: 0;
    text-align: right;
  }

  .yr-legend {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 28px;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }
  .yr-legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--mid);
    font-weight: 500;
  }
  .yr-legend-dot { width: 12px; height: 12px; border-radius: 3px; }
  .yr-legend-dot.sales { background: var(--ox); }
  .yr-legend-dot.stock { background: #4A3B1F; }

  /* Table */
  .yr-table { width: 100%; border-collapse: collapse; }
  .yr-table-head {
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--cream);
  }
  .yr-table-head h3 {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
  }
  .yr-table th {
    padding: 12px 20px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
  }
  .yr-table th.right { text-align: right; }
  .yr-table td {
    padding: 14px 20px;
    font-size: 13px;
    color: var(--mid);
    border-bottom: 1px solid var(--border);
  }
  .yr-table td.right { text-align: right; }
  .yr-table td.bold { font-weight: 700; color: var(--ink); }
  .yr-table td.muted { color: var(--muted); }
  .yr-table tbody tr:hover { background: var(--cream); }
  .yr-table-total td {
    background: var(--cream);
    font-weight: 700;
    color: var(--ink);
    border-top: 2px solid var(--border);
    border-bottom: none;
  }
  .yr-table-empty {
    padding: 32px 20px;
    text-align: center;
    color: var(--muted);
    font-size: 13px;
  }

  /* Top tables grid */
  .yr-tables-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 28px;
  }
  @media(max-width:900px){ .yr-tables-grid { grid-template-columns: 1fr; } }

  /* Stat footer */
  .yr-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  @media(max-width:768px){ .yr-stats-grid { grid-template-columns: repeat(2,1fr); } }

  .yr-stat-mini {
    background: #fff;
    border: 1px solid var(--border);
    border-left: 3px solid var(--ox);
    border-radius: 8px;
    padding: 18px 20px;
  }
  .yr-stat-mini-lbl {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
  }
  .yr-stat-mini-val {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--ink);
  }
`;

export default function YearlyReport({
  filters,
  summary,
  monthly_data = [],
  top_products = [],
  top_clients = [],
  years = []
}) {
  const [selectedYear, setSelectedYear] = useState(filters.year);

  const formatFCFA = (amount) => {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount)) + ' FCFA';
  };

  const handleFilterChange = () => {
    router.get('/inventory/reports/yearly/', {
      year: selectedYear,
    }, {
      preserveState: true,
    });
  };

  const handleDownloadPDF = () => {
    window.location.href = `/inventory/reports/yearly/download/?year=${selectedYear}`;
  };

  const maxSales = Math.max(...monthly_data.map(m => m.sales), 0);
  const maxStockIn = Math.max(...monthly_data.map(m => m.stock_in), 0);
  const maxValue = Math.max(maxSales, maxStockIn);

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="yr-root">
        <div className="yr-container">

          {/* Header */}
          <div className="yr-header">
            <div>
              <div className="yr-label">Analytics</div>
              <h1 className="yr-title">Yearly Report</h1>
              <p className="yr-sub">Year {filters.year}</p>
            </div>
            <button onClick={handleDownloadPDF} className="yr-download-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
          </div>

          {/* Filter */}
          <div className="yr-filters">
            <div className="yr-filter-field">
              <label>Select Year</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                {years.map(y => (
                  <option key={y.value} value={y.value}>{y.label}</option>
                ))}
              </select>
            </div>
            <button onClick={handleFilterChange} className="yr-apply-btn">
              Apply Filter
            </button>
          </div>

          {/* Summary Cards */}
          <div className="yr-summary-grid">
            <div className="yr-summary-card c1">
              <div className="yr-summary-top">
                <h3>Total Annual Sales</h3>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="yr-summary-val">{formatFCFA(summary.total_sales)}</p>
              <p className="yr-summary-foot">{summary.sales_count} orders delivered</p>
            </div>

            <div className="yr-summary-card c2">
              <div className="yr-summary-top">
                <h3>Total Stock Received</h3>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="yr-summary-val">{formatFCFA(summary.total_stock_in)}</p>
              <p className="yr-summary-foot">{summary.stock_in_count} receipts received</p>
            </div>

            <div className="yr-summary-card c3">
              <div className="yr-summary-top">
                <h3>Current Stock Value</h3>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <p className="yr-summary-val">{formatFCFA(summary.current_stock_value)}</p>
              <p className="yr-summary-foot">Inventory valuation</p>
            </div>
          </div>

          {/* Monthly Performance Chart */}
          <div className="yr-panel">
            <div className="yr-panel-pad">
              <h3 className="yr-panel-title">Monthly Performance</h3>

              {monthly_data.map((month, index) => (
                <div key={index} className="yr-chart-row">
                  <div className="yr-chart-top">
                    <div className="yr-chart-month">{month.month_name}</div>
                    <div className="yr-chart-bars">
                      <div className="yr-bar-group">
                        <div className="yr-bar-track">
                          <div
                            className="yr-bar-fill sales"
                            style={{ width: `${maxValue > 0 ? (month.sales / maxValue) * 100 : 0}%` }}
                          >
                            {month.sales > 0 && <span>{formatFCFA(month.sales)}</span>}
                          </div>
                        </div>
                        <div className="yr-bar-lbl">Sales</div>
                      </div>
                      <div className="yr-bar-group">
                        <div className="yr-bar-track">
                          <div
                            className="yr-bar-fill stock"
                            style={{ width: `${maxValue > 0 ? (month.stock_in / maxValue) * 100 : 0}%` }}
                          >
                            {month.stock_in > 0 && <span>{formatFCFA(month.stock_in)}</span>}
                          </div>
                        </div>
                        <div className="yr-bar-lbl">Stock In</div>
                      </div>
                    </div>
                    <div className="yr-chart-orders">{month.orders} orders</div>
                  </div>
                </div>
              ))}

              <div className="yr-legend">
                <div className="yr-legend-item">
                  <div className="yr-legend-dot sales"></div>
                  Sales Revenue
                </div>
                <div className="yr-legend-item">
                  <div className="yr-legend-dot stock"></div>
                  Stock Received
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Data Table */}
          <div className="yr-panel">
            <div className="yr-table-head">
              <h3>Monthly Breakdown</h3>
            </div>
            <table className="yr-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th className="right">Sales</th>
                  <th className="right">Stock In</th>
                  <th className="right">Orders</th>
                  <th className="right">Avg Order Value</th>
                </tr>
              </thead>
              <tbody>
                {monthly_data.map((month, index) => (
                  <tr key={index}>
                    <td className="bold">{month.month_name}</td>
                    <td className="right">{formatFCFA(month.sales)}</td>
                    <td className="right">{formatFCFA(month.stock_in)}</td>
                    <td className="right">{month.orders}</td>
                    <td className="right muted">
                      {month.orders > 0 ? formatFCFA(month.sales / month.orders) : 'N/A'}
                    </td>
                  </tr>
                ))}
                <tr className="yr-table-total">
                  <td>TOTAL</td>
                  <td className="right">{formatFCFA(monthly_data.reduce((sum, m) => sum + m.sales, 0))}</td>
                  <td className="right">{formatFCFA(monthly_data.reduce((sum, m) => sum + m.stock_in, 0))}</td>
                  <td className="right">{monthly_data.reduce((sum, m) => sum + m.orders, 0)}</td>
                  <td className="right">{formatFCFA(summary.total_sales / summary.sales_count || 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Top Products and Clients */}
          <div className="yr-tables-grid">

            <div className="yr-panel">
              <div className="yr-table-head">
                <h3>Top 10 Products of {filters.year}</h3>
              </div>
              <table className="yr-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th className="right">Qty Sold</th>
                    <th className="right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {top_products.length === 0 ? (
                    <tr>
                      <td colSpan={4}><div className="yr-table-empty">No sales data for this year</div></td>
                    </tr>
                  ) : (
                    top_products.map((product, index) => (
                      <tr key={index}>
                        <td className="muted">{index + 1}</td>
                        <td>{product.name}</td>
                        <td className="right bold">{product.quantity}</td>
                        <td className="right bold">{formatFCFA(product.revenue)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="yr-panel">
              <div className="yr-table-head">
                <h3>Top 10 Clients of {filters.year}</h3>
              </div>
              <table className="yr-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Client</th>
                    <th className="right">Orders</th>
                    <th className="right">Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {top_clients.length === 0 ? (
                    <tr>
                      <td colSpan={4}><div className="yr-table-empty">No client data for this year</div></td>
                    </tr>
                  ) : (
                    top_clients.map((client, index) => (
                      <tr key={index}>
                        <td className="muted">{index + 1}</td>
                        <td>{client.name}</td>
                        <td className="right bold">{client.purchases}</td>
                        <td className="right bold">{formatFCFA(client.value)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="yr-stats-grid">
            <div className="yr-stat-mini">
              <div className="yr-stat-mini-lbl">Avg Monthly Sales</div>
              <div className="yr-stat-mini-val">{formatFCFA(summary.total_sales / 12)}</div>
            </div>
            <div className="yr-stat-mini">
              <div className="yr-stat-mini-lbl">Avg Monthly Orders</div>
              <div className="yr-stat-mini-val">{Math.round(summary.sales_count / 12)}</div>
            </div>
            <div className="yr-stat-mini">
              <div className="yr-stat-mini-lbl">Avg Order Value</div>
              <div className="yr-stat-mini-val">{formatFCFA(summary.total_sales / summary.sales_count || 0)}</div>
            </div>
            <div className="yr-stat-mini">
              <div className="yr-stat-mini-lbl">Best Month</div>
              <div className="yr-stat-mini-val">
                {monthly_data.length > 0
                  ? monthly_data.reduce((prev, current) => (prev.sales > current.sales) ? prev : current).month_name
                  : 'N/A'}
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}