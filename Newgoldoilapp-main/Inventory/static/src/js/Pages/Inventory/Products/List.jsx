import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import Layout from '../components/Layout';

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

  .pl-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 32px 0;
  }
  @media(min-width:640px){ .pl-root { padding: 48px 0; } }

  .pl-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 16px;
  }
  @media(min-width:640px){ .pl-container { padding: 0 24px; } }
  @media(min-width:1024px){ .pl-container { padding: 0 32px; } }

  .pl-label {
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
  @media(min-width:640px){ .pl-label { font-size: 11px; letter-spacing: 0.2em; margin-bottom: 10px; } }
  .pl-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .pl-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 6vw, 2.6rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
  }
  .pl-sub {
    font-size: 12px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
    margin-bottom: 20px;
  }
  @media(min-width:640px){ .pl-sub { font-size: 13px; margin-bottom: 28px; } }

  /* Tabs row */
  .pl-tabs-row {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0;
  }
  @media(min-width:640px){
    .pl-tabs-row {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 24px;
    }
  }
  .pl-tabs {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .pl-tabs::-webkit-scrollbar { display: none; }
  .pl-tab-btn {
    padding: 10px 16px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.02em;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--muted);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    white-space: nowrap;
    flex-shrink: 0;
    transition: color .2s, border-color .2s;
  }
  @media(min-width:640px){ .pl-tab-btn { padding: 12px 24px; font-size: 13px; } }
  .pl-tab-btn.active { color: var(--ox); border-bottom-color: var(--ox); }
  .pl-tab-btn:hover:not(.active) { color: var(--ink); }

  .pl-add-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 20px;
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    border-radius: 8px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
    transition: transform .2s, box-shadow .2s;
    width: 100%;
  }
  @media(min-width:640px){ .pl-add-btn { width: auto; padding: 12px 24px; margin-bottom: 12px; } }
  .pl-add-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }

  /* Search */
  .pl-search-row { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
  @media(min-width:520px){ .pl-search-row { flex-direction: row; gap: 12px; margin-bottom: 24px; } }
  .pl-search-row input {
    flex: 1;
    padding: 12px 14px;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: #fff;
    transition: border-color .2s, box-shadow .2s;
    width: 100%;
  }
  .pl-search-row input:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }
  .pl-search-btn {
    padding: 12px 24px;
    background: var(--ink);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background .2s;
    width: 100%;
  }
  @media(min-width:520px){ .pl-search-btn { width: auto; padding: 12px 26px; } }
  .pl-search-btn:hover { background: var(--ox-dark); }

  .pl-results-summary {
    margin-bottom: 14px;
    font-size: 11px;
    color: var(--muted);
    font-weight: 500;
  }
  @media(min-width:640px){ .pl-results-summary { font-size: 12px; margin-bottom: 16px; } }

  /* Table */
  .pl-table-wrap {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .pl-table { width: 100%; border-collapse: collapse; min-width: 640px; }
  .pl-table thead { background: var(--cream); }
  .pl-table th {
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
  @media(min-width:640px){ .pl-table th { padding: 14px 20px; font-size: 10px; letter-spacing: 0.1em; } }
  .pl-table th.right { text-align: right; }
  .pl-table td {
    padding: 12px 14px;
    border-bottom: 1px solid var(--border);
    font-size: 12px;
    color: var(--mid);
    white-space: nowrap;
  }
  @media(min-width:640px){ .pl-table td { padding: 16px 20px; font-size: 13px; } }
  .pl-table tbody tr:hover { background: var(--cream); }
  .pl-table tbody tr:last-child td { border-bottom: none; }
  .pl-mono { font-family: 'DM Mono', monospace; font-size: 11px; }
  .pl-price { font-weight: 700; color: var(--ink); }

  .pl-product-row { display: flex; align-items: center; gap: 10px; }
  .pl-product-img { width: 34px; height: 34px; border-radius: 7px; object-fit: cover; flex-shrink: 0; }
  @media(min-width:640px){ .pl-product-img { width: 40px; height: 40px; border-radius: 8px; } }
  .pl-product-name { font-weight: 700; color: var(--ink); font-size: 12px; }
  @media(min-width:640px){ .pl-product-name { font-size: 13px; } }
  .pl-product-cat { font-size: 10px; color: var(--muted); margin-top: 2px; }

  .pl-stock-badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
  }
  @media(min-width:640px){ .pl-stock-badge { padding: 4px 12px; font-size: 11px; } }
  .pl-stock-badge.high { background: #D1FAE5; color: #065F46; }
  .pl-stock-badge.low { background: #FEF3C7; color: #92400E; }
  .pl-stock-badge.out { background: rgba(107,26,26,0.1); color: var(--ox); }

  .pl-actions-cell { text-align: right; }
  .pl-actions-row { display: flex; justify-content: flex-end; gap: 6px; }
  .pl-edit-link {
    padding: 6px 12px;
    font-size: 11px;
    font-weight: 700;
    color: var(--ox);
    background: rgba(107,26,26,0.06);
    border-radius: 6px;
    text-decoration: none;
    transition: background .2s;
    white-space: nowrap;
  }
  @media(min-width:640px){ .pl-edit-link { padding: 7px 16px; font-size: 12px; } }
  .pl-edit-link:hover { background: rgba(107,26,26,0.12); }
  .pl-delete-btn {
    padding: 6px 12px;
    font-size: 11px;
    font-weight: 700;
    color: var(--muted);
    background: var(--cream);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background .2s, color .2s;
    white-space: nowrap;
  }
  @media(min-width:640px){ .pl-delete-btn { padding: 7px 16px; font-size: 12px; } }
  .pl-delete-btn:hover { background: rgba(107,26,26,0.06); color: var(--ox); }

  .pl-empty {
    padding: 48px 20px;
    text-align: center;
    color: var(--muted);
    font-size: 13px;
    font-weight: 600;
  }
  @media(min-width:640px){ .pl-empty { padding: 60px 24px; } }

  .pl-scroll-hint {
    display: block;
    text-align: center;
    font-size: 10px;
    color: var(--muted);
    margin-top: 8px;
    font-weight: 500;
  }
  @media(min-width:640px){ .pl-scroll-hint { display: none; } }

  /* Pagination */
  .pl-pagination {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  @media(min-width:640px){
    .pl-pagination {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-top: 24px;
    }
  }
  .pl-pag-info { font-size: 12px; color: var(--muted); font-weight: 500; text-align: center; }
  @media(min-width:640px){ .pl-pag-info { text-align: left; } }
  .pl-pag-controls {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  @media(min-width:640px){ .pl-pag-controls { justify-content: flex-end; } }
  .pl-pag-btn {
    padding: 8px 12px;
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
  @media(min-width:640px){ .pl-pag-btn { padding: 9px 16px; font-size: 12px; } }
  .pl-pag-btn:hover:not(:disabled) { border-color: var(--ox-light); color: var(--ox); }
  .pl-pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .pl-pag-btn.active {
    background: var(--ox);
    border-color: var(--ox);
    color: #fff;
  }
  .pl-pag-ellipsis { padding: 0 4px; color: var(--muted); font-size: 12px; flex-shrink: 0; }

  /* Hide First/Last on very small screens to reduce clutter */
  .pl-pag-btn.pl-hide-mobile { display: none; }
  @media(min-width:480px){ .pl-pag-btn.pl-hide-mobile { display: inline-block; } }
`;

export default function ProductList({ products, categories, current_type, pagination }) {
  const [activeTab, setActiveTab] = useState(current_type || 'oil');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (type) => {
    setActiveTab(type);
    router.get(`/inventory/products/?type=${type}`, {}, { preserveState: false });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(`/inventory/products/?type=${activeTab}&search=${searchQuery}`);
  };

  const handlePageChange = (page) => {
    const search = new URLSearchParams(window.location.search).get('search') || '';
    router.get(`/inventory/products/?type=${activeTab}&page=${page}&search=${search}`);
  };

  const formatFCFA = (amount) => {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount)) + ' FCFA';
  };

  const getStockClass = (qty) => {
    if (qty > 10) return 'high';
    if (qty > 0) return 'low';
    return 'out';
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="pl-root">
        <div className="pl-container">

          {/* Header */}
          <div className="pl-label">Inventory</div>
          <h1 className="pl-title">Products</h1>
          <p className="pl-sub">Manage your product inventory</p>

          {/* Tabs */}
          <div className="pl-tabs-row">
            <div className="pl-tabs">
              <button
                onClick={() => handleTabChange('oil')}
                className={`pl-tab-btn ${activeTab === 'oil' ? 'active' : ''}`}
              >
                Oils & Lubricants
              </button>
              <button
                onClick={() => handleTabChange('spare_part')}
                className={`pl-tab-btn ${activeTab === 'spare_part' ? 'active' : ''}`}
              >
                Spare Parts
              </button>
            </div>

            <Link href={`/inventory/products/create/?type=${activeTab}`} className="pl-add-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add {activeTab === 'oil' ? 'Oil' : 'Spare Part'}
            </Link>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="pl-search-row">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
            />
            <button type="submit" className="pl-search-btn">Search</button>
          </form>

          {/* Results Summary */}
          {pagination && (
            <div className="pl-results-summary">
              Showing {((pagination.current_page - 1) * 20) + 1} to {Math.min(pagination.current_page * 20, pagination.total_items)} of {pagination.total_items} products
            </div>
          )}

          {/* Products Table */}
          <div className="pl-table-wrap">
            <table className="pl-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Name</th>
                  {activeTab === 'oil' && <th>Volume</th>}
                  {activeTab === 'spare_part' && (
                    <>
                      <th>Brand</th>
                      <th>Part Number</th>
                      <th>Warranty</th>
                    </>
                  )}
                  <th>Price</th>
                  <th>Stock</th>
                  <th className="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td className="pl-mono">{product.reference}</td>
                      <td>
                        <div className="pl-product-row">
                          {product.image_url && (
                            <img src={product.image_url} alt={product.name} className="pl-product-img" />
                          )}
                          <div>
                            <div className="pl-product-name">{product.name}</div>
                            {product.category_name && (
                              <div className="pl-product-cat">{product.category_name}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      {activeTab === 'oil' && <td>{product.volume || '-'}</td>}
                      {activeTab === 'spare_part' && (
                        <>
                          <td>{product.brand || '-'}</td>
                          <td className="pl-mono">{product.part_number || '-'}</td>
                          <td>{product.warranty_period || '-'}</td>
                        </>
                      )}
                      <td className="pl-price">{formatFCFA(product.unit_price)}</td>
                      <td>
                        <span className={`pl-stock-badge ${getStockClass(product.stock_quantity)}`}>
                          {product.stock_quantity}
                        </span>
                      </td>
                      <td className="pl-actions-cell">
                        <div className="pl-actions-row">
                          <Link href={`/inventory/products/${product.id}/update/`} className="pl-edit-link">
                            Edit
                          </Link>
                                                  
                          <Link
                            href={`/inventory/products/${product.id}/delete/`}
                            method="post"
                            as="button"
                            className="pl-delete-btn"
                            onClick={(e) => {
                              if (
                                !window.confirm(
                                  `Are you sure you want to delete "${product.name}"?`
                                )
                              ) {
                                e.preventDefault();
                              }
                            }}
                          >
                            Delete
                          </Link>


                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8"><div className="pl-empty">No products found</div></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <span className="pl-scroll-hint">← Scroll to see more →</span>

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <div className="pl-pagination">
              <div className="pl-pag-info">Page {pagination.current_page} of {pagination.total_pages}</div>
              <div className="pl-pag-controls">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.current_page === 1}
                  className="pl-pag-btn pl-hide-mobile"
                >
                  First
                </button>
                <button
                  onClick={() => handlePageChange(pagination.previous_page)}
                  disabled={!pagination.has_previous}
                  className="pl-pag-btn"
                >
                  Previous
                </button>

                {[...Array(pagination.total_pages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === pagination.total_pages ||
                    (pageNum >= pagination.current_page - 1 && pageNum <= pagination.current_page + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`pl-pag-btn ${pageNum === pagination.current_page ? 'active' : ''}`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === pagination.current_page - 2 ||
                    pageNum === pagination.current_page + 2
                  ) {
                    return <span key={pageNum} className="pl-pag-ellipsis">...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => handlePageChange(pagination.next_page)}
                  disabled={!pagination.has_next}
                  className="pl-pag-btn"
                >
                  Next
                </button>
                <button
                  onClick={() => handlePageChange(pagination.total_pages)}
                  disabled={pagination.current_page === pagination.total_pages}
                  className="pl-pag-btn pl-hide-mobile"
                >
                  Last
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}