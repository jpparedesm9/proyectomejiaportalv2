import React from "react"
import Link from "next/link"
import { Search } from "lucide-react"

export default function HeroSection() {
  const popularSearches = [
    "Solicitud de partidas",
    "DNI - Nuevo Ejemplar",
    "Boletín Oficial - Sección Oficial",
    "Matrimonio",
  ]

  return (
    <>
      {/* Main Hero Section with Green Gradient 
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-12">Portal de Trámites</h1>

            <div className="relative max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1 shadow-lg">
                <div className="flex items-center bg-white rounded-full">
                  <Search className="w-5 h-5 text-gray-400 ml-4" />
                  <input
                    type="text"
                    placeholder="¿Qué trámite estás buscando?"
                    className="flex-1 px-4 py-4 text-gray-700 outline-none bg-transparent rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Popular Searches Section 
      <section className="bg-primary-50 py-6">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap justify-center items-center gap-2">
              <span className="text-primary-800 font-medium mr-4">Lo más buscado</span>
              {popularSearches.map((search, index) => (
                <React.Fragment key={search}>
                  <Link href="#" className="text-primary-600 hover:text-primary-700 hover:underline transition-colors">
                    {search}
                  </Link>
                  {index < popularSearches.length - 1 && <span className="text-primary-400 mx-2">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      */}
    </>
  )
}