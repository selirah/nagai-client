import { Stock, Category, Manufacturer } from 'classes'

export type Product = {
  id: string
  productName: string
  categoryId: number
  manufacturerId: number
  stock: Stock[]
  category: Category
  manufacturer: Manufacturer
  createdAt: Date
  updatedAt: Date
}

export type QueryParam = {
  page: number
  skip: number
  category: number
  manufacturer: number
}

export type ProductObj = {
  products: Product[]
  count: number
}

export type ProductFields = {
  id: string
  productName: string
  categoryId: number
  manufacturerId: number
}
