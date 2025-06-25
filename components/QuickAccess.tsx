import React from 'react'
import Link from 'next/link'
import { 
  Building2, 
  Car, 
  AlertTriangle,
  FileText,
  GraduationCap,
  CreditCard,
  Briefcase,
  Shield,
  Heart,
  Home,
  Users,
  Landmark
} from 'lucide-react'

export default function QuickAccess() {
  const categories = [
    {
      icon: Building2,
      title: 'Actividades comerciales, productivas y de servicios',
      description: 'Trámites orientados a la producción de bienes y servicios para los consumidores.',
      href: '/tramites/actividades-comerciales',
      color: 'text-orange-600'
    },
    {
      icon: Car,
      title: 'Automotor, transporte y tránsito',
      description: 'Servicios relacionados con la compra, venta y registro de vehículos, permisos e infracciones.',
      href: '/tramites/automotor',
      color: 'text-blue-600'
    },
    {
      icon: AlertTriangle,
      title: 'Denuncias',
      description: 'Denuncias ante irregularidades en servicios, en el sistema de salud o de abuso.',
      href: '/tramites/denuncias',
      color: 'text-red-600'
    },
    {
      icon: FileText,
      title: 'Documentación, actas y certificados',
      description: 'Trámites y servicios orientados a obtener el DNI, Pasaporte, partidas, entre otros.',
      href: '/tramites/documentacion',
      color: 'text-green-600'
    },
    {
      icon: GraduationCap,
      title: 'Educación y cultura',
      description: 'Servicios destinados a estudiantes, docentes, establecimientos educativos y culturales.',
      href: '/tramites/educacion',
      color: 'text-purple-600'
    },
    {
      icon: Users,
      title: 'Jubilaciones y pensiones',
      description: 'Orientación para servicios de jubilaciones y pensiones.',
      href: '/tramites/jubilaciones',
      color: 'text-yellow-600'
    },
    {
      icon: Shield,
      title: 'Seguridad y justicia',
      description: 'Servicios orientados a gestiones en el ámbito de la justicia, seguridad y derechos humanos.',
      href: '/tramites/seguridad',
      color: 'text-indigo-600'
    },
    {
      icon: CreditCard,
      title: 'Impuestos, pagos y deudas',
      description: 'Trámites relacionados con obligaciones de pago.',
      href: '/tramites/impuestos',
      color: 'text-gray-600'
    },
    {
      icon: Briefcase,
      title: 'Programas',
      description: 'Programas de prevención y tratamiento que ofrece la provincia de Buenos Aires.',
      href: '/tramites/programas',
      color: 'text-pink-600'
    },
    {
      icon: Heart,
      title: 'Salud, obra social y prevención',
      description: 'Servicios relacionados con prestaciones de salud, empleados de la salud, entre otros.',
      href: '/tramites/salud',
      color: 'text-red-500'
    },
    {
      icon: Landmark,
      title: 'Trabajo',
      description: 'Servicios orientados a empleados y acceso al trabajo, entre otros.',
      href: '/tramites/trabajo',
      color: 'text-teal-600'
    },
    {
      icon: Home,
      title: 'Vivienda, servicios y catastro',
      description: 'Trámites y servicios referidos a la propiedad de bienes e inmuebles.',
      href: '/tramites/vivienda',
      color: 'text-blue-700'
    }
  ]

  return (
    <section className="py-16 bg-[#f5f5f5]">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Trámites por organismo
          </h2>
          <h3 className="text-xl text-gray-700">
            Temas
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Link
                key={index}
                href={category.href}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 group border border-gray-200"
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 ${category.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-[#2b8cdb] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
