import { Form } from '@adonisjs/inertia/react'
import { Link } from '@inertiajs/react'
import { useState } from 'react'

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
            <>
              <input type="hidden" name="role" value={role} />

              <div className="field">
                <label htmlFor="fullName">Full name</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Jane Smith"
                  data-invalid={errors.fullName ? 'true' : undefined}
                />
                {errors.fullName && <div className="field-error">{errors.fullName}</div>}
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
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
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  data-invalid={errors.password ? 'true' : undefined}
                />
                {errors.password && <div className="field-error">{errors.password}</div>}
              </div>

              <button
                type="submit"
                className={`submit-btn ${role === 'voter' ? 'submit-btn-voter' : 'submit-btn-admin'}`}
              >
                Create {role === 'admin' ? 'Admin' : 'Voter'} account →
              </button>
            </>
          )}
        </Form>

        <div className="auth-footer">
          Already have an account? <Link href="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
