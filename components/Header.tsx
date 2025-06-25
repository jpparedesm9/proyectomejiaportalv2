"use client"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50 border-b-4 border-gradient">
      <div className="container py-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo del Portal"
              width={300}
              height={100}
              className="h-20 w-auto"
            />
          </Link>

          <nav className="flex items-center space-x-8">
            <Link href="/telefonos-utiles" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              Teléfonos Útiles
            </Link>
            <Link href="/acerca-del-portal" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              Acerca del Portal
            </Link>
            <Link
              href="/iniciar-sesion"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Iniciar Sesión
            </Link>
          </nav>
        </div>
      </div>
      {/* Línea de gradiente inferior con colores personalizados */}
      <div 
        className="h-1" 
        style={{
          background: 'linear-gradient(to right, #f3c344 0%, #3b8541 50%, #e9e8e8 100%)'
        }}
      ></div>
    </header>
  )
}
