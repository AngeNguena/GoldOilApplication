import React, { useState, useEffect } from 'react';
import ShopLayout from './Components/ShopLayout';
import { Link, router } from '@inertiajs/react';
import { getCart, updateCartItem, removeFromCart, clearCart } from './Components/CartManager';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --ox:       #6B1A1A;
    --ox-dark:  #4A0F0F;
    --ox-light: #8B2E2E;
    --cream:    #FAF7F2;
    --ink:      #0E0C0B;
    --mid:      #3A3330;
    --muted:    #8C847C;
    --border:   #E5DDD5;
  }

  .cart-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 60vh;
  }

  /* ── HEADER ── */
  .cart-header {
    background: var(--ink);
    padding: 44px 0 36px;
    position: relative;
    overflow: hidden;
  }
  .cart-header::after {
    content: 'CART';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Playfair Display', serif;
    font-size: 130px;
    font-weight: 700;
    color: rgba(255,255,255,0.03);
    pointer-events: none;
    user-select: none;
    line-height: 1;
  }
  .cart-header-inner {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
  }
  @media(max-width:640px){ .cart-header-inner { padding: 0 20px; } }
  .cart-header-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ox-light);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .cart-header-label::after { content:''; width:28px; height:1px; background:var(--ox-light); opacity:.6; }
  .cart-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.1;
  }
  .cart-subtitle {
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    font-weight: 300;
    margin-top: 4px;
  }
  .cart-clear-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 9px 16px;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px;
    background: none;
    color: rgba(255,255,255,0.5);
    font-size: 12px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: border-color .2s, color .2s;
    letter-spacing: 0.04em;
  }
  .cart-clear-btn:hover { border-color: rgba(255,255,255,0.4); color: rgba(255,255,255,0.8); }
  .cart-clear-btn svg { width: 14px; height: 14px; }

  /* ── BODY ── */
  .cart-container {
    max-width: 1240px;
    margin: 0 auto;
    padding: 36px 32px 72px;
  }
  @media(max-width:640px){ .cart-container { padding: 24px 20px 60px; } }
  .cart-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 28px;
    align-items: start;
  }
  @media(max-width:1000px){ .cart-layout { grid-template-columns:1fr; } }

  /* ── CART ITEMS ── */
  .cart-items { display: flex; flex-direction: column; gap: 12px; }
  .cart-item {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px 20px;
    display: flex;
    gap: 18px;
    align-items: flex-start;
    transition: border-color .2s;
  }
  .cart-item:hover { border-color: #C8BFB8; }

  .cart-item-img {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    border-radius: 7px;
    overflow: hidden;
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart-item-img img { width:100%; height:100%; object-fit:cover; }
  .cart-item-img svg { width:28px; height:28px; color:#C8BFB8; }

  .cart-item-body { flex: 1; min-width: 0; }
  .cart-item-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 12px;
  }
  .cart-item-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cart-item-ref {
    font-size: 11px;
    color: var(--muted);
    font-weight: 400;
    margin-top: 2px;
  }
  .cart-remove-btn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    border-radius: 5px;
    background: none;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color .15s, background .15s;
    color: var(--muted);
  }
  .cart-remove-btn:hover { border-color: var(--ox); background: rgba(107,26,26,0.05); color: var(--ox); }
  .cart-remove-btn svg { width: 13px; height: 13px; }

  .cart-item-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
  .cart-qty-wrap {
    display: flex;
    align-items: center;
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
  }
  .cart-qty-btn {
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: var(--mid);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .15s;
    font-family: 'DM Sans', sans-serif;
  }
  .cart-qty-btn:hover:not(:disabled) { background: var(--cream); }
  .cart-qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .cart-qty-val {
    width: 40px;
    height: 32px;
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: var(--ink);
  }
  .cart-item-total {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 600;
    color: var(--ink);
  }
  .cart-item-unit {
    font-size: 11px;
    color: var(--muted);
    font-weight: 300;
    margin-top: 2px;
    text-align: right;
  }

  /* Stock warning */
  .cart-warn {
    margin-top: 10px;
    padding: 8px 12px;
    background: rgba(107,26,26,0.06);
    border-radius: 5px;
    font-size: 12px;
    color: var(--ox);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .cart-warn svg { width: 14px; height: 14px; flex-shrink: 0; }

  /* Continue shopping */
  .cart-continue {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px;
    border: 1px dashed var(--border);
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: var(--muted);
    text-decoration: none;
    transition: border-color .15s, color .15s;
    margin-top: 4px;
  }
  .cart-continue:hover { border-color: var(--ox); color: var(--ox); }
  .cart-continue svg { width: 16px; height: 16px; }

  /* ── ORDER SUMMARY ── */
  .cart-summary {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    position: sticky;
    top: 104px;
  }
  .cart-summary-head {
    padding: 18px 22px;
    background: var(--cream);
    border-bottom: 1px solid var(--border);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .cart-summary-body { padding: 22px; }
  .cart-summary-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 13px;
  }
  .cart-summary-line-label { color: var(--muted); font-weight: 400; }
  .cart-summary-line-val { color: var(--mid); font-weight: 600; }
  .cart-summary-line-val.free { color: #166534; font-weight: 600; font-size: 12px; }
  .cart-summary-divider { border: none; border-top: 1px solid var(--border); margin: 16px 0; }
  .cart-summary-total {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .cart-total-label { font-size: 14px; font-weight: 600; color: var(--ink); }
  .cart-total-val {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--ink);
  }
  .cart-checkout-btn {
    width: 100%;
    padding: 14px;
    background: var(--ox);
    color: #fff;
    border: none;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background .2s;
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 16px;
  }
  .cart-checkout-btn:hover:not(:disabled) { background: var(--ox-light); }
  .cart-checkout-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .cart-checkout-btn svg { width: 16px; height: 16px; }

  .cart-trust-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding-top: 14px;
    border-top: 1px solid var(--border);
  }
  .cart-trust-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .cart-trust-icon {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--cream);
  }
  .cart-trust-icon svg { width: 14px; height: 14px; color: var(--ox); }
  .cart-trust-lbl { font-size: 10px; font-weight: 600; color: var(--muted); letter-spacing: 0.05em; }

  /* ── EMPTY STATE ── */
  .cart-empty {
    text-align: center;
    padding: 72px 24px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
  }
  .cart-empty-icon {
    width: 64px;
    height: 64px;
    background: var(--cream);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }
  .cart-empty-icon svg { width: 28px; height: 28px; color: #C8BFB8; }
  .cart-empty-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
  }
  .cart-empty-sub {
    font-size: 13px;
    color: var(--muted);
    font-weight: 300;
    margin-bottom: 28px;
  }
  .cart-empty-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: var(--ox);
    color: #fff;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: background .2s;
  }
  .cart-empty-btn:hover { background: var(--ox-light); }
  .cart-empty-btn svg { width: 16px; height: 16px; }
`;

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => { loadCart(); }, []);

  const loadCart = () => setCart(getCart());

  const formatFCFA = (n) =>
    new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n)) + ' FCFA';

  const handleUpdate = (id, qty) => { updateCartItem(id, qty); loadCart(); };
  const handleRemove = (id, name) => {
    if (confirm(`Remove "${name}" from your cart?`)) { removeFromCart(id); loadCart(); }
  };
  const handleClear = () => {
    if (confirm('Clear all items from your cart?')) { clearCart(); loadCart(); }
  };
  const handleCheckout = () => {
    if (!cart.length) return;
    const overStock = cart.filter(i => i.quantity > i.stock_quantity);
    if (overStock.length) { alert('Some items exceed available stock. Please adjust quantities.'); return; }
    router.visit('/checkout/');
  };

  const total = cart.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <ShopLayout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="cart-root">

        {/* ── HEADER ── */}
        <div className="cart-header">
          <div className="cart-header-inner">
            <div>
              <div className="cart-header-label">Your Selection</div>
              <h1 className="cart-title">Shopping Cart</h1>
              <p className="cart-subtitle">
                {cart.length === 0 ? 'Your cart is empty' : `${totalItems} item${totalItems !== 1 ? 's' : ''} ready for checkout`}
              </p>
            </div>
            {cart.length > 0 && (
              <button className="cart-clear-btn" onClick={handleClear}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Clear Cart
              </button>
            )}
          </div>
        </div>

        <div className="cart-container">
          {cart.length === 0 ? (

            /* ── EMPTY ── */
            <div className="cart-empty">
              <div className="cart-empty-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div className="cart-empty-title">Your cart is empty</div>
              <p className="cart-empty-sub">Browse our catalogue and add some products.</p>
              <Link href="/products/" className="cart-empty-btn">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                Start Shopping
              </Link>
            </div>

          ) : (

            /* ── ITEMS + SUMMARY ── */
            <div className="cart-layout">
              <div className="cart-items">
                {cart.map(item => (
                  <div className="cart-item" key={item.product_id}>
                    <div className="cart-item-img">
                      {item.image_url
                        ? <img src={item.image_url} alt={item.name} />
                        : <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                          </svg>}
                    </div>
                    <div className="cart-item-body">
                      <div className="cart-item-head">
                        <div style={{ minWidth:0 }}>
                          <div className="cart-item-name">{item.name}</div>
                          <div className="cart-item-ref">REF: {item.reference}</div>
                        </div>
                        <button className="cart-remove-btn" onClick={() => handleRemove(item.product_id, item.name)} title="Remove">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>
                      <div className="cart-item-footer">
                        <div className="cart-qty-wrap">
                          <button className="cart-qty-btn" onClick={() => handleUpdate(item.product_id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                          <div className="cart-qty-val">{item.quantity}</div>
                          <button className="cart-qty-btn" onClick={() => handleUpdate(item.product_id, item.quantity + 1)} disabled={item.quantity >= item.stock_quantity}>+</button>
                        </div>
                        <div>
                          <div className="cart-item-total">{formatFCFA(item.unit_price * item.quantity)}</div>
                          <div className="cart-item-unit">{formatFCFA(item.unit_price)} each</div>
                        </div>
                      </div>
                      {item.quantity > item.stock_quantity && (
                        <div className="cart-warn">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                          </svg>
                          Only {item.stock_quantity} available in stock
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <Link href="/products/" className="cart-continue">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                  </svg>
                  Continue Shopping
                </Link>
              </div>

              {/* ── SUMMARY ── */}
              <div className="cart-summary">
                <div className="cart-summary-head">Order Summary</div>
                <div className="cart-summary-body">
                  <div className="cart-summary-line">
                    <span className="cart-summary-line-label">Subtotal ({totalItems} items)</span>
                    <span className="cart-summary-line-val">{formatFCFA(total)}</span>
                  </div>
                  <div className="cart-summary-line">
                    <span className="cart-summary-line-label">Delivery</span>
                    <span className="cart-summary-line-val">Calculated at checkout</span>
                  </div>
                  <div className="cart-summary-line" style={{ fontSize:11 }}>
                    <span className="cart-summary-line-label" style={{ color:'#8C847C', fontSize:11 }}>
                      🚚 Free delivery in Douala
                    </span>
                    <span className="cart-summary-line-val free">FREE</span>
                  </div>
                  <hr className="cart-summary-divider" />
                  <div className="cart-summary-total">
                    <span className="cart-total-label">Total</span>
                    <span className="cart-total-val">{formatFCFA(total)}</span>
                  </div>
                  <button className="cart-checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </button>
                  <div className="cart-trust-row">
                    {[
                      { label: 'Secure', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/> },
                      { label: 'Verified', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/> },
                      { label: 'Fast', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/> },
                    ].map(b => (
                      <div className="cart-trust-item" key={b.label}>
                        <div className="cart-trust-icon">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">{b.icon}</svg>
                        </div>
                        <span className="cart-trust-lbl">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ShopLayout>
  );
}