import '../globals.css'
import Navigation from '@/components/navigation'
import ContactFooter from '@/components/contact-footer'
import CreditsModal from '@/components/credits-modal'
import Banner from '@/components/banner'
import { getBannerData } from '@/lib/data'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const banner = getBannerData()

  return (
    <div className="kk-body">
      <Navigation />
      <Banner {...banner} />
      <div className="container kk-body-container">{children}</div>
      <ContactFooter />
      <footer className="kk-footer">
        <div className="container">
          <span>
            {'K & K Blueberries © '}
            {new Date().getFullYear()}
            {'. All Rights Reserved'}
          </span>
          <span className="pull-right">
            <a href="/admin" className="kk-footer-link">Admin</a>
            {' · '}
            <CreditsModal />
          </span>
        </div>
      </footer>
    </div>
  )
}
