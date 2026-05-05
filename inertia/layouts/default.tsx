import { Data } from '@generated/data'
import { toast, Toaster } from 'sonner'
import { usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const page = usePage()

  useEffect(() => {
    toast.dismiss()
  }, [page.url])

  useEffect(() => {
    if (children.props.flash.error) {
      toast.error(children.props.flash.error)
    }
    if (children.props.flash.success) {
      toast.success(children.props.flash.success)
    }
  })

  return (
    <>
      {children}
      <Toaster position="top-center" richColors />
    </>
  )
}
