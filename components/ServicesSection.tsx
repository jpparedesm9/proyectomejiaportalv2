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

export default function ServicesSection() {
  const router = useRouter()
  const authContext = useAuth()
  const [activeTab, setActiveTab] = useState("ciudadanos")
  
  // Log para debug
  useEffect(() => {
    console.log("ServicesSection - Full auth context:", authContext)
    console.log("ServicesSection - Auth state:", { 
      isAuthenticated: authContext.isAuthenticated, 
      user: authContext.user, 
      loading: authContext.loading 
    })
  }, [authContext])
  
  // Datos de ejemplo para los trámites del usuario
  const userTramites = [
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
    switch (estado) {
      case "en_proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">En Proceso</Badge>
      case "completado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completado</Badge>
      case "pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pendiente</Badge>
      case "rechazado":
        return <Badge variant="destructive">Rechazado</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }
  
  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "en_proceso":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "completado":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pendiente":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "rechazado":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }
  
  const handleCardClick = (title: string) => {
    if (title.includes("IPRUS")) {
      router.push("/iprus")
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
                    <Table>
                      <TableCaption>Lista de todos tus trámites registrados en el sistema</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID Trámite</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Fecha Inicio</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Progreso</TableHead>
                          <TableHead>Próxima Acción</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userTramites.map((tramite) => (
                          <TableRow key={tramite.id}>
                            <TableCell className="font-medium">{tramite.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getEstadoIcon(tramite.estado)}
                                <span>{tramite.tipo}</span>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <p className="truncate">{tramite.descripcion}</p>
                            </TableCell>
                            <TableCell>{tramite.fechaInicio}</TableCell>
                            <TableCell>{getEstadoBadge(tramite.estado)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${tramite.progreso}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-600">{tramite.progreso}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {tramite.proximaAccion}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/tramites/${tramite.id}`)}
                              >
                                Ver detalles
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
      </div>
    </section>
  )
}