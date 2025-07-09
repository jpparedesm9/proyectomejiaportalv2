import { AuthService } from './auth.service'

export interface Tramite {
  trmId: number
  preId: number
  proId: number
  tipo: string
  estado: string
  fechaInicio: string
  fechaModificacion: string | null
  fechaFinalizacion: string | null
  valor: number | null
  observaciones: string
  fechaDePago: string | null
  reciboPago: string | null
}

export interface TramiteDetalle {
  tramite: Tramite
  documentos: any[]
  seguimientos: any[]
  propietario: any | null
  predio: any | null
  taskId: string | null
  nombreTareaActual: string | null
  estadoProceso: string
  datosEspecificos: any | null
}

export interface TramitesActivosResponse {
  exito: boolean
  mensaje: string
  data: TramiteDetalle[]
}

export class TramiteService {
  static async getActivosPorIdentificacion(numeroIdentificacion: string): Promise<TramitesActivosResponse> {
    const url = `http://localhost:8082/api/tramites/detalle/activos-por-identificacion?numeroIdentificacion=${numeroIdentificacion}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AuthService.getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Error al obtener trámites activos: ${response.status}`)
    }
    
    const data: TramitesActivosResponse = await response.json()
    return data
  }
}