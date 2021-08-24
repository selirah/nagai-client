export type Param = {
  id?: string | number
  page: number
  skip: number
  fromDate?: string | null | Date
  toDate?: string | null | Date
  query?: string
  category?: number
  manufacturer?: number
  region?: number
}
