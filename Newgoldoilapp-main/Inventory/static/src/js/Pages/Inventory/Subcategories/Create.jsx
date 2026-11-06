
import React from 'react';
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
    --success: #2E7D32;
    --success-bg: #EEF7EE;
    --error-bg: #FCEEEE;
  }

  .pf-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }

  .pf-container {
    max-width: 640px;
    margin: 0 auto;
    padding: 0 32px;
  }

  @media(max-width:640px){
    .pf-container {
      padding: 0 20px;
    }
  }

  .pf-label {
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

  .pf-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }

  .pf-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.15;
  }

  .pf-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
    margin-bottom: 28px;
  }

  .pf-form {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 40px;
  }

  @media(max-width:640px){
    .pf-form {
      padding: 26px;
    }
  }

  /* Notification */
  .pf-notification {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    font-size: 13px;
    line-height: 1.5;
    font-weight: 500;
  }

  .pf-notification.success {
    color: var(--success);
    background: var(--success-bg);
    border: 1px solid #CDE5CD;
  }

  .pf-notification.error {
    color: var(--ox);
    background: var(--error-bg);
    border: 1px solid #EBCACA;
  }

  .pf-notification-icon {
    font-size: 16px;
    line-height: 1.2;
    flex-shrink: 0;
  }

  .pf-notification-content {
    flex: 1;
  }

  .pf-notification-title {
    font-weight: 700;
    margin-bottom: 2px;
  }

  .pf-field {
    margin-bottom: 24px;
  }

  .pf-field:last-of-type {
    margin-bottom: 0;
  }

  .pf-field label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--mid);
    margin-bottom: 8px;
  }

  .pf-field input,
  .pf-field select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: #fff;
    transition: border-color .2s, box-shadow .2s;
    box-sizing: border-box;
  }

  .pf-field input.error,
  .pf-field select.error {
    border-color: var(--ox-light);
  }

  .pf-field input:focus,
  .pf-field select:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }

  .pf-error {
    font-size: 11px;
    color: var(--ox);
    margin-top: 6px;
    font-weight: 500;
  }

  .pf-actions {
    display: flex;
    gap: 14px;
    padding-top: 24px;
    margin-top: 4px;
    border-top: 1px solid var(--border);
  }

  .pf-btn-primary {
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

  .pf-btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(107,26,26,0.4);
  }

  .pf-btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pf-btn-secondary {
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

  .pf-btn-secondary:hover {
    background: #EFE7DC;
  }
`;

export default function SubcategoryCreate({ categories }) {

  const {
    data,
    setData,
    post,
    processing,
    errors,
  } = useForm({
    name: '',
    category_id: categories[0]?.id || '',
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/inventory/subcategories/create/');
  };

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="pf-root">
        <div className="pf-container">

          <div className="pf-label">Catalog</div>

          <h1 className="pf-title">
            Create Subcategory
          </h1>

          <p className="pf-sub">
            Add a new product subcategory
          </p>

          <div className="pf-form">

            <form onSubmit={handleSubmit}>

              {/* Parent Category */}
              <div className="pf-field">
                <label>Parent Category</label>

                <select
                  name="category_id"
                  value={data.category_id}
                  onChange={handleChange}
                  className={errors.category_id ? 'error' : ''}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>

                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                {errors.category_id && (
                  <p className="pf-error">
                    {errors.category_id}
                  </p>
                )}
              </div>

              {/* Subcategory Name */}
              <div className="pf-field">
                <label>Subcategory Name</label>

                <input
                  name="name"
                  placeholder="e.g., Synthetic, Semi-Synthetic, Mineral"
                  value={data.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  required
                />

                {errors.name && (
                  <p className="pf-error">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="pf-actions">

                <button
                  type="submit"
                  disabled={processing}
                  className="pf-btn-primary"
                >
                  {processing
                    ? 'Creating...'
                    : 'Create Subcategory'}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    router.visit('/inventory/subcategories/')
                  }
                  className="pf-btn-secondary"
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

