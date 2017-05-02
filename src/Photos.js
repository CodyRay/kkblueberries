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
        <p>
          Ut tincidunt placerat dolor, malesuada rhoncus est accumsan sit amet. Nullam sit amet erat id quam dapibus tempor quis in urna. Integer lacinia lobortis dolor vitae malesuada. Cras non tortor sed nisl auctor gravida sed sed dui. Nulla varius porttitor odio, nec laoreet ex gravida vel. Suspendisse id nibh cursus, rutrum ante sed, convallis diam. Quisque sollicitudin ultricies justo, quis bibendum ante semper semper.
        </p>
        {
          photos.map((photo, i) =>
            <a
              onClick={((e) => {
                e.preventDefault();
                this.setState({ isOpen: true, photoIndex: i })
              })}
              href={photo.path}>
              <img
                className="kk-thumbnail"
                src={photo.sizes.thumb}
                alt={photo.alt} />
            </a>)
        }
        {isOpen &&
          <Lightbox
            mainSrc={photos[photoIndex].path}
            nextSrc={photos[(photoIndex + 1) % photos.length].path}
            prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].path}
            enableZoom={false}
            imageCaption={photos[photoIndex].alt}

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