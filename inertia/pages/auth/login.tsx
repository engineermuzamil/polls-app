import { Form } from '@adonisjs/inertia/react'
import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="field">
                <Label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="username"
                  placeholder="you@example.com"
                  data-invalid={errors.email ? 'true' : undefined}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '14px',
                    color: '#fff',
                    height: '40px',
                    outline: 'none',
                  }}
                  className="placeholder:text-white/20 focus-visible:border-indigo-500/50 focus-visible:ring-1 focus-visible:ring-indigo-500/20"
                />
                {errors.email && <div className="field-error">{errors.email}</div>}
              </div>

              <div className="field">
                <Label
                  htmlFor="password"
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '14px',
                    color: '#fff',
                    height: '40px',
                    outline: 'none',
                  }}
                  className="placeholder:text-white/20 focus-visible:border-indigo-500/50 focus-visible:ring-1 focus-visible:ring-indigo-500/20"
                />
                {errors.password && <div className="field-error">{errors.password}</div>}
              </div>

              <Button
                type="submit"
                style={{
                  width: '100%',
                  height: '44px',
                  background: '#6366f1',
                  color: '#fff',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  marginTop: '4px',
                  border: 'none',
                  cursor: 'pointer',
                }}
                className="hover:bg-[#5254cc] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(99,102,241,0.3)] transition-all"
              >
                Sign in →
              </Button>
            </div>
          )}
        </Form>

        <div className="auth-footer">
          Don't have an account? <Link href="/register">Sign up</Link>
        </div>
      </div>
    </div>
  )
}
