import React, { useState } from "react";
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

  .du-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }
  .du-container {
    max-width: 920px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media(max-width:640px){ .du-container { padding: 0 20px; } }

  .du-label {
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
  .du-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .du-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.15;
  }
  .du-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
    margin-bottom: 28px;
  }

  .du-form {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 40px;
  }
  @media(max-width:640px){ .du-form { padding: 22px; } }

  .du-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
    padding-bottom: 14px;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--border);
  }
  .du-section-title.with-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .du-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 24px;
  }
  @media(max-width:640px){ .du-grid-3 { grid-template-columns: 1fr; } }

  .du-field { margin-bottom: 24px; }
  .du-field label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: var(--mid);
    margin-bottom: 8px;
  }
  .du-field input,
  .du-field select,
  .du-field textarea {
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
  .du-field input:focus,
  .du-field select:focus,
  .du-field textarea:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }

  .du-add-item-btn {
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
  .du-add-item-btn:hover { transform: translateY(-1px); }

  /* Item cards */
  .du-item-card {
    border: 1px solid var(--border);
    background: var(--cream);
    border-radius: 10px;
    padding: 18px;
    margin-bottom: 14px;
  }
  .du-item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .du-item-label { font-size: 12px; font-weight: 700; color: var(--mid); }
  .du-remove-btn {
    font-size: 12px;
    font-weight: 700;
    color: var(--ox);
    background: none;
    border: none;
    cursor: pointer;
  }
  .du-remove-btn:hover { color: var(--ox-dark); }

  .du-item-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 14px;
  }
  @media(max-width:640px){ .du-item-grid { grid-template-columns: 1fr; } }

  .du-item-grid label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: var(--muted);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .du-item-grid select,
  .du-item-grid input {
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
  .du-item-grid select:focus,
  .du-item-grid input:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }

  .du-stock-note { font-size: 11px; color: var(--muted); margin-top: 6px; font-weight: 500; }

  .du-item-footer {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .du-item-footer span:first-child { font-size: 12px; color: var(--muted); font-weight: 500; }
  .du-item-footer span:last-child { font-size: 14px; font-weight: 700; color: var(--ink); }

  /* Grand total */
  .du-grand-total {
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    border-radius: 12px;
    padding: 22px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 28px;
    margin-bottom: 28px;
  }
  .du-grand-total span:first-child {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
  }
  .du-grand-total span:last-child {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
  }

  /* Actions */
  .du-actions {
    display: flex;
    gap: 14px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }
  .du-btn-primary {
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
    transition: transform .2s, box-shadow .2s;
  }
  .du-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }
  .du-btn-secondary {
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
  .du-btn-secondary:hover { background: #EFE7DC; }
`;

export default function DeliveryNoteUpdate({ delivery_note, clients, products }) {
  const [form, setForm] = useState({
    id: delivery_note.id,
    note_number: delivery_note.note_number,
    client_id: delivery_note.client_id,
    delivery_date: delivery_note.delivery_date,
    notes: delivery_note.notes || "",
    status: delivery_note.status,
    items: delivery_note.items || [],
  });

  const handleChange = (e, index, field) => {
    if (field === "items") {
      const items = [...form.items];
      items[index][e.target.name] = e.target.value;

      if (e.target.name === "product_id") {
        const product = products.find(p => p.id == e.target.value);
        if (product) {
          items[index].unit_price = product.unit_price;
        }
      }

      setForm({ ...form, items });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const addItem = () => setForm({
    ...form,
    items: [...form.items, { product_id: products[0]?.id || "", quantity: 1, unit_price: 0 }]
  });

  const removeItem = (index) => setForm({
    ...form,
    items: form.items.filter((_, i) => i !== index)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/inventory/delivery-notes/update/${form.id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": document.cookie.split('csrftoken=')[1]
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/inventory/delivery-notes/";
      } else {
        alert(data.errors || "Failed to update delivery note");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An error occurred while updating the delivery note");
    }
  };

  const calculateItemTotal = (item) => (parseFloat(item.quantity) || 0) * (parseFloat(item.unit_price) || 0);
  const calculateGrandTotal = () => form.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  const getAvailableStock = (productId) => {
    const product = products.find(p => p.id == productId);
    return product ? product.stock_quantity : 0;
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="du-root">
        <div className="du-container">

          <div className="du-label">Logistics</div>
          <h1 className="du-title">Edit Delivery Note</h1>
          <p className="du-sub">Update delivery note information</p>

          <div className="du-form">
            <form onSubmit={handleSubmit}>

              {/* Delivery Details */}
              <div className="du-section-title">Delivery Details</div>

              <div className="du-grid-3">
                <div className="du-field" style={{ marginBottom: 0 }}>
                  <label>Note Number</label>
                  <input
                    name="note_number"
                    placeholder="DN-2024-001"
                    value={form.note_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="du-field" style={{ marginBottom: 0 }}>
                  <label>Client</label>
                  <select name="client_id" value={form.client_id} onChange={handleChange} required>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="du-field" style={{ marginBottom: 0 }}>
                  <label>Delivery Date</label>
                  <input
                    type="date"
                    name="delivery_date"
                    value={form.delivery_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="du-field">
                <label>Status</label>
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="du-field">
                <label>Notes</label>
                <textarea
                  name="notes"
                  placeholder="Additional notes (optional)"
                  value={form.notes}
                  onChange={handleChange}
                  rows="2"
                  style={{ resize: 'none' }}
                />
              </div>

              {/* Items */}
              <div className="du-section-title with-btn">
                <span>Items ({form.items.length})</span>
                <button type="button" onClick={addItem} className="du-add-item-btn">
                  Add Item
                </button>
              </div>

              {form.items.map((item, index) => {
                const availableStock = getAvailableStock(item.product_id);
                const selectedProduct = products.find(p => p.id == item.product_id);

                return (
                  <div key={index} className="du-item-card">
                    <div className="du-item-top">
                      <span className="du-item-label">Item {index + 1}</span>
                      {form.items.length > 1 && (
                        <button type="button" onClick={() => removeItem(index)} className="du-remove-btn">
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="du-item-grid">
                      <div>
                        <label>Product</label>
                        <select
                          name="product_id"
                          value={item.product_id}
                          onChange={(e) => handleChange(e, index, "items")}
                          required
                        >
                          {products.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.name} (Stock: {p.stock_quantity})
                            </option>
                          ))}
                        </select>
                        {selectedProduct && (
                          <p className="du-stock-note">Available: {availableStock} units</p>
                        )}
                      </div>

                      <div>
                        <label>Quantity</label>
                        <input
                          type="number"
                          name="quantity"
                          value={item.quantity}
                          onChange={(e) => handleChange(e, index, "items")}
                          min="1"
                          required
                        />
                      </div>

                      <div>
                        <label>Unit Price</label>
                        <input
                          type="number"
                          name="unit_price"
                          step="0.01"
                          value={item.unit_price}
                          onChange={(e) => handleChange(e, index, "items")}
                          min="0"
                          required
                        />
                      </div>
                    </div>

                    <div className="du-item-footer">
                      <span>Item Total</span>
                      <span>{calculateItemTotal(item).toFixed(0)} FCFA</span>
                    </div>
                  </div>
                );
              })}

              {/* Grand Total */}
              <div className="du-grand-total">
                <span>Grand Total</span>
                <span>{calculateGrandTotal().toFixed(0)} FCFA</span>
              </div>

              {/* Actions */}
              <div className="du-actions">
                <button type="submit" className="du-btn-primary">
                  Update Delivery Note
                </button>
                <button
                  type="button"
                  onClick={() => window.location.href = "/inventory/delivery-notes/"}
                  className="du-btn-secondary"
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