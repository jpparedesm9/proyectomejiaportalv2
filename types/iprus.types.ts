export interface IPRUSFormData {
  numeroIdentificacion: string
  email: string
  tipoTramite: string
  telefono: string
  direccionCalle: string
  idParroquia: number
  barrioSector: string
  numeroLote: string
  claveCatastral: string
  escrituraAfavor: string
  fechaInscripcion: string
}

export interface IPRUSRequest {
  datos: IPRUSFormData
  archivos: File[]
}

export interface IPRUSResponse {
  success: boolean
  message: string
  data?: {
    solicitudId: string
    estado: string
    fechaCreacion: string
  }
  errorCode?: string
}

export interface Parroquia {
  id: number
  nombre: string
  canton?: string
}