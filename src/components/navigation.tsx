'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
  return (
    <li role="presentation" className={isActive ? 'active' : undefined}>
      <Link href={href}>{children}</Link>
    </li>
  )
}

export default function Navigation() {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="container-fixed">
          <div className="navbar-header">
            <Link className="navbar-brand" href="/">
              <Image src="/logo.png" alt="K and K Blueberries" width={225} height={140} />
            </Link>
          </div>
          <div className="navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <NavLink href="/">
                <span className="kk-icon-lg-green icon-leaves" />
                Home
              </NavLink>
              <NavLink href="/info">
                <span className="kk-icon-lg-green icon-leaves" />
                Information
              </NavLink>
              <NavLink href="/photos">
                <span className="kk-icon-lg-green icon-leaves" />
                Photos
              </NavLink>
              <NavLink href="/products">
                <span className="kk-icon-lg-green icon-leaves" />
                Products
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
