import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'

interface NavLink {
  label: string
  href: string
  active?: boolean
  variant?: 'ghost' | 'primary'
}

interface PageHeaderProps {
  userName?: string | null
  links?: NavLink[]
  titleHref?: string | null
}

export default function PageHeader({ userName, links = [], titleHref = '/' }: PageHeaderProps) {
  const titleClassName = "font-['Instrument_Serif',serif] text-[22px] text-white tracking-[-0.3px]"

  return (
    <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/8">
      {titleHref ? (
        <Link href={titleHref} className={titleClassName}>
          Polls
        </Link>
      ) : (
        <span className={titleClassName}>Polls</span>
      )}

      <div className="flex items-center gap-1">
        {links.map((link) =>
          link.variant === 'primary' ? (
            <Button
              key={link.href}
              asChild
              size="sm"
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-medium h-8 px-3.5 transition-colors"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ) : (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              size="sm"
              className={`text-[13px] font-normal h-8 px-3.5 transition-colors ${
                link.active ? 'text-white/80 hover:text-white' : 'text-white/40 hover:text-white/70'
              } hover:bg-white/6`}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          )
        )}

        {userName && (
          <>
            <span className="text-white/20 text-sm px-1">|</span>
            <span className="text-[13px] text-white/35 px-2">{userName}</span>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          asChild
          className="h-8 px-3.5 ml-2 text-[13px] text-white/70 bg-white/[0.03] border-white/10 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-200 transition-colors"
        >
          <Link href="/logout" method="post" as="button">
            Sign out
          </Link>
        </Button>
      </div>
    </div>
  )
}
