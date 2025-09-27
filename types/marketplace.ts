export type SaleStatus = "pago_recibido" | "producto_entregado" | "finalizado"

export type PurchaseStatus = "pendiente" | "completado" | "disputa" | "en revision"

export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  description: string
  rating: number
  reviews: number
  category: string
  location: string
  condition: string
  seller: string
  inStock: boolean
  featured: boolean
  saleStatus?: SaleStatus
  purchaseStatus?: PurchaseStatus
  [key: string]: any
}

export interface ReferralForm {
  nombre: string
  direccionWallet: string
  codigoReferido: string
  validoHasta: string
}

export interface QRData {
  type: string
  amount?: string
  address?: string
  currency?: string
  recipient?: string
  fee?: string
  paymentMin?: string
  exchangeRate?: string
  rawData: string
}
