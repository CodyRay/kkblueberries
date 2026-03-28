'use client'

import { useActionState, useState } from 'react'
import dynamic from 'next/dynamic'
import { saveBanner, type ActionResult } from './actions'
import { Button } from '@/components/catalyst/button'
import { SwitchField, Switch } from '@/components/catalyst/switch'
import { Label } from '@/components/catalyst/fieldset'
import { ResultMessage } from './ui'

const RichTextEditor = dynamic(() => import('./rich-text-editor'), { ssr: false })

function BannerSection({
  label,
  color,
  enabledName,
  contentName,
  defaultEnabled,
  defaultContent,
}: {
  label: string
  color: 'green' | 'yellow'
  enabledName: string
  contentName: string
  defaultEnabled: boolean
  defaultContent: string
}) {
  const [enabled, setEnabled] = useState(defaultEnabled)

  const accent = color === 'green'
    ? { border: 'border-l-4 border-green-500', badge: 'bg-green-50 text-green-800', dot: 'bg-green-500' }
    : { border: 'border-l-4 border-yellow-400', badge: 'bg-yellow-50 text-yellow-800', dot: 'bg-yellow-400' }

  return (
    <div className={`rounded-lg ring-1 ring-black/5 overflow-hidden ${accent.border}`}>
      <div className="px-4 py-3 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`inline-block size-2.5 rounded-full ${accent.dot}`} />
          <span className="font-medium text-grey-950">{label}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${accent.badge}`}>
            {enabled ? 'Visible' : 'Hidden'}
          </span>
        </div>
        <SwitchField>
          <Label className="sr-only">Show {label}</Label>
          <Switch
            color={color === 'green' ? 'green' : 'yellow'}
            checked={enabled}
            onChange={setEnabled}
          />
        </SwitchField>
      </div>
      <input type="hidden" name={enabledName} value={String(enabled)} />
      <div className="px-4 py-3 bg-grey-50 border-t border-black/5">
        <RichTextEditor name={contentName} defaultValue={defaultContent} />
      </div>
    </div>
  )
}

export default function BannerForm({
  statusEnabled,
  status,
  warningEnabled,
  warning,
}: {
  statusEnabled: boolean
  status: string
  warningEnabled: boolean
  warning: string
}) {
  const [result, action, pending] = useActionState<ActionResult | null, FormData>(
    saveBanner,
    null
  )

  return (
    <form action={action} className="space-y-3">
      <BannerSection
        label="Status"
        color="green"
        enabledName="statusEnabled"
        contentName="status"
        defaultEnabled={statusEnabled}
        defaultContent={status}
      />
      <BannerSection
        label="Warning"
        color="yellow"
        enabledName="warningEnabled"
        contentName="warning"
        defaultEnabled={warningEnabled}
        defaultContent={warning}
      />
      <ResultMessage result={result} />
      <Button type="submit" disabled={pending}>
        {pending ? 'Saving…' : 'Save Banners'}
      </Button>
    </form>
  )
}
