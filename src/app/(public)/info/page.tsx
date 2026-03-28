import type { Metadata } from 'next'
import { getFaqData } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Information',
}

export default function Info() {
  const { items } = getFaqData()

  return (
    <div id="about">
      {items.map((item) => (
        <div key={item.question}>
          <h1>{item.question}</h1>
          <div dangerouslySetInnerHTML={{ __html: item.answer }} />
        </div>
      ))}
    </div>
  )
}
