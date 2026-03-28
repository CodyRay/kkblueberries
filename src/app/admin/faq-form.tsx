'use client'

import { useActionState, useState } from 'react'
import dynamic from 'next/dynamic'
import { saveFaq, type ActionResult } from './actions'
import type { FaqItem } from '@/lib/data'
import { Button } from '@/components/catalyst/button'
import { Input } from '@/components/catalyst/input'
import { ResultMessage, RemoveButton, AddItemButton, FormCard } from './ui'

const RichTextEditor = dynamic(() => import('./rich-text-editor'), { ssr: false })

export default function FaqForm({ items: initialItems }: { items: FaqItem[] }) {
  const [items, setItems] = useState(initialItems)
  const [result, action, pending] = useActionState<ActionResult | null, FormData>(
    saveFaq,
    null
  )

  return (
    <form action={action}>
      <input type="hidden" name="count" value={items.length} />
      <div className="space-y-3">
        {items.map((item, i) => (
          <FormCard
            key={i}
            header={
              <>
                <Input
                  type="text"
                  name={`items[${i}].question`}
                  defaultValue={item.question}
                  required
                />
                <RemoveButton onClick={() => setItems(items.filter((_, j) => j !== i))} />
              </>
            }
          >
            <RichTextEditor name={`items[${i}].answer`} defaultValue={item.answer} />
          </FormCard>
        ))}
      </div>
      <AddItemButton onClick={() => setItems([...items, { question: '', answer: '' }])}>
        + Add question
      </AddItemButton>
      <ResultMessage result={result} />
      <div className="mt-6">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Save FAQ'}
        </Button>
      </div>
    </form>
  )
}
