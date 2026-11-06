
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
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

  .pf-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    padding: 48px 0;
  }

  .pf-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 32px;
  }

  @media(max-width:640px) {
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

  .pf-type-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 18px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 28px;
  }

  .pf-type-badge.oil {
    background: rgba(107,26,26,0.08);
    color: var(--ox);
  }

  .pf-type-badge.spare_part {
    background: #F1E9DC;
    color: #8A6A2A;
  }

  .pf-form {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 40px;
  }

  @media(max-width:640px) {
    .pf-form {
      padding: 26px;
    }
  }

  .pf-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  @media(max-width:640px) {
    .pf-grid {
      grid-template-columns: 1fr;
    }
  }

  .pf-grid .full {
    grid-column: 1 / -1;
  }

  .pf-field label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--mid);
    margin-bottom: 8px;
  }

  .pf-field label .req {
    color: var(--ox);
  }

  .pf-field input,
  .pf-field select,
  .pf-field textarea {
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

  .pf-field input:focus,
  .pf-field select:focus,
  .pf-field textarea:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }

  .pf-field input:disabled,
  .pf-field select:disabled {
    background: var(--cream);
    color: var(--muted);
  }

  .pf-field .mono {
    font-family: 'DM Mono', monospace;
  }

  .pf-hint {
    font-size: 11px;
    color: var(--muted);
    margin-top: 6px;
    font-weight: 300;
  }

  .pf-section-divider {
    border-top: 1px solid var(--border);
    padding-top: 28px;
    margin-top: 28px;
  }

  .pf-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 20px;
  }

  .pf-image-row {
    display: flex;
    align-items: flex-start;
    gap: 24px;
  }

  @media(max-width:520px) {
    .pf-image-row {
      flex-direction: column;
    }
  }

  .pf-image-preview {
    width: 128px;
    height: 128px;
    border: 2px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .pf-image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pf-actions {
    display: flex;
    gap: 14px;
    padding-top: 28px;
    margin-top: 28px;
    border-top: 1px solid var(--border);
  }

  .pf-btn-primary {
    padding: 14px 32px;
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

export default function ProductUpdate({
  product,
  categories,
  subcategories,
  volume_choices
}) {
  const [formData, setFormData] = useState({
    product_type: product.product_type,
    reference: product.reference || '',
    name: product.name || '',
    category_id: product.category_id || '',
    subcategory_id: product.subcategory_id || '',
    description: product.description || '',
    unit_price: product.unit_price || '',
    stock_quantity: product.stock_quantity || 0,
    brand: product.brand || '',
    viscosity: product.viscosity || '',
    volume: product.volume || '',
    part_number: product.part_number || '',
    compatible_vehicles: product.compatible_vehicles || '',
    warranty_period: product.warranty_period || '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    product.image_url || null
  );
  const [loading, setLoading] = useState(false);

  const filteredSubcategories = formData.category_id
    ? subcategories.filter(
        sub =>
          sub.category_id === parseInt(formData.category_id)
      )
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category_id'
        ? { subcategory_id: '' }
        : {}),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const submitData = new FormData();

    Object.keys(formData).forEach(key => {
      if (
        formData[key] !== '' &&
        formData[key] !== null &&
        formData[key] !== undefined
      ) {
        submitData.append(key, formData[key]);
      }
    });

    if (imageFile) {
      submitData.append('image', imageFile);
    }

    router.post(
      `/inventory/products/${product.id}/update/`,
      submitData,
      {
        forceFormData: true,

        onFinish: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <Layout title="Update Product">
        <div className="pf-root">
          <div className="pf-container">

            <div className="pf-label">
              Inventory
            </div>

            <div className="pf-title">
              Update Product
            </div>

            <div className="pf-sub">
              Modify the product information below.
            </div>

            <div
              className={`pf-type-badge ${
                product.product_type
              }`}
            >
              {product.product_type === 'oil'
                ? 'Oil Product'
                : 'Spare Part'}
            </div>

            <form
              className="pf-form"
              onSubmit={handleSubmit}
            >

              {/* Basic Information */}
              <div className="pf-grid">

                <div className="pf-field">
                  <label>
                    Reference <span className="req">*</span>
                  </label>

                  <input
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    required
                    className="mono"
                  />
                </div>

                <div className="pf-field">
                  <label>
                    Product Name <span className="req">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="pf-field">
                  <label>
                    Category
                  </label>

                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select category
                    </option>

                    {categories.map(category => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pf-field">
                  <label>
                    Subcategory
                  </label>

                  <select
                    name="subcategory_id"
                    value={formData.subcategory_id}
                    onChange={handleChange}
                    disabled={!formData.category_id}
                  >
                    <option value="">
                      Select subcategory
                    </option>

                    {filteredSubcategories.map(
                      subcategory => (
                        <option
                          key={subcategory.id}
                          value={subcategory.id}
                        >
                          {subcategory.name}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="pf-field">
                  <label>
                    Unit Price <span className="req">*</span>
                  </label>

                  <input
                    type="number"
                    name="unit_price"
                    value={formData.unit_price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="pf-field">
                  <label>
                    Stock Quantity
                  </label>

                  <input
                    type="number"
                    name="stock_quantity"
                    value={formData.stock_quantity}
                    onChange={handleChange}
                    min="0"
                  />
                </div>

                <div className="pf-field full">
                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                  />
                </div>

              </div>

              {/* Oil Information */}
              {product.product_type === 'oil' && (
                <div className="pf-section-divider">

                  <div className="pf-section-title">
                    Oil Information
                  </div>

                  <div className="pf-grid">

                    <div className="pf-field">
                      <label>
                        Volume
                      </label>

                      <select
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                      >
                        <option value="">
                          Select volume
                        </option>

                        {volume_choices.map(choice => (
                          <option
                            key={choice.value}
                            value={choice.value}
                          >
                            {choice.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="pf-field">
                      <label>
                        Viscosity
                      </label>

                      <input
                        type="text"
                        name="viscosity"
                        value={formData.viscosity}
                        onChange={handleChange}
                        placeholder="e.g. SAE 40"
                      />
                    </div>

                  </div>
                </div>
              )}

              {/* Spare Part Information */}
              {product.product_type === 'spare_part' && (
                <div className="pf-section-divider">

                  <div className="pf-section-title">
                    Spare Part Information
                  </div>

                  <div className="pf-grid">

                    <div className="pf-field">
                      <label>
                        Brand
                      </label>

                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pf-field">
                      <label>
                        Part Number
                      </label>

                      <input
                        type="text"
                        name="part_number"
                        value={formData.part_number}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pf-field full">
                      <label>
                        Compatible Vehicles
                      </label>

                      <textarea
                        name="compatible_vehicles"
                        value={formData.compatible_vehicles}
                        onChange={handleChange}
                        rows="3"
                        placeholder="e.g. Toyota Corolla, Honda Civic"
                      />
                    </div>

                    <div className="pf-field">
                      <label>
                        Warranty Period
                      </label>

                      <input
                        type="text"
                        name="warranty_period"
                        value={formData.warranty_period}
                        onChange={handleChange}
                        placeholder="e.g. 12 months"
                      />
                    </div>

                  </div>
                </div>
              )}

              {/* Image */}
              <div className="pf-section-divider">

                <div className="pf-section-title">
                  Product Image
                </div>

                <div className="pf-image-row">

                  {imagePreview && (
                    <div className="pf-image-preview">
                      <img
                        src={imagePreview}
                        alt="Product preview"
                      />
                    </div>
                  )}

                  <div className="pf-field">
                    <label>
                      Change Image
                    </label>

                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    <div className="pf-hint">
                      Leave empty to keep the current image.
                    </div>
                  </div>

                </div>
              </div>

              {/* Actions */}
              <div className="pf-actions">

                <button
                  type="submit"
                  className="pf-btn-primary"
                  disabled={loading}
                >
                  {loading
                    ? 'Updating...'
                    : 'Update Product'}
                </button>

                <button
                  type="button"
                  className="pf-btn-secondary"
                  onClick={() =>
                    router.visit(
                      `/inventory/products/?type=${formData.product_type}`
                    )
                  }
                  disabled={loading}
                >
                  Cancel
                </button>

              </div>

            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

