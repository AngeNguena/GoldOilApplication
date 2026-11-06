import React from "react";
import { useForm, router } from "@inertiajs/react";
import Layout from "../components/Layout.jsx";

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

  .pc-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }
  .pc-container {
    max-width: 920px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media(max-width:640px){ .pc-container { padding: 0 20px; } }

  .pc-label {
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
  .pc-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .pc-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.15;
  }
  .pc-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
    margin-bottom: 28px;
  }

  .pc-form {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 40px;
  }
  @media(max-width:640px){ .pc-form { padding: 24px; } }

  .pc-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
    padding-bottom: 14px;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--border);
  }
  .pc-section-title.with-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pc-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 32px;
  }
  @media(max-width:640px){ .pc-grid-3 { grid-template-columns: 1fr; } }

  .pc-field label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: var(--mid);
    margin-bottom: 8px;
  }
  .pc-field input,
  .pc-field select {
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
  .pc-field input.error { border-color: var(--ox-light); }
  .pc-field input:focus,
  .pc-field select:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }
  .pc-error { font-size: 11px; color: var(--ox); margin-top: 6px; font-weight: 500; }

  .pc-add-item-btn {
    padding: 9px 18px;
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    box-shadow: 0 3px 10px rgba(107,26,26,0.25);
    transition: transform .2s;
  }
  .pc-add-item-btn:hover { transform: translateY(-1px); }

  /* Item cards */
  .pc-item-card {
    border: 1px solid var(--border);
    background: var(--cream);
    border-radius: 10px;
    padding: 18px;
    margin-bottom: 14px;
  }
  .pc-item-card.invalid {
    border-color: var(--ox-light);
    background: rgba(107,26,26,0.04);
  }
  .pc-item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .pc-item-label { font-size: 12px; font-weight: 700; color: var(--mid); }
  .pc-remove-btn {
    font-size: 12px;
    font-weight: 700;
    color: var(--ox);
    background: none;
    border: none;
    cursor: pointer;
  }
  .pc-remove-btn:hover { color: var(--ox-dark); }

  .pc-item-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 14px;
  }
  @media(max-width:640px){ .pc-item-grid { grid-template-columns: 1fr; } }

  .pc-item-grid label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: var(--muted);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .pc-item-grid select,
  .pc-item-grid input {
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
  .pc-item-grid select:focus,
  .pc-item-grid input:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }
  .pc-item-grid input.error { border-color: var(--ox-light); }

  .pc-stock-note { font-size: 11px; color: var(--muted); margin-top: 6px; font-weight: 500; }
  .pc-stock-note.out { color: var(--ox); font-weight: 700; }
  .pc-stock-warn { font-size: 11px; color: var(--ox); font-weight: 700; margin-top: 6px; }

  .pc-price-display {
    padding: 9px 12px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 7px;
    font-size: 13px;
    font-weight: 700;
    color: var(--ink);
  }

  .pc-item-footer {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pc-item-footer span:first-child { font-size: 12px; color: var(--muted); font-weight: 500; }
  .pc-item-footer span:last-child { font-size: 14px; font-weight: 700; color: var(--ink); }

  /* Grand total */
  .pc-grand-total {
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    border-radius: 12px;
    padding: 22px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 28px;
    margin-bottom: 28px;
  }
  .pc-grand-total span:first-child {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
  }
  .pc-grand-total span:last-child {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
  }

  /* Actions */
  .pc-actions {
    display: flex;
    gap: 14px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }
  .pc-btn-primary {
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
  .pc-btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }
  .pc-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
  .pc-btn-secondary {
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
  .pc-btn-secondary:hover { background: #EFE7DC; }
`;

export default function ProformaCreate({ clients, products }) {

  const formatFCFA = (amount) => {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount)) + ' FCFA';
  };

  const { data, setData, post, processing, errors } = useForm({
    proforma_number: "",
    client_id: clients[0]?.id || "",
    delivery_time: "",
    items: [{ product_id: products[0]?.id || "", quantity: 1, unit_price: products[0]?.unit_price || 0 }],
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;

    if (field === 'product_id') {
      const product = products.find(p => p.id == value);
      if (product) {
        newItems[index].unit_price = product.unit_price;
      }
    }

    setData("items", newItems);
  };

  const addItem = () => {
    setData("items", [
      ...data.items,
      { product_id: products[0]?.id || "", quantity: 1, unit_price: products[0]?.unit_price || 0 }
    ]);
  };

  const removeItem = (index) => {
    setData("items", data.items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/inventory/proformas/create/");
  };

  const calculateItemTotal = (item) => (parseFloat(item.quantity) || 0) * (parseFloat(item.unit_price) || 0);
  const calculateGrandTotal = () => data.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  const getAvailableStock = (productId) => {
    const product = products.find(p => p.id == productId);
    return product ? product.stock_quantity : 0;
  };

  const isQuantityValid = (item) => {
    const availableStock = getAvailableStock(item.product_id);
    return parseInt(item.quantity) <= availableStock;
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="pc-root">
        <div className="pc-container">

          <div className="pc-label">Sales</div>
          <h1 className="pc-title">Create Proforma Invoice</h1>
          <p className="pc-sub">Generate a new proforma invoice</p>

          <div className="pc-form">
            <form onSubmit={handleSubmit}>

              {/* Invoice Details */}
              <div className="pc-section-title">Invoice Details</div>

              <div className="pc-grid-3">
                <div className="pc-field">
                  <label>Invoice Number</label>
                  <input
                    name="proforma_number"
                    placeholder="PF-2024-001"
                    value={data.proforma_number}
                    onChange={handleChange}
                    className={errors.proforma_number ? 'error' : ''}
                    required
                  />
                  {errors.proforma_number && <p className="pc-error">{errors.proforma_number}</p>}
                </div>

                <div className="pc-field">
                  <label>Client</label>
                  <select name="client_id" value={data.client_id} onChange={handleChange} required>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="pc-field">
                  <label>Delivery Time</label>
                  <input
                    name="delivery_time"
                    placeholder="7-10 days"
                    value={data.delivery_time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Items */}
              <div className="pc-section-title with-btn">
                <span>Items ({data.items.length})</span>
                <button type="button" onClick={addItem} className="pc-add-item-btn">
                  Add Item
                </button>
              </div>

              {data.items.map((item, index) => {
                const availableStock = getAvailableStock(item.product_id);
                const isValid = isQuantityValid(item);
                const selectedProduct = products.find(p => p.id == item.product_id);

                return (
                  <div key={index} className={`pc-item-card ${!isValid ? 'invalid' : ''}`}>
                    <div className="pc-item-top">
                      <span className="pc-item-label">Item {index + 1}</span>
                      {data.items.length > 1 && (
                        <button type="button" onClick={() => removeItem(index)} className="pc-remove-btn">
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="pc-item-grid">
                      <div>
                        <label>Product</label>
                        <select
                          value={item.product_id}
                          onChange={(e) => handleItemChange(index, "product_id", e.target.value)}
                          required
                        >
                          {products.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.stock_quantity > 0 ? `${p.stock_quantity} in stock` : 'Out of stock'})
                            </option>
                          ))}
                        </select>
                        {selectedProduct && (
                          <p className={`pc-stock-note ${availableStock === 0 ? 'out' : ''}`}>
                            {availableStock === 0 ? 'Out of stock' : `Available: ${availableStock} units`}
                          </p>
                        )}
                      </div>

                      <div>
                        <label>Quantity</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                          min="1"
                          max={availableStock}
                          className={!isValid ? 'error' : ''}
                          required
                        />
                        {!isValid && <p className="pc-stock-warn">Exceeds stock!</p>}
                      </div>

                      <div>
                        <label>Unit Price (Auto)</label>
                        <div className="pc-price-display">{formatFCFA(item.unit_price)}</div>
                      </div>
                    </div>

                    <div className="pc-item-footer">
                      <span>Item Total</span>
                      <span>{formatFCFA(calculateItemTotal(item))}</span>
                    </div>
                  </div>
                );
              })}

              {/* Grand Total */}
              <div className="pc-grand-total">
                <span>Grand Total</span>
                <span>{formatFCFA(calculateGrandTotal())}</span>
              </div>

              {/* Actions */}
              <div className="pc-actions">
                <button type="submit" disabled={processing} className="pc-btn-primary">
                  {processing ? "Creating..." : "Create Invoice"}
                </button>
                <button
                  type="button"
                  onClick={() => router.visit("/inventory/proformas/")}
                  className="pc-btn-secondary"
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