
import React from 'react';
import Layout from '../components/Layout';
import { useForm, router } from '@inertiajs/react';

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

  .spu-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }

  .spu-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 32px;
  }

  @media(max-width:640px) {
    .spu-container {
      padding: 0 20px;
    }
  }

  .spu-header {
    margin-bottom: 32px;
  }

  .spu-label {
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

  .spu-label::after {
    content: '';
    width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }

  .spu-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
  }

  .spu-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }

  .spu-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 32px;
  }

  @media(max-width:640px) {
    .spu-card {
      padding: 24px 20px;
    }
  }

  .spu-field {
    margin-bottom: 22px;
  }

  .spu-label-field {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--mid);
    margin-bottom: 8px;
  }

  .spu-input,
  .spu-textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 13px 14px;
    background: #fff;
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    border: 1px solid var(--border);
    border-radius: 6px;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }

  .spu-input:focus,
  .spu-textarea:focus {
    border-color: var(--ox-light);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.08);
  }

  .spu-textarea {
    min-height: 120px;
    resize: vertical;
  }

  .spu-input::placeholder,
  .spu-textarea::placeholder {
    color: var(--muted);
  }

  .spu-error {
    margin-top: 7px;
    font-size: 12px;
    color: var(--ox);
  }

  .spu-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 30px;
  }

  .spu-cancel,
  .spu-submit {
    padding: 13px 24px;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
  }

  .spu-cancel {
    background: #fff;
    color: var(--mid);
    border: 1px solid var(--border);
  }

  .spu-cancel:hover {
    border-color: var(--ox-light);
    color: var(--ox);
  }

  .spu-submit {
    border: none;
    background: linear-gradient(
      135deg,
      var(--ox) 0%,
      var(--ox-dark) 100%
    );
    color: #fff;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
  }

  .spu-submit:hover {
    box-shadow: 0 6px 18px rgba(107,26,26,0.4);
  }

  .spu-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function SupplierUpdate({ supplier }) {

  const { data, setData, post, processing, errors } = useForm({
    name: supplier?.name || '',
    email: supplier?.email || '',
    phone: supplier?.phone || '',
    address: supplier?.address || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(`/inventory/suppliers/${supplier.id}/update/`);
  };

  return (
    <Layout>

      <style
        dangerouslySetInnerHTML={{
          __html: styles
        }}
      />

      <div className="spu-root">
        <div className="spu-container">

          {/* Header */}
          <div className="spu-header">

            <div className="spu-label">
              Catalog
            </div>

            <h1 className="spu-title">
              Edit Supplier
            </h1>

            <p className="spu-sub">
              Update the supplier information below.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="spu-card"
          >

            {/* Name */}
            <div className="spu-field">

              <label className="spu-label-field">
                Supplier Name
              </label>

              <input
                type="text"
                value={data.name}
                onChange={(e) =>
                  setData('name', e.target.value)
                }
                className="spu-input"
                placeholder="Enter supplier name"
                required
              />

              {errors.name && (
                <div className="spu-error">
                  {errors.name}
                </div>
              )}

            </div>

            {/* Email */}
            <div className="spu-field">

              <label className="spu-label-field">
                Email
              </label>

              <input
                type="email"
                value={data.email}
                onChange={(e) =>
                  setData('email', e.target.value)
                }
                className="spu-input"
                placeholder="supplier@example.com"
              />

              {errors.email && (
                <div className="spu-error">
                  {errors.email}
                </div>
              )}

            </div>

            {/* Phone */}
            <div className="spu-field">

              <label className="spu-label-field">
                Phone
              </label>

              <input
                type="text"
                value={data.phone}
                onChange={(e) =>
                  setData('phone', e.target.value)
                }
                className="spu-input"
                placeholder="+1 000 000 0000"
              />

              {errors.phone && (
                <div className="spu-error">
                  {errors.phone}
                </div>
              )}

            </div>

            {/* Address */}
            <div className="spu-field">

              <label className="spu-label-field">
                Address
              </label>

              <textarea
                value={data.address}
                onChange={(e) =>
                  setData('address', e.target.value)
                }
                className="spu-textarea"
                placeholder="Enter supplier address"
              />

              {errors.address && (
                <div className="spu-error">
                  {errors.address}
                </div>
              )}

            </div>

            {/* Actions */}
            <div className="spu-actions">

              <button
                type="button"
                className="spu-cancel"
                onClick={() =>
                  router.visit('/inventory/suppliers/')
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="spu-submit"
                disabled={processing}
              >
                {processing
                  ? 'Updating...'
                  : 'Update Supplier'}
              </button>

            </div>

          </form>

        </div>
      </div>

    </Layout>
  );
}

