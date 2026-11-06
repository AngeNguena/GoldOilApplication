import React from "react";
import { Head, Link } from "@inertiajs/react";
import ShopLayout from "./Components/ShopLayout";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  :root {
    --ox: #6B1A1A;
    --ox-dark: #4A0F0F;
    --cream: #FAF7F2;
    --ink: #0E0C0B;
    --mid: #3A3330;
    --muted: #8C847C;
    --border: #E5DDD5;
  }

  .mo-root {
    min-height: 100vh;
    background: var(--cream);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    padding: 48px 20px;
  }

  .mo-container {
    max-width: 1100px;
    margin: 0 auto;
  }

  .mo-header {
    margin-bottom: 32px;
  }

  .mo-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--ox);
    margin-bottom: 10px;
  }

  .mo-title {
    font-family: 'Playfair Display', serif;
    font-size: 40px;
    line-height: 1.1;
    margin: 0;
  }

  .mo-subtitle {
    margin-top: 8px;
    color: var(--muted);
    font-size: 14px;
  }

  .mo-empty {
    background: white;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 60px 25px;
    text-align: center;
  }

  .mo-empty h2 {
    font-family: 'Playfair Display', serif;
    margin-bottom: 8px;
  }

  .mo-empty p {
    color: var(--muted);
    margin-bottom: 24px;
  }

  .mo-shop-btn {
    display: inline-block;
    padding: 12px 22px;
    background: var(--ink);
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-size: 13px;
    font-weight: 700;
  }

  .mo-orders {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .mo-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 24px;
    transition: .2s ease;
  }

  .mo-card:hover {
    border-color: var(--ox);
    box-shadow: 0 8px 24px rgba(107, 26, 26, .07);
  }

  .mo-card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 20px;
  }

  .mo-order-number {
    font-size: 15px;
    font-weight: 700;
    color: var(--ink);
  }

  .mo-date {
    margin-top: 5px;
    font-size: 12px;
    color: var(--muted);
  }

  .mo-status {
    display: inline-block;
    padding: 6px 13px;
    border-radius: 20px;
    background: rgba(107, 26, 26, .08);
    color: var(--ox);
    font-size: 11px;
    font-weight: 700;
    text-transform: capitalize;
    white-space: nowrap;
  }

  .mo-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    padding: 18px 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .mo-detail-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: .08em;
    color: var(--muted);
    margin-bottom: 5px;
    font-weight: 700;
  }

  .mo-detail-value {
    font-size: 14px;
    font-weight: 600;
    color: var(--mid);
  }

  .mo-card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-top: 18px;
  }

  .mo-total {
    font-family: 'Playfair Display', serif;
    font-size: 21px;
    font-weight: 700;
  }

  .mo-track-btn {
    display: inline-block;
    padding: 10px 18px;
    background: var(--ox);
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-size: 12px;
    font-weight: 700;
    transition: background .2s;
  }

  .mo-track-btn:hover {
    background: var(--ox-dark);
  }

  @media (max-width: 700px) {
    .mo-title {
      font-size: 32px;
    }

    .mo-card-top,
    .mo-card-bottom {
      flex-direction: column;
      align-items: flex-start;
    }

    .mo-details {
      grid-template-columns: 1fr;
    }

    .mo-track-btn {
      width: 100%;
      text-align: center;
      box-sizing: border-box;
    }
  }
`;

export default function MyOrders({ orders = [] }) {
  return (
    <ShopLayout>
      <Head title="My Orders" />

      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="mo-root">
        <div className="mo-container">

          <div className="mo-header">
            <div className="mo-label">Account</div>

            <h1 className="mo-title">
              My Orders
            </h1>

            <p className="mo-subtitle">
              View your orders and track their progress.
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="mo-empty">
              <h2>No orders yet</h2>

              <p>
                You haven't placed any orders yet.
              </p>

              <Link
                href="/"
                className="mo-shop-btn"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="mo-orders">

              {orders.map((order) => (
                <div
                  className="mo-card"
                  key={order.order_number}
                >

                  <div className="mo-card-top">

                    <div>
                      <div className="mo-order-number">
                        {order.order_number}
                      </div>

                      <div className="mo-date">
                        {order.created_at}
                      </div>
                    </div>

                    <span className="mo-status">
                      {order.status.replaceAll("_", " ")}
                    </span>

                  </div>

                  <div className="mo-details">

                    <div>
                      <div className="mo-detail-label">
                        Items
                      </div>

                      <div className="mo-detail-value">
                        {order.item_count}
                      </div>
                    </div>

                    <div>
                      <div className="mo-detail-label">
                        Payment
                      </div>

                      <div className="mo-detail-value">
                        {order.payment_method
                          ? order.payment_method.replaceAll("_", " ")
                          : "Not specified"}
                      </div>
                    </div>

                    <div>
                      <div className="mo-detail-label">
                        Payment Status
                      </div>

                      <div className="mo-detail-value">
                        {order.payment_verified
                          ? "Verified"
                          : "Not verified"}
                      </div>
                    </div>

                  </div>

                  <div className="mo-card-bottom">

                    <div className="mo-total">
                      {order.total_amount.toLocaleString()} FCFA
                    </div>

                    <Link
                    href={`/track/${order.order_number}/`}
                    className="mo-track-btn"
                    >
                    Track Order
                    </Link>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </ShopLayout>
  );
}