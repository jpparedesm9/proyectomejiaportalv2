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

export interface PropietarioData {
  nombres: string
  apellidos: string
  correo: string | null
  numeroIdentificacion: string
  telefonoUno: string
}

export interface PropietarioResponse {
  exito: boolean
  mensaje: string
  data: PropietarioData
}

export interface PredioData {
  claveCatastral: string
  numeroPredio: string | null
  calles: string
  nombreBarrio: string
  numeroLote: string | null
  nombreParroquia: string
  idParroquia: number
}

export interface PredioResponse {
  exito: boolean
  mensaje: string
  data: PredioData
}

export interface TramiteDetalleCompleto {
  tramite: Tramite
  documentos: Array<{
    docId: number
    nombreOriginal: string
    referenceId: string
    fechaSubida: string
  }>
  seguimientos: any[]
  propietario: {
    nombres: string
    apellidos: string
    correo: string | null
    numeroIdentificacion: string
    telefonoUno: string
  }
  predio: {
    claveCatastral: string
    numeroPredio: string | null
    calles: string
    nombreBarrio: string
    numeroLote: string | null
    nombreParroquia: string
    idParroquia: number
  }
  taskId: string | null
  nombreTareaActual: string | null
  estadoProceso: string
  datosEspecificos: {
    tipoSolicitud: string | null
    fechaInscripcion: string
  }
}

export interface TramiteDetalleResponse {
  exito: boolean
  mensaje: string
  data: TramiteDetalleCompleto
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

  static async getPropietarioPorIdentificacion(numeroIdentificacion: string): Promise<PropietarioResponse> {
    const url = `http://localhost:8082/api/tramites/obtenerPropietarioPorNumeroIdentificacion?numeroIdentificacion=${numeroIdentificacion}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AuthService.getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Error al obtener propietario: ${response.status}`)
    }
    
    const data: PropietarioResponse = await response.json()
    return data
  }

  static async getPredioPorClave(claveCatastral: string): Promise<PredioResponse> {
    const url = `http://localhost:8082/api/tramites/obtenerPredioPorClave?claveCatastral=${claveCatastral}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AuthService.getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Error al obtener predio: ${response.status}`)
    }
    
    const data: PredioResponse = await response.json()
    return data
  }

  static async getTramiteDetalle(tramiteId: number): Promise<TramiteDetalleResponse> {
    const url = `http://localhost:8082/api/tramites/${tramiteId}/detalle`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AuthService.getToken()}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Error al obtener detalle del trámite: ${response.status}`)
    }
    
    const data: TramiteDetalleResponse = await response.json()
    return data
  }
}