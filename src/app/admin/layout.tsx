import { redirect } from 'next/navigation'
import { getServerSession, hasRepoWriteAccess } from '@/lib/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()

  if (!session) {
    redirect('/api/auth/signin')
  }

  const accessToken = (session as typeof session & { accessToken?: string }).accessToken
  if (!accessToken || !(await hasRepoWriteAccess(accessToken))) {
    redirect('/admin/unauthorized')
  }

  return <>{children}</>
}
