import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

function readYaml<T>(filename: string): T {
  const filepath = path.join(process.cwd(), 'data', filename)
  return yaml.load(fs.readFileSync(filepath, 'utf8')) as T
}

export interface BannerData {
  status: string | null
  warning: string | null
}

export interface Photo {
  file: string
  alt: string
}

export interface PhotosData {
  photos: Photo[]
}

export interface Product {
  name: string
  description: string
  price: number
  photos: string[]
}

export interface ProductsData {
  products: Product[]
  photos: Photo[]
}

export function getBannerData(): BannerData {
  return readYaml<BannerData>('banner.yaml')
}

export function getPhotosData(): PhotosData {
  return readYaml<PhotosData>('photos.yaml')
}

export function getProductsData(): ProductsData {
  return readYaml<ProductsData>('products.yaml')
}
