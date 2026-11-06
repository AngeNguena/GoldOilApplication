import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { addToCart } from './CartManager';

const toastStyles = `
  @keyframes slideInRight {
    from { opacity:0; transform:translateX(20px); }
    to   { opacity:1; transform:translateX(0); }
  }
  .go-toast {
    position: fixed;
    top: 80px;
    right: 20px;
    background: #0E0C0B;
    color: #fff;
    padding: 12px 18px;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    animation: slideInRight .25s ease both;
    border-left: 3px solid #6B1A1A;
  }
  .go-toast svg { width:16px; height:16px; color: #8B2E2E; }
`;

const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .pc-card {
    background: #fff;
    border: 1px solid #E5DDD5;
    border-radius: 10px;
    overflow: hidden;
    transition: border-color .2s, box-shadow .2s, transform .2s;
    display: flex;
    flex-direction: column;
    font-family: 'DM Sans', sans-serif;
  }
  .pc-card:hover {
    border-color: #6B1A1A;
    box-shadow: 0 6px 24px rgba(107,26,26,0.1);
    transform: translateY(-2px);
  }

  .pc-img-wrap {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    background: #FAF7F2;
  }
  .pc-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .4s ease;
  }
  .pc-card:hover .pc-img { transform: scale(1.05); }

  .pc-no-img {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pc-no-img svg { width: 48px; height: 48px; color: #C8BFB8; }

  .pc-stock-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .pc-stock-badge.in  { background: rgba(14,12,11,0.75); color: #C8E6C9; }
  .pc-stock-badge.out { background: rgba(107,26,26,0.85); color: #fff; }

  .pc-body {
    padding: 14px 16px 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .pc-ref {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #6B1A1A;
    margin-bottom: 4px;
  }
  .pc-name {
    font-size: 13px;
    font-weight: 600;
    color: #0E0C0B;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 3px;
  }
  .pc-cat {
    font-size: 11px;
    color: #8C847C;
    font-weight: 400;
  }

  .pc-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid #F0EAE4;
  }
  .pc-price-lbl {
    font-size: 10px;
    color: #8C847C;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 2px;
  }
  .pc-price {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 600;
    color: #0E0C0B;
    line-height: 1;
  }

  .pc-add-btn {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background .2s, transform .15s;
    background: #6B1A1A;
    color: #fff;
  }
  .pc-add-btn:hover:not(:disabled) {
    background: #8B2E2E;
    transform: scale(1.08);
  }
  .pc-add-btn:disabled {
    background: #E5DDD5;
    color: #C8BFB8;
    cursor: not-allowed;
    transform: none;
  }
  .pc-add-btn svg { width: 16px; height: 16px; }
  .pc-add-btn .spin {
    animation: spin .6s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function ProductCart({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const inStock = product.stock_quantity > 0;

  const formatFCFA = (amount) =>
    new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount)) + ' FCFA';

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!inStock || isAdding) return;
    setIsAdding(true);
    addToCart(product, 1);

    setTimeout(() => {
      setIsAdding(false);
      // inject toast
      if (!document.getElementById('go-toast-style')) {
        const s = document.createElement('style');
        s.id = 'go-toast-style';
        s.textContent = toastStyles;
        document.head.appendChild(s);
      }
      const t = document.createElement('div');
      t.className = 'go-toast';
      t.innerHTML = `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
        </svg>
        Added to cart
      `;
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 3000);
    }, 300);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cardStyles }} />
      <div className="pc-card">
        <Link href={`/product/${product.id}/`}>
          <div className="pc-img-wrap">
            {product.image_url ? (
              <img className="pc-img" src={product.image_url} alt={product.name} />
            ) : (
              <div className="pc-no-img">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            )}
            <span className={`pc-stock-badge ${inStock ? 'in' : 'out'}`}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </Link>

        <div className="pc-body">
          <Link href={`/product/${product.id}/`} style={{ textDecoration: 'none' }}>
            <div className="pc-ref">{product.reference}</div>
            <div className="pc-name">{product.name}</div>
            {product.category_name && <div className="pc-cat">{product.category_name}</div>}
          </Link>

          <div className="pc-footer">
            <div>
              <div className="pc-price-lbl">Price</div>
              <div className="pc-price">{formatFCFA(product.unit_price)}</div>
            </div>
            <button
              className="pc-add-btn"
              onClick={handleAddToCart}
              disabled={!inStock || isAdding}
              title={inStock ? 'Add to cart' : 'Out of stock'}
            >
              {isAdding ? (
                <svg className="spin" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25"/>
                  <path fill="currentColor" opacity=".75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}