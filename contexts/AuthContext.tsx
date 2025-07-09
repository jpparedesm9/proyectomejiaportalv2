"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AuthService } from '@/services/auth.service'
import { PredioService } from '@/services/predio.service'
import { LoginRequest, User, AuthData } from '@/types/auth.types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Verificar autenticación al cargar
  useEffect(() => {
    checkAuth()
  }, [])

  // Redirigir si no está autenticado en rutas protegidas
  useEffect(() => {
    const protectedRoutes = ['/iprus']
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    
    if (!loading && isProtectedRoute && !user) {
      router.push('/login')
    }
  }, [pathname, user, loading, router])

  const checkAuth = () => {
    try {
      console.log('AuthContext - Checking authentication...')
      if (AuthService.isAuthenticated()) {
        const authData = AuthService.getAuthData()
        console.log('AuthContext - Auth data found:', authData)
        if (authData) {
          setUser({
            id: authData.userId,
            username: authData.username,
            fullName: authData.fullName,
            email: authData.email,
            roles: authData.roles,
            permissions: authData.permissions,
          })
        }
      } else {
        console.log('AuthContext - Not authenticated')
        setUser(null)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await AuthService.login(credentials)
      
      if (response.success && response.data) {
        const authData = response.data
        const newUser = {
          id: authData.userId,
          username: authData.username,
          fullName: authData.fullName,
          email: authData.email,
          roles: authData.roles,
          permissions: authData.permissions,
        }
        setUser(newUser)
        console.log('AuthContext - User logged in:', newUser)
        
        // Redirigir a la página principal o a la página que intentaba acceder
        router.push('/')
      } else {
        throw new Error(response.message || 'Error al iniciar sesión')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await AuthService.logout()
      // Clear predio selection when logging out
      PredioService.clearSelectedPredio()
      // Clear debt modal flag
      if (typeof window !== 'undefined') {
        localStorage.removeItem('debtModalShown')
      }
      setUser(null)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}