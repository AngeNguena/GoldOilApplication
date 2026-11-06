import React from "react";
import { Head, Link } from "@inertiajs/react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  :root {
    --ox: #6B1A1A;
    --ox-dark: #4A0F0F;
    --ox-light: #8B2E2E;
    --cream: #FAF7F2;
    --ink: #0E0C0B;
    --mid: #3A3330;
    --muted: #8C847C;
    --border: #E5DDD5;
    --white: #FFFFFF;
    --green: #2F6B45;
    --orange: #A45A18;
    --red: #9B3030;
    --blue: #315A7D;
  }

  * {
    box-sizing: border-box;
  }

  .ad-root {
    min-height: 100vh;
    background: var(--cream);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
  }

  /* HEADER */

  .ad-header {
    background: var(--ink);
    color: white;
  }

  .ad-header-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 28px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .ad-eyebrow {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .2em;
    color: rgba(255,255,255,.55);
    margin-bottom: 6px;
  }

  .ad-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    margin: 0;
  }

  .ad-welcome {
    color: rgba(255,255,255,.65);
    font-size: 13px;
    margin-top: 5px;
  }

  .ad-header-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .ad-header-btn {
    padding: 10px 16px;
    border: 1px solid rgba(255,255,255,.2);
    border-radius: 7px;
    color: white;
    text-decoration: none;
    font-size: 12px;
    font-weight: 700;
  }

  .ad-header-btn:hover {
    background: rgba(255,255,255,.08);
  }

  /* CONTENT */

  .ad-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 34px 32px 60px;
  }

  .ad-section {
    margin-bottom: 34px;
  }

  .ad-section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 15px;
    margin-bottom: 16px;
  }

  .ad-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 21px;
    margin: 0;
  }

  .ad-section-subtitle {
    color: var(--muted);
    font-size: 12px;
    margin-top: 4px;
  }

  /* KPI CARDS */

  .ad-kpi-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;
  }

  .ad-kpi {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    min-width: 0;
  }

  .ad-kpi-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: .12em;
    font-weight: 700;
    color: var(--muted);
  }

  .ad-kpi-value {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    margin-top: 8px;
    color: var(--ink);
  }

  .ad-kpi-note {
    font-size: 11px;
    color: var(--muted);
    margin-top: 5px;
  }

  .ad-kpi.sales {
    border-top: 3px solid var(--green);
  }

  .ad-kpi.orders {
    border-top: 3px solid var(--blue);
  }

  .ad-kpi.products {
    border-top: 3px solid var(--orange);
  }

  .ad-kpi.stock {
    border-top: 3px solid var(--red);
  }

  /* GRID */

  .ad-two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  .ad-three-column {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  .ad-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .ad-card-header {
    padding: 18px 20px;
    border-bottom: 1px solid var(--border);
  }

  .ad-card-title {
    font-size: 14px;
    font-weight: 700;
    margin: 0;
  }

  .ad-card-subtitle {
    color: var(--muted);
    font-size: 11px;
    margin-top: 4px;
  }

  .ad-card-body {
    padding: 18px 20px;
  }

  /* CUSTOMER LIST */

  .ad-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .ad-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 13px 0;
    border-bottom: 1px solid #eee7e1;
  }

  .ad-list-item:last-child {
    border-bottom: none;
  }

  .ad-person {
    min-width: 0;
  }

  .ad-person-name {
    font-size: 13px;
    font-weight: 700;
  }

  .ad-person-email {
    color: var(--muted);
    font-size: 11px;
    margin-top: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ad-list-value {
    text-align: right;
    flex-shrink: 0;
  }

  .ad-list-number {
    font-weight: 700;
    font-size: 13px;
  }

  .ad-list-label {
    color: var(--muted);
    font-size: 10px;
  }

  /* PRODUCT LIST */

  .ad-product-row {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: 15px;
    padding: 13px 0;
    border-bottom: 1px solid #eee7e1;
  }

  .ad-product-row:last-child {
    border-bottom: none;
  }

  .ad-product-name {
    font-size: 13px;
    font-weight: 700;
  }

  .ad-product-ref {
    color: var(--muted);
    font-size: 10px;
    margin-top: 3px;
  }

  .ad-product-qty {
    font-size: 12px;
    font-weight: 700;
    text-align: right;
  }

  .ad-product-revenue {
    font-size: 12px;
    font-weight: 700;
    text-align: right;
  }

  /* STATUS */

  .ad-status {
    display: inline-flex;
    align-items: center;
    padding: 5px 8px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
    text-transform: capitalize;
  }

  .ad-status.pending {
    background: #FFF1DE;
    color: #92500D;
  }

  .ad-status.processing {
    background: #E9F0F8;
    color: #315A7D;
  }

  .ad-status.shipped {
    background: #EEE8F7;
    color: #654A8A;
  }

  .ad-status.delivered {
    background: #E7F3EA;
    color: #2F6B45;
  }

  .ad-status.cancelled,
  .ad-status.failed {
    background: #F8E7E7;
    color: #9B3030;
  }

  .ad-status.payment_verified {
    background: #E7F3EA;
    color: #2F6B45;
  }

  /* ORDERS */

  .ad-order-table-wrap {
    overflow-x: auto;
  }

  .ad-order-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 760px;
  }

  .ad-order-table th {
    text-align: left;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: .08em;
    color: var(--muted);
    padding: 12px 14px;
    border-bottom: 1px solid var(--border);
  }

  .ad-order-table td {
    padding: 14px;
    font-size: 12px;
    border-bottom: 1px solid #eee7e1;
  }

  .ad-order-number {
    font-weight: 700;
    color: var(--ox);
  }

  .ad-order-customer {
    font-weight: 600;
  }

  .ad-order-date {
    color: var(--muted);
    font-size: 11px;
  }

  .ad-money {
    font-weight: 700;
  }

  /* STOCK */

  .ad-stock-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 12px 0;
    border-bottom: 1px solid #eee7e1;
  }

  .ad-stock-row:last-child {
    border-bottom: none;
  }

  .ad-stock-name {
    font-size: 13px;
    font-weight: 700;
  }

  .ad-stock-ref {
    color: var(--muted);
    font-size: 10px;
    margin-top: 3px;
  }

  .ad-stock-number {
    font-size: 12px;
    font-weight: 700;
    color: var(--red);
    white-space: nowrap;
  }

  .ad-empty {
    padding: 25px 5px;
    text-align: center;
    color: var(--muted);
    font-size: 12px;
  }

  /* USER TABLE */

  .ad-users-wrap {
    overflow-x: auto;
  }

  .ad-users-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 850px;
  }

  .ad-users-table th {
    padding: 12px 14px;
    text-align: left;
    color: var(--muted);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: .08em;
    border-bottom: 1px solid var(--border);
  }

  .ad-users-table td {
    padding: 13px 14px;
    font-size: 12px;
    border-bottom: 1px solid #eee7e1;
  }

  .ad-role {
    text-transform: capitalize;
    font-weight: 700;
  }

  .ad-active {
    color: var(--green);
    font-weight: 700;
  }

  .ad-inactive {
    color: var(--red);
    font-weight: 700;
  }

  /* RESPONSIVE */

  @media(max-width:1200px) {
    .ad-kpi-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media(max-width:900px) {
    .ad-two-column,
    .ad-three-column {
      grid-template-columns: 1fr;
    }
  }

  @media(max-width:640px) {
    .ad-header-inner {
      padding: 22px 20px;
      align-items: flex-start;
      flex-direction: column;
    }

    .ad-container {
      padding: 25px 20px 45px;
    }

    .ad-kpi-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .ad-kpi {
      padding: 15px;
    }

    .ad-kpi-value {
      font-size: 22px;
    }
  }
`;

const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount || 0);
};

const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const getCustomerName = (customer) => {
    const fullName = `${customer?.first_name || ""} ${
        customer?.last_name || ""
    }`.trim();

    return fullName || customer?.username || "Unknown Customer";
};

export default function Dashboard({
    user,
    users = [],

    total_users = 0,
    total_customers = 0,
    total_managers = 0,
    total_ceos = 0,

    total_orders = 0,
    total_sales = 0,
    total_products = 0,
    low_stock_count = 0,

    pending_orders = 0,
    processing_orders = 0,
    shipped_orders = 0,
    delivered_orders = 0,
    cancelled_orders = 0,
    failed_orders = 0,

    top_customers = [],
    top_customers_by_spending = [],

    best_selling_products = [],
    top_revenue_products = [],

    low_stock_products = [],
    recent_orders = [],
}) {
    return (
        <>
            <Head title="Admin Dashboard" />

            <style
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />

            <div className="ad-root">

                {/* HEADER */}
                <header className="ad-header">
                    <div className="ad-header-inner">

                        <div>
                            <div className="ad-eyebrow">
                                GOLD OIL SYSTEM
                            </div>

                            <h1 className="ad-title">
                                Admin Dashboard
                            </h1>

                            <div className="ad-welcome">
                                Welcome back,{" "}
                                {user?.first_name ||
                                    user?.username ||
                                    "Administrator"}
                                .
                            </div>
                        </div>

                        <div className="ad-header-actions">

                            <Link
                                href="/inventory/dashboard/"
                                className="ad-header-btn"
                            >
                                Inventory
                            </Link>

                            <Link
                                href="/auth/profile/"
                                className="ad-header-btn"
                            >
                                My Profile
                            </Link>

                        </div>

                    </div>
                </header>

                <main className="ad-container">

                    {/* KPI SECTION */}
                    <section className="ad-section">

                        <div className="ad-section-heading">
                            <div>
                                <h2 className="ad-section-title">
                                    Business Overview
                                </h2>

                                <p className="ad-section-subtitle">
                                    Current system statistics
                                </p>
                            </div>
                        </div>

                        <div className="ad-kpi-grid">

                            <div className="ad-kpi">
                                <div className="ad-kpi-label">
                                    Total Users
                                </div>

                                <div className="ad-kpi-value">
                                    {total_users}
                                </div>

                                <div className="ad-kpi-note">
                                    {total_customers} customers
                                </div>
                            </div>

                            <div className="ad-kpi orders">
                                <div className="ad-kpi-label">
                                    Total Orders
                                </div>

                                <div className="ad-kpi-value">
                                    {total_orders}
                                </div>

                                <div className="ad-kpi-note">
                                    {pending_orders} pending
                                </div>
                            </div>

                            <div className="ad-kpi sales">
                                <div className="ad-kpi-label">
                                    Total Sales
                                </div>

                                <div className="ad-kpi-value">
                                    {formatMoney(total_sales)}
                                </div>

                                <div className="ad-kpi-note">
                                    Valid orders
                                </div>
                            </div>

                            <div className="ad-kpi products">
                                <div className="ad-kpi-label">
                                    Products
                                </div>

                                <div className="ad-kpi-value">
                                    {total_products}
                                </div>

                                <div className="ad-kpi-note">
                                    {low_stock_count} low stock
                                </div>
                            </div>

                            <div className="ad-kpi stock">
                                <div className="ad-kpi-label">
                                    Low Stock
                                </div>

                                <div className="ad-kpi-value">
                                    {low_stock_count}
                                </div>

                                <div className="ad-kpi-note">
                                    10 units or fewer
                                </div>
                            </div>

                            <div className="ad-kpi">
                                <div className="ad-kpi-label">
                                    Staff
                                </div>

                                <div className="ad-kpi-value">
                                    {total_managers + total_ceos}
                                </div>

                                <div className="ad-kpi-note">
                                    {total_managers} managers ·{" "}
                                    {total_ceos} CEOs
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* ORDER OVERVIEW */}
                    <section className="ad-section">

                        <div className="ad-section-heading">
                            <div>
                                <h2 className="ad-section-title">
                                    Order Overview
                                </h2>

                                <p className="ad-section-subtitle">
                                    Current order status
                                </p>
                            </div>
                        </div>

                        <div className="ad-three-column">

                            <div className="ad-card">
                                <div className="ad-card-header">
                                    <h3 className="ad-card-title">
                                        Pending
                                    </h3>
                                </div>

                                <div className="ad-card-body">
                                    <div className="ad-kpi-value">
                                        {pending_orders}
                                    </div>
                                    <div className="ad-kpi-note">
                                        Awaiting payment
                                    </div>
                                </div>
                            </div>

                            <div className="ad-card">
                                <div className="ad-card-header">
                                    <h3 className="ad-card-title">
                                        Processing
                                    </h3>
                                </div>

                                <div className="ad-card-body">
                                    <div className="ad-kpi-value">
                                        {processing_orders}
                                    </div>
                                    <div className="ad-kpi-note">
                                        Being prepared
                                    </div>
                                </div>
                            </div>

                            <div className="ad-card">
                                <div className="ad-card-header">
                                    <h3 className="ad-card-title">
                                        Delivered
                                    </h3>
                                </div>

                                <div className="ad-card-body">
                                    <div className="ad-kpi-value">
                                        {delivered_orders}
                                    </div>
                                    <div className="ad-kpi-note">
                                        Completed orders
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div
                            className="ad-card"
                            style={{ marginTop: "18px" }}
                        >
                            <div className="ad-card-body">

                                <div className="ad-list">

                                    <div className="ad-list-item">
                                        <span>Pending</span>
                                        <strong>{pending_orders}</strong>
                                    </div>

                                    <div className="ad-list-item">
                                        <span>Processing</span>
                                        <strong>{processing_orders}</strong>
                                    </div>

                                    <div className="ad-list-item">
                                        <span>Shipped</span>
                                        <strong>{shipped_orders}</strong>
                                    </div>

                                    <div className="ad-list-item">
                                        <span>Delivered</span>
                                        <strong>{delivered_orders}</strong>
                                    </div>

                                    <div className="ad-list-item">
                                        <span>Cancelled</span>
                                        <strong>{cancelled_orders}</strong>
                                    </div>

                                    <div className="ad-list-item">
                                        <span>Payment Failed</span>
                                        <strong>{failed_orders}</strong>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </section>

                    {/* CUSTOMER INSIGHTS */}
                    <section className="ad-section">

                        <div className="ad-section-heading">
                            <div>
                                <h2 className="ad-section-title">
                                    Customer Insights
                                </h2>

                                <p className="ad-section-subtitle">
                                    Customer purchasing activity
                                </p>
                            </div>
                        </div>

                        <div className="ad-two-column">

                            {/* TOP BY ORDERS */}
                            <div className="ad-card">

                                <div className="ad-card-header">
                                    <h3 className="ad-card-title">
                                        Top Customers by Orders
                                    </h3>

                                    <p className="ad-card-subtitle">
                                        Customers with the most orders
                                    </p>
                                </div>

                                <div className="ad-card-body">

                                    {top_customers.length === 0 ? (
                                        <div className="ad-empty">
                                            No customer orders yet.
                                        </div>
                                    ) : (
                                        <div className="ad-list">

                                            {top_customers.map(
                                                (customer) => (
                                                    <div
                                                        className="ad-list-item"
                                                        key={customer.id}
                                                    >

                                                        <div className="ad-person">
                                                            <div className="ad-person-name">
                                                                {getCustomerName(
                                                                    customer
                                                                )}
                                                            </div>

                                                            <div className="ad-person-email">
                                                                {
                                                                    customer.email
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="ad-list-value">
                                                            <div className="ad-list-number">
                                                                {
                                                                    customer.order_count
                                                                }
                                                            </div>

                                                            <div className="ad-list-label">
                                                                orders
                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            )}

                                        </div>
                                    )}

                                </div>
                            </div>

                            {/* TOP BY SPENDING */}
                            <div className="ad-card">

                                <div className="ad-card-header">
                                    <h3 className="ad-card-title">
                                        Top Customers by Spending
                                    </h3>

                                    <p className="ad-card-subtitle">
                                        Based on valid orders
                                    </p>
                                </div>

                                <div className="ad-card-body">

                                    {top_customers_by_spending.length ===
                                    0 ? (
                                        <div className="ad-empty">
                                            No customer spending data yet.
                                        </div>
                                    ) : (
                                        <div className="ad-list">

                                            {top_customers_by_spending.map(
                                                (customer) => (
                                                    <div
                                                        className="ad-list-item"
                                                        key={customer.id}
                                                    >

                                                        <div className="ad-person">
                                                            <div className="ad-person-name">
                                                                {getCustomerName(
                                                                    customer
                                                                )}
                                                            </div>

                                                            <div className="ad-person-email">
                                                                {
                                                                    customer.email
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="ad-list-value">
                                                            <div className="ad-list-number">
                                                                {formatMoney(
                                                                    customer.total_spent
                                                                )}
                                                            </div>

                                                            <div className="ad-list-label">
                                                                total spent
                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            )}

                                        </div>
                                    )}

                                </div>
                            </div>

                        </div>

                    </section>

                    {/* PRODUCT INSIGHTS */}
                    <section className="ad-section">

                        <div className="ad-section-heading">
                            <div>
                                <h2 className="ad-section-title">
                                    Product Insights
                                </h2>

                                <p className="ad-section-subtitle">
                                    Sales performance and inventory
                                </p>
                            </div>
                        </div>

                        <div className="ad-two-column">

                            {/* BEST SELLING */}
                            <div className="ad-card">

                                <div className="ad-card-header">
                                    <h3 className="ad-card-title">
                                        Best-Selling Products
                                    </h3>

                                    <p className="ad-card-subtitle">
                                        Ranked by quantity sold
                                    </p>
                                </div>

                                <div className="ad-card-body">

                                    {best_selling_products.length ===
                                    0 ? (
                                        <div className="ad-empty">
                                            No product sales yet.
                                        </div>
                                    ) : (
                                        best_selling_products.map(
                                            (product) => (
                                                <div
                                                    className="ad-product-row"
                                                    key={product.id}
                                                >

                                                    <div>
                                                        <div className="ad-product-name">
                                                            {product.name}
                                                        </div>

                                                        <div className="ad-product-ref">
                                                            {
                                                                product.reference
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="ad-product-qty">
                                                        {
                                                            product.quantity_sold
                                                        }{" "}
                                                        sold
                                                    </div>

                                                    <div className="ad-product-revenue">
                                                        {formatMoney(
                                                            product.revenue
                                                        )}
                                                    </div>

                                                </div>
                                            )
                                        )
                                    )}

                                </div>
                            </div>

                            {/* REVENUE */}
                            <div className="ad-card">

                                <div className="ad-card-header">
                                    <h3 className="ad-card-title">
                                        Top Revenue Products
                                    </h3>

                                    <p className="ad-card-subtitle">
                                        Products generating the most sales
                                    </p>
                                </div>

                                <div className="ad-card-body">

                                    {top_revenue_products.length ===
                                    0 ? (
                                        <div className="ad-empty">
                                            No product revenue yet.
                                        </div>
                                    ) : (
                                        top_revenue_products.map(
                                            (product) => (
                                                <div
                                                    className="ad-product-row"
                                                    key={product.id}
                                                >

                                                    <div>
                                                        <div className="ad-product-name">
                                                            {product.name}
                                                        </div>

                                                        <div className="ad-product-ref">
                                                            {
                                                                product.reference
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="ad-product-qty">
                                                        {
                                                            product.quantity_sold
                                                        }{" "}
                                                        sold
                                                    </div>

                                                    <div className="ad-product-revenue">
                                                        {formatMoney(
                                                            product.revenue
                                                        )}
                                                    </div>

                                                </div>
                                            )
                                        )
                                    )}

                                </div>
                            </div>

                        </div>

                    </section>

                    {/* LOW STOCK */}
                    <section className="ad-section">

                        <div className="ad-section-heading">
                            <div>
                                <h2 className="ad-section-title">
                                    Low Stock
                                </h2>

                                <p className="ad-section-subtitle">
                                    Products with 10 units or fewer
                                </p>
                            </div>
                        </div>

                        <div className="ad-card">

                            <div className="ad-card-body">

                                {low_stock_products.length === 0 ? (
                                    <div className="ad-empty">
                                        No low-stock products.
                                    </div>
                                ) : (
                                    low_stock_products.map(
                                        (product) => (
                                            <div
                                                className="ad-stock-row"
                                                key={product.id}
                                            >

                                                <div>
                                                    <div className="ad-stock-name">
                                                        {product.name}
                                                    </div>

                                                    <div className="ad-stock-ref">
                                                        {
                                                            product.reference
                                                        }
                                                    </div>
                                                </div>

                                                <div className="ad-stock-number">
                                                    {
                                                        product.stock_quantity
                                                    }{" "}
                                                    units
                                                </div>

                                            </div>
                                        )
                                    )
                                )}

                            </div>
                        </div>

                    </section>

                    {/* RECENT ORDERS */}
                    <section className="ad-section">

                        <div className="ad-section-heading">
                            <div>
                                <h2 className="ad-section-title">
                                    Recent Orders
                                </h2>

                                <p className="ad-section-subtitle">
                                    Latest customer orders
                                </p>
                            </div>
                        </div>

                        <div className="ad-card">

                            <div className="ad-order-table-wrap">

                                {recent_orders.length === 0 ? (
                                    <div className="ad-empty">
                                        No orders yet.
                                    </div>
                                ) : (
                                    <table className="ad-order-table">

                                        <thead>
                                            <tr>
                                                <th>Order</th>
                                                <th>Customer</th>
                                                <th>Status</th>
                                                <th>Payment</th>
                                                <th>Total</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {recent_orders.map(
                                                (order) => (
                                                    <tr key={order.id}>

                                                        <td>
                                                            <div className="ad-order-number">
                                                                {
                                                                    order.order_number
                                                                }
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="ad-order-customer">
                                                                {
                                                                    order.customer_name
                                                                }
                                                            </div>

                                                            <div className="ad-order-date">
                                                                {
                                                                    order.customer_email
                                                                }
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={`ad-status ${order.status}`}
                                                            >
                                                                {formatStatus(
                                                                    order.status
                                                                )}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            {order.payment_method
                                                                ? formatStatus(
                                                                      order.payment_method
                                                                  )
                                                                : "—"}
                                                        </td>

                                                        <td>
                                                            <span className="ad-money">
                                                                {formatMoney(
                                                                    order.total_amount
                                                                )}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <span className="ad-order-date">
                                                                {
                                                                    order.created_at
                                                                }
                                                            </span>
                                                        </td>

                                                    </tr>
                                                )
                                            )}

                                        </tbody>

                                    </table>
                                )}

                            </div>
                        </div>

                    </section>

                    {/* ALL USERS */}
                    <section className="ad-section">

                        <div className="ad-section-heading">
                            <div>
                                <h2 className="ad-section-title">
                                    All Users
                                </h2>

                                <p className="ad-section-subtitle">
                                    {total_users} registered users
                                </p>
                            </div>
                        </div>

                        <div className="ad-card">

                            <div className="ad-users-wrap">

                                <table className="ad-users-table">

                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Joined</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {users.map((account) => (
                                            <tr key={account.id}>

                                                <td>
                                                    {account.id}
                                                </td>

                                                <td>
                                                    {`${account.first_name || ""} ${
                                                        account.last_name || ""
                                                    }`.trim() ||
                                                        "—"}
                                                </td>

                                                <td>
                                                    {account.username}
                                                </td>

                                                <td>
                                                    {account.email}
                                                </td>

                                                <td>
                                                    <span className="ad-role">
                                                        {account.role}
                                                    </span>
                                                </td>

                                                <td>
                                                    {account.is_active ? (
                                                        <span className="ad-active">
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="ad-inactive">
                                                            Inactive
                                                        </span>
                                                    )}
                                                </td>

                                                <td>
                                                    {account.date_joined}
                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>
                        </div>

                    </section>

                </main>
            </div>
        </>
    );
}