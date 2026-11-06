import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import ShopLayout from './Components/ShopLayout';
import ProductCart from './Components/ProductCart';
import { addToCart } from './Components/CartManager';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

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

  .pd-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
  }

  /* ── BREADCRUMB ── */
  .pd-crumb {
    background: #fff;
    border-bottom: 1px solid var(--border);
    padding: 14px 0;
  }
  .pd-crumb-inner {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    flex-wrap: wrap;
  }
  @media(max-width:640px){ .pd-crumb-inner { padding: 0 20px; } }
  .pd-crumb a {
    color: var(--muted);
    text-decoration: none;
    font-weight: 400;
    transition: color .15s;
  }
  .pd-crumb a:hover { color: var(--ox); }
  .pd-crumb-sep { color: var(--border); font-size: 14px; }
  .pd-crumb-curr { color: var(--mid); font-weight: 600; }

  /* ── MAIN GRID ── */
  .pd-container {
    max-width: 1240px;
    margin: 0 auto;
    padding: 40px 32px 72px;
  }
  @media(max-width:640px){ .pd-container { padding: 28px 20px 60px; } }
  .pd-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 52px;
    margin-bottom: 64px;
    align-items: start;
  }
  @media(max-width:900px){ .pd-grid { grid-template-columns:1fr; gap:28px; } }

  /* ── IMAGE ── */
  .pd-img-col {}
  .pd-img-wrap {
    aspect-ratio: 1;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pd-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .4s;
  }
  .pd-img-wrap:hover img { transform: scale(1.03); }
  .pd-no-img {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--cream);
  }
  .pd-no-img svg { width: 80px; height: 80px; color: #D5CDC5; }

  /* ── INFO PANEL ── */
  .pd-info {}
  .pd-type-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .pd-type-badge.oil  { background: rgba(107,26,26,0.08); color: var(--ox); }
  .pd-type-badge.part { background: rgba(58,51,48,0.08);  color: var(--mid); }

  .pd-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.15;
    margin-bottom: 8px;
  }
  .pd-ref {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  /* Price */
  .pd-price-block {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 20px;
  }
  .pd-price {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--ink);
    line-height: 1;
  }
  .pd-price-currency {
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
  }

  /* Stock */
  .pd-stock {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 14px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 24px;
  }
  .pd-stock.in  { background: rgba(34,197,94,0.08); color: #166534; }
  .pd-stock.out { background: rgba(107,26,26,0.08); color: var(--ox); }
  .pd-stock-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .pd-stock.in  .pd-stock-dot { background: #22c55e; }
  .pd-stock.out .pd-stock-dot { background: var(--ox); }

  /* Details table */
  .pd-details {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .pd-details-head {
    padding: 12px 18px;
    background: var(--cream);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
  }
  .pd-details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .pd-detail-cell {
    padding: 11px 18px;
    font-size: 13px;
    border-bottom: 1px solid var(--border);
  }
  .pd-detail-cell:nth-child(odd) { color: var(--muted); font-weight: 400; }
  .pd-detail-cell:nth-child(even) { color: var(--ink); font-weight: 600; }
  .pd-detail-cell:nth-last-child(-n+2) { border-bottom: none; }

  /* Description */
  .pd-desc {
    font-size: 13px;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.8;
    margin-bottom: 24px;
  }

  /* Compatible vehicles */
  .pd-compat {
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 18px;
    font-size: 13px;
    color: var(--mid);
    font-weight: 300;
    line-height: 1.7;
    margin-bottom: 24px;
  }
  .pd-compat-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
  }

  /* Quantity + CTA */
  .pd-buy-row {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
  }
  .pd-qty-wrap {
    display: flex;
    align-items: center;
    border: 1px solid var(--border);
    border-radius: 7px;
    overflow: hidden;
  }
  .pd-qty-btn {
    width: 38px;
    height: 44px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: var(--mid);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .15s, color .15s;
    font-family: 'DM Sans', sans-serif;
  }
  .pd-qty-btn:hover:not(:disabled) { background: var(--cream); color: var(--ink); }
  .pd-qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .pd-qty-input {
    width: 52px;
    height: 44px;
    border: none;
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    background: #fff;
    outline: none;
    font-family: 'DM Sans', sans-serif;
  }

  .pd-add-btn {
    flex: 1;
    min-width: 180px;
    height: 44px;
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
  }
  .pd-add-btn:hover { background: var(--ox-light); }
  .pd-add-btn svg { width: 16px; height: 16px; }

  /* ── RELATED ── */
  .pd-related {}
  .pd-section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ox);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .pd-section-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.4;
  }
  .pd-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.7rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 24px;
  }
  .pd-related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 18px;
  }
  .pd-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 0 0 48px;
  }
`;

export default function ProductDetail({ product, related_products = [] }) {
  const [quantity, setQuantity] = useState(1);
  const inStock = product.stock_quantity > 0;

  const formatFCFA = (amount) =>
    new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount)) + ' FCFA';

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Toast
    const t = document.createElement('div');
    t.style.cssText = `
      position:fixed; bottom:24px; right:24px;
      background:#0E0C0B; color:#fff;
      padding:12px 18px; border-radius:8px;
      box-shadow:0 8px 32px rgba(0,0,0,0.25);
      z-index:9999; display:flex; align-items:center; gap:10px;
      font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
      border-left:3px solid #6B1A1A;
      animation:slideUp .25s ease both;
    `;
    t.innerHTML = `
      <svg width="16" height="16" fill="none" stroke="#8B2E2E" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
      </svg>
      ${quantity} item(s) added to cart
    `;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  };

  const changeQty = (delta) => {
    const n = quantity + delta;
    if (n >= 1 && n <= product.stock_quantity) setQuantity(n);
  };

  // Build details pairs
  const details = [];
  if (product.category_name)    details.push(['Category', product.category_name]);
  if (product.subcategory_name) details.push(['Subcategory', product.subcategory_name]);
  if (product.brand)            details.push(['Brand', product.brand]);
  if (product.product_type === 'oil') {
    if (product.viscosity) details.push(['Viscosity', product.viscosity]);
    if (product.volume)    details.push(['Volume', product.volume]);
  }
  if (product.product_type === 'spare_part') {
    if (product.part_number)    details.push(['Part Number', product.part_number]);
    if (product.warranty_period) details.push(['Warranty', product.warranty_period]);
  }

  return (
    <ShopLayout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="pd-root">

        {/* ── BREADCRUMB ── */}
        <div className="pd-crumb">
          <div className="pd-crumb-inner">
            <Link href="/">Home</Link>
            <span className="pd-crumb-sep">›</span>
            <Link href={`/products/?type=${product.product_type}`}>
              {product.product_type === 'oil' ? 'Oils & Lubricants' : 'Spare Parts'}
            </Link>
            <span className="pd-crumb-sep">›</span>
            <span className="pd-crumb-curr">{product.name}</span>
          </div>
        </div>

        <div className="pd-container">
          <div className="pd-grid">

            {/* ── IMAGE ── */}
            <div className="pd-img-col">
              <div className="pd-img-wrap">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} />
                ) : (
                  <div className="pd-no-img">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* ── INFO ── */}
            <div className="pd-info">
              <span className={`pd-type-badge ${product.product_type === 'oil' ? 'oil' : 'part'}`}>
                {product.product_type === 'oil' ? '🛢 Oil & Lubricant' : '🔧 Spare Part'}
              </span>

              <h1 className="pd-title">{product.name}</h1>
              <div className="pd-ref">REF: {product.reference}</div>

              <div className="pd-price-block">
                <span className="pd-price">{formatFCFA(product.unit_price)}</span>
              </div>

              <div className={`pd-stock ${inStock ? 'in' : 'out'}`}>
                <span className="pd-stock-dot" />
                {inStock ? 'In Stock' : 'Out of Stock'}
              </div>

              {/* Details */}
              {details.length > 0 && (
                <div className="pd-details">
                  <div className="pd-details-head">Product Details</div>
                  <div className="pd-details-grid">
                    {details.map(([k, v]) => (
                      <React.Fragment key={k}>
                        <div className="pd-detail-cell">{k}</div>
                        <div className="pd-detail-cell">{v}</div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="pd-desc">{product.description}</p>
              )}

              {/* Compatible vehicles */}
              {product.product_type === 'spare_part' && product.compatible_vehicles && (
                <div className="pd-compat">
                  <div className="pd-compat-label">Compatible Vehicles</div>
                  {product.compatible_vehicles}
                </div>
              )}

              {/* Buy */}
              {inStock && (
                <div className="pd-buy-row">
                  <div className="pd-qty-wrap">
                    <button className="pd-qty-btn" onClick={() => changeQty(-1)} disabled={quantity <= 1}>−</button>
                    <input
                      type="number"
                      className="pd-qty-input"
                      value={quantity}
                      readOnly
                    />
                    <button className="pd-qty-btn" onClick={() => changeQty(1)} disabled={quantity >= product.stock_quantity}>+</button>
                  </div>
                  <button className="pd-add-btn" onClick={handleAddToCart}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── RELATED PRODUCTS ── */}
          {related_products.length > 0 && (
            <div className="pd-related">
              <hr className="pd-divider" />
              <div className="pd-section-label">You May Also Like</div>
              <h2 className="pd-section-title">Related Products</h2>
              <div className="pd-related-grid">
                {related_products.map((p) => (
                  <ProductCart key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ShopLayout>
  );
}