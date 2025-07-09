"use client"
import { useState, useEffect } from "react"
import {
  Building2,
  MapPin,
  Map,
  FileImage,
  ConstructionIcon as Construction,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Home,
  RefreshCw,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PredioSelectionModal from "@/components/PredioSelectionModal"
import { AuthService } from "@/services/auth.service"
import { PredioService } from "@/services/predio.service"
import { getServiceUrl } from "@/config/api.config"
import { PrediosResponse } from "@/types/predios.types"
import { useToast } from "@/components/ui/use-toast"
import { TramiteService, TramiteDetalle } from "@/services/tramite.service"

export default function ServicesSection() {
  const router = useRouter()
  const authContext = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("ciudadanos")
  
  // Verificar si hay parámetro de tab en la URL y cargar predio seleccionado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const tabParam = urlParams.get('tab')
      if (tabParam === 'mis-tramites') {
        setActiveTab('mis-tramites')
      }
      
      // Cargar predio seleccionado del localStorage
      const savedPredio = PredioService.getSelectedPredio()
      if (savedPredio) {
        setSelectedPredio(savedPredio)
        console.log('Loaded saved predio from localStorage:', savedPredio)
      }
    }
  }, [])
  const [selectedPredio, setSelectedPredio] = useState<string | null>(null)
  const [showPredioModal, setShowPredioModal] = useState(false)
  const [predios, setPredios] = useState<string[]>([])
  const [loadingPredios, setLoadingPredios] = useState(false)
  const [prediosError, setPrediosError] = useState<string | null>(null)
  const [hasCheckedPredios, setHasCheckedPredios] = useState(false)
  const [userTramites, setUserTramites] = useState<TramiteDetalle[]>([])
  const [loadingTramites, setLoadingTramites] = useState(false)
  const [tramitesError, setTramitesError] = useState<string | null>(null)
  const [showDebtModal, setShowDebtModal] = useState(false)
  const [hasShownDebtModal, setHasShownDebtModal] = useState(false)
  
  // Key para localStorage para rastrear si se ha mostrado el modal de deudas
  const DEBT_MODAL_SHOWN_KEY = 'debtModalShown'
  
  // Datos de ejemplo para los trámites del usuario
  const userTramitesExample = [
    {
      id: "TR-2024-001",
      tipo: "IPRUS",
      descripcion: "Informe Previo de Regulación Urbana de Suelo",
      fechaInicio: "2024-12-15",
      estado: "en_proceso",
      progreso: 65,
      proximaAccion: "Revisión técnica pendiente"
    },
    {
      id: "TR-2024-002",
      tipo: "CUSAC",
      descripcion: "Certificado de Uso de Suelo para Actividades Comerciales",
      fechaInicio: "2024-12-10",
      estado: "completado",
      progreso: 100,
      proximaAccion: "Disponible para descarga"
    },
    {
      id: "TR-2024-003",
      tipo: "Registro de Planos",
      descripcion: "Registro de Planos Arquitectónicos",
      fechaInicio: "2024-12-20",
      estado: "pendiente",
      progreso: 25,
      proximaAccion: "Esperando documentación adicional"
    },
    {
      id: "TR-2023-158",
      tipo: "ICUS",
      descripcion: "Informe de Compatibilidad de Uso de Suelo",
      fechaInicio: "2023-11-28",
      estado: "rechazado",
      progreso: 0,
      proximaAccion: "Requiere nueva solicitud"
    }
  ]
  
  const getEstadoBadge = (estado: string) => {
    const estadoLower = estado.toLowerCase()
    switch (estadoLower) {
      case "en_proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">En Proceso</Badge>
      case "completado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completado</Badge>
      case "pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pendiente</Badge>
      case "rechazado":
        return <Badge variant="destructive">Rechazado</Badge>
      case "ingresado":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ingresado</Badge>
      case "aprobado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Aprobado</Badge>
      case "en_revision":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">En Revisión</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }
  
  const getEstadoIcon = (estado: string) => {
    const estadoLower = estado.toLowerCase()
    switch (estadoLower) {
      case "en_proceso":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "completado":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pendiente":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "rechazado":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case "ingresado":
        return <FileText className="w-4 h-4 text-purple-600" />
      case "aprobado":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "en_revision":
        return <Clock className="w-4 h-4 text-blue-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }
  
  const handleCardClick = (title: string) => {
    if (!selectedPredio) {
      toast({
        title: "Predio requerido",
        description: "Debe seleccionar un predio antes de continuar con el trámite",
        variant: "destructive"
      })
      setShowPredioModal(true)
      return
    }
    
    if (title.includes("IPRUS")) {
      router.push("/iprus")
    }
  }
  
  // Verificar si el modal de deudas ya se ha mostrado en esta sesión
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const debtModalShown = localStorage.getItem(DEBT_MODAL_SHOWN_KEY)
      if (debtModalShown) {
        setHasShownDebtModal(true)
        console.log('Debt modal already shown in this session')
      }
    }
  }, [])

  // Limpiar estado cuando el usuario se desautentica
  useEffect(() => {
    if (!authContext.isAuthenticated || !authContext.user) {
      console.log('User logged out, clearing predio state and debt modal flag')
      setSelectedPredio(null)
      setPredios([])
      setHasCheckedPredios(false)
      setShowPredioModal(false)
      setShowDebtModal(false)
      setHasShownDebtModal(false)
      setUserTramites([])
      
      // Limpiar flag del modal de deudas del localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem(DEBT_MODAL_SHOWN_KEY)
      }
    }
  }, [authContext.isAuthenticated, authContext.user])

  // Mostrar modal de deudas al autenticarse por primera vez
  useEffect(() => {
    if (authContext.isAuthenticated && authContext.user && !authContext.loading && !hasShownDebtModal) {
      console.log('Checking if debt modal should be shown')
      
      // Verificar localStorage una vez más
      const debtModalShown = localStorage.getItem(DEBT_MODAL_SHOWN_KEY)
      if (!debtModalShown) {
        console.log('Showing debt modal for the first time')
        setShowDebtModal(true)
        setHasShownDebtModal(true)
        
        // Marcar en localStorage que el modal ya se ha mostrado
        if (typeof window !== 'undefined') {
          localStorage.setItem(DEBT_MODAL_SHOWN_KEY, 'true')
        }
      } else {
        console.log('Debt modal already shown, skipping')
        setHasShownDebtModal(true)
      }
    }
  }, [authContext.isAuthenticated, authContext.user, authContext.loading, hasShownDebtModal])

  // Cargar predios cuando se cambia al tab ciudadanos
  // Solo después de que se haya mostrado el modal de deudas
  useEffect(() => {
    if (activeTab === "ciudadanos" && authContext.isAuthenticated && authContext.user && !hasCheckedPredios && hasShownDebtModal && !showDebtModal) {
      console.log('Triggering fetchPredios - user authenticated and ciudadanos tab selected')
      fetchPredios()
    }
  }, [activeTab, authContext.isAuthenticated, authContext.user, hasCheckedPredios, hasShownDebtModal, showDebtModal])
  
  // Cargar trámites cuando se cambia al tab mis-tramites
  useEffect(() => {
    if (activeTab === "mis-tramites" && authContext.isAuthenticated && authContext.user) {
      console.log('Loading user tramites...')
      fetchTramites()
    }
  }, [activeTab, authContext.isAuthenticated, authContext.user])
  
  // Solo mostrar modal si no hay predio seleccionado (ni en estado ni en localStorage)
  // Y solo después de que se haya cerrado el modal de deudas
  useEffect(() => {
    if (hasCheckedPredios && predios.length > 0 && !selectedPredio && !showDebtModal && hasShownDebtModal) {
      setShowPredioModal(true)
    }
  }, [hasCheckedPredios, predios.length, selectedPredio, showDebtModal, hasShownDebtModal])
  
  const fetchPredios = async () => {
    if (!authContext.user) {
      console.log('No user found, skipping fetchPredios')
      return
    }
    
    console.log('Starting fetchPredios...')
    setLoadingPredios(true)
    setPrediosError(null)
    
    try {
      // Por ahora usaré el número de identificación de ejemplo
      // En producción, deberías obtenerlo del usuario autenticado
      const numeroIdentificacion = "0100055375"
      
      const url = `${getServiceUrl('tramites', 'prediosPorIdentificacion')}?numeroIdentificacion=${numeroIdentificacion}`
      console.log('Fetching predios from:', url)
      console.log('Token available:', !!AuthService.getToken())
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AuthService.getToken()}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error('Error al obtener predios')
      }
      
      const data: PrediosResponse = await response.json()
      
      if (data.exito && data.data) {
        setPredios(data.data)
        setHasCheckedPredios(true)
        
        // El modal se mostrará automáticamente por el useEffect si no hay predio seleccionado
      } else {
        throw new Error(data.mensaje || 'Error al obtener predios')
      }
    } catch (error) {
      console.error('Error fetching predios:', error)
      setPrediosError(error instanceof Error ? error.message : 'Error al cargar predios')
      toast({
        title: "Error al cargar predios",
        description: "No se pudieron cargar los predios disponibles",
        variant: "destructive"
      })
    } finally {
      setLoadingPredios(false)
    }
  }
  
  const handleSelectPredio = (predio: string) => {
    setSelectedPredio(predio)
    setShowPredioModal(false)
    
    // Guardar en localStorage para persistencia
    PredioService.setSelectedPredio(predio)
    console.log('Saved predio to localStorage:', predio)
    
    toast({
      title: "Predio seleccionado",
      description: `Se ha seleccionado el predio ${predio}`,
    })
  }
  
  const handleChangePredio = () => {
    setShowPredioModal(true)
  }
  
  const fetchTramites = async () => {
    if (!authContext.user) {
      console.log('No user found, skipping fetchTramites')
      return
    }
    
    console.log('Starting fetchTramites...')
    setLoadingTramites(true)
    setTramitesError(null)
    
    try {
      // Por ahora usaré el número de identificación de ejemplo
      const numeroIdentificacion = "0100055375"
      
      const response = await TramiteService.getActivosPorIdentificacion(numeroIdentificacion)
      
      if (response.exito && response.data) {
        // Ordenar los trámites de manera descendente por ID (más recientes primero)
        const sortedTramites = [...response.data].sort((a, b) => b.tramite.trmId - a.tramite.trmId)
        setUserTramites(sortedTramites)
        console.log('Tramites loaded:', sortedTramites)
      } else {
        throw new Error(response.mensaje || 'Error al obtener trámites')
      }
    } catch (error) {
      console.error('Error fetching tramites:', error)
      setTramitesError(error instanceof Error ? error.message : 'Error al cargar trámites')
      toast({
        title: "Error al cargar trámites",
        description: "No se pudieron cargar los trámites activos",
        variant: "destructive"
      })
    } finally {
      setLoadingTramites(false)
    }
  }
  
  const services = [
    {
      icon: Building2,
      title: "Certificado de Uso de Suelo para Actividades Comerciales (CUSAC)",
      description: "Documento oficial que certifica la compatibilidad del uso del suelo para desarrollar actividades comerciales, industriales o de servicios en un predio específico según la normativa urbana vigente.",
    },
    {
      icon: MapPin,
      title: "Informe de Compatibilidad de Uso de Suelo (ICUS)",
      description: "Informe técnico que evalúa la compatibilidad entre el uso propuesto y las regulaciones urbanísticas del área, determinando la viabilidad de un proyecto en un terreno específico.",
    },
    {
      icon: Map,
      title: "Informe Previo de Regulación Urbana de Suelo (IPRUS)",
      description: "Consulta previa que proporciona información sobre las normativas urbanísticas aplicables a un terreno, incluyendo indicadores como FOT, FOS, alturas máximas y usos permitidos.",
    },
    {
      icon: FileImage,
      title: "Registro de Planos Arquitectónicos",
      description: "Proceso de registro oficial de planos arquitectónicos ante la autoridad competente, validando que el diseño cumple con las normativas de construcción y planificación urbana vigentes.",
    },
    {
      icon: Construction,
      title: "Registro de Planos Estructurales",
      description: "Registro oficial de la documentación técnica estructural de una obra, certificando que el diseño estructural cumple con las normas de seguridad y construcción establecidas por la legislación.",
    },
  ]

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tabs */}
        <div className="flex justify-center space-x-2 mb-8">
          <button
            onClick={() => setActiveTab("ciudadanos")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
              activeTab === "ciudadanos"
                ? "bg-primary-600 text-white shadow-lg"
                : "bg-gray-300 text-gray-600 hover:bg-gray-400"
            }`}
          >
            Trámites Ciudadanos
          </button>
          <button
            onClick={() => setActiveTab("mis-tramites")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
              activeTab === "mis-tramites"
                ? "bg-primary-600 text-white shadow-lg"
                : "bg-gray-300 text-gray-600 hover:bg-gray-400"
            }`}
          >
            Mis Trámites
          </button>
        </div>

        {/* Mostrar predio seleccionado cuando está en tab ciudadanos */}
        {activeTab === "ciudadanos" && selectedPredio && (
          <Card className="mb-6 p-4 bg-primary-50 border-primary-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-700">Predio Seleccionado</p>
                  <p className="text-lg font-mono text-primary-900">{selectedPredio}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleChangePredio}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Cambiar Predio
              </Button>
            </div>
          </Card>
        )}

        {/* Content based on active tab */}
        {activeTab === "ciudadanos" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(service.title)}
                  className="bg-white rounded-lg p-6 shadow-md border border-primary-100 hover:shadow-xl hover:border-primary-500 hover:bg-primary-500 hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer group transform"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center group-hover:bg-secondary-500 group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary-700 mb-2 text-lg leading-tight group-hover:text-white group-hover:scale-105 transition-all duration-300">{service.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-100 transition-all duration-300">{service.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div>
            {authContext.loading ? (
              <div className="text-center py-16">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
                </div>
              </div>
            ) : authContext.isAuthenticated && authContext.user ? (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md border border-gray-200">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary-700 mb-4">Mis Trámites en Curso</h3>
                    {loadingTramites ? (
                      <div className="py-8">
                        <div className="animate-pulse space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    ) : tramitesError ? (
                      <div className="py-8 text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <p className="text-red-600">{tramitesError}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={fetchTramites}
                          className="mt-4"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Reintentar
                        </Button>
                      </div>
                    ) : userTramites.length === 0 ? (
                      <div className="py-8 text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No tienes trámites activos en este momento</p>
                      </div>
                    ) : (
                      <Table>
                        <TableCaption>Lista de todos tus trámites registrados en el sistema</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID Trámite</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha Inicio</TableHead>
                            <TableHead>Observaciones</TableHead>
                            <TableHead>Estado Proceso</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {userTramites.map((detalle) => (
                            <TableRow key={detalle.tramite.trmId}>
                              <TableCell className="font-medium">{detalle.tramite.trmId}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getEstadoIcon(detalle.tramite.estado.toLowerCase())}
                                  <span>{detalle.tramite.tipo}</span>
                                </div>
                              </TableCell>
                              <TableCell>{getEstadoBadge(detalle.tramite.estado.toLowerCase())}</TableCell>
                              <TableCell>
                                {new Date(detalle.tramite.fechaInicio).toLocaleDateString('es-EC', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </TableCell>
                              <TableCell className="max-w-xs">
                                <p className="truncate text-sm text-gray-600">
                                  {detalle.tramite.observaciones || 'Sin observaciones'}
                                </p>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{detalle.estadoProceso}</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => router.push(`/tramites/${detalle.tramite.trmId}`)}
                                >
                                  Ver detalles
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    className="bg-secondary-500 hover:bg-secondary-600"
                    onClick={() => router.push("/nuevo-tramite")}
                  >
                    Iniciar Nuevo Trámite
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-primary-50 rounded-lg p-12 max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-primary-700 mb-4">Mis Trámites</h3>
                  <p className="text-gray-600 mb-6">
                    Para ver tus trámites en curso, debes iniciar sesión con tu cuenta personal.
                  </p>
                  <button
                    onClick={() => router.push("/login")}
                    className="bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Modal de información de deudas */}
        {showDebtModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-8 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Estado de Deudas</h3>
                <p className="text-gray-600 mb-6">
                  Nos complace informarle que no registra deudas pendientes en su cuenta.
                  Puede proceder con normalidad a realizar sus trámites.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-green-800">
                    ✓ Sin deudas pendientes
                  </p>
                  <p className="text-sm text-green-700">
                    Cuenta al día para realizar trámites
                  </p>
                </div>
                <button
                  onClick={() => setShowDebtModal(false)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de selección de predio */}
        <PredioSelectionModal
          isOpen={showPredioModal}
          onClose={() => setShowPredioModal(false)}
          predios={predios}
          onSelectPredio={handleSelectPredio}
          loading={loadingPredios}
          error={prediosError}
        />
      </div>
    </section>
  )
}