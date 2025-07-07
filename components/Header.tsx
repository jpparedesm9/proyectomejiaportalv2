"use client"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut } from "lucide-react"

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth()

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
            
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.fullName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-gray-900">{user.fullName}</p>
                      <p className="text-xs leading-none text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer hover:bg-red-50 focus:bg-red-50"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                Iniciar Sesión
              </Link>
            )}
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