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
            <div className="flex flex-col gap-4">
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
                  autoComplete="username"
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
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="bg-white/6 border-white/10 text-white placeholder:text-white/20 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-10"
                />
                {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-all hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(99,102,241,0.3)] mt-1"
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
