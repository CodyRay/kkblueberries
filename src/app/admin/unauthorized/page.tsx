import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unauthorized',
}

export default function UnauthorizedPage() {
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>Your GitHub account does not have write access to this repository.</p>
    </div>
  )
}
