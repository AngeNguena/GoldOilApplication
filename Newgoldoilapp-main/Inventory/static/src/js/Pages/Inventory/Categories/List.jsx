
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

  .cg-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }

  .cg-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
  }

  @media(max-width:640px){
    .cg-container {
      padding: 0 20px;
    }
  }

  /* Header */
  .cg-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 36px;
  }

  .cg-label {
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

  .cg-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }

  .cg-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
  }

  .cg-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }

  .cg-add-btn {
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

  .cg-add-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(107,26,26,0.4);
  }

  /* Stat cards */
  .cg-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 36px;
  }

  @media(max-width:768px){
    .cg-stats {
      grid-template-columns: 1fr;
    }
  }

  .cg-stat-card {
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

  .cg-stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(107,26,26,0.08);
    border-color: var(--ox-light);
  }

  .cg-stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--ox);
  }

  .cg-stat-lbl {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .cg-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1;
  }

  .cg-stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .cg-stat-icon svg {
    width: 20px;
    height: 20px;
    color: var(--ox);
  }

  .cg-stat-link {
    font-size: 12px;
    font-weight: 700;
    color: var(--ox-light);
    text-decoration: none;
    margin-top: 6px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: color .2s;
  }

  .cg-stat-link:hover {
    color: var(--ox);
  }

  /* Table */
  .cg-table-wrap {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .cg-table {
    width: 100%;
    border-collapse: collapse;
  }

  .cg-table thead {
    background: var(--cream);
  }

  .cg-table th {
    padding: 16px 24px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
  }

  .cg-table th.right {
    text-align: right;
  }

  .cg-table td {
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    color: var(--mid);
    vertical-align: middle;
  }

  .cg-table tbody tr {
    transition: background .15s;
  }

  .cg-table tbody tr:hover {
    background: var(--cream);
  }

  .cg-table tbody tr:last-child td {
    border-bottom: none;
  }

  .cg-cat-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--ink);
  }

  .cg-sub-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .cg-sub-badge {
    display: inline-block;
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    background: rgba(107,26,26,0.08);
    color: var(--ox);
  }

  .cg-sub-empty {
    font-size: 12px;
    color: var(--muted);
    font-style: italic;
    font-weight: 300;
  }

  .cg-actions {
    text-align: right;
    white-space: nowrap;
  }

  .cg-edit-link {
    font-size: 12px;
    font-weight: 700;
    color: var(--ox-light);
    text-decoration: none;
    margin-right: 20px;
    transition: color .2s;
  }

  .cg-edit-link:hover {
    color: var(--ox);
  }

  .cg-delete-btn {
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    background: none;
    border: none;
    cursor: pointer;
    transition: color .2s;
  }

  .cg-delete-btn:hover {
    color: var(--ox);
  }

  .cg-empty {
    padding: 60px 24px;
    text-align: center;
  }

  .cg-empty p:first-child {
    font-size: 14px;
    font-weight: 700;
    color: var(--mid);
    margin-bottom: 4px;
  }

  .cg-empty p:last-child {
    font-size: 12px;
    color: var(--muted);
    font-weight: 300;
  }
`;

export default function CategoryList({ categories }) {

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="cg-root">
        <div className="cg-container">

          {/* Header */}
          <div className="cg-header">
            <div>
              <div className="cg-label">Catalog</div>

              <h1 className="cg-title">
                Categories
              </h1>

              <p className="cg-sub">
                {categories.length} total categories
              </p>
            </div>

            <Link
              href="/inventory/categories/create/"
              className="cg-add-btn"
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

              Add Category
            </Link>
          </div>

          {/* Stats */}
          <div className="cg-stats">

            <div className="cg-stat-card">
              <div>
                <div className="cg-stat-lbl">
                  Total Categories
                </div>

                <div className="cg-stat-val">
                  {categories.length}
                </div>
              </div>

              <div className="cg-stat-icon">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
            </div>

            <div className="cg-stat-card">
              <div>
                <div className="cg-stat-lbl">
                  Total Subcategories
                </div>

                <div className="cg-stat-val">
                  {categories.reduce(
                    (sum, c) => sum + c.subcategory_count,
                    0
                  )}
                </div>
              </div>

              <div className="cg-stat-icon">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>

            <div className="cg-stat-card">
              <div>
                <div className="cg-stat-lbl">
                  Quick Actions
                </div>

                <Link
                  href="/inventory/subcategories/"
                  className="cg-stat-link"
                >
                  Manage Subcategories

                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              <div className="cg-stat-icon">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
            </div>

          </div>

          {/* Table */}
          <div className="cg-table-wrap">

            <table className="cg-table">

              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Subcategories</th>
                  <th className="right">Actions</th>
                </tr>
              </thead>

              <tbody>

                {categories.length === 0 ? (

                  <tr>
                    <td colSpan="3">

                      <div className="cg-empty">
                        <p>No categories found</p>
                        <p>
                          Get started by creating a new category
                        </p>
                      </div>

                    </td>
                  </tr>

                ) : (

                  categories.map((category) => (

                    <tr key={category.id}>

                      <td>
                        <div className="cg-cat-name">
                          {category.name}
                        </div>
                      </td>

                      <td>
                        <div className="cg-sub-badges">

                          {category.subcategories.length > 0 ? (

                            category.subcategories.map((sub) => (
                              <span
                                key={sub.id}
                                className="cg-sub-badge"
                              >
                                {sub.name}
                              </span>
                            ))

                          ) : (

                            <span className="cg-sub-empty">
                              No subcategories
                            </span>

                          )}

                        </div>
                      </td>

                      <td className="cg-actions">

                        <Link
                          href={`/inventory/categories/${category.id}/update/`}
                          className="cg-edit-link"
                        >
                          Edit
                        </Link>

                        
                        <Link
                          as="button"
                          method="post"
                          href={`/inventory/categories/${category.id}/delete/`}
                          className="cg-delete-btn"
                          onBefore={() =>
                            confirm(
                              "WARNING: Deleting this category will NOT delete its associated products. The products will be kept without a category.\n\nAre you sure you want to continue?"
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
