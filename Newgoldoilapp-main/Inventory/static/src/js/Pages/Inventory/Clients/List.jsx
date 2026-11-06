
import React from "react";
import { Link } from "@inertiajs/react";
import Layout from "../components/Layout";

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

  .cl-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }

  .cl-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
  }

  @media(max-width:640px) {
    .cl-container {
      padding: 0 20px;
    }
  }

  /* Header */

  .cl-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 36px;
  }

  .cl-label {
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

  .cl-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }

  .cl-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
  }

  .cl-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }

  .cl-add-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 26px;
    background: linear-gradient(
      135deg,
      var(--ox) 0%,
      var(--ox-dark) 100%
    );
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.03em;
    border-radius: 6px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(107, 26, 26, 0.3);
    transition: transform .2s, box-shadow .2s;
  }

  .cl-add-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(107, 26, 26, 0.4);
  }

  /* Stat cards */

  .cl-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 36px;
  }

  @media(max-width:768px) {
    .cl-stats {
      grid-template-columns: 1fr;
    }
  }

  .cl-stat-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    transition:
      transform .2s,
      box-shadow .2s,
      border-color .2s;
  }

  .cl-stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(107, 26, 26, 0.08);
    border-color: var(--ox-light);
  }

  .cl-stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--ox);
  }

  .cl-stat-lbl {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .cl-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1;
  }

  .cl-stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .cl-stat-icon svg {
    width: 20px;
    height: 20px;
    color: var(--ox);
  }

  /* Table */

  .cl-table-wrap {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .cl-table {
    width: 100%;
    border-collapse: collapse;
  }

  .cl-table thead {
    background: var(--cream);
  }

  .cl-table th {
    padding: 16px 24px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
  }

  .cl-table th.right {
    text-align: right;
  }

  .cl-table td {
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    color: var(--mid);
  }

  .cl-table tbody tr {
    transition: background .15s;
  }

  .cl-table tbody tr:hover {
    background: var(--cream);
  }

  .cl-table tbody tr:last-child td {
    border-bottom: none;
  }

  /* Client avatar */

  .cl-avatar-row {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .cl-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      var(--ox) 0%,
      var(--ox-dark) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #fff;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 15px;
  }

  .cl-name {
    font-size: 13px;
    font-weight: 700;
    color: var(--ink);
  }

  /* Type */

  .cl-type-badge {
    display: inline-block;
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    text-transform: capitalize;
    background: rgba(107, 26, 26, 0.08);
    color: var(--ox);
  }

  /* Actions */

  .cl-actions {
    text-align: right;
    white-space: nowrap;
  }

  .cl-edit-link {
    font-size: 12px;
    font-weight: 700;
    color: var(--ox-light);
    text-decoration: none;
    margin-right: 20px;
    transition: color .2s;
  }

  .cl-edit-link:hover {
    color: var(--ox);
  }

  .cl-delete-btn {
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: color .2s;
  }

  .cl-delete-btn:hover {
    color: var(--ox);
  }

  /* Empty */

  .cl-empty {
    padding: 60px 24px;
    text-align: center;
  }

  .cl-empty p:first-child {
    font-size: 14px;
    font-weight: 700;
    color: var(--mid);
    margin-bottom: 4px;
  }

  .cl-empty p:last-child {
    font-size: 12px;
    color: var(--muted);
    font-weight: 300;
  }
`;

export default function ClientList({ clients = [] }) {

  return (
    <Layout>
      <style
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />

      <div className="cl-root">
        <div className="cl-container">

          {/* Header */}
          <div className="cl-header">

            <div>
              <div className="cl-label">
                Directory
              </div>

              <h1 className="cl-title">
                Clients
              </h1>

              <p className="cl-sub">
                {clients.length} total clients
              </p>
            </div>

            <a
              href="/inventory/clients/create/"
              className="cl-add-btn"
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

              Add Client
            </a>

          </div>

          {/* Stats */}
          <div className="cl-stats">

            {/* Total */}
            <div className="cl-stat-card">
              <div>
                <div className="cl-stat-lbl">
                  Total Clients
                </div>

                <div className="cl-stat-val">
                  {clients.length}
                </div>
              </div>

              <div className="cl-stat-icon">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Individuals */}
            <div className="cl-stat-card">
              <div>
                <div className="cl-stat-lbl">
                  Individuals
                </div>

                <div className="cl-stat-val">
                  {
                    clients.filter(
                      c => c.client_type === "individual"
                    ).length
                  }
                </div>
              </div>

              <div className="cl-stat-icon">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            {/* Enterprises */}
            <div className="cl-stat-card">
              <div>
                <div className="cl-stat-lbl">
                  Enterprises
                </div>

                <div className="cl-stat-val">
                  {
                    clients.filter(
                      c => c.client_type === "enterprise"
                    ).length
                  }
                </div>
              </div>

              <div className="cl-stat-icon">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>

          </div>

          {/* Table */}
          <div className="cl-table-wrap">

            <table className="cl-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th className="right">Actions</th>
                </tr>
              </thead>

              <tbody>

                {clients.length === 0 ? (

                  <tr>
                    <td colSpan="5">

                      <div className="cl-empty">
                        <p>No clients found</p>
                        <p>
                          Get started by creating a new client
                        </p>
                      </div>

                    </td>
                  </tr>

                ) : (

                  clients.map((c) => (

                    <tr key={c.id}>

                      {/* Name */}
                      <td>
                        <div className="cl-avatar-row">

                          <div className="cl-avatar">
                            {c.name
                              ? c.name
                                  .charAt(0)
                                  .toUpperCase()
                              : "?"}
                          </div>

                          <div className="cl-name">
                            {c.name}
                          </div>

                        </div>
                      </td>

                      {/* Type */}
                      <td>
                        <span className="cl-type-badge">
                          {c.client_type}
                        </span>
                      </td>

                      {/* Email */}
                      <td>
                        {c.email || "—"}
                      </td>

                      {/* Phone */}
                      <td>
                        {c.phone || "—"}
                      </td>

                      {/* Actions */}
                      <td className="cl-actions">

                        {/* Edit */}
                        <a
                          href={`/inventory/clients/${c.id}/update/`}
                          className="cl-edit-link"
                        >
                          Edit
                        </a>

                        {/* Delete */}
                        <Link
                          href={`/inventory/clients/${c.id}/delete/`}
                          method="post"
                          as="button"
                          className="cl-delete-btn"
                          onClick={(e) => {

                            if (
                              !window.confirm(
                                `Are you sure you want to delete "${c.name}"?`
                              )
                            ) {
                              e.preventDefault();
                            }

                          }}
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

