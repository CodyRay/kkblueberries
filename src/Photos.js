import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Lightbox from './react-image-lightbox'
import './react-image-lightbox/style.css'
import './Photos.css'

import { photos } from './photos/photos.js'

class Photos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      photoIndex: 0,
      isOpen: false,
    }
  }

  render() {
    const { photoIndex, isOpen } = this.state
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
                    this.setState({ isOpen: true, photoIndex: i })
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
          <Lightbox
            mainSrc={photos[photoIndex].path}
            nextSrc={photos[(photoIndex + 1) % photos.length].path}
            prevSrc={
              photos[(photoIndex + photos.length - 1) % photos.length].path
            }
            enableZoom={true}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + photos.length - 1) % photos.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % photos.length,
              })
            }
          />
        )}
      </div>
    )
  }
}

export default Photos
