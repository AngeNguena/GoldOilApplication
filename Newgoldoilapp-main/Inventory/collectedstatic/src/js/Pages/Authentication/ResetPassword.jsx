import React from "react";
import { Head, useForm } from "@inertiajs/react";

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

  .rp-root {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107,26,26,0.08) 0%, transparent 60%), var(--ink);
    position: relative;
    overflow: hidden;
  }
  .rp-root::before {
    content: 'GOLD';
    position: absolute;
    left: -20px;
    bottom: -40px;
    font-family: 'Playfair Display', serif;
    font-size: 220px;
    font-weight: 700;
    color: rgba(255,255,255,0.02);
    line-height: 1;
    user-select: none;
    pointer-events: none;
  }

  .rp-card {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 420px;
    background: #fff;
    border-radius: 16px;
    padding: 44px 40px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.35);
  }

  .rp-badge {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    box-shadow: 0 6px 18px rgba(107,26,26,0.35);
  }
  .rp-badge svg { width: 22px; height: 22px; color: #fff; }

  .rp-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--ink);
    text-align: center;
    margin-bottom: 10px;
  }
  .rp-sub {
    font-size: 13px;
    color: var(--muted);
    text-align: center;
    margin-bottom: 32px;
    font-weight: 300;
  }

  .rp-field { margin-bottom: 20px; }
  .rp-field label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: var(--mid);
    margin-bottom: 8px;
  }
  .rp-field input {
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
  .rp-field input:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }
  .rp-error {
    font-size: 12px;
    color: var(--ox);
    margin-top: 6px;
    font-weight: 500;
  }
  .rp-error-center { text-align: center; margin-bottom: 20px; }

  .rp-submit-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, var(--ox) 0%, var(--ox-dark) 100%);
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.02em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(107,26,26,0.3);
    transition: transform .2s, box-shadow .2s, opacity .2s;
  }
  .rp-submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }
  .rp-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export default function ResetPassword({ uidb64, token }) {
    const { data, setData, post, processing, errors } = useForm({
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/auth/reset-password/${uidb64}/${token}/`);
    };

    return (
        <>
            <Head title="Reset Password" />
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <div className="rp-root">
                <div className="rp-card">

                    <div className="rp-badge">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <h1 className="rp-title">Reset Password</h1>
                    <p className="rp-sub">Enter your new password below.</p>

                    <form onSubmit={submit}>

                        {/* New Password */}
                        <div className="rp-field">
                            <label htmlFor="password">New Password</label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                placeholder="Enter your new password"
                                required
                            />
                            {errors.password && <p className="rp-error">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="rp-field">
                            <label htmlFor="password_confirmation">Confirm New Password</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                placeholder="Confirm your new password"
                                required
                            />
                            {errors.password_confirmation && (
                                <p className="rp-error">{errors.password_confirmation}</p>
                            )}
                        </div>

                        {/* General Error */}
                        {errors.password_reset && (
                            <div className="rp-error-center">
                                <p className="rp-error">{errors.password_reset}</p>
                            </div>
                        )}

                        <button type="submit" disabled={processing} className="rp-submit-btn">
                            {processing ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}