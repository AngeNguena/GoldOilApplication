import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import ShopLayout from "../Shop/Components/ShopLayout";
import Layout from "../../pages/Inventory/components/Layout";

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

  .ep-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
  }

  .ep-header {
    background: var(--ink);
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .ep-header-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  @media(max-width:640px){
    .ep-header-inner {
      padding: 16px 20px;
    }
  }

  .ep-header-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }

  .ep-header-link {
    font-size: 13px;
    font-weight: 700;
    color: var(--ox-light);
    text-decoration: none;
    transition: color .2s;
  }

  .ep-header-link:hover {
    color: #fff;
  }

  .ep-main {
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  @media(max-width:640px){
    .ep-main {
      padding: 32px 20px;
    }
  }

  .ep-form-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 40px;
  }

  @media(max-width:640px){
    .ep-form-card {
      padding: 26px;
    }
  }

  .ep-label {
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

  .ep-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }

  .ep-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3.5vw, 2rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.2;
  }

  .ep-sub {
    font-size: 13px;
    color: var(--muted);
    margin-top: 8px;
    margin-bottom: 32px;
    font-weight: 300;
  }

  .ep-field {
    margin-bottom: 22px;
  }

  .ep-field label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: var(--mid);
    margin-bottom: 8px;
  }

  .ep-field input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: #fff;
    transition: border-color .2s, box-shadow .2s;
  }

  .ep-field input:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }

  .ep-error {
    font-size: 12px;
    color: var(--ox);
    margin-top: 6px;
    font-weight: 500;
  }

  .ep-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    padding-top: 20px;
    margin-top: 4px;
    border-top: 1px solid var(--border);
  }

  .ep-btn-primary {
    padding: 13px 28px;
    background: linear-gradient(
      135deg,
      var(--ox) 0%,
      var(--ox-dark) 100%
    );
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
    transition: transform .2s, box-shadow .2s, opacity .2s;
  }

  .ep-btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(107,26,26,0.4);
  }

  .ep-btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .ep-btn-cancel {
    padding: 13px 28px;
    background: var(--cream);
    color: var(--mid);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    border: 1px solid var(--border);
    border-radius: 8px;
    text-decoration: none;
    transition: background .2s;
  }

  .ep-btn-cancel:hover {
    background: #EFE7DC;
  }
`;

export default function EditProfile({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        username: user?.username || "",
        email: user?.email || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put("/auth/profile/edit/");
    };

    /*
     * Customers use the ShopLayout.
     * Managers and CEOs use the Inventory Layout.
     */
    const isStaff =
        user?.role === "manager" ||
        user?.role === "ceo";

    const content = (
        <>
            <Head title="Edit Profile" />

            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <div className="ep-root">

                {/* Header */}
                

                {/* Form */}
                <main className="ep-main">

                    <div className="ep-form-card">

                        <div className="ep-label">
                            Account
                        </div>

                        <h2 className="ep-title">
                            Update Your Information
                        </h2>

                        <p className="ep-sub">
                            Update your account information below.
                        </p>

                        <form onSubmit={submit}>

                            {/* Username */}
                            <div className="ep-field">
                                <label htmlFor="username">
                                    Username
                                </label>

                                <input
                                    id="username"
                                    type="text"
                                    value={data.username}
                                    onChange={(e) =>
                                        setData(
                                            "username",
                                            e.target.value
                                        )
                                    }
                                />

                                {errors.username && (
                                    <p className="ep-error">
                                        {errors.username}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="ep-field">
                                <label htmlFor="email">
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                />

                                {errors.email && (
                                    <p className="ep-error">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* First Name */}
                            <div className="ep-field">
                                <label htmlFor="first_name">
                                    First Name
                                </label>

                                <input
                                    id="first_name"
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData(
                                            "first_name",
                                            e.target.value
                                        )
                                    }
                                />

                                {errors.first_name && (
                                    <p className="ep-error">
                                        {errors.first_name}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div className="ep-field">
                                <label htmlFor="last_name">
                                    Last Name
                                </label>

                                <input
                                    id="last_name"
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData(
                                            "last_name",
                                            e.target.value
                                        )
                                    }
                                />

                                {errors.last_name && (
                                    <p className="ep-error">
                                        {errors.last_name}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="ep-actions">

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="ep-btn-primary"
                                >
                                    {processing
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>

                                <Link
                                    href="/auth/profile/"
                                    className="ep-btn-cancel"
                                >
                                    Cancel
                                </Link>

                            </div>

                        </form>

                    </div>

                </main>
            </div>
        </>
    );

    /*
     * Role-based layout
     *
     * customer → ShopLayout
     * manager  → Inventory Layout
     * ceo      → Inventory Layout
     */
    if (isStaff) {
        return (
            <Layout>
                {content}
            </Layout>
        );
    }

    return (
        <ShopLayout>
            {content}
        </ShopLayout>
    );
}