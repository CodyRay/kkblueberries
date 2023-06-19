import React, { Component, useState } from 'react'
import Helmet from 'react-helmet'
import { ReactImageLightbox } from './react-image-lightbox/ReactImageLightbox'
import './react-image-lightbox/style.css'
import './Products.css'

import { photos, products } from './assets/products/products'
import assortedProducts from './assets/assorted_products.jpg'

function Product({ product }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const productPhotos = photos.filter(photo => product.photos.includes(photo.file))
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
                  setIsOpen(true)
                  setPhotoIndex(i)
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
        <ReactImageLightbox
          mainSrc={productPhotos[photoIndex].path}
          nextSrc={productPhotos[(photoIndex + 1) % productPhotos.length].path}
          prevSrc={
            productPhotos[(photoIndex + productPhotos.length - 1) % productPhotos.length].path
          }
          enableZoom={true}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + productPhotos.length - 1) % productPhotos.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % productPhotos.length)
          }
        />
      )}
    </div>
  )
}

function Products() {
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

export default Products
