'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { Photo } from '@/lib/data'

interface ProductGalleryProps {
  photos: Photo[]
}

export default function ProductGallery({ photos }: ProductGalleryProps) {
  const [index, setIndex] = useState(-1)

  const slides = photos.map((p) => ({
    src: `/products/${p.file}`,
    alt: p.alt,
  }))

  return (
    <>
      <div className="row kk-product-gallery">
        {photos.map((photo, i) => (
          <div key={photo.file} className="col-lg-4 col-sm-6 col-xs-8">
            <div>
              <a
                href={`/products/${photo.file}`}
                onClick={(e) => {
                  e.preventDefault()
                  setIndex(i)
                }}
              >
                <Image
                  src={`/products/${photo.file}`}
                  alt={photo.alt}
                  fill
                  className="img-thumbnail"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 66vw, (max-width: 992px) 33vw, 25vw"
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
