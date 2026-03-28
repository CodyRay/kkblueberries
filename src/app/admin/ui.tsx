'use client'

import type { ActionResult } from './actions'

export function FormCard({
  label,
  accentClass = 'border-grey-400',
  header,
  children,
}: {
  label?: string
  accentClass?: string
  header?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className={`rounded-lg ring-1 ring-black/5 overflow-hidden border-l-4 ${accentClass}`}>
      {(label || header) && (
        <div className="px-4 py-3 bg-white flex items-center justify-between gap-2">
          {label && <span className="text-sm font-medium text-grey-950">{label}</span>}
          {header}
        </div>
      )}
      <div className="px-4 py-3 bg-grey-50 border-t border-black/5">{children}</div>
    </div>
  )
}

export function ResultMessage({ result }: { result: ActionResult | null }) {
  if (!result) return null
  return (
    <p className={`mt-4 text-sm ${result.success ? 'text-green-600' : 'text-red-600'}`}>
      {result.success ? 'Saved successfully.' : `Error: ${result.error}`}
    </p>
  )
}

export function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-md border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 hover:text-red-800 transition-colors shadow-sm"
    >
      Remove
    </button>
  )
}

export function AddItemButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 w-full rounded-lg border-2 border-dashed border-grey-300 py-2.5 text-sm text-grey-500 hover:border-grey-400 hover:text-grey-700 transition-colors"
    >
      {children}
    </button>
  )
}
