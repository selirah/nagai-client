import { Stock, Category, Manufacturer } from 'classes'

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
