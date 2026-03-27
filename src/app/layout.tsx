import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/navigation'
import ContactFooter from '@/components/contact-footer'
import CreditsModal from '@/components/credits-modal'
import Banner from '@/components/banner'
import { getBannerData } from '@/lib/data'

export const metadata: Metadata = {
  title: {
    default: 'Welcome to K & K Blueberries - U-Pick Blueberries in Hermiston, Oregon!',
    template: '%s | K & K Blueberries - U-Pick Blueberries in Hermiston, Oregon!',
  },
  description:
    'K & K Blueberries offers u-pick blueberries in Hermiston, Oregon, located in the pacific northwest',
  keywords:
    'blueberries, pick blueberries, u-pick, family blueberry farm, Hermiston blueberries, fun u-pick farms, berry farm pacific northwest, July blueberries, blueberry farm, Umatilla county farm, Minnehaha farm',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', rel: 'shortcut icon' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#2c405e' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-config': '/browserconfig.xml',
  },
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const banner = getBannerData()

  return (
    <html lang="en">
      <body>
        <div className="kk-body">
          <Navigation />
          <Banner status={banner.status} warning={banner.warning} />
          <div className="container kk-body-container">{children}</div>
          <ContactFooter />
          <footer className="kk-footer">
            <div className="container">
              <span>
                {'K & K Blueberries © '}
                {new Date().getFullYear()}
                {'. All Rights Reserved'}
              </span>
              <CreditsModal className="pull-right" />
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
