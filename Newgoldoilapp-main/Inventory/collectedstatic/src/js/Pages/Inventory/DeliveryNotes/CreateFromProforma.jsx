import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import Layout from '../components/Layout';

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

  .df-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }
  .df-container {
    max-width: 920px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media(max-width:640px){ .df-container { padding: 0 20px; } }

  .df-label {
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
  .df-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .df-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.15;
  }
  .df-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
    margin-bottom: 24px;
  }
  .df-sub strong { color: var(--ink); font-weight: 700; }

  /* Info card */
  .df-info {
    margin-bottom: 20px;
    background: var(--ink);
    border-radius: 12px;
    padding: 20px 24px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    position: relative;
    overflow: hidden;
  }
  .df-info::before {
    content: 'GOLD';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Playfair Display', serif;
    font-size: 70px;
    font-weight: 700;
    color: rgba(255,255,255,0.03);
    line-height: 1;
    pointer-events: none;
  }
  .df-info-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
  }
  .df-info-icon svg { width: 18px; height: 18px; color: var(--ox-light); }
  .df-info-text { position: relative; z-index: 2; }
  .df-info-text h3 { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 6px; }
  .df-info-text p { font-size: 12px; color: rgba(255,255,255,0.55); font-weight: 400; }
  .df-info-text p strong { color: #fff; font-weight: 700; }

  /* Stock error */
  .df-alert {
    margin-bottom: 20px;
    background: rgba(107,26,26,0.06);
    border: 1px solid rgba(107,26,26,0.2);
    border-radius: 10px;
    padding: 16px 18px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .df-alert svg { width: 20px; height: 20px; color: var(--ox); flex-shrink: 0; margin-top: 1px; }
  .df-alert h3 { font-size: 13px; font-weight: 700; color: var(--ox-dark); margin-bottom: 2px; }
  .df-alert p { font-size: 12px; color: var(--ox); font-weight: 500; }

  .df-form {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 40px;
  }
  @media(max-width:640px){ .df-form { padding: 22px; } }

  .df-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
    padding-bottom: 14px;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--border);
  }
  .df-section-sub { font-size: 12px; color: var(--muted); font-weight: 400; margin-top: 4px; }

  .df-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }
  @media(max-width:520px){ .df-grid-2 { grid-template-columns: 1fr; } }

  .df-field { margin-bottom: 28px; }
  .df-field label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: var(--mid);
    margin-bottom: 8px;
  }
  .df-field input,
  .df-field textarea {
    width: 100%;
    padding: 11px 14px;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: #fff;
    transition: border-color .2s, box-shadow .2s;
  }
  .df-field input.error { border-color: var(--ox-light); }
  .df-field input:focus,
  .df-field textarea:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }
  .df-error { font-size: 11px; color: var(--ox); margin-top: 6px; font-weight: 500; }

  /* Item cards */
  .df-item-card {
    border: 1px solid var(--border);
    background: var(--cream);
    border-radius: 10px;
    padding: 18px;
    margin-bottom: 14px;
  }
  .df-item-card.invalid {
    border-color: var(--ox-light);
    background: rgba(107,26,26,0.04);
  }
  .df-item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .df-item-name { font-size: 13px; font-weight: 700; color: var(--ink); }
  .df-item-ref { font-size: 11px; color: var(--muted); margin-top: 2px; }
  .df-stock-badge {
    font-size: 11px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 20px;
  }
  .df-stock-badge.out { background: rgba(107,26,26,0.1); color: var(--ox); }
  .df-stock-badge.low { background: #FEF3C7; color: #B45309; }
  .df-stock-badge.ok { background: #D1FAE5; color: #065F46; }

  .df-item-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
  @media(max-width:640px){ .df-item-grid { grid-template-columns: 1fr; } }

  .df-item-grid label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: var(--muted);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .df-item-grid input {
    width: 100%;
    padding: 9px 12px;
    border: 1px solid var(--border);
    border-radius: 7px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: #fff;
    transition: border-color .2s, box-shadow .2s;
  }
  .df-item-grid input.error { border-color: var(--ox-light); }
  .df-item-grid input:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }
  .df-stock-warn { font-size: 11px; color: var(--ox); font-weight: 700; margin-top: 6px; }
  .df-price-display {
    padding: 9px 12px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 7px;
    font-size: 13px;
    font-weight: 700;
    color: var(--ink);
  }

  /* Grand total */
  .df-grand-total {
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    border-radius: 12px;
    padding: 22px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 28px;
    margin-bottom: 28px;
  }
  .df-grand-total span:first-child {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
  }
  .df-grand-total span:last-child {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
  }

  /* Actions */
  .df-actions {
    display: flex;
    gap: 14px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }
  .df-btn-primary {
    flex: 1;
    padding: 14px 32px;
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.03em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
    transition: transform .2s, box-shadow .2s, opacity .2s;
  }
  .df-btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }
  .df-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
  .df-btn-secondary {
    padding: 14px 32px;
    background: var(--cream);
    color: var(--mid);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.03em;
    border: 1px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
    transition: background .2s;
  }
  .df-btn-secondary:hover { background: #EFE7DC; }
`;

export default function DeliveryNoteCreateFromProforma({ proforma, products }) {
  const [stockError, setStockError] = useState('');

  const formatFCFA = (amount) => {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount)) + ' FCFA';
  };

  const { data, setData, post, processing, errors } = useForm({
    note_number: '',
    delivery_date: new Date().toISOString().split('T')[0],
    notes: '',
    items: proforma.items || [],
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    setData('items', newItems);
    setStockError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStockError('');

    post(`/inventory/delivery-notes/create-from-proforma/${proforma.id}/`, {
      onError: (errors) => {
        if (errors.errors) {
          setStockError(errors.errors);
        }
      }
    });
  };

  const calculateItemTotal = (item) => {
    return (parseFloat(item.quantity) || 0) * (parseFloat(item.unit_price) || 0);
  };

  const calculateGrandTotal = () => {
    return data.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const isQuantityValid = (item) => {
    return parseInt(item.quantity) <= item.available_stock;
  };

  const getStockBadgeClass = (stock) => {
    if (stock === 0) return 'out';
    if (stock < 10) return 'low';
    return 'ok';
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="df-root">
        <div className="df-container">

          <div className="df-label">Logistics</div>
          <h1 className="df-title">Create Delivery Note</h1>
          <p className="df-sub">From Proforma: <strong>{proforma.proforma_number}</strong></p>

          {/* Proforma Info Card */}
          <div className="df-info">
            <div className="df-info-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="df-info-text">
              <h3>Invoice Information</h3>
              <p>Client: <strong>{proforma.client_name}</strong></p>
              <p>Delivery Time: <strong>{proforma.delivery_time || 'Not specified'}</strong></p>
            </div>
          </div>

          {/* Stock Error Alert */}
          {stockError && (
            <div className="df-alert">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3>Insufficient Stock</h3>
                <p>{stockError}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="df-form">
            <form onSubmit={handleSubmit}>

              {/* Delivery Details */}
              <div className="df-section-title">Delivery Details</div>

              <div className="df-grid-2">
                <div className="df-field" style={{ marginBottom: 0 }}>
                  <label>Delivery Note Number</label>
                  <input
                    name="note_number"
                    placeholder="DN-2024-001"
                    value={data.note_number}
                    onChange={handleChange}
                    className={errors.note_number ? 'error' : ''}
                    required
                  />
                  {errors.note_number && <p className="df-error">{errors.note_number}</p>}
                </div>

                <div className="df-field" style={{ marginBottom: 0 }}>
                  <label>Delivery Date</label>
                  <input
                    name="delivery_date"
                    type="date"
                    value={data.delivery_date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="df-field">
                <label>Notes</label>
                <textarea
                  name="notes"
                  placeholder="Additional delivery notes..."
                  value={data.notes}
                  onChange={handleChange}
                  rows="2"
                  style={{ resize: 'none' }}
                />
              </div>

              {/* Items from Proforma */}
              <div className="df-section-title">
                Items from Invoice ({data.items.length})
                <div className="df-section-sub">Review and adjust quantities if needed</div>
              </div>

              {data.items.map((item, index) => {
                const isValid = isQuantityValid(item);

                return (
                  <div key={index} className={`df-item-card ${!isValid ? 'invalid' : ''}`}>
                    <div className="df-item-top">
                      <div>
                        <div className="df-item-name">{item.product_name}</div>
                        <div className="df-item-ref">Ref: {item.product_reference}</div>
                      </div>
                      <span className={`df-stock-badge ${getStockBadgeClass(item.available_stock)}`}>
                        {item.available_stock === 0 ? 'Out of stock' : `${item.available_stock} available`}
                      </span>
                    </div>

                    <div className="df-item-grid">
                      <div>
                        <label>Quantity</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                          min="1"
                          max={item.available_stock}
                          className={!isValid ? 'error' : ''}
                          required
                        />
                        {!isValid && <p className="df-stock-warn">Exceeds available stock!</p>}
                      </div>

                      <div>
                        <label>Unit Price</label>
                        <input
                          type="number"
                          step="0.01"
                          value={item.unit_price}
                          onChange={(e) => handleItemChange(index, 'unit_price', e.target.value)}
                          min="0"
                          required
                        />
                      </div>

                      <div>
                        <label>Total</label>
                        <div className="df-price-display">{formatFCFA(calculateItemTotal(item))}</div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Grand Total */}
              <div className="df-grand-total">
                <span>Grand Total</span>
                <span>{formatFCFA(calculateGrandTotal())}</span>
              </div>

              {/* Actions */}
              <div className="df-actions">
                <button type="submit" disabled={processing} className="df-btn-primary">
                  {processing ? 'Creating...' : 'Create Delivery Note'}
                </button>
                <button
                  type="button"
                  onClick={() => router.visit('/inventory/proformas/')}
                  className="df-btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </Layout>
  );
}