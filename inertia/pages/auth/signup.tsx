import { Form } from '@adonisjs/inertia/react'
import { Link } from '@inertiajs/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
            <span className="role-tab-icon">🗳️</span>Voter
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`role-tab role-tab-admin ${role === 'admin' ? 'role-tab-active' : ''}`}
          >
            <span className="role-tab-icon">⚙️</span>Admin
          </button>
        </div>

        <div className={`role-desc ${role === 'voter' ? 'role-desc-voter' : 'role-desc-admin'}`}>
          {role === 'voter'
            ? '🗳️ Voters can browse active polls and cast a single vote per poll.'
            : '⚙️ Admins create and manage polls, view all results, and control the trash.'}
        </div>

        <Form action="/register" method="post">
          {({ errors }) => (
            <div className="flex flex-col gap-4">
              <input type="hidden" name="role" value={role} />

              <div>
                <Label
                  htmlFor="fullName"
                  className="block text-[11px] font-medium text-white/50 uppercase tracking-widest mb-1.5"
                >
                  Full name
                </Label>
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Jane Smith"
                  data-invalid={errors.fullName ? 'true' : undefined}
                  className="bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-10"
                />
                {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="block text-[11px] font-medium text-white/50 uppercase tracking-widest mb-1.5"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  data-invalid={errors.email ? 'true' : undefined}
                  className="bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-10"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="block text-[11px] font-medium text-white/50 uppercase tracking-widest mb-1.5"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  data-invalid={errors.password ? 'true' : undefined}
                  className="bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-10"
                />
                {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                className={`w-full h-11 text-white font-medium rounded-lg transition-all hover:-translate-y-px mt-1 ${
                  role === 'voter'
                    ? 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-[0_6px_20px_rgba(16,185,129,0.3)]'
                    : 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-[0_6px_20px_rgba(99,102,241,0.3)]'
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
