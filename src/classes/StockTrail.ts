export type StockTrail = {
  id: number
  stockId: string
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
  userId: number
  comments: string
  createdAt: Date
  updatedAt: Date
}

export type StockTrailObj = {
  stockTrails: StockTrail[]
  count: number
}
