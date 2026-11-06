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

  .lg-root {
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
  .lg-root::before {
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

  .lg-card {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 420px;
    background: #fff;
    border-radius: 16px;
    padding: 44px 40px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.35);
  }

  .lg-badge {
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
  .lg-badge span {
    font-family: 'Playfair Display', serif;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
  }

  .lg-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--ink);
    text-align: center;
    margin-bottom: 6px;
  }
  .lg-sub {
    font-size: 13px;
    color: var(--muted);
    text-align: center;
    margin-bottom: 32px;
    font-weight: 300;
  }

  .lg-field { margin-bottom: 20px; }
  .lg-field label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: var(--mid);
    margin-bottom: 8px;
  }
  .lg-field input {
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
  .lg-field input:focus {
    outline: none;
    border-color: var(--ox);
    box-shadow: 0 0 0 3px rgba(107,26,26,0.1);
  }
  .lg-error {
    font-size: 12px;
    color: var(--ox);
    margin-top: 6px;
    font-weight: 500;
  }
  .lg-error-center { text-align: center; margin-bottom: 20px; }

  .lg-submit-btn {
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
  .lg-submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(107,26,26,0.4); }
  .lg-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .lg-forgot-row { text-align: right; margin-top: 16px; }
  .lg-forgot-link {
    font-size: 12px;
    font-weight: 600;
    color: var(--ox);
    text-decoration: none;
    transition: color .2s;
  }
  .lg-forgot-link:hover { color: var(--ox-dark); text-decoration: underline; }

  .lg-footer {
    text-align: center;
    font-size: 13px;
    color: var(--muted);
    margin-top: 28px;
  }
  .lg-footer a {
    color: var(--ox);
    font-weight: 700;
    text-decoration: none;
  }
  .lg-footer a:hover { text-decoration: underline; }
`;

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/auth/login/");
    };

    return (
        <>
            <Head title="Login" />
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <div className="lg-root">
                <div className="lg-card">

                    <div className="lg-badge">
                        <span>GO</span>
                    </div>

                    <h1 className="lg-title">Welcome Back</h1>
                    <p className="lg-sub">Sign in to your account</p>

                    <form onSubmit={submit}>
                        <div className="lg-field">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData("username", e.target.value)}
                                placeholder="Enter your username"
                            />
                            {errors.username && <p className="lg-error">{errors.username}</p>}
                        </div>

                        <div className="lg-field">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className="lg-error">{errors.password}</p>}
                        </div>

                        {errors.login && (
                            <div className="lg-error-center">
                                <p className="lg-error">{errors.login}</p>
                            </div>
                        )}

                        <button type="submit" disabled={processing} className="lg-submit-btn">
                            {processing ? "Signing in..." : "Sign In"}
                        </button>

                        <div className="lg-forgot-row">
                            <a href="/auth/forgot-password/" className="lg-forgot-link">
                                Forgot your password?
                            </a>
                        </div>
                    </form>

                    <p className="lg-footer">
                        Don't have an account?{" "}
                        <a href="/auth/register/">Register</a>
                    </p>
                </div>
            </div>
        </>
    );
}