"use client"
import { useState } from "react"
import {
  Building2,
  MapPin,
  Map,
  FileImage,
  ConstructionIcon as Construction,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ServicesSection() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("ciudadanos")
  
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
          <div className="text-center py-16">
            <div className="bg-primary-50 rounded-lg p-12 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-primary-700 mb-4">Mis Trámites</h3>
              <p className="text-gray-600 mb-6">
                Para ver tus trámites en curso, debes iniciar sesión con tu cuenta personal.
              </p>
              <button
                onClick={() => router.push("/iniciar-sesion")}
                className="bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}