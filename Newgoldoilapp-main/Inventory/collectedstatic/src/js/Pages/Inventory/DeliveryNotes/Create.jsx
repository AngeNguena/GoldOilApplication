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

  .dc-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }
  .dc-container {
    max-width: 980px;
    margin: 0 auto;
    padding: 0 32px;
  }
  @media(max-width:640px){ .dc-container { padding: 0 20px; } }

  .dc-label {
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
  .dc-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }
  .dc-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.15;
    margin-bottom: 28px;
  }

  .dc-form {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 40px;
  }
  @media(max-width:640px){ .dc-form { padding: 22px; } }

  .dc-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }
  @media(max-width:768px){ .dc-grid-4 { grid-template-columns: 1fr 1fr; } }
  @media(max-width:480px){ .dc-grid-4 { grid-template-columns: 1fr; } }

  .dc-form input,
  .dc-form select {
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
  .dc-form input:disabled,
  .dc-form select:disabled {
    background: var(--cream);
    color: var(--muted);
  }
  .dc-form input:focus,
  .dc-form select:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }

  .dc-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
  }
  .dc-section-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .dc-add-item-btn {
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
  .dc-add-item-btn:hover { transform: translateY(-1px); }

  /* Item cards */
  .dc-item-card {
    border: 1px solid var(--border);
    background: var(--cream);
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 14px;
  }
  .dc-item-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
  @media(max-width:768px){ .dc-item-grid { grid-template-columns: 1fr 1fr; } }
  @media(max-width:480px){ .dc-item-grid { grid-template-columns: 1fr; } }

  .dc-item-total-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dc-item-total-row span:first-child { font-size: 13px; font-weight: 700; color: var(--ink); }
  .dc-remove-btn {
    font-size: 12px;
    font-weight: 700;
    color: var(--ox);
    background: none;
    border: none;
    cursor: pointer;
  }
  .dc-remove-btn:hover { color: var(--ox-dark); }

  .dc-stock-warn {
    font-size: 11px;
    color: var(--ox);
    font-weight: 700;
    margin-top: 10px;
  }

  /* Grand total */
  .dc-grand-total {
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    border-radius: 12px;
    padding: 20px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 28px 0;
  }
  .dc-grand-total span:first-child {
    font-size: 14px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
  }
  .dc-grand-total span:last-child {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
  }

  .dc-submit-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.03em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
    transition: transform .2s, box-shadow .2s;
  }
  .dc-submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }
`;

export default function DeliveryNoteCreate({ clients, products, invoices }) {

  const getCSRFToken = () => {
    const name = "csrftoken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const [form, setForm] = useState({
    note_number: "",
    invoice_id: "",
    client_id: clients[0]?.id || "",
    delivery_date: new Date().toISOString().split("T")[0],
    notes: "",
    items: [
      {
        product_id: products[0]?.id || "",
        quantity: 1,
        unit_price: products[0]?.unit_price || 0,
      },
    ],
  });

  const handleChange = (e, index = null, type = null) => {
    const { name, value } = e.target;

    if (name === "invoice_id") {
      const invoice = invoices.find((inv) => inv.id == value);

      if (invoice) {
        setForm({
          ...form,
          invoice_id: invoice.id,
          client_id: invoice.client_id,
          items: invoice.items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
          })),
        });
      } else {
        setForm({ ...form, invoice_id: "" });
      }
      return;
    }

    if (type === "items") {
      const updatedItems = [...form.items];
      updatedItems[index][name] = value;

      if (name === "product_id") {
        const product = products.find((p) => p.id == value);
        if (product) {
          updatedItems[index].unit_price = product.unit_price;
        }
      }

      setForm({ ...form, items: updatedItems });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [
        ...form.items,
        {
          product_id: products[0]?.id || "",
          quantity: 1,
          unit_price: products[0]?.unit_price || 0,
        },
      ],
    });
  };

  const removeItem = (index) => {
    setForm({
      ...form,
      items: form.items.filter((_, i) => i !== index),
    });
  };

  const calculateItemTotal = (item) =>
    (parseFloat(item.quantity) || 0) *
    (parseFloat(item.unit_price) || 0);

  const calculateGrandTotal = () =>
    form.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  const getAvailableStock = (productId) => {
    const product = products.find((p) => p.id == productId);
    return product ? product.stock_quantity : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasStockError = form.items.some((item) => {
      const available = getAvailableStock(item.product_id);
      return parseInt(item.quantity) > available;
    });

    if (hasStockError) {
      alert("One or more items exceed available stock.");
      return;
    }

    try {
      const res = await fetch("/inventory/delivery-notes/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/inventory/delivery-notes/";
      } else {
        alert(data.errors || "Failed to create delivery note");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the delivery note");
    }
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="dc-root">
        <div className="dc-container">

          <div className="dc-label">Logistics</div>
          <h1 className="dc-title">Create Delivery Note</h1>

          <form onSubmit={handleSubmit} className="dc-form">

            {/* DELIVERY DETAILS */}
            <div className="dc-grid-4">

              <input
                name="note_number"
                placeholder="Note Number"
                value={form.note_number}
                onChange={handleChange}
                required
              />

              <select
                name="invoice_id"
                value={form.invoice_id}
                onChange={handleChange}
              >
                <option value="">Manual Delivery</option>
                {invoices.map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    {inv.proforma_number}
                  </option>
                ))}
              </select>

              <select
                name="client_id"
                value={form.client_id}
                onChange={handleChange}
                required
                disabled={!!form.invoice_id}
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="delivery_date"
                value={form.delivery_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* ITEMS */}
            <div>
              <div className="dc-section-row">
                <h2 className="dc-section-title">Items ({form.items.length})</h2>

                {!form.invoice_id && (
                  <button type="button" onClick={addItem} className="dc-add-item-btn">
                    Add Item
                  </button>
                )}
              </div>

              {form.items.map((item, index) => {
                const available = getAvailableStock(item.product_id);

                return (
                  <div key={index} className="dc-item-card">
                    <div className="dc-item-grid">

                      <select
                        name="product_id"
                        value={item.product_id}
                        onChange={(e) => handleChange(e, index, "items")}
                        disabled={!!form.invoice_id}
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} (Stock: {p.stock_quantity})
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        min="1"
                        max={available}
                        onChange={(e) => handleChange(e, index, "items")}
                      />

                      <input
                        type="number"
                        name="unit_price"
                        value={item.unit_price}
                        step="0.01"
                        onChange={(e) => handleChange(e, index, "items")}
                      />

                      <div className="dc-item-total-row">
                        <span>{calculateItemTotal(item).toFixed(0)} FCFA</span>

                        {!form.invoice_id && form.items.length > 1 && (
                          <button type="button" onClick={() => removeItem(index)} className="dc-remove-btn">
                            Remove
                          </button>
                        )}
                      </div>
                    </div>

                    {item.quantity > available && (
                      <p className="dc-stock-warn">Exceeds available stock</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* TOTAL */}
            <div className="dc-grand-total">
              <span>Grand Total</span>
              <span>{calculateGrandTotal().toFixed(0)} FCFA</span>
            </div>

            <button type="submit" className="dc-submit-btn">
              Create Delivery Note
            </button>

          </form>
        </div>
      </div>
    </Layout>
  );
}