import type { Metadata, Viewport } from 'next'

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
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
