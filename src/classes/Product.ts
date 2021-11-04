import { Stock } from './Stock'
import { Category } from './Category'
import { Manufacturer } from './Manufacturer'

export type Product = {
  id: string
  productName: string
  categoryId: number
  manufacturerId: number
  avatar: string
  stock: Stock[]
  category: Category
  manufacturer: Manufacturer
  createdAt: Date
  updatedAt: Date
}

export type ProductObj = {
  products: Product[]
  count: number
}

export type ProductFields = {
  id: string
  productName: string
  categoryId: number
  avatar?: string
  manufacturerId: number
}

export type ProductStats = {
  'Product Count': string
  Category: string
}
