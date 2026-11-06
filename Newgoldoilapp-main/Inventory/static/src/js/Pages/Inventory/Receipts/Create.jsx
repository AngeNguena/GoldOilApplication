
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link, router } from '@inertiajs/react';

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

  .rcc-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }

  .rcc-container {
    max-width: 920px;
    margin: 0 auto;
    padding: 0 32px;
  }

  @media(max-width:640px){
    .rcc-container {
      padding: 0 20px;
    }
  }

  /* Header */
  .rcc-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
  }

  .rcc-label {
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

  .rcc-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }

  .rcc-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.15;
  }

  .rcc-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }

  .rcc-cancel-link {
    padding: 12px 22px;
    background: #fff;
    color: var(--mid);
    font-size: 13px;
    font-weight: 700;
    border: 1px solid var(--border);
    border-radius: 8px;
    text-decoration: none;
    transition: border-color .2s, color .2s;
  }

  .rcc-cancel-link:hover {
    border-color: var(--ox-light);
    color: var(--ox);
  }

  /* Alert */
  .rcc-alert {
    margin-bottom: 24px;
    background: rgba(107,26,26,0.06);
    border: 1px solid rgba(107,26,26,0.2);
    border-radius: 10px;
    padding: 14px 18px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .rcc-alert svg {
    width: 18px;
    height: 18px;
    color: var(--ox);
    flex-shrink: 0;
    margin-top: 1px;
  }

  .rcc-alert p {
    font-size: 12px;
    color: var(--ox-dark);
    font-weight: 600;
  }

  /* Panels */
  .rcc-panel {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;
  }

  .rcc-panel-head {
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rcc-panel-head h2 {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
  }

  .rcc-panel-body {
    padding: 26px 24px;
  }

  .rcc-add-item-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 700;
    color: var(--ox);
    background: none;
    border: none;
    cursor: pointer;
    transition: color .2s;
  }

  .rcc-add-item-btn:hover {
    color: var(--ox-dark);
  }

  .rcc-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media(max-width:520px){
    .rcc-grid-2 {
      grid-template-columns: 1fr;
    }
  }

  .rcc-field {
    margin-bottom: 20px;
  }

  .rcc-field:nth-last-child(-n+2) {
    margin-bottom: 0;
  }

  .rcc-field label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: var(--mid);
    margin-bottom: 8px;
  }

  .rcc-field label .req {
    color: var(--ox);
  }

  .rcc-field input,
  .rcc-field select {
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

  .rcc-field input.error,
  .rcc-field select.error {
    border-color: var(--ox-light);
  }

  .rcc-field input:focus,
  .rcc-field select:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }

  .rcc-error {
    font-size: 11px;
    color: var(--ox);
    margin-top: 6px;
    font-weight: 500;
  }

  /* Item rows */
  .rcc-item-row {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    padding: 16px;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 10px;
    margin-bottom: 14px;
  }

  .rcc-item-row:last-child {
    margin-bottom: 0;
  }

  .rcc-item-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  @media(max-width:640px){
    .rcc-item-grid {
      grid-template-columns: 1fr;
    }
  }

  .rcc-item-grid label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: var(--muted);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .rcc-item-grid select,
  .rcc-item-grid input {
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

  .rcc-item-grid select:focus,
  .rcc-item-grid input:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }

  .rcc-remove-btn {
    margin-top: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--ox);
    transition: color .2s;
    flex-shrink: 0;
  }

  .rcc-remove-btn:hover {
    color: var(--ox-dark);
  }

  .rcc-remove-btn svg {
    width: 20px;
    height: 20px;
  }

  /* Total card */
  .rcc-total-card {
    background: linear-gradient(
      135deg,
      var(--ox) 0%,
      var(--ox-dark) 100%
    );
    border-radius: 12px;
    padding: 22px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .rcc-total-card span:first-child {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
  }

  .rcc-total-card span:last-child {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
  }

  /* Submit row */
  .rcc-submit-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 14px;
  }

  .rcc-cancel-btn2 {
    padding: 13px 26px;
    background: var(--cream);
    color: var(--mid);
    font-size: 13px;
    font-weight: 700;
    border: 1px solid var(--border);
    border-radius: 8px;
    text-decoration: none;
    transition: background .2s;
  }

  .rcc-cancel-btn2:hover {
    background: #EFE7DC;
  }

  .rcc-submit-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: linear-gradient(
      135deg,
      var(--ox) 0%,
      var(--ox-dark) 100%
    );
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

  .rcc-submit-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(107,26,26,0.4);
  }

  .rcc-submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function ReceiptCreate({
  suppliers = [],
  products = []
}) {

  const [formData, setFormData] = useState({
    receipt_number: `REC-${Date.now()}`,
    supplier_id: '',
    receipt_date: new Date()
      .toISOString()
      .split('T')[0],
    notes: '',
  });

  const [items, setItems] = useState([
    {
      product_id: '',
      quantity: 1,
      unit_price: 0
    }
  ]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleItemChange = (
    index,
    field,
    value
  ) => {

    const newItems = [...items];

    newItems[index][field] = value;

    if (
      field === 'product_id' &&
      value
    ) {

      const product = products.find(
        p => p.id === parseInt(value)
      );

      if (product) {
        newItems[index].unit_price =
          product.unit_price;
      }

    }

    setItems(newItems);

  };

  const addItem = () => {

    setItems([
      ...items,
      {
        product_id: '',
        quantity: 1,
        unit_price: 0
      }
    ]);

  };

  const removeItem = (index) => {

    if (items.length > 1) {

      setItems(
        items.filter(
          (_, i) => i !== index
        )
      );

    }

  };

  const calculateTotal = () => {

    return items.reduce(
      (sum, item) => {

        return (
          sum +
          (
            parseFloat(item.quantity) || 0
          ) *
          (
            parseFloat(item.unit_price) || 0
          )
        );

      },
      0
    );

  };

  const formatFCFA = (amount) => {

    return (
      new Intl.NumberFormat(
        'fr-FR',
        {
          maximumFractionDigits: 0
        }
      ).format(
        Math.round(amount)
      ) +
      ' FCFA'
    );

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    setErrors({});
    setIsSubmitting(true);

    const newErrors = {};

    if (!formData.supplier_id) {
      newErrors.supplier_id =
        'Supplier is required';
    }

    if (!formData.receipt_number) {
      newErrors.receipt_number =
        'Receipt number is required';
    }

    const validItems = items.filter(
      item =>
        item.product_id &&
        item.quantity > 0
    );

    if (validItems.length === 0) {
      newErrors.items =
        'At least one item is required';
    }

    if (Object.keys(newErrors).length > 0) {

      setErrors(newErrors);
      setIsSubmitting(false);

      return;
    }

    router.post(
      '/inventory/receipts/create/',
      {
        ...formData,
        items: validItems
      },
      {
        preserveScroll: true,

        onError: (serverErrors) => {

          setErrors({
            general:
              serverErrors?.general ||
              'Failed to create receipt.'
          });

          setIsSubmitting(false);

        },

        onFinish: () => {

          setIsSubmitting(false);

        }
      }
    );

  };

  return (
    <Layout>

      <style
        dangerouslySetInnerHTML={{
          __html: styles
        }}
      />

      <div className="rcc-root">

        <div className="rcc-container">

          {/* Header */}

          <div className="rcc-header">

            <div>

              <div className="rcc-label">
                Logistics
              </div>

              <h1 className="rcc-title">
                New Stock Receipt
              </h1>

              <p className="rcc-sub">
                Record inventory received from supplier
              </p>

            </div>

            <Link
              href="/inventory/receipts/"
              className="rcc-cancel-link"
            >
              Cancel
            </Link>

          </div>

          {/* Error Alert */}

          {errors.general && (

            <div className="rcc-alert">

              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />

              </svg>

              <p>
                {errors.general}
              </p>

            </div>

          )}

          <form onSubmit={handleSubmit}>

            {/* Receipt Info Card */}

            <div className="rcc-panel">

              <div className="rcc-panel-head">

                <h2>
                  Receipt Information
                </h2>

              </div>

              <div className="rcc-panel-body">

                <div className="rcc-grid-2">

                  <div className="rcc-field">

                    <label>
                      Receipt Number
                      <span className="req">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      name="receipt_number"
                      value={
                        formData.receipt_number
                      }
                      onChange={
                        handleInputChange
                      }
                      className={
                        errors.receipt_number
                          ? 'error'
                          : ''
                      }
                      required
                    />

                    {errors.receipt_number && (
                      <p className="rcc-error">
                        {errors.receipt_number}
                      </p>
                    )}

                  </div>

                  <div className="rcc-field">

                    <label>
                      Supplier
                      <span className="req">
                        *
                      </span>
                    </label>

                    <select
                      name="supplier_id"
                      value={
                        formData.supplier_id
                      }
                      onChange={
                        handleInputChange
                      }
                      className={
                        errors.supplier_id
                          ? 'error'
                          : ''
                      }
                      required
                    >

                      <option value="">
                        Select supplier
                      </option>

                      {suppliers.map(
                        supplier => (

                          <option
                            key={supplier.id}
                            value={supplier.id}
                          >
                            {supplier.name}
                          </option>

                        )
                      )}

                    </select>

                    {errors.supplier_id && (
                      <p className="rcc-error">
                        {errors.supplier_id}
                      </p>
                    )}

                  </div>

                  <div className="rcc-field">

                    <label>
                      Receipt Date
                    </label>

                    <input
                      type="date"
                      name="receipt_date"
                      value={
                        formData.receipt_date
                      }
                      onChange={
                        handleInputChange
                      }
                    />

                  </div>

                  <div className="rcc-field">

                    <label>
                      Notes
                    </label>

                    <input
                      type="text"
                      name="notes"
                      value={
                        formData.notes
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="Optional notes"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* Items Card */}

            <div className="rcc-panel">

              <div className="rcc-panel-head">

                <h2>
                  Items
                </h2>

                <button
                  type="button"
                  onClick={addItem}
                  className="rcc-add-item-btn"
                >

                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>

                  Add Item

                </button>

              </div>

              <div className="rcc-panel-body">

                {errors.items && (

                  <div className="rcc-alert">

                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <p>
                      {errors.items}
                    </p>

                  </div>

                )}

                {items.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="rcc-item-row"
                    >

                      <div className="rcc-item-grid">

                        <div>

                          <label>
                            Product
                          </label>

                          <select
                            value={
                              item.product_id
                            }
                            onChange={
                              (e) =>
                                handleItemChange(
                                  index,
                                  'product_id',
                                  e.target.value
                                )
                            }
                          >

                            <option value="">
                              Select product
                            </option>

                            {products.map(
                              product => (

                                <option
                                  key={product.id}
                                  value={product.id}
                                >
                                  {product.name}
                                  {' '}
                                  (
                                  {product.reference}
                                  )
                                </option>

                              )
                            )}

                          </select>

                        </div>

                        <div>

                          <label>
                            Quantity
                          </label>

                          <input
                            type="number"
                            min="1"
                            value={
                              item.quantity
                            }
                            onChange={
                              (e) =>
                                handleItemChange(
                                  index,
                                  'quantity',
                                  e.target.value
                                )
                            }
                          />

                        </div>

                        <div>

                          <label>
                            Unit Price (FCFA)
                          </label>

                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={
                              item.unit_price
                            }
                            onChange={
                              (e) =>
                                handleItemChange(
                                  index,
                                  'unit_price',
                                  e.target.value
                                )
                            }
                          />

                        </div>

                      </div>

                      {items.length > 1 && (

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(index)
                          }
                          className="rcc-remove-btn"
                        >

                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>

                        </button>

                      )}

                    </div>

                  )
                )}

              </div>

            </div>

            {/* Total Card */}

            <div className="rcc-total-card">

              <span>
                Total Amount
              </span>

              <span>
                {formatFCFA(
                  calculateTotal()
                )}
              </span>

            </div>

            {/* Submit Row */}

            <div className="rcc-submit-row">

              <Link
                href="/inventory/receipts/"
                className="rcc-cancel-btn2"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rcc-submit-btn"
              >

                {isSubmitting ? (

                  <>
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        style={{ opacity: 0.25 }}
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        style={{ opacity: 0.75 }}
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />

                    </svg>

                    Creating...

                  </>

                ) : (

                  <>
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    Create Receipt
                  </>

                )}

              </button>

            </div>

          </form>

        </div>

      </div>

    </Layout>
  );
}

