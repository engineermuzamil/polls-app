import { Form } from '@adonisjs/inertia/react'
import { Link } from '@inertiajs/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '14px',
  color: '#fff',
  height: '40px',
  outline: 'none',
}

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 500,
  color: 'rgba(255,255,255,0.5)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  marginBottom: '6px',
}

export default function Signup() {
  const [role, setRole] = useState<'voter' | 'admin'>('voter')

  return (
    <div className="auth-root auth-root-signup">
      <div className="auth-card">
        <Link href="/" className="auth-logo">
          Polls
        </Link>

        <h1 className="auth-heading">Create account</h1>
        <p className="auth-sub">Choose your role and fill in your details</p>

        {/* Role tabs — kept as plain CSS classes, no shadcn needed here */}
        <div className="role-tabs">
          <button
            type="button"
            onClick={() => setRole('voter')}
            className={`role-tab role-tab-voter ${role === 'voter' ? 'role-tab-active' : ''}`}
          >
            <span className="role-tab-icon">🗳️</span>
            Voter
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`role-tab role-tab-admin ${role === 'admin' ? 'role-tab-active' : ''}`}
          >
            <span className="role-tab-icon">⚙️</span>
            Admin
          </button>
        </div>

        <div className={`role-desc ${role === 'voter' ? 'role-desc-voter' : 'role-desc-admin'}`}>
          {role === 'voter'
            ? '🗳️ Voters can browse active polls and cast a single vote per poll.'
            : '⚙️ Admins create and manage polls, view all results, and control the trash.'}
        </div>

        <Form action="/register" method="post">
          {({ errors }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="hidden" name="role" value={role} />

              <div className="field">
                <Label htmlFor="fullName" style={labelStyle}>
                  Full name
                </Label>
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Jane Smith"
                  data-invalid={errors.fullName ? 'true' : undefined}
                  style={inputStyle}
                  className="placeholder:text-white/20 focus-visible:border-indigo-500/50 focus-visible:ring-1 focus-visible:ring-indigo-500/20"
                />
                {errors.fullName && <div className="field-error">{errors.fullName}</div>}
              </div>

              <div className="field">
                <Label htmlFor="email" style={labelStyle}>
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  data-invalid={errors.email ? 'true' : undefined}
                  style={inputStyle}
                  className="placeholder:text-white/20 focus-visible:border-indigo-500/50 focus-visible:ring-1 focus-visible:ring-indigo-500/20"
                />
                {errors.email && <div className="field-error">{errors.email}</div>}
              </div>

              <div className="field">
                <Label htmlFor="password" style={labelStyle}>
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  data-invalid={errors.password ? 'true' : undefined}
                  style={inputStyle}
                  className="placeholder:text-white/20 focus-visible:border-indigo-500/50 focus-visible:ring-1 focus-visible:ring-indigo-500/20"
                />
                {errors.password && <div className="field-error">{errors.password}</div>}
              </div>

              <Button
                type="submit"
                style={{
                  width: '100%',
                  height: '44px',
                  background: role === 'voter' ? '#10b981' : '#6366f1',
                  color: '#fff',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  marginTop: '4px',
                  border: 'none',
                  cursor: 'pointer',
                }}
                className={`transition-all hover:-translate-y-px ${
                  role === 'voter'
                    ? 'hover:bg-[#059669] hover:shadow-[0_6px_20px_rgba(16,185,129,0.3)]'
                    : 'hover:bg-[#5254cc] hover:shadow-[0_6px_20px_rgba(99,102,241,0.3)]'
                }`}
              >
                Create {role === 'admin' ? 'Admin' : 'Voter'} account →
              </Button>
            </div>
          )}
        </Form>

        <div className="auth-footer">
          Already have an account? <Link href="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
