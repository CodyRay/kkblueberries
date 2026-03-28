import type { Metadata } from 'next'
import Link from 'next/link'
import { getBannerData, getProductsData, getHomeData, getFaqData, getPhotosData } from '@/lib/data'
import { Subheading } from '@/components/catalyst/heading'
import { Text } from '@/components/catalyst/text'
import BannerForm from './banner-form'
import ProductsForm from './products-form'
import HomeForm from './home-form'
import FaqForm from './faq-form'
import PhotosForm from './photos-form'

export const metadata: Metadata = {
  title: 'Admin',
}

const TABS = [
  {
    id: 'banners' as const,
    label: 'Banners',
    description: 'The announcement bars shown at the top of every page.',
    renderForm: () => <BannerForm {...getBannerData()} />,
  },
  {
    id: 'home' as const,
    label: 'Home',
    description: 'Content shown on the home page.',
    renderForm: () => <HomeForm upickPricePerPound={getHomeData().upickPricePerPound} />,
  },
  {
    id: 'faq' as const,
    label: 'FAQ',
    description: 'The information page content.',
    renderForm: () => <FaqForm items={getFaqData().items} />,
  },
  {
    id: 'products' as const,
    label: 'Products',
    description: 'Edit product names, descriptions, prices, and photos.',
    renderForm: () => <ProductsForm products={getProductsData().products} />,
  },
  {
    id: 'photos' as const,
    label: 'Photos',
    description: 'The photo gallery shown on the Photos page.',
    renderForm: () => <PhotosForm photos={getPhotosData().photos} />,
  },
]

function FormSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/60">
        <Subheading>{title}</Subheading>
        <Text className="mt-0.5">{description}</Text>
      </div>
      <div className="px-6 py-5">{children}</div>
    </section>
  )
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const activeTab = (TABS.find((t) => t.id === tab) ?? TABS[0]) as (typeof TABS)[number]

  return (
    <div>
      <div className="flex gap-1 bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-1 mb-5">
        {TABS.map((t) => (
          <Link
            key={t.id}
            href={`/admin?tab=${t.id}`}
            className={`flex-1 text-center text-sm font-medium py-2 rounded-lg transition-colors ${
              activeTab.id === t.id
                ? 'bg-[#2d4060] text-white shadow-sm'
                : 'text-grey-600 hover:text-grey-950 hover:bg-grey-100'
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <FormSection title={activeTab.label} description={activeTab.description}>
        {activeTab.renderForm()}
      </FormSection>
    </div>
  )
}
