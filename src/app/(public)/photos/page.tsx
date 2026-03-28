import type { Metadata } from 'next'
import { getPhotosData } from '@/lib/data'
import Gallery from '@/components/gallery'

export const metadata: Metadata = {
  title: 'Photos',
}

export default function Photos() {
  const { photos } = getPhotosData()
  return (
    <div id="photos">
      <Gallery photos={photos} basePath="/photos" colClass="col-lg-2 col-sm-3 col-xs-4" />
    </div>
  )
}
