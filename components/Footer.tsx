import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, MessageCircle, Music, Podcast, Accessibility } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-16">
      {/* Decorative Banner */}
      <div className="h-32 bg-gradient-to-r from-teal-400 via-purple-400 to-teal-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 1400 200" className="w-full h-full">
            {/* Stylized Buenos Aires skyline silhouette */}
            <path
              d="M0,200 L0,120 L50,100 L100,80 L150,90 L200,70 L250,85 L300,60 L350,75 L400,50 L450,65 L500,45 L550,60 L600,40 L650,55 L700,35 L750,50 L800,30 L850,45 L900,25 L950,40 L1000,20 L1050,35 L1100,15 L1150,30 L1200,10 L1250,25 L1300,5 L1350,20 L1400,0 L1400,200 Z"
              fill="rgba(255,255,255,0.1)"
            />
            {/* Additional landscape elements */}
            <circle cx="200" cy="60" r="8" fill="rgba(255,255,255,0.2)" />
            <circle cx="800" cy="40" r="6" fill="rgba(255,255,255,0.2)" />
            <circle cx="1200" cy="30" r="10" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Canales de Comunicación */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800">Canales de Comunicación</h3>
              <div className="space-y-4">
                {/* 148 Badge */}
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    148
                  </div>
                </div>

                {/* 148 Accesible Badge */}
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-teal-500 rounded-full flex flex-col items-center justify-center text-white">
                    <Accessibility className="w-4 h-4 mb-1" />
                    <span className="text-xs font-bold">148</span>
                    <span className="text-xs">ACCESIBLE</span>
                  </div>
                </div>

                {/* 144 Badge */}
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    144
                  </div>
                </div>
              </div>
            </div>

            {/* Guía Servicios */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800">Guía Servicios</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/expedientes" className="text-gray-600 hover:text-teal-600 transition-colors">
                    Expedientes
                  </Link>
                </li>
                <li>
                  <Link href="/arba" className="text-gray-600 hover:text-teal-600 transition-colors">
                    ARBA
                  </Link>
                </li>
                <li>
                  <Link href="/boletin-oficial" className="text-gray-600 hover:text-teal-600 transition-colors">
                    Boletín Oficial
                  </Link>
                </li>
                <li>
                  <Link href="/registro-personas" className="text-gray-600 hover:text-teal-600 transition-colors">
                    Registro de las Personas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Uso Interno */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800">Uso Interno</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/webmail" className="text-gray-600 hover:text-teal-600 transition-colors">
                    Webmail GBA
                  </Link>
                </li>
                <li>
                  <Link href="/sistemas" className="text-gray-600 hover:text-teal-600 transition-colors">
                    Sistemas
                  </Link>
                </li>
                <li>
                  <Link href="/gdeba" className="text-gray-600 hover:text-teal-600 transition-colors">
                    GDEBA
                  </Link>
                </li>
                <li>
                  <Link href="/portal-empleado" className="text-gray-600 hover:text-teal-600 transition-colors">
                    Portal del Empleado/a
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Version and Privacy */}
          <div className="text-center mt-8 pt-6 border-t border-gray-300">
            <div className="text-sm text-gray-600">
              <span>Versión 4.1</span>
              <span className="mx-2">|</span>
              <Link href="/politicas-privacidad" className="text-teal-600 hover:text-teal-700">
                Políticas de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Footer */}
      <div className="bg-teal-600 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-600 hover:bg-gray-100 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-600 hover:bg-gray-100 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-600 hover:bg-gray-100 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-600 hover:bg-gray-100 transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-600 hover:bg-gray-100 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-600 hover:bg-gray-100 transition-colors"
            >
              <Music className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-600 hover:bg-gray-100 transition-colors"
            >
              <Podcast className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Accessibility Button */}
      <button className="fixed bottom-4 left-4 w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700 transition-colors shadow-lg">
        <Accessibility className="w-6 h-6" />
      </button>
    </footer>
  )
}
