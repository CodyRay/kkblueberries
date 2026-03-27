import type { Metadata } from 'next'
import Image from 'next/image'
import { getProductsData } from '@/lib/data'
import ProductGallery from '@/components/product-gallery'
import type { Photo } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Products',
}

export default function Products() {
  const { products, photos: allPhotos } = getProductsData()

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

      {products.map((product) => {
        const productPhotos: Photo[] = product.photos
          .map((filename) => allPhotos.find((p) => p.file === filename))
          .filter((p): p is Photo => p !== undefined)

        return (
          <div key={product.name} className="kk-product">
            <h3 className="lead">{product.name}</h3>
            <div className="kk-product-body">
              {product.description}
              <strong>${product.price}</strong>
            </div>
            <ProductGallery photos={productPhotos} />
          </div>
        )
      })}
    </div>
  )
}
