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

  .rg-root {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107,26,26,0.08) 0%, transparent 60%), var(--ink);
    position: relative;
    overflow: hidden;
  }
  .rg-root::before {
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

  .rg-card {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 460px;
    background: #fff;
    border-radius: 16px;
    padding: 44px 40px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.35);
  }

  .rg-badge {
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
  .rg-badge span {
    font-family: 'Playfair Display', serif;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
  }

  .rg-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--ink);
    text-align: center;
    margin-bottom: 6px;
  }
  .rg-sub {
    font-size: 13px;
    color: var(--muted);
    text-align: center;
    margin-bottom: 32px;
    font-weight: 300;
  }

  .rg-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
  }
  @media(max-width:400px){ .rg-row-2 { grid-template-columns: 1fr; gap: 0; } }

  .rg-field { margin-bottom: 20px; }
  .rg-field label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: var(--mid);
    margin-bottom: 8px;
  }
  .rg-field input {
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
  .rg-field input:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }
  .rg-error {
    font-size: 12px;
    color: var(--ox);
    margin-top: 6px;
    font-weight: 500;
  }
  .rg-error-center { text-align: center; margin-bottom: 20px; }

  .rg-submit-btn {
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
  .rg-submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }
  .rg-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .rg-footer {
    text-align: center;
    font-size: 13px;
    color: var(--muted);
    margin-top: 28px;
  }
  .rg-footer a {
    color: var(--ox);
    font-weight: 700;
    text-decoration: none;
  }
  .rg-footer a:hover { text-decoration: underline; }
`;

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/auth/register/");
    };

    return (
        <>
            <Head title="Register" />
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <div className="rg-root">
                <div className="rg-card">

                    <div className="rg-badge">
                        <span>GO</span>
                    </div>

                    <h1 className="rg-title">Create Account</h1>
                    <p className="rg-sub">Register for an account</p>

                    <form onSubmit={submit}>

                        {/* First / Last Name */}
                        <div className="rg-row-2">
                            <div className="rg-field" style={{ marginBottom: 0 }}>
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    id="first_name"
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) => setData("first_name", e.target.value)}
                                    placeholder="Enter your first name"
                                />
                                {errors.first_name && <p className="rg-error">{errors.first_name}</p>}
                            </div>

                            <div className="rg-field" style={{ marginBottom: 0 }}>
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    id="last_name"
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) => setData("last_name", e.target.value)}
                                    placeholder="Enter your last name"
                                />
                                {errors.last_name && <p className="rg-error">{errors.last_name}</p>}
                            </div>
                        </div>

                        {/* Username */}
                        <div className="rg-field">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData("username", e.target.value)}
                                placeholder="Choose a username"
                            />
                            {errors.username && <p className="rg-error">{errors.username}</p>}
                        </div>

                        {/* Email */}
                        <div className="rg-field">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="rg-error">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="rg-field">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                placeholder="Create a password"
                            />
                            {errors.password && <p className="rg-error">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="rg-field">
                            <label htmlFor="password_confirmation">Confirm Password</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                placeholder="Confirm your password"
                            />
                            {errors.password_confirmation && (
                                <p className="rg-error">{errors.password_confirmation}</p>
                            )}
                        </div>

                        {/* General Error */}
                        {errors.register && (
                            <div className="rg-error-center">
                                <p className="rg-error">{errors.register}</p>
                            </div>
                        )}

                        <button type="submit" disabled={processing} className="rg-submit-btn">
                            {processing ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="rg-footer">
                        Already have an account?{" "}
                        <a href="/auth/login/">Sign In</a>
                    </p>
                </div>
            </div>
        </>
    );
}