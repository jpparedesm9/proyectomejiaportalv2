import React from 'react'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

export default function NewsSection() {
  const news = [
    {
      id: 1,
      title: 'Nuevo programa de becas universitarias 2024',
      excerpt: 'Se abrió la convocatoria para solicitar becas de estudio para estudiantes universitarios de la provincia.',
      date: '15 de diciembre, 2023',
      image: '/api/placeholder/400/250',
      category: 'Educación'
    },
    {
      id: 2,
      title: 'Mejoras en el sistema de salud provincial',
      excerpt: 'Se inauguraron nuevos centros de atención primaria en diferentes municipios del conurbano bonaerense.',
      date: '14 de diciembre, 2023',
      image: '/api/placeholder/400/250',
      category: 'Salud'
    },
    {
      id: 3,
      title: 'Plan de obras viales para el verano',
      excerpt: 'Comienzan los trabajos de mantenimiento y mejora en las principales rutas de acceso a la costa atlántica.',
      date: '13 de diciembre, 2023',
      image: '/api/placeholder/400/250',
      category: 'Infraestructura'
    },
    {
      id: 4,
      title: 'Nuevos beneficios para jubilados',
      excerpt: 'Se implementan descuentos especiales en servicios y medicamentos para adultos mayores de la provincia.',
      date: '12 de diciembre, 2023',
      image: '/api/placeholder/400/250',
      category: 'Desarrollo Social'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Últimas Noticias
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Mantente informado sobre las últimas novedades de la provincia
          </p>
          <Link
            href="/noticias"
            className="inline-flex items-center space-x-2 bg-[#007bb7] text-white px-6 py-3 rounded-lg hover:bg-[#0066a0] font-medium transition-colors"  
          >
            <span>Ver todas las noticias</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-50 relative">
                <div className="absolute inset-0 flex items-center justify-center text-blue-400">
                  📰 Imagen de noticia
                </div>
                <div className="absolute top-3 left-3 bg-[#007bb7] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 text-lg leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{item.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
