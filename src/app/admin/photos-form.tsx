'use client'

import { useActionState, useState } from 'react'
import { savePhotos, type ActionResult } from './actions'
import type { Photo } from '@/lib/data'
import { Button } from '@/components/catalyst/button'
import { ResultMessage } from './ui'

type PhotoEntry = { filename: string; alt: string }

export default function PhotosForm({ photos: initialPhotos }: { photos: Photo[] }) {
  const [photos, setPhotos] = useState<PhotoEntry[]>(
    initialPhotos.map((p) => ({ filename: p.file, alt: p.alt }))
  )
  const [result, action, pending] = useActionState<ActionResult | null, FormData>(
    savePhotos,
    null
  )

  return (
    <form action={action}>
      <input type="hidden" name="count" value={photos.length} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <div key={i} className="rounded-lg overflow-hidden ring-1 ring-black/5 bg-white">
            <input type="hidden" name={`photos[${i}].filename`} value={photo.filename} />
            <div className="relative aspect-square bg-grey-100">
              {photo.filename ? (
                <img
                  src={`/photos/${photo.filename}`}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-3">
                  <input
                    type="file"
                    name={`photos[${i}].file`}
                    accept="image/*"
                    className="w-full text-xs text-grey-500 file:mr-2 file:rounded file:border-0 file:bg-grey-100 file:px-2 file:py-1 file:text-xs file:font-medium file:text-grey-700 hover:file:bg-grey-200"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors text-xs leading-none"
                aria-label="Remove photo"
              >
                ✕
              </button>
            </div>
            <div className="p-2">
              <input
                type="text"
                name={`photos[${i}].alt`}
                defaultValue={photo.alt}
                placeholder="Alt text"
                className="w-full rounded border border-grey-300 bg-white px-2 py-1 text-xs text-grey-950 placeholder:text-grey-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setPhotos([...photos, { filename: '', alt: '' }])}
          className="aspect-square rounded-lg border-2 border-dashed border-grey-300 text-sm text-grey-500 hover:border-grey-400 hover:text-grey-700 transition-colors flex items-center justify-center"
        >
          + Add photo
        </button>
      </div>

      <ResultMessage result={result} />
      <div className="mt-6">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Save Photos'}
        </Button>
      </div>
    </form>
  )
}
