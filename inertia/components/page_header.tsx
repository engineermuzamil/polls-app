import { Link } from '@inertiajs/react'

interface NavLink {
  label: string
  href: string
  active?: boolean
  variant?: 'ghost' | 'primary'
}

interface PageHeaderProps {
  userName?: string | null
  links?: NavLink[]
}

export default function PageHeader({ userName, links = [] }: PageHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 48,
        paddingBottom: 24,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span
        style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 22,
          color: '#fff',
          letterSpacing: '-0.3px',
        }}
      >
        Polls
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={
              link.variant === 'primary'
                ? {
                    background: '#6366f1',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 500,
                    padding: '7px 14px',
                    borderRadius: 7,
                    textDecoration: 'none',
                    transition: 'background 0.15s',
                  }
                : {
                    background: 'transparent',
                    color: link.active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
                    fontSize: 13,
                    fontWeight: 400,
                    padding: '7px 14px',
                    borderRadius: 7,
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                  }
            }
            className={link.variant === 'primary' ? 'hover:bg-indigo-600' : 'hover:text-white/70'}
          >
            {link.label}
          </Link>
        ))}

        {userName && (
          <>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', padding: '0 4px' }}>
              |
            </span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{userName}</span>
          </>
        )}

        <Link
          href="/logout"
          method="post"
          as="button"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.4)',
            borderRadius: 7,
            padding: '7px 14px',
            fontSize: 13,
            cursor: 'pointer',
            marginLeft: 4,
            transition: 'all 0.15s',
          }}
          className="hover:text-white/70 hover:bg-white/8"
        >
          Sign out
        </Link>
      </div>
    </div>
  )
}
