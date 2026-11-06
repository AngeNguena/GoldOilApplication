
import React from "react";
import { useForm, router } from "@inertiajs/react";
import Layout from "../components/Layout";

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
    max-width: 720px;
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

  .pf-field input.error {
    border-color: var(--ox-light);
  }

  .pf-field input:focus,
  .pf-field select:focus,
  .pf-field textarea:focus {
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

  .pf-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }

  @media(max-width:520px) {
    .pf-row-2 {
      grid-template-columns: 1fr;
    }
  }

  .pf-row-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }

  @media(max-width:640px) {
    .pf-row-3 {
      grid-template-columns: 1fr;
    }
  }

  .pf-section-divider {
    border-top: 1px solid var(--border);
    padding-top: 24px;
    margin-top: 4px;
    margin-bottom: 24px;
  }

  .pf-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 20px;
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

export default function ClientUpdate({ client }) {

  const {
    data,
    setData,
    post,
    processing,
  } = useForm({
    name: client.name || "",
    client_type: client.client_type || "individual",
    email: client.email || "",
    phone: client.phone || "",
    address: client.address || "",
    pb: client.pb || "",
    niu: client.niu || "",
    rccm: client.rccm || "",
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post(
      `/inventory/clients/${client.id}/update/`,
      {
        forceFormData: true,
      }
    );
  };

  return (
    <Layout title="Edit Client">

      <style
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />

      <div className="pf-root">

        <div className="pf-container">

          <div className="pf-label">
            Directory
          </div>

          <h1 className="pf-title">
            Edit Client
          </h1>

          <p className="pf-sub">
            Update client information
          </p>

          <div className="pf-form">

            <form onSubmit={handleSubmit}>

              {/* Client Name */}
              <div className="pf-field">

                <label>
                  Client Name
                </label>

                <input
                  name="name"
                  type="text"
                  placeholder="Enter client name"
                  value={data.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Client Type */}
              <div className="pf-field">

                <label>
                  Client Type
                </label>

                <select
                  name="client_type"
                  value={data.client_type}
                  onChange={handleChange}
                >
                  <option value="individual">
                    Individual
                  </option>

                  <option value="distributor">
                    Distributor
                  </option>

                  <option value="enterprise">
                    Enterprise
                  </option>
                </select>

              </div>

              {/* Email & Phone */}
              <div className="pf-row-2">

                <div
                  className="pf-field"
                  style={{ marginBottom: 0 }}
                >

                  <label>
                    Email
                  </label>

                  <input
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={data.email}
                    onChange={handleChange}
                  />

                </div>

                <div
                  className="pf-field"
                  style={{ marginBottom: 0 }}
                >

                  <label>
                    Phone
                  </label>

                  <input
                    name="phone"
                    type="tel"
                    placeholder="+237 XXX XXX XXX"
                    value={data.phone}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Legal Details */}
              <div className="pf-section-divider">

                <div className="pf-section-title">
                  Legal & Registration Details
                </div>

                <div className="pf-row-3">

                  <div
                    className="pf-field"
                    style={{ marginBottom: 0 }}
                  >

                    <label>
                      BP (Boîte Postale)
                    </label>

                    <input
                      name="pb"
                      placeholder="BP 1217"
                      value={data.pb}
                      onChange={handleChange}
                    />

                  </div>

                  <div
                    className="pf-field"
                    style={{ marginBottom: 0 }}
                  >

                    <label>
                      NIU
                    </label>

                    <input
                      name="niu"
                      placeholder="M097100000634G"
                      value={data.niu}
                      onChange={handleChange}
                    />

                  </div>

                  <div
                    className="pf-field"
                    style={{ marginBottom: 0 }}
                  >

                    <label>
                      RCCM
                    </label>

                    <input
                      name="rccm"
                      placeholder="RC/DLA/1987/4060"
                      value={data.rccm}
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>

              {/* Address */}
              <div className="pf-field">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  placeholder="Enter full address"
                  value={data.address}
                  onChange={handleChange}
                  rows="3"
                  style={{ resize: "none" }}
                />

              </div>

              {/* Actions */}
              <div className="pf-actions">

                <button
                  type="submit"
                  disabled={processing}
                  className="pf-btn-primary"
                >
                  {processing
                    ? "Updating..."
                    : "Update Client"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    router.visit("/inventory/clients/")
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

