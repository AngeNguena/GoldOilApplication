import React from "react";
import { Head, Link } from "@inertiajs/react";

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

  .pr-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
  }

  .pr-header {
    background: var(--ink);
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .pr-header-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  @media(max-width:640px){
    .pr-header-inner {
      padding: 16px 20px;
    }
  }

  .pr-header-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }

  .pr-main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  @media(max-width:640px){
    .pr-main {
      padding: 32px 20px;
    }
  }

  .pr-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }

  .pr-banner {
    background: linear-gradient(
      135deg,
      var(--ox) 0%,
      var(--ox-dark) 100%
    );
    padding: 44px 40px;
    position: relative;
    overflow: hidden;
  }

  .pr-banner::before {
    content: 'GOLD';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Playfair Display', serif;
    font-size: 130px;
    font-weight: 700;
    color: rgba(255,255,255,0.06);
    line-height: 1;
    pointer-events: none;
  }

  .pr-banner-inner {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 22px;
    flex-wrap: wrap;
  }

  .pr-avatar {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 700;
    color: var(--ox);
    flex-shrink: 0;
  }

  .pr-banner h2 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }

  .pr-banner p {
    font-size: 14px;
    color: rgba(255,255,255,0.7);
    margin-top: 4px;
    font-weight: 300;
  }

  .pr-info {
    padding: 40px;
  }

  @media(max-width:640px){
    .pr-info {
      padding: 26px;
    }
  }

  .pr-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ox);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .pr-label::after {
    content: '';
    flex: 1;
    max-width: 40px;
    height: 1px;
    background: var(--ox);
    opacity: 0.5;
  }

  .pr-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 32px;
  }

  @media(max-width:520px){
    .pr-grid {
      grid-template-columns: 1fr;
    }
  }

  .pr-field-lbl {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
  }

  .pr-field-val {
    font-size: 15px;
    font-weight: 700;
    color: var(--ink);
  }

  .pr-field-val.capitalize {
    text-transform: capitalize;
  }

  .pr-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    padding-top: 28px;
    border-top: 1px solid var(--border);
  }

  .pr-btn-primary {
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
    border-radius: 8px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
    transition: transform .2s, box-shadow .2s;
  }

  .pr-btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(107,26,26,0.4);
  }
`;

export default function Profile({ user }) {
    const initial = user?.first_name
        ? user.first_name.charAt(0).toUpperCase()
        : user?.username
            ? user.username.charAt(0).toUpperCase()
            : "U";

    /*
     * Customers use the ShopLayout.
     * Managers and CEOs use the Inventory Layout.
     */
    const isStaff =
        user?.role === "manager" ||
        user?.role === "ceo";

    const content = (
        <>
            <Head title="My Profile" />

            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <div className="pr-root">

                {/* Header */}
                

                {/* Profile */}
                <main className="pr-main">
                    <div className="pr-card">

                        {/* Profile Banner */}
                        <div className="pr-banner">
                            <div className="pr-banner-inner">

                                <div className="pr-avatar">
                                    {initial}
                                </div>

                                <div>
                                    <h2>
                                        {user?.first_name || user?.username}

                                        {user?.last_name
                                            ? ` ${user.last_name}`
                                            : ""}
                                    </h2>

                                    <p>
                                        {user?.email ||
                                            "No email provided"}
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Account Information */}
                        <div className="pr-info">

                            <div className="pr-label">
                                Account Information
                            </div>

                            <div className="pr-grid">

                                <div>
                                    <div className="pr-field-lbl">
                                        Username
                                    </div>

                                    <div className="pr-field-val">
                                        {user?.username ||
                                            "Not provided"}
                                    </div>
                                </div>

                                <div>
                                    <div className="pr-field-lbl">
                                        Email
                                    </div>

                                    <div className="pr-field-val">
                                        {user?.email ||
                                            "Not provided"}
                                    </div>
                                </div>

                                <div>
                                    <div className="pr-field-lbl">
                                        First Name
                                    </div>

                                    <div className="pr-field-val">
                                        {user?.first_name ||
                                            "Not provided"}
                                    </div>
                                </div>

                                <div>
                                    <div className="pr-field-lbl">
                                        Last Name
                                    </div>

                                    <div className="pr-field-val">
                                        {user?.last_name ||
                                            "Not provided"}
                                    </div>
                                </div>

                                <div>
                                    <div className="pr-field-lbl">
                                        Account Type
                                    </div>

                                    <div className="pr-field-val capitalize">
                                        {user?.role || "Customer"}
                                    </div>
                                </div>

                                <div>
                                    <div className="pr-field-lbl">
                                        Member Since
                                    </div>

                                    <div className="pr-field-val">
                                        {user?.date_joined ||
                                            "Not available"}
                                    </div>
                                </div>

                            </div>

                            {/* Actions */}
                            <div className="pr-actions">

                                <Link
                                    href="/auth/profile/edit/"
                                    className="pr-btn-primary"
                                >
                                    Edit Profile
                                </Link>

                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </>
    );

    /*
     * Staff:
     *   manager / ceo → Inventory Layout
     *
     * Customer:
     *   customer → Shop Layout
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