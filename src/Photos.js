import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Lightbox from 'react-image-lightbox';
import './Photos.css'

import photos from './photos/photos.js'

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false
    };
  }

  render() {
    const { photoIndex, isOpen } = this.state;
    return (
      <div id="photos">
        <Helmet>
          <title>Photos of</title>
        </Helmet>
        <div className="row" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
          {
            photos.map((photo, i) =>
              <div
                key={photo.key}
                className="col-lg-2 col-sm-3 col-xs-4"
                style={{ padding: '5px' }}
              >
                <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
                  <a
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%'
                    }}
                    onClick={((e) => {
                      e.preventDefault();
                      this.setState({ isOpen: true, photoIndex: i })
                    })}
                    href={photo.path}>
                    <img
                      width='200px'
                      height='200px'
                      className="img-thumbnail img-responsive"
                      src={photo.sizes.thumb}
                      alt={photo.alt} />
                  </a>
                </div>
              </div>)
          }
        </div>
        {isOpen &&
          <Lightbox
            mainSrc={photos[photoIndex].path}
            nextSrc={photos[(photoIndex + 1) % photos.length].path}
            prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].path}
            enableZoom={false}

            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() => this.setState({
              photoIndex: (photoIndex + photos.length - 1) % photos.length,
            })}
            onMoveNextRequest={() => this.setState({
              photoIndex: (photoIndex + 1) % photos.length,
            })}
          />
        }
      </div>
    );
  }
}

export default Photos;