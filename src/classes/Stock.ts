import { Product, StockTrail } from 'classes'

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
