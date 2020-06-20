import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Lightbox from './react-image-lightbox'
import './react-image-lightbox/style.css'
import './Products.css'

import { photos, products } from './products/products.js'
import assortedProducts from './assorted_products.jpg'

class Product extends Component {
  constructor(props) {
    super(props)

    this.state = {
      photoIndex: 0,
      isOpen: false,
    }
  }

  render() {
    const { product } = this.props;
    const productPhotos = photos.filter(photo => product.photos.includes(photo.file))
    const { photoIndex, isOpen } = this.state
    return (
      <div className="kk-product">
        <h3 className="lead">{product.name}</h3>
        <div className="kk-product-body">
          {product.description}
          <strong>${product.price}</strong>
        </div>
        <div className="row kk-product-gallery">
          {productPhotos.map((photo, i) => (
            <div key={photo.key} className="col-lg-4 col-sm-6 col-xs-8">
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
                    width="400px"
                    height="532px"
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
            mainSrc={productPhotos[photoIndex].path}
            nextSrc={productPhotos[(photoIndex + 1) % productPhotos.length].path}
            prevSrc={
              productPhotos[(photoIndex + productPhotos.length - 1) % productPhotos.length].path
            }
            enableZoom={true}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + productPhotos.length - 1) % productPhotos.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % productPhotos.length,
              })
            }
          />
        )}
      </div>
    )
  }
}

class Products extends Component {
  render() {
    return (
      <div id="products">
        <Helmet>
          <title>Products of</title>
        </Helmet>
        <div className="row kk-center-vertical text-center kk-grey">
          <div className="col-md-6 col-sm-6 ">
            <h3>{'K & K'} Blueberries Products</h3>
            <p>
              All {'K & K'} Blueberries products are made with simple ingredients.{' '}
              <strong>Available at the farm stand during u-pick hours and look
              for us at craft fairs and holiday bazaars!</strong>
            </p>
          </div>
          <div className="col-md-4 col-sm-6 kk-p-5">
            <img
              width="266"
              height="200"
              className="img-responsive img-thumbnail"
              src={assortedProducts}
              alt="a box with assorted K and K Blueberries products"
            />
          </div>
        </div>
        {products.map((product, idx) => (
          <Product key={idx} product={product} />
        ))}
      </div>
    )
  }
}

export default Products
