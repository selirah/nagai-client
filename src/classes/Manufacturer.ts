import { Product } from './Product'

export type Manufacturer = {
  manufacturerId: number
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
  manufacturerId?: number
  name: string
  email: string
  phone: string
  coordinates: {
    lat: number
    lng: number
  }
  location: string
  logo: string
}
