import React, { useState } from 'react'
import Helmet from 'react-helmet'
import { ReactImageLightbox } from './react-image-lightbox/ReactImageLightbox'
import './react-image-lightbox/style.css'
import './Photos.css'

import { photos } from './assets/photos/photos'

function Photos() {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div id="photos">
      <Helmet>
        <title>Photos of</title>
      </Helmet>
      <div className="row kk-photo-gallery">
        {photos.map((photo, i) => (
          <div key={photo.key} className="col-lg-2 col-sm-3 col-xs-4">
            {/*Extra div helps the page from jumping when images are loaded*/}
            <div>
              <a
                href={photo.path}
                onClick={(e) => {
                  e.preventDefault()
                  setIsOpen(true)
                  setPhotoIndex(i)
                }}
              >
                <img
                  width="200px"
                  height="200px"
                  className="img-thumbnail img-responsive"
                  src={photo.sizes.thumb}
                  alt={photo.alt}
                />
              </a>
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <ReactImageLightbox
          mainSrc={photos[photoIndex].path}
          nextSrc={photos[(photoIndex + 1) % photos.length].path}
          prevSrc={
            photos[(photoIndex + photos.length - 1) % photos.length].path
          }
          enableZoom={true}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + photos.length - 1) % photos.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % photos.length)
          }
        />
      )}
    </div>
  )
}

export default Photos
