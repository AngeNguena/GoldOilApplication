import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import ShopLayout from './Components/ShopLayout';
import ProductCart from './Components/ProductCart';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --ox:       #6B1A1A;
    --ox-dark:  #4A0F0F;
    --ox-light: #8B2E2E;
    --cream:    #FAF7F2;
    --ink:      #0E0C0B;
    --mid:      #3A3330;
    --muted:    #8C847C;
    --border:   #E5DDD5;
    --white:    #ffffff;
  }

  .p-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── PAGE HEADER ── */
  .p-header {
    background: var(--ink);
    padding: 52px 0 44px;
    position: relative;
    overflow: hidden;
  }
  .p-header::after {
    content: 'SHOP';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Playfair Display', serif;
    font-size: 140px;
    font-weight: 700;
    color: rgba(255,255,255,0.03);
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }
  .p-header-inner {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
  }
  .p-header-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ox-light);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .p-header-label::after {
    content: '';
    width: 28px;
    height: 1px;
    background: var(--ox-light);
    opacity: 0.6;
  }
  .p-header-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.1;
  }
  .p-header-sub {
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    font-weight: 300;
    margin-top: 6px;
  }

  /* ── TABS ── */
  .p-tabs {
    display: flex;
    gap: 0;
    position: relative;
    z-index: 2;
  }
  .p-tab {
    padding: 10px 24px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(255,255,255,0.35);
    border-bottom: 2px solid transparent;
    transition: color .2s, border-color .2s;
  }
  .p-tab.active {
    color: #fff;
    border-bottom-color: var(--ox-light);
  }
  .p-tab:hover:not(.active) { color: rgba(255,255,255,0.65); }

  /* ── LAYOUT ── */
  .p-body {
    max-width: 1240px;
    margin: 0 auto;
    padding: 36px 32px 72px;
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 28px;
    align-items: start;
  }
  @media(max-width:900px){ .p-body { grid-template-columns:1fr; } }
  @media(max-width:640px){ .p-body { padding: 24px 20px 60px; } }

  /* ── SIDEBAR ── */
  .sidebar {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    position: sticky;
    top: 24px;
  }
  .sidebar-section {
    padding: 20px 22px;
    border-bottom: 1px solid var(--border);
  }
  .sidebar-section:last-child { border-bottom: none; }
  .sidebar-heading {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 14px;
  }

  /* Search */
  .search-wrap {
    display: flex;
    gap: 8px;
  }
  .search-input {
    flex: 1;
    padding: 9px 12px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: var(--cream);
    outline: none;
    transition: border-color .2s;
  }
  .search-input::placeholder { color: var(--muted); }
  .search-input:focus { border-color: var(--ox); }
  .search-btn {
    width: 36px;
    height: 36px;
    background: var(--ink);
    border: none;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background .2s;
  }
  .search-btn:hover { background: var(--ox); }
  .search-btn svg { width: 15px; height: 15px; color: #fff; }

  /* Category pills */
  .cat-pills {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .cat-pill {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    background: transparent;
    color: var(--mid);
    text-align: left;
    transition: background .15s, color .15s;
    font-family: 'DM Sans', sans-serif;
  }
  .cat-pill:hover { background: var(--cream); }
  .cat-pill.active {
    background: var(--ox);
    color: #fff;
  }
  .cat-pill-count {
    font-size: 11px;
    opacity: 0.55;
    font-weight: 400;
  }

  /* Sort select */
  .sort-select {
    width: 100%;
    padding: 9px 12px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: var(--cream);
    outline: none;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238C847C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    transition: border-color .2s;
  }
  .sort-select:focus { border-color: var(--ox); }

  /* ── MAIN CONTENT ── */
  .results-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 10px;
  }
  .results-count {
    font-size: 13px;
    color: var(--muted);
    font-weight: 300;
  }
  .results-count strong { color: var(--ink); font-weight: 600; }
  .clear-btn {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--ox);
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 4px;
    transition: background .2s;
    font-family: 'DM Sans', sans-serif;
  }
  .clear-btn:hover { background: rgba(107,26,26,0.06); }

  /* Active filters */
  .active-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 18px;
  }
  .filter-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    background: rgba(107,26,26,0.08);
    border-radius: 100px;
    font-size: 11px;
    font-weight: 600;
    color: var(--ox);
    letter-spacing: 0.03em;
  }
  .filter-tag button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--ox-light);
    display: flex;
    align-items: center;
    padding: 0;
    font-size: 13px;
    line-height: 1;
  }

  /* Products grid */
  .prod-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 18px;
  }

  /* ── PAGINATION ── */
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 36px;
    flex-wrap: wrap;
  }
  .page-btn {
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--white);
    font-size: 12px;
    font-weight: 600;
    color: var(--mid);
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: border-color .15s, background .15s, color .15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-btn:hover:not(:disabled):not(.active) {
    border-color: var(--ox);
    color: var(--ox);
  }
  .page-btn.active {
    background: var(--ox);
    border-color: var(--ox);
    color: #fff;
  }
  .page-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  .page-dots {
    font-size: 13px;
    color: var(--muted);
    padding: 0 4px;
    line-height: 36px;
  }

  /* ── EMPTY STATE ── */
  .empty-state {
    padding: 72px 24px;
    text-align: center;
    background: var(--white);
    border: 1px dashed var(--border);
    border-radius: 12px;
  }
  .empty-icon {
    width: 56px;
    height: 56px;
    background: var(--cream);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
  }
  .empty-icon svg { width: 26px; height: 26px; color: var(--muted); }
  .empty-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 8px;
  }
  .empty-sub {
    font-size: 13px;
    color: var(--muted);
    font-weight: 300;
    margin-bottom: 24px;
  }
  .btn-ox {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: var(--ox);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background .2s;
  }
  .btn-ox:hover { background: var(--ox-light); }
`;

export default function Products({ products, categories, current_type, filters, pagination }) {
  const [activeTab, setActiveTab] = useState(current_type || 'oil');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
  const [selectedSort, setSelectedSort] = useState(filters.sort || 'newest');
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  const handleTabChange = (type) => {
    setActiveTab(type);
    router.get(`/products/?type=${type}`, {}, { preserveState: false });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    router.get(`/products/?type=${activeTab}&category=${categoryId}&sort=${selectedSort}`);
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    router.get(`/products/?type=${activeTab}&category=${selectedCategory}&sort=${sort}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(`/products/?type=${activeTab}&search=${searchQuery}&category=${selectedCategory}&sort=${selectedSort}`);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    router.get(`/products/?type=${activeTab}`);
  };

  const handlePageChange = (page) => {
    router.get(`/products/?type=${activeTab}&page=${page}&category=${selectedCategory}&sort=${selectedSort}&search=${searchQuery}`);
  };

  const hasActiveFilters = selectedCategory || searchQuery;
  const selectedCategoryName = categories.find(c => c.id === selectedCategory)?.name;

  return (
    <ShopLayout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="p-root">

        {/* ── PAGE HEADER ── */}
        <div className="p-header">
          <div className="p-header-inner">
            <div>
              <div className="p-header-label">Our Catalogue</div>
              <h1 className="p-header-title">
                {activeTab === 'oil' ? 'Oils & Lubricants' : 'Spare Parts'}
              </h1>
              <p className="p-header-sub">
                {activeTab === 'oil'
                  ? 'Professional-grade lubricants for every engine'
                  : 'Genuine parts for every vehicle'}
              </p>
            </div>
            <div className="p-tabs">
              <button
                className={`p-tab ${activeTab === 'oil' ? 'active' : ''}`}
                onClick={() => handleTabChange('oil')}
              >
                🛢 Oils
              </button>
              <button
                className={`p-tab ${activeTab === 'spare_part' ? 'active' : ''}`}
                onClick={() => handleTabChange('spare_part')}
              >
                🔧 Spare Parts
              </button>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="p-body">

          {/* ── SIDEBAR ── */}
          <aside className="sidebar">

            {/* Search */}
            <div className="sidebar-section">
              <div className="sidebar-heading">Search</div>
              <form onSubmit={handleSearch}>
                <div className="search-wrap">
                  <input
                    type="text"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products…"
                  />
                  <button type="submit" className="search-btn">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Categories */}
            <div className="sidebar-section">
              <div className="sidebar-heading">Category</div>
              <div className="cat-pills">
                <button
                  className={`cat-pill ${selectedCategory === '' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('')}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    {cat.name}
                    <span className="cat-pill-count">{cat.product_count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="sidebar-section">
              <div className="sidebar-heading">Sort By</div>
              <select
                className="sort-select"
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

          </aside>

          {/* ── MAIN ── */}
          <div>

            {/* Results bar */}
            <div className="results-bar">
              {pagination ? (
                <p className="results-count">
                  Showing <strong>{((pagination.current_page - 1) * 12) + 1}–{Math.min(pagination.current_page * 12, pagination.total_items)}</strong> of <strong>{pagination.total_items}</strong> products
                </p>
              ) : (
                <p className="results-count"><strong>{products.length}</strong> products</p>
              )}
              {hasActiveFilters && (
                <button className="clear-btn" onClick={clearFilters}>
                  ✕ Clear filters
                </button>
              )}
            </div>

            {/* Active filter tags */}
            {hasActiveFilters && (
              <div className="active-filters">
                {selectedCategoryName && (
                  <span className="filter-tag">
                    {selectedCategoryName}
                    <button onClick={() => handleCategoryChange('')}>×</button>
                  </span>
                )}
                {searchQuery && (
                  <span className="filter-tag">
                    "{searchQuery}"
                    <button onClick={() => { setSearchQuery(''); router.get(`/products/?type=${activeTab}&category=${selectedCategory}&sort=${selectedSort}`); }}>×</button>
                  </span>
                )}
              </div>
            )}

            {/* Products or Empty */}
            {products.length > 0 ? (
              <>
                <div className="prod-grid">
                  {products.map((product) => (
                    <ProductCart key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.total_pages > 1 && (
                  <div className="pagination">
                    <button
                      className="page-btn"
                      onClick={() => handlePageChange(1)}
                      disabled={pagination.current_page === 1}
                      title="First"
                    >
                      «
                    </button>
                    <button
                      className="page-btn"
                      onClick={() => handlePageChange(pagination.current_page - 1)}
                      disabled={!pagination.has_previous}
                    >
                      ‹
                    </button>

                    {[...Array(pagination.total_pages)].map((_, i) => {
                      const p = i + 1;
                      if (
                        p === 1 ||
                        p === pagination.total_pages ||
                        (p >= pagination.current_page - 2 && p <= pagination.current_page + 2)
                      ) {
                        return (
                          <button
                            key={p}
                            className={`page-btn ${p === pagination.current_page ? 'active' : ''}`}
                            onClick={() => handlePageChange(p)}
                          >
                            {p}
                          </button>
                        );
                      } else if (p === pagination.current_page - 3 || p === pagination.current_page + 3) {
                        return <span key={p} className="page-dots">…</span>;
                      }
                      return null;
                    })}

                    <button
                      className="page-btn"
                      onClick={() => handlePageChange(pagination.current_page + 1)}
                      disabled={!pagination.has_next}
                    >
                      ›
                    </button>
                    <button
                      className="page-btn"
                      onClick={() => handlePageChange(pagination.total_pages)}
                      disabled={pagination.current_page === pagination.total_pages}
                      title="Last"
                    >
                      »
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="empty-title">No products found</div>
                <p className="empty-sub">Try adjusting your filters or search query</p>
                <button className="btn-ox" onClick={clearFilters}>
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}