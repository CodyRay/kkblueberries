import type { Metadata } from 'next'
import { getPhotosData } from '@/lib/data'
import PhotoGallery from '@/components/photo-gallery'

export const metadata: Metadata = {
  title: 'Photos',
}

export default function Photos() {
  const { photos } = getPhotosData()
  return (
    <div id="photos">
      <PhotoGallery photos={photos} basePath="/photos" />
    </div>
  )
}
