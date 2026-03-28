'use client'

import { useActionState } from 'react'
import { saveHome, type ActionResult } from './actions'
import { Button } from '@/components/catalyst/button'
import { Field, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { ResultMessage, FormCard } from './ui'

export default function HomeForm({
  upickPricePerPound,
}: {
  upickPricePerPound: number
}) {
  const [result, action, pending] = useActionState<ActionResult | null, FormData>(
    saveHome,
    null
  )

  return (
    <form action={action}>
      <div className="space-y-3">
        <FormCard label="U-Pick Price">
          <Field>
            <Label>Price per pound ($)</Label>
            <Input
              type="number"
              name="upickPricePerPound"
              defaultValue={upickPricePerPound}
              step={0.01}
              min={0}
              required
            />
          </Field>
        </FormCard>
      </div>
      <ResultMessage result={result} />
      <div className="mt-6">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Save Home'}
        </Button>
      </div>
    </form>
  )
}
