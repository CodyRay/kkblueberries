import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

function readYaml<T>(filename: string): T {
  const filepath = path.join(process.cwd(), 'data', filename)
  return yaml.load(fs.readFileSync(filepath, 'utf8')) as T
}

export interface BannerData {
  statusEnabled: boolean
  status: string
  warningEnabled: boolean
  warning: string
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
  frontImage: string
  frontImageAlt: string
  ingredientsImage: string
  ingredientsImageAlt: string
}

export interface ProductsData {
  products: Product[]
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

export interface HomeData {
  upickPricePerPound: number
}

export function getHomeData(): HomeData {
  return readYaml<HomeData>('home.yaml')
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqData {
  items: FaqItem[]
}

export function getFaqData(): FaqData {
  return readYaml<FaqData>('faq.yaml')
}
