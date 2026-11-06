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

  .pu-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }
  .pu-container {
    max-width: 920px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media(max-width:640px){ .pu-container { padding: 0 20px; } }

  .pu-label {
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
  .pu-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .pu-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.15;
  }
  .pu-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
    margin-bottom: 28px;
  }

  .pu-form {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 40px;
  }
  @media(max-width:640px){ .pu-form { padding: 24px; } }

  .pu-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
    padding-bottom: 14px;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--border);
  }
  .pu-section-title.with-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pu-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 32px;
  }
  @media(max-width:640px){ .pu-grid-3 { grid-template-columns: 1fr; } }

  .pu-field label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: var(--mid);
    margin-bottom: 8px;
  }
  .pu-field input,
  .pu-field select {
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
  .pu-field input.error { border-color: var(--ox-light); }
  .pu-field input:focus,
  .pu-field select:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }
  .pu-error { font-size: 11px; color: var(--ox); margin-top: 6px; font-weight: 500; }

  .pu-add-item-btn {
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
  .pu-add-item-btn:hover { transform: translateY(-1px); }

  /* Item cards */
  .pu-item-card {
    border: 1px solid var(--border);
    background: var(--cream);
    border-radius: 10px;
    padding: 18px;
    margin-bottom: 14px;
  }
  .pu-item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .pu-item-label { font-size: 12px; font-weight: 700; color: var(--mid); }
  .pu-remove-btn {
    font-size: 12px;
    font-weight: 700;
    color: var(--ox);
    background: none;
    border: none;
    cursor: pointer;
  }
  .pu-remove-btn:hover { color: var(--ox-dark); }

  .pu-item-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 14px;
  }
  @media(max-width:640px){ .pu-item-grid { grid-template-columns: 1fr; } }

  .pu-item-grid label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: var(--muted);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .pu-item-grid select,
  .pu-item-grid input {
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
  .pu-item-grid select:focus,
  .pu-item-grid input:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }

  .pu-item-footer {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pu-item-footer span:first-child { font-size: 12px; color: var(--muted); font-weight: 500; }
  .pu-item-footer span:last-child { font-size: 14px; font-weight: 700; color: var(--ink); }

  /* Grand total */
  .pu-grand-total {
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    border-radius: 12px;
    padding: 22px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 28px;
    margin-bottom: 28px;
  }
  .pu-grand-total span:first-child {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
  }
  .pu-grand-total span:last-child {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
  }

  /* Actions */
  .pu-actions {
    display: flex;
    gap: 14px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }
  .pu-btn-primary {
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
  .pu-btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }
  .pu-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
  .pu-btn-secondary {
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
  .pu-btn-secondary:hover { background: #EFE7DC; }
`;

export default function ProformaUpdate({ proforma, clients, products }) {

  const formatFCFA = (amount) => {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(amount)) + ' FCFA';
  };

  const { data, setData, post, processing, errors } = useForm({
    id: proforma.id,
    proforma_number: proforma.proforma_number || "",
    client_id: proforma.client_id || "",
    delivery_time: proforma.delivery_time || "",
    items: proforma.items && proforma.items.length > 0
      ? proforma.items
      : [{ product_id: products[0]?.id || "", quantity: 1, unit_price: 0 }],
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    setData("items", newItems);
  };

  const addItem = () =>
    setData("items", [
      ...data.items,
      { product_id: products[0]?.id || "", quantity: 1, unit_price: 0 },
    ]);

  const removeItem = (index) =>
    setData("items", data.items.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/inventory/proformas/update/${data.id}/`);
  };

  const calculateItemTotal = (item) => (parseFloat(item.quantity) || 0) * (parseFloat(item.unit_price) || 0);
  const calculateGrandTotal = () => data.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="pu-root">
        <div className="pu-container">

          <div className="pu-label">Sales</div>
          <h1 className="pu-title">Edit Proforma Invoice</h1>
          <p className="pu-sub">Update invoice information</p>

          <div className="pu-form">
            <form onSubmit={handleSubmit}>

              {/* Invoice Details */}
              <div className="pu-section-title">Invoice Details</div>

              <div className="pu-grid-3">
                <div className="pu-field">
                  <label>Invoice Number</label>
                  <input
                    name="proforma_number"
                    placeholder="PF-2024-001"
                    value={data.proforma_number}
                    onChange={handleChange}
                    className={errors.proforma_number ? 'error' : ''}
                    required
                  />
                  {errors.proforma_number && <p className="pu-error">{errors.proforma_number}</p>}
                </div>

                <div className="pu-field">
                  <label>Client</label>
                  <select name="client_id" value={data.client_id} onChange={handleChange} required>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="pu-field">
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
              <div className="pu-section-title with-btn">
                <span>Items ({data.items.length})</span>
                <button type="button" onClick={addItem} className="pu-add-item-btn">
                  Add Item
                </button>
              </div>

              {data.items.map((item, index) => (
                <div key={index} className="pu-item-card">
                  <div className="pu-item-top">
                    <span className="pu-item-label">Item {index + 1}</span>
                    {data.items.length > 1 && (
                      <button type="button" onClick={() => removeItem(index)} className="pu-remove-btn">
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="pu-item-grid">
                    <div>
                      <label>Product</label>
                      <select
                        value={item.product_id}
                        onChange={(e) => handleItemChange(index, "product_id", e.target.value)}
                        required
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label>Quantity</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        min="1"
                        required
                      />
                    </div>

                    <div>
                      <label>Unit Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.unit_price}
                        onChange={(e) => handleItemChange(index, "unit_price", e.target.value)}
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="pu-item-footer">
                    <span>Item Total</span>
                    <span>{formatFCFA(calculateItemTotal(item))}</span>
                  </div>
                </div>
              ))}

              {/* Grand Total */}
              <div className="pu-grand-total">
                <span>Grand Total</span>
                <span>{formatFCFA(calculateGrandTotal())}</span>
              </div>

              {/* Actions */}
              <div className="pu-actions">
                <button type="submit" disabled={processing} className="pu-btn-primary">
                  {processing ? "Updating..." : "Update Invoice"}
                </button>
                <button
                  type="button"
                  onClick={() => router.visit("/inventory/proformas/")}
                  className="pu-btn-secondary"
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