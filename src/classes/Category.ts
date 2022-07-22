import { Product } from './Product'

export type Category = {
  id: number
  category: string
  products: Product[]
  createdAt: Date
  updatedAt: Date
}
