export interface PrediosResponse {
  exito: boolean
  mensaje: string
  data: string[]
}

export interface Predio {
  claveCatastral: string
  seleccionado?: boolean
}