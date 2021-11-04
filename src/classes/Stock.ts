import { Product } from './Product'
import { StockTrail } from './StockTrail'

export type Stock = {
  id: string
  productId: string
  sku: string
  unit: string
  unitPrice: number
  quantityPurchased: number
  quantityInStock: number
  stockValue: number
  reorderLevel: number
  reorderQuantity: number
  reorderDate: Date
  product: Product
  stockTrails: StockTrail[]
  comments: string
  createdAt: Date
  updatedAt: Date
}

export type StockObj = {
  stock: Stock[]
  count: number
}

export type StockFields = {
  id: string
  productId: string
  sku: string
  unit: string | any
  unitPrice: number | string
  quantityPurchased: number | string
  reorderLevel: number | string
  reorderQuantity: number | string
  reorderDate: Date | string
  comments: string
}

export type Unit = {
  id: number
  unit: string
  description: string
}

export type StockStats = {
  'Stock Quantity': string
  'Stock Value': string
  'Reorder Quantity': string
  'Product ID': string
}
