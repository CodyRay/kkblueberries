import type { Metadata } from 'next'
import Image from 'next/image'
import { getProductsData } from '@/lib/data'
import Gallery from '@/components/gallery'

export const metadata: Metadata = {
  title: 'Products',
}

export default function Products() {
  const { products } = getProductsData()

  return (
    <div id="products">
      <div className="row kk-center-vertical text-center kk-grey">
        <div className="col-md-6 col-sm-6">
          <h3>K &amp; K Blueberries Products</h3>
          <p>
            All K &amp; K Blueberries products are made with simple ingredients.{' '}
            <strong>
              Available at the farm stand during u-pick hours and look for us at
              craft fairs and holiday bazaars!
            </strong>
          </p>
        </div>
        <div className="col-md-4 col-sm-6 kk-p-5">
          <Image
            width={266}
            height={200}
            className="img-responsive img-thumbnail"
            src="/assorted_products.jpg"
            alt="a box with assorted K and K Blueberries products"
          />
        </div>
      </div>

      {products.map((product) => (
        <div key={product.name} className="kk-product">
          <h3 className="lead">{product.name}</h3>
          <div className="kk-product-body">
            {product.description}{' '}
            <strong>${product.price}</strong>
          </div>
          <Gallery
            photos={[
              { file: product.frontImage, alt: product.frontImageAlt },
              { file: product.ingredientsImage, alt: product.ingredientsImageAlt },
            ]}
            basePath="/products"
            colClass="col-lg-4 col-sm-6 col-xs-8"
          />
        </div>
      ))}
    </div>
  )
}
