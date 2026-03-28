import './admin.css'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth'
import type { Session } from 'next-auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()

  if (!session) {
    redirect('/api/auth/signin')
  }

  const { hasWriteAccess } = session as Session & { hasWriteAccess?: boolean }
  if (!hasWriteAccess) {
    redirect('/unauthorized')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-[#2d4060] shadow-md">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="K & K Blueberries" className="h-8 w-auto" />
            <span className="text-white font-semibold tracking-wide">Content Management</span>
          </a>
          <a
            href="/api/auth/signout"
            className="text-sm text-blue-200 hover:text-white transition-colors"
          >
            Sign out
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-6">
        {children}
      </main>
    </div>
  )
}
