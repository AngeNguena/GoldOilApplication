
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

  .sc-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }

  .sc-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
  }

  @media(max-width:640px){
    .sc-container {
      padding: 0 20px;
    }
  }

  /* Header */
  .sc-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 36px;
  }

  .sc-label {
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

  .sc-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }

  .sc-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
  }

  .sc-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }

  .sc-btn-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .sc-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 24px;
    background: #fff;
    color: var(--mid);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.03em;
    border: 1px solid var(--border);
    border-radius: 6px;
    text-decoration: none;
    transition: border-color .2s, color .2s;
  }

  .sc-btn-ghost:hover {
    border-color: var(--ox-light);
    color: var(--ox);
  }

  .sc-add-btn {
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

  .sc-add-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(107,26,26,0.4);
  }

  /* Stat cards */
  .sc-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 36px;
  }

  @media(max-width:640px){
    .sc-stats {
      grid-template-columns: 1fr;
    }
  }

  .sc-stat-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    transition: transform .2s, box-shadow .2s, border-color .2s;
  }

  .sc-stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(107,26,26,0.08);
    border-color: var(--ox-light);
  }

  .sc-stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--ox);
  }

  .sc-stat-lbl {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .sc-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1;
  }

  .sc-stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .sc-stat-icon svg {
    width: 20px;
    height: 20px;
    color: var(--ox);
  }

  /* Table */
  .sc-table-wrap {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .sc-table {
    width: 100%;
    border-collapse: collapse;
  }

  .sc-table thead {
    background: var(--cream);
  }

  .sc-table th {
    padding: 16px 24px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
  }

  .sc-table th.right {
    text-align: right;
  }

  .sc-table td {
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    color: var(--mid);
  }

  .sc-table tbody tr {
    transition: background .15s;
  }

  .sc-table tbody tr:hover {
    background: var(--cream);
  }

  .sc-table tbody tr:last-child td {
    border-bottom: none;
  }

  .sc-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--ink);
  }

  .sc-cat-badge {
    display: inline-block;
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    background: rgba(107,26,26,0.08);
    color: var(--ox);
  }

  .sc-actions {
    text-align: right;
    white-space: nowrap;
  }

  .sc-edit-link {
    font-size: 12px;
    font-weight: 700;
    color: var(--ox-light);
    text-decoration: none;
    margin-right: 20px;
    transition: color .2s;
  }

  .sc-edit-link:hover {
    color: var(--ox);
  }

  .sc-delete-btn {
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    background: none;
    border: none;
    cursor: pointer;
    transition: color .2s;
  }

  .sc-delete-btn:hover {
    color: var(--ox);
  }

  .sc-empty {
    padding: 60px 24px;
    text-align: center;
  }

  .sc-empty p:first-child {
    font-size: 14px;
    font-weight: 700;
    color: var(--mid);
    margin-bottom: 4px;
  }

  .sc-empty p:last-child {
    font-size: 12px;
    color: var(--muted);
    font-weight: 300;
  }
`;

export default function SubcategoryList({ subcategories }) {

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="sc-root">
        <div className="sc-container">

          {/* Header */}
          <div className="sc-header">
            <div>
              <div className="sc-label">Catalog</div>

              <h1 className="sc-title">
                Subcategories
              </h1>

              <p className="sc-sub">
                {subcategories.length} total subcategories
              </p>
            </div>

            <div className="sc-btn-row">

              <Link
                href="/inventory/categories/"
                className="sc-btn-ghost"
              >
                View Categories
              </Link>

              <Link
                href="/inventory/subcategories/create/"
                className="sc-add-btn"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>

                Add Subcategory
              </Link>

            </div>
          </div>

          {/* Stats */}
          <div className="sc-stats">

            <div className="sc-stat-card">
              <div>
                <div className="sc-stat-lbl">
                  Total Subcategories
                </div>

                <div className="sc-stat-val">
                  {subcategories.length}
                </div>
              </div>

              <div className="sc-stat-icon">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>

            <div className="sc-stat-card">
              <div>
                <div className="sc-stat-lbl">
                  Total Products
                </div>

                <div className="sc-stat-val">
                  {subcategories.reduce(
                    (sum, s) => sum + s.product_count,
                    0
                  )}
                </div>
              </div>

              <div className="sc-stat-icon">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>

          </div>

          {/* Table */}
          <div className="sc-table-wrap">

            <table className="sc-table">

              <thead>
                <tr>
                  <th>Subcategory Name</th>
                  <th>Category</th>
                  <th>Products</th>
                  <th className="right">Actions</th>
                </tr>
              </thead>

              <tbody>

                {subcategories.length === 0 ? (

                  <tr>
                    <td colSpan="4">

                      <div className="sc-empty">
                        <p>No subcategories found</p>
                        <p>
                          Get started by creating a new subcategory
                        </p>
                      </div>

                    </td>
                  </tr>

                ) : (

                  subcategories.map((subcategory) => (

                    <tr key={subcategory.id}>

                      <td>
                        <div className="sc-name">
                          {subcategory.name}
                        </div>
                      </td>

                      <td>
                        <span className="sc-cat-badge">
                          {subcategory.category_name}
                        </span>
                      </td>

                      <td>
                        {subcategory.product_count} products
                      </td>

                      <td className="sc-actions">

                        <Link
                          href={`/inventory/subcategories/${subcategory.id}/update/`}
                          className="sc-edit-link"
                        >
                          Edit
                        </Link>

                        <Link
                          as="button"
                          method="post"
                          href={`/inventory/subcategories/${subcategory.id}/delete/`}
                          className="sc-delete-btn"
                          onBefore={() =>
                            confirm(
                              "Are you sure you want to delete this subcategory?"
                            )
                          }
                        >
                          Delete
                        </Link>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </Layout>
  );
}
