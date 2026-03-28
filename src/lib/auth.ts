import { getServerSession as nextAuthGetServerSession } from 'next-auth'
import type { NextAuthOptions, Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import GitHubProvider from 'next-auth/providers/github'
import { REPO_OWNER, REPO_NAME } from '@/lib/constants'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: 'public_repo' } },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return `${baseUrl}/admin`
    },
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token
        token.hasWriteAccess = await checkRepoWriteAccess(account.access_token)
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const s = session as Session & { accessToken?: string; hasWriteAccess?: boolean }
      s.accessToken = token.accessToken as string | undefined
      s.hasWriteAccess = token.hasWriteAccess as boolean | undefined
      return session
    },
  },
}

export function getServerSession() {
  return nextAuthGetServerSession(authOptions)
}

async function checkRepoWriteAccess(accessToken: string): Promise<boolean> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
      },
    }
  )
  if (!res.ok) return false
  const data = await res.json()
  return data.permissions?.push === true
}
