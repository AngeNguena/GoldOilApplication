
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

  .sp-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }

  .sp-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
  }

  @media(max-width:640px) {
    .sp-container {
      padding: 0 20px;
    }
  }

  .sp-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 36px;
  }

  .sp-label {
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

  .sp-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }

  .sp-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
  }

  .sp-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }

  .sp-btn-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .sp-btn-ghost {
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

  .sp-btn-ghost:hover {
    border-color: var(--ox-light);
    color: var(--ox);
  }

  .sp-add-btn {
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

  .sp-add-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(107,26,26,0.4);
  }

  .sp-stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 36px;
  }

  .sp-stat-card {
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

  .sp-stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(107,26,26,0.08);
    border-color: var(--ox-light);
  }

  .sp-stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--ox);
  }

  .sp-stat-lbl {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .sp-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1;
  }

  .sp-stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sp-stat-icon svg {
    width: 20px;
    height: 20px;
    color: var(--ox);
  }

  .sp-table-wrap {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow-x: auto;
  }

  .sp-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;
  }

  .sp-table thead {
    background: var(--cream);
  }

  .sp-table th {
    padding: 16px 24px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
  }

  .sp-table th.right {
    text-align: right;
  }

  .sp-table td {
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    color: var(--mid);
  }

  .sp-table tbody tr {
    transition: background .15s;
  }

  .sp-table tbody tr:hover {
    background: var(--cream);
  }

  .sp-table tbody tr:last-child td {
    border-bottom: none;
  }

  .sp-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--ink);
  }

  .sp-contact {
    color: var(--mid);
  }

  .sp-muted {
    color: var(--muted);
    font-style: italic;
  }

  .sp-actions {
    text-align: right;
    white-space: nowrap;
  }

  .sp-edit-link {
    font-size: 12px;
    font-weight: 700;
    color: var(--ox-light);
    text-decoration: none;
    margin-right: 20px;
    transition: color .2s;
  }

  .sp-edit-link:hover {
    color: var(--ox);
  }

  .sp-delete-btn {
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    background: none;
    border: none;
    cursor: pointer;
    transition: color .2s;
  }

  .sp-delete-btn:hover {
    color: var(--ox);
  }

  .sp-empty {
    padding: 60px 24px;
    text-align: center;
  }

  .sp-empty p:first-child {
    font-size: 14px;
    font-weight: 700;
    color: var(--mid);
    margin-bottom: 4px;
  }

  .sp-empty p:last-child {
    font-size: 12px;
    color: var(--muted);
    font-weight: 300;
  }
`;

export default function SupplierList({ suppliers = [] }) {

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="sp-root">
        <div className="sp-container">

          {/* Header */}
          <div className="sp-header">
            <div>
              <div className="sp-label">
                Catalog
              </div>

              <h1 className="sp-title">
                Suppliers
              </h1>

              <p className="sp-sub">
                {suppliers.length} total suppliers
              </p>
            </div>

            <div className="sp-btn-row">

              <Link
                href="/inventory/suppliers/create/"
                className="sp-add-btn"
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

                Add Supplier
              </Link>

            </div>
          </div>

          {/* Stats */}
          <div className="sp-stats">

            <div className="sp-stat-card">

              <div>
                <div className="sp-stat-lbl">
                  Total Suppliers
                </div>

                <div className="sp-stat-val">
                  {suppliers.length}
                </div>
              </div>

              <div className="sp-stat-icon">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-10a4 4 0 110 8 4 4 0 010-8zm6 4a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

            </div>

          </div>

          {/* Table */}
          <div className="sp-table-wrap">

            <table className="sp-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th className="right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                {suppliers.length === 0 ? (

                  <tr>
                    <td colSpan="5">

                      <div className="sp-empty">
                        <p>
                          No suppliers found
                        </p>

                        <p>
                          Get started by creating a new supplier
                        </p>
                      </div>

                    </td>
                  </tr>

                ) : (

                  suppliers.map((supplier) => (

                    <tr key={supplier.id}>

                      <td>
                        <div className="sp-name">
                          {supplier.name}
                        </div>
                      </td>

                      <td className="sp-contact">
                        {supplier.email || (
                          <span className="sp-muted">
                            Not provided
                          </span>
                        )}
                      </td>

                      <td className="sp-contact">
                        {supplier.phone || (
                          <span className="sp-muted">
                            Not provided
                          </span>
                        )}
                      </td>

                      <td className="sp-contact">
                        {supplier.address || (
                          <span className="sp-muted">
                            Not provided
                          </span>
                        )}
                      </td>

                      <td className="sp-actions">

                        <Link
                          href={`/inventory/suppliers/${supplier.id}/update/`}
                          className="sp-edit-link"
                        >
                          Edit
                        </Link>

                        <Link
                          as="button"
                          method="post"
                          href={`/inventory/suppliers/${supplier.id}/delete/`}
                          className="sp-delete-btn"
                          onBefore={() =>
                            confirm(
                              `Are you sure you want to delete supplier "${supplier.name}"?`
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

