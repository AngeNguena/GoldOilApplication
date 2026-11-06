
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

  .spc-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }

  .spc-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 32px;
  }

  @media(max-width:640px) {
    .spc-container {
      padding: 0 20px;
    }
  }

  .spc-header {
    margin-bottom: 32px;
  }

  .spc-label {
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

  .spc-label::after {
    content: '';
    width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }

  .spc-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
  }

  .spc-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }

  .spc-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 32px;
  }

  @media(max-width:640px) {
    .spc-card {
      padding: 24px 20px;
    }
  }

  .spc-field {
    margin-bottom: 22px;
  }

  .spc-label-field {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--mid);
    margin-bottom: 8px;
  }

  .spc-required {
    color: var(--ox);
  }

  .spc-input,
  .spc-textarea {
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

  .spc-input:focus,
  .spc-textarea:focus {
    border-color: var(--ox-light);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.08);
  }

  .spc-textarea {
    min-height: 120px;
    resize: vertical;
  }

  .spc-input::placeholder,
  .spc-textarea::placeholder {
    color: var(--muted);
  }

  .spc-error {
    margin-top: 7px;
    font-size: 12px;
    color: var(--ox);
  }

  .spc-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 30px;
  }

  .spc-cancel,
  .spc-submit {
    padding: 13px 24px;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
  }

  .spc-cancel {
    background: #fff;
    color: var(--mid);
    border: 1px solid var(--border);
  }

  .spc-cancel:hover {
    border-color: var(--ox-light);
    color: var(--ox);
  }

  .spc-submit {
    border: none;
    background: linear-gradient(
      135deg,
      var(--ox) 0%,
      var(--ox-dark) 100%
    );
    color: #fff;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
  }

  .spc-submit:hover {
    box-shadow: 0 6px 18px rgba(107,26,26,0.4);
  }

  .spc-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function SupplierCreate() {

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/inventory/suppliers/create/');
  };

  return (
    <Layout>

      <style
        dangerouslySetInnerHTML={{
          __html: styles
        }}
      />

      <div className="spc-root">
        <div className="spc-container">

          {/* Header */}
          <div className="spc-header">

            <div className="spc-label">
              Catalog
            </div>

            <h1 className="spc-title">
              Add Supplier
            </h1>

            <p className="spc-sub">
              Create a new supplier for your inventory.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="spc-card"
          >

            {/* Name */}
            <div className="spc-field">

              <label className="spc-label-field">
                Supplier Name
                <span className="spc-required">
                  {' '}*
                </span>
              </label>

              <input
                type="text"
                value={data.name}
                onChange={(e) =>
                  setData('name', e.target.value)
                }
                className="spc-input"
                placeholder="Enter supplier name"
                required
              />

              {errors.name && (
                <div className="spc-error">
                  {errors.name}
                </div>
              )}

            </div>

            {/* Email */}
            <div className="spc-field">

              <label className="spc-label-field">
                Email
              </label>

              <input
                type="email"
                value={data.email}
                onChange={(e) =>
                  setData('email', e.target.value)
                }
                className="spc-input"
                placeholder="supplier@example.com"
              />

              {errors.email && (
                <div className="spc-error">
                  {errors.email}
                </div>
              )}

            </div>

            {/* Phone */}
            <div className="spc-field">

              <label className="spc-label-field">
                Phone
              </label>

              <input
                type="text"
                value={data.phone}
                onChange={(e) =>
                  setData('phone', e.target.value)
                }
                className="spc-input"
                placeholder="+1 000 000 0000"
              />

              {errors.phone && (
                <div className="spc-error">
                  {errors.phone}
                </div>
              )}

            </div>

            {/* Address */}
            <div className="spc-field">

              <label className="spc-label-field">
                Address
              </label>

              <textarea
                value={data.address}
                onChange={(e) =>
                  setData('address', e.target.value)
                }
                className="spc-textarea"
                placeholder="Enter supplier address"
              />

              {errors.address && (
                <div className="spc-error">
                  {errors.address}
                </div>
              )}

            </div>

            {/* Actions */}
            <div className="spc-actions">

              <button
                type="button"
                className="spc-cancel"
                onClick={() =>
                  router.visit('/inventory/suppliers/')
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="spc-submit"
                disabled={processing}
              >
                {processing
                  ? 'Creating...'
                  : 'Create Supplier'}
              </button>

            </div>

          </form>

        </div>
      </div>

    </Layout>
  );
}

