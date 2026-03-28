'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { Photo } from '@/lib/data'

interface GalleryProps {
  photos: Photo[]
  basePath: string
  colClass: string
}

export default function Gallery({ photos, basePath, colClass }: GalleryProps) {
  const [index, setIndex] = useState(-1)

  const slides = photos.map((p) => ({
    src: `${basePath}/${p.file}`,
    alt: p.alt,
  }))

  return (
    <>
      <div className="row kk-photo-gallery">
        {photos.map((photo, i) => (
          <div key={photo.file} className={colClass}>
            <div>
              <a
                href={`${basePath}/${photo.file}`}
                onClick={(e) => {
                  e.preventDefault()
                  setIndex(i)
                }}
              >
                <Image
                  src={`${basePath}/${photo.file}`}
                  alt={photo.alt}
                  fill
                  className="img-thumbnail"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 33vw, (max-width: 992px) 16vw, 12vw"
                />
              </a>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </>
  )
}
