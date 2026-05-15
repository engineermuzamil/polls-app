import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'

export default function ServerError() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden">
      {/* Red glow for errors */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(239,68,68,0.08)_0%,transparent_70%)] pointer-events-none" />

      <Link href="/" className="font-['Instrument_Serif',serif] text-xl text-white/35 mb-14 block">
        Polls
      </Link>

      <p
        className="font-['Instrument_Serif',serif] text-white/5 leading-none select-none mb-0"
        style={{ fontSize: 'clamp(80px, 18vw, 160px)', letterSpacing: -6 }}
      >
        500
      </p>

      <h1
        className="font-['Instrument_Serif',serif] text-white tracking-tight mb-2.5 -mt-3"
        style={{ fontSize: 'clamp(22px, 4vw, 32px)' }}
      >
        Something went wrong
      </h1>

      <p className="text-[15px] text-white/35 font-light max-w-[340px] leading-relaxed mb-9">
        An unexpected error occurred on the server. Try refreshing the page or come back in a
        moment.
      </p>

      <div className="flex gap-2.5">
        <Button
          onClick={() => window.location.reload()}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5"
        >
          Refresh page
        </Button>
        <Button
          variant="outline"
          asChild
          className="bg-white/5 border-white/8 text-white/45 hover:bg-white/8 hover:text-white/70 px-5"
        >
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  )
}
