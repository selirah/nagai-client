import { Product } from './Product'

export type Manufacturer = {
  id: number
  name: string
  email: string
  phone: string
  coordinates: {
    lat: number
    lng: number
  }
  location: string
  logo: string
  products: Product[]
  createdAt: Date
  updatedAt: Date
}

export type ManufacturerFields = {
  id?: number
  name: string
  email: string
  phone: string
  coordinates: {
    lat: string
    lng: string
  }
  location: string
  logo: string
}

export type ManufacturerStats = {
  'Product Count': '1'
  Manufacturer: 'Voltic Ghana Ltd'
}
