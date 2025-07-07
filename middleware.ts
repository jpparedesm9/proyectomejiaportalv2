import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas que requieren autenticación
const protectedRoutes = ['/iprus']

// Rutas públicas que no requieren autenticación
const publicRoutes = ['/login', '/registro', '/recuperar-contrasena']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verificar si es una ruta protegida
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // Verificar si es una ruta pública
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Obtener el token de las cookies (Next.js lo maneja automáticamente)
  const token = request.cookies.get('auth_token')?.value

  // Si es una ruta protegida y no hay token, redirigir al login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Si es una ruta pública y hay token, redirigir al home
  if (isPublicRoute && token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}