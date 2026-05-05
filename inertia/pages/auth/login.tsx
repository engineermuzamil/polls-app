import { Form } from '@adonisjs/inertia/react'
import { Link } from '@inertiajs/react'

export default function Login() {
  return (
    <div className="auth-root auth-root-login">
      <div className="auth-card">
        <Link href="/" className="auth-logo">
          Polls
        </Link>

        <h1 className="auth-heading">Welcome back</h1>
        <p className="auth-sub">Sign in to your account to continue</p>

        <Form action="/login" method="post">
          {({ errors }) => (
            <>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="username"
                  placeholder="you@example.com"
                  data-invalid={errors.email ? 'true' : undefined}
                />
                {errors.email && <div className="field-error">{errors.email}</div>}
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
                {errors.password && <div className="field-error">{errors.password}</div>}
              </div>

              <button type="submit" className="submit-btn">
                Sign in →
              </button>
            </>
          )}
        </Form>

        <div className="auth-footer">
          Don't have an account? <Link href="/register">Sign up</Link>
        </div>
      </div>
    </div>
  )
}
